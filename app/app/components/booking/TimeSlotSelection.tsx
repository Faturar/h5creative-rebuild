"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Check,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  DollarSign,
  Info,
} from "lucide-react"
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  isToday,
  isPast,
} from "date-fns"
import { id as localeId } from "date-fns/locale"

interface StudioSlot {
  id: string
  studioId: string
  date: Date | string
  startTime: string
  endTime: string
  isBooked: boolean
}

interface TimeSlotSelectionProps {
  studioId: string | null
  selectedSlotId: string | null
  onSelect: (
    slotId: string,
    date: string,
    startTime: string,
    endTime: string,
  ) => void
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  deviceType?: string | null
  totalHours?: number | null
}

export default function TimeSlotSelection({
  studioId,
  selectedSlotId,
  onSelect,
  customerName = "",
  customerEmail = "",
  customerPhone = "",
  deviceType,
  totalHours,
}: TimeSlotSelectionProps) {
  const [slots, setSlots] = useState<StudioSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [slotSurcharges, setSlotSurcharges] = useState<
    Map<string, { hasSurcharge: boolean; amount: number; description: string }>
  >(new Map())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<StudioSlot | null>(null)
  const [selectionMode, setSelectionMode] = useState<"preset" | "custom">("preset")
  const [customSlotData, setCustomSlotData] = useState({
    studioId: studioId || "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "",
    endTime: "",
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [customSurcharge, setCustomSurcharge] = useState<{
    hasSurcharge: boolean
    amount: number
    description: string
  } | null>(null)

  useEffect(() => {
    if (studioId) {
      fetchSlots()
      setCustomSlotData((prev) => ({ ...prev, studioId }))
    }
  }, [studioId, selectedDate])

  useEffect(() => {
    if (slots.length > 0) {
      fetchSlotSurcharges()
    }
  }, [slots])

  useEffect(() => {
    if (customSlotData.startTime && customSlotData.endTime) {
      fetchCustomSurcharge()
    }
  }, [customSlotData.startTime, customSlotData.endTime])

  const fetchSlots = async () => {
    if (!studioId) return

    setLoading(true)
    setError(null)
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd")
      console.log("Fetching slots for:", { studioId, dateStr })

      const response = await fetch(
        `/api/slots?studioId=${studioId}&date=${dateStr}`,
      )

      const result = await response.json()
      console.log("Slots response:", result)

      if (result.success) {
        setSlots(result.data || [])
        if (result.data && result.data.length === 0) {
          setError("Tidak ada slot tersedia untuk tanggal ini")
        }
      } else {
        setError(result.error || "Gagal memuat slot")
      }
    } catch (err) {
      console.error("Failed to fetch slots:", err)
      setError("Terjadi kesalahan saat memuat slot")
      setSlots([])
    } finally {
      setLoading(false)
    }
  }

  const fetchSlotSurcharges = async () => {
    const surchargeMap = new Map<
      string,
      { hasSurcharge: boolean; amount: number; description: string }
    >()

    for (const slot of slots) {
      try {
        const response = await fetch("/api/pricing/surcharge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startTime: slot.startTime,
            endTime: slot.endTime,
          }),
        })

        const result = await response.json()

        if (result.success) {
          surchargeMap.set(slot.id, result.data)
        } else {
          throw new Error(result.error || "Failed to get surcharge info")
        }
      } catch (error) {
        console.error("Error fetching surcharge for slot:", slot.id, error)
        surchargeMap.set(slot.id, {
          hasSurcharge: false,
          amount: 0,
          description: "Normal operational hours",
        })
      }
    }

    setSlotSurcharges(surchargeMap)
  }

  const fetchCustomSurcharge = async () => {
    if (!customSlotData.startTime || !customSlotData.endTime) return

    try {
      const response = await fetch("/api/pricing/surcharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime: customSlotData.startTime,
          endTime: customSlotData.endTime,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setCustomSurcharge(result.data)
      } else {
        setCustomSurcharge({
          hasSurcharge: false,
          amount: 0,
          description: "Normal operational hours",
        })
      }
    } catch (error) {
      console.error("Error fetching custom surcharge:", error)
      setCustomSurcharge({
        hasSurcharge: false,
        amount: 0,
        description: "Normal operational hours",
      })
    }
  }

  const getSlotBorderColor = (slotId: string): string => {
    const surchargeInfo = slotSurcharges.get(slotId)
    if (!surchargeInfo?.hasSurcharge) return "border-white/10"

    if (surchargeInfo.amount >= 15000) return "border-orange-500/50"
    if (surchargeInfo.amount >= 20000) return "border-red-500/50"
    return "border-yellow-500/50"
  }

  const getSlotBackgroundColor = (
    slotId: string,
    isSelected: boolean,
    isAvailable: boolean,
  ): string => {
    if (!isAvailable) return "bg-white/5"
    if (isSelected) return "bg-[#4920E5]/20"

    const surchargeInfo = slotSurcharges.get(slotId)
    if (!surchargeInfo?.hasSurcharge) return "bg-white/5"

    if (surchargeInfo.amount >= 20000) return "bg-red-500/10"
    if (surchargeInfo.amount >= 15000) return "bg-orange-500/10"
    return "bg-yellow-500/10"
  }

  const handleDateChange = (days: number) => {
    const newDate =
      days > 0
        ? addDays(selectedDate, days)
        : subDays(selectedDate, Math.abs(days))
    setSelectedDate(newDate)
    setSelectedSlot(null)
    setError(null)
  }

  const handleSlotSelect = (slot: StudioSlot) => {
    if (slot.isBooked) return

    setSelectedSlot(slot)
    onSelect(
      slot.id,
      format(slot.date, "yyyy-MM-dd"),
      slot.startTime,
      slot.endTime,
    )
  }

  const validateCustomTime = () => {
    const errors: string[] = []

    if (!customSlotData.date) {
      errors.push("Tanggal harus dipilih")
    } else {
      const selectedDate = new Date(customSlotData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      selectedDate.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        errors.push("Mohon pilih tanggal di masa depan")
      }
    }

    if (!customSlotData.startTime) {
      errors.push("Jam mulai harus diisi")
    }

    if (!customSlotData.endTime) {
      errors.push("Jam selesai harus diisi")
    }

    if (customSlotData.startTime && customSlotData.endTime) {
      const [startHours, startMinutes] = customSlotData.startTime
        .split(":")
        .map(Number)
      const [endHours, endMinutes] = customSlotData.endTime
        .split(":")
        .map(Number)

      const startMinutesTotal = startHours * 60 + startMinutes
      const endMinutesTotal = endHours * 60 + endMinutes

      if (endMinutesTotal <= startMinutesTotal) {
        errors.push("Jam selesai harus setelah jam mulai")
      }

      const duration = endMinutesTotal - startMinutesTotal
      if (duration < 30) {
        errors.push("Durasi minimal adalah 30 menit")
      } else if (duration > 480) {
        errors.push("Durasi maksimal adalah 8 jam per sesi")
      }
    }

    return errors
  }

  const handleCustomTimeSelect = () => {
    const errors = validateCustomTime()

    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors([])

    onSelect(
      null,
      customSlotData.date,
      customSlotData.startTime,
      customSlotData.endTime,
    )
  }

  const handleCustomTimeChange = (
    field: "startTime" | "endTime" | "date",
    value: string,
  ) => {
    setCustomSlotData((prev) => ({ ...prev, [field]: value }))
    setTouchedFields(new Set([...touchedFields, field]))
    setValidationErrors([])
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    return `${hours}:${minutes}`
  }

  const getWeekDays = () => {
    const days = []
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 })
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i))
    }
    return days
  }

  if (!studioId) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-400">Silakan pilih studio terlebih dahulu</p>
      </div>
    )
  }

  const weekDays = getWeekDays()
  const availableSlots = slots.filter((slot) => !slot.isBooked)

  return (
    <div>
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Pilih Waktu Live Streaming
        </h2>
        <p className="text-sm md:text-base text-gray-400">
          Pilih tanggal dan jam slot yang tersedia
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 md:p-5 bg-red-500/15 border-2 border-red-500/40 rounded-xl md:rounded-2xl flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-400 flex-shrink-0" />
          <p className="text-base md:text-lg font-medium text-red-400">{error}</p>
        </motion.div>
      )}

      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <button
            onClick={() => handleDateChange(-7)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            disabled={loading}
            aria-label="Minggu sebelumnya"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
          </button>
          <h3 className="text-base md:text-lg font-semibold text-white">
            {format(selectedDate, "MMMM yyyy", { locale: localeId })}
          </h3>
          <button
            onClick={() => handleDateChange(7)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            disabled={loading}
            aria-label="Minggu berikutnya"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
            <div
              key={day}
              className="text-center text-xs md:text-sm font-medium text-gray-500 py-1.5 md:py-2"
            >
              {day}
            </div>
          ))}
          {weekDays.map((day) => {
            const dayIsPast = isPast(day) && !isToday(day)
            const dayIsToday = isToday(day)
            const isSelected =
              format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")

            return (
              <button
                key={day.toISOString()}
                onClick={() => !dayIsPast && setSelectedDate(day)}
                disabled={dayIsPast || loading}
                className={`p-2 rounded-lg text-center transition-all ${
                  dayIsPast
                    ? "text-gray-600 cursor-not-allowed bg-white/5"
                    : isSelected
                      ? "bg-[#4920E5] text-white shadow-lg scale-105"
                      : dayIsToday
                        ? "bg-[#4920E5]/20 text-[#4920E5] border-2 border-[#4920E5]/50"
                        : "hover:bg-[#4920E5]/20 text-gray-300"
                }`}
              >
                <div className="text-sm font-medium">{format(day, "d")}</div>
                {dayIsToday && <div className="text-xs mt-1">Hari ini</div>}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <div className="flex justify-center bg-white/5 rounded-full p-1 inline-flex mx-auto border border-white/10">
          <button
            onClick={() => setSelectionMode("preset")}
            className={`flex items-center gap-2 px-5 md:px-7 py-2.5 md:py-3 rounded-full transition-all font-semibold ${
              selectionMode === "preset"
                ? "bg-[#4920E5] text-white shadow-lg shadow-[#4920E5]/30"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">Slot Tersedia</span>
          </button>
          <button
            onClick={() => setSelectionMode("custom")}
            className={`flex items-center gap-2 px-5 md:px-7 py-2.5 md:py-3 rounded-full transition-all font-semibold ${
              selectionMode === "custom"
                ? "bg-[#4920E5] text-white shadow-lg shadow-[#4920E5]/30"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">Custom Waktu</span>
          </button>
        </div>
      </div>

      {selectionMode === "custom" && validationErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 md:p-5 bg-red-500/15 border-2 border-red-500/40 rounded-xl md:rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-base md:text-lg font-bold text-red-300 mb-3">
                Mohon perbaiki kesalahan berikut:
              </p>
              <ul className="text-sm md:text-base text-red-400 space-y-2 list-disc list-inside font-medium">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {selectionMode === "custom" && (
        <div className="mb-6 md:mb-8 p-4 md:p-6 bg-white/5 rounded-2xl border-2 border-white/20 shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#4920E5]" />
            Tentukan Waktu Live Streaming
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm md:text-base font-semibold text-white mb-2">
                Tanggal
              </label>
              <input
                type="date"
                value={customSlotData.date}
                onChange={(e) => handleCustomTimeChange("date", e.target.value)}
                min={format(new Date(), "yyyy-MM-dd")}
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#4920E5] focus:border-[#4920E5] transition-all"
                placeholder="Pilih tanggal"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm md:text-base font-semibold text-white mb-2">
                  Jam Mulai
                </label>
                <input
                  type="time"
                  value={customSlotData.startTime}
                  onChange={(e) => handleCustomTimeChange("startTime", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#4920E5] focus:border-[#4920E5] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-semibold text-white mb-2">
                  Jam Selesai
                </label>
                <input
                  type="time"
                  value={customSlotData.endTime}
                  onChange={(e) => handleCustomTimeChange("endTime", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#4920E5] focus:border-[#4920E5] transition-all"
                />
              </div>
            </div>
          </div>

          {customSlotData.startTime &&
            customSlotData.endTime &&
            (() => {
              const [startHours, startMinutes] = customSlotData.startTime
                .split(":")
                .map(Number)
              const [endHours, endMinutes] = customSlotData.endTime
                .split(":")
                .map(Number)
              const durationMinutes =
                endHours * 60 +
                endMinutes -
                (startHours * 60 + startMinutes)
              const hours = Math.floor(durationMinutes / 60)
              const minutes = durationMinutes % 60

              if (durationMinutes > 0) {
                return (
                  <div className="mt-4 p-3 bg-[#4920E5]/10 border border-[#4920E5]/30 rounded-xl">
                    <p className="text-sm md:text-base text-gray-300">
                      Durasi:{" "}
                      <span className="text-white font-bold">
                        {hours} jam {minutes > 0 && `${minutes} menit`}
                      </span>
                    </p>
                  </div>
                )
              }
              return null
            })()}

          <button
            onClick={handleCustomTimeSelect}
            className="mt-4 w-full py-3 md:py-4 bg-[#4920E5] hover:bg-[#5B2BE8] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Pilih Waktu Ini
          </button>

          {customSurcharge?.hasSurcharge && (
            <div className="mt-4 p-3 md:p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <div className="flex items-start gap-2 md:gap-3">
                <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm md:text-base font-medium text-orange-300 mb-1">
                    Biaya Tambahan Waktu
                  </p>
                  <p className="text-sm md:text-base text-orange-400">
                    +Rp {customSurcharge.amount.toLocaleString("id-ID")} /{" "}
                    {customSurcharge.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!customSurcharge?.hasSurcharge &&
            customSlotData.startTime &&
            customSlotData.endTime && (
              <div className="mt-4 p-3 md:p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="flex items-start gap-2 md:gap-3">
                  <Info className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm md:text-base font-medium text-green-300">
                      Jam Normal
                    </p>
                    <p className="text-xs md:text-sm text-green-400">
                      Tidak ada biaya tambahan untuk jam ini
                    </p>
                  </div>
                </div>
              </div>
            )}

          <div className="mt-6 p-4 md:p-5 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl">
            <div className="flex items-start gap-2 md:gap-3">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-base md:text-lg font-bold text-blue-300 mb-3">
                  Informasi Biaya Tambahan
                </p>
                <ul className="text-sm md:text-base text-blue-400 space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="font-medium">07:00 - 21:00: Harga normal</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <span className="font-medium">21:00 - 01:00: +Rp 15.000/jam</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"></div>
                    <span className="font-medium">01:00 - 07:00: +Rp 20.000/jam</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectionMode === "preset" && (
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#4920E5]" />
            Slot Tersedia -{" "}
            <span className="text-[#4920E5]">
              {format(selectedDate, "EEEE, d MMMM yyyy", { locale: localeId })}
            </span>
          </h3>

          {loading ? (
            <div className="flex items-center justify-center h-32 md:h-40 bg-white/5 rounded-2xl">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4920E5]"></div>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="text-center py-12 md:py-16 bg-white/5 rounded-2xl border-2 border-dashed border-white/20">
              <Calendar className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 md:mb-4" />
              <p className="text-base md:text-lg font-medium text-gray-300 mb-2">
                Tidak ada slot tersedia untuk tanggal ini
              </p>
              <p className="text-sm md:text-base text-gray-400">
                Coba pilih tanggal lain atau gunakan mode "Custom Waktu" untuk
                menentukan waktu sendiri
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {slots.map((slot) => {
                const isSelected = selectedSlotId === slot.id
                const isAvailable = !slot.isBooked
                const surchargeInfo = slotSurcharges.get(slot.id)

                return (
                  <motion.button
                    key={slot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={!isAvailable}
                    className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? "border-[#4920E5] bg-[#4920E5]/20 shadow-xl scale-105"
                        : !isAvailable
                          ? "border-white/10 bg-white/5 cursor-not-allowed opacity-40"
                          : `${getSlotBorderColor(slot.id)} hover:border-[#4920E5]/70 hover:shadow-lg hover:scale-102 ${getSlotBackgroundColor(slot.id, isSelected, isAvailable)}`
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-7 h-7 bg-[#4920E5] rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}

                    {surchargeInfo?.hasSurcharge && !isSelected && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                        <DollarSign className="w-3 h-3" />
                        +Rp {surchargeInfo.amount.toLocaleString("id-ID")}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-2">
                      <Clock
                        className={`w-5 h-5 ${isAvailable ? "text-[#4920E5]" : "text-gray-500"}`}
                      />
                      <span
                        className={`font-bold text-lg ${isAvailable ? "text-white" : "text-gray-500"}`}
                      >
                        {formatTime(slot.startTime)}
                      </span>
                    </div>

                    <div
                      className={`text-sm md:text-base font-medium ${isAvailable ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </div>

                    {surchargeInfo?.hasSurcharge && (
                      <div className="mt-2 text-xs md:text-sm text-orange-400 font-semibold">
                        {surchargeInfo.description}
                      </div>
                    )}

                    {!isAvailable && (
                      <div className="mt-2 text-xs md:text-sm text-red-400 font-semibold">
                        Sudah Dibooking
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {selectionMode === "preset" && availableSlots.length > 0 && (
        <div className="mb-6 p-4 md:p-5 bg-green-500/10 border-2 border-green-500/30 rounded-xl md:rounded-2xl">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-base md:text-lg font-bold text-green-300 mb-1">
                {availableSlots.length} slot tersedia
              </p>
              <p className="text-sm md:text-base text-green-400">
                Pilih salah satu slot di atas untuk melanjutkan ke langkah
                berikutnya
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
