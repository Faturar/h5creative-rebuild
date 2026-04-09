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
  Plus,
  Info,
  DollarSign,
} from "lucide-react"
import { getSurchargeInfo } from "@/lib/pricing"
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

interface Studio {
  id: string
  name: string
  location: string
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
}

export default function TimeSlotSelection({
  studioId,
  selectedSlotId,
  onSelect,
  customerName = "",
  customerEmail = "",
  customerPhone = "",
  deviceType,
}: TimeSlotSelectionProps) {
  const [slots, setSlots] = useState<StudioSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [slotSurcharges, setSlotSurcharges] = useState<
    Map<string, { hasSurcharge: boolean; amount: number; description: string }>
  >(new Map())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<StudioSlot | null>(null)
  const [isCustomSlotModalOpen, setIsCustomSlotModalOpen] = useState(false)
  const [customSlotData, setCustomSlotData] = useState({
    studioId: studioId || "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "",
    endTime: "",
    notes: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [studios, setStudios] = useState<Studio[]>([])
  const [loadingStudios, setLoadingStudios] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customSlotSuccess, setCustomSlotSuccess] = useState(false)

  useEffect(() => {
    if (studioId) {
      fetchSlots()
      setCustomSlotData((prev) => ({ ...prev, studioId }))
    }
  }, [studioId, selectedDate])

  useEffect(() => {
    // Fetch surcharge information for all slots
    if (slots.length > 0) {
      fetchSlotSurcharges()
    }
  }, [slots])

  useEffect(() => {
    if (isCustomSlotModalOpen) {
      fetchStudios()
    }
  }, [isCustomSlotModalOpen])

  const fetchStudios = async () => {
    setLoadingStudios(true)
    try {
      const response = await fetch("/api/studios")
      const result = await response.json()
      if (result.success) {
        setStudios(result.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch studios:", error)
    } finally {
      setLoadingStudios(false)
    }
  }

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
        const surchargeInfo = await getSurchargeInfo(
          slot.startTime,
          slot.endTime,
        )
        surchargeMap.set(slot.id, surchargeInfo)
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

  const validateCustomSlot = () => {
    const errors: string[] = []

    if (!customSlotData.studioId) {
      errors.push("Studio is required")
    }

    if (
      !customSlotData.customerName ||
      customSlotData.customerName.trim() === ""
    ) {
      errors.push("Your name is required")
    }

    if (
      !customSlotData.customerEmail ||
      customSlotData.customerEmail.trim() === ""
    ) {
      errors.push("Email is required")
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customSlotData.customerEmail)
    ) {
      errors.push("Please enter a valid email address")
    }

    if (!customSlotData.date) {
      errors.push("Date is required")
    } else {
      const selectedDate = new Date(customSlotData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      selectedDate.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        errors.push("Please select a future date")
      }
    }

    if (!customSlotData.startTime) {
      errors.push("Start time is required")
    }

    if (!customSlotData.endTime) {
      errors.push("End time is required")
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
        errors.push("End time must be after start time")
      }

      const duration = endMinutesTotal - startMinutesTotal
      if (duration < 30) {
        errors.push("Minimum slot duration is 30 minutes")
      } else if (duration > 480) {
        errors.push("Maximum slot duration is 8 hours")
      }
    }

    return errors
  }

  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields(new Set([...touchedFields, fieldName]))
  }

  const handleCustomSlotSubmit = async () => {
    const errors = validateCustomSlot()

    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors([])
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/slot-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioId: customSlotData.studioId,
          date: customSlotData.date,
          startTime: customSlotData.startTime,
          endTime: customSlotData.endTime,
          customerName: customSlotData.customerName.trim(),
          customerEmail: customSlotData.customerEmail.trim(),
          customerPhone: customSlotData.customerPhone
            ? customSlotData.customerPhone.trim()
            : "",
          notes: customSlotData.notes,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setCustomSlotSuccess(true)
        setIsCustomSlotModalOpen(false)
        setCustomSlotData({
          studioId: studioId || "",
          date: format(new Date(), "yyyy-MM-dd"),
          startTime: "",
          endTime: "",
          notes: "",
          customerName: "",
          customerEmail: "",
          customerPhone: "",
        })
        setValidationErrors([])
        setTouchedFields(new Set())
      } else {
        setValidationErrors([
          result.error || "Failed to submit custom slot request",
        ])
      }
    } catch (err) {
      console.error("Failed to submit custom slot request:", err)
      setValidationErrors([
        "Failed to submit custom slot request. Please try again.",
      ])
    } finally {
      setIsSubmitting(false)
    }
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

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-6 p-3 md:p-4 bg-red-500/10 border border-red-500/30 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3"
        >
          <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm md:text-base text-red-400">{error}</p>
        </motion.div>
      )}

      {/* Date Selector */}
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

      {/* Time Slots */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">
          Slot Tersedia -{" "}
          {format(selectedDate, "EEEE, d MMMM yyyy", { locale: localeId })}
        </h3>

        {loading ? (
          <div className="flex items-center justify-center h-28 md:h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4920E5]"></div>
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="text-center py-10 md:py-12 bg-white/5 rounded-2xl border border-white/10">
            <Calendar className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-2 md:mb-3" />
            <p className="text-sm md:text-base text-gray-400 mb-2">
              Tidak ada slot tersedia untuk tanggal ini
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              Coba pilih tanggal lain atau hubungi kami untuk informasi lebih
              lanjut
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
                  className={`relative p-4 rounded-[20px] border-2 transition-all ${
                    isSelected
                      ? "border-[#4920E5] bg-[#4920E5]/20 shadow-lg scale-105"
                      : !isAvailable
                        ? "border-white/10 bg-white/5 cursor-not-allowed opacity-50"
                        : `${getSlotBorderColor(slot.id)} hover:border-[#4920E5]/50 hover:shadow-md ${getSlotBackgroundColor(slot.id, isSelected, isAvailable)}`
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#4920E5] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {surchargeInfo?.hasSurcharge && !isSelected && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      +Rp {surchargeInfo.amount.toLocaleString("id-ID")}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    <Clock
                      className={`w-4 h-4 ${isAvailable ? "text-[#4920E5]" : "text-gray-500"}`}
                    />
                    <span
                      className={`font-semibold ${isAvailable ? "text-white" : "text-gray-500"}`}
                    >
                      {formatTime(slot.startTime)}
                    </span>
                  </div>

                  <div
                    className={`text-sm ${isAvailable ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </div>

                  {surchargeInfo?.hasSurcharge && (
                    <div className="mt-2 text-xs text-orange-400 font-medium">
                      {surchargeInfo.description}
                    </div>
                  )}

                  {!isAvailable && (
                    <div className="mt-2 text-xs text-red-400 font-medium">
                      Sudah Dibooking
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>

      {/* Info Box */}
      {availableSlots.length > 0 && (
        <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl md:rounded-2xl">
          <div className="flex items-start gap-2 md:gap-3">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs md:text-sm font-medium text-blue-300 mb-1">
                {availableSlots.length} slot tersedia
              </p>
              <p className="text-xs text-blue-400">
                Pilih salah satu slot di atas untuk melanjutkan ke langkah
                berikutnya
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Surcharge Info Box */}
      <div className="mb-4 md:mb-6 p-3 md:p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl md:rounded-2xl">
        <div className="flex items-start gap-2 md:gap-3">
          <Info className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs md:text-sm font-medium text-yellow-300 mb-2">
              Informasi Biaya Tambahan
            </p>
            <ul className="text-xs text-yellow-400 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>07:00 - 21:00: Harga normal</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span>21:00 - 01:00: +Rp 15.000/jam</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>01:00 - 07:00: +Rp 20.000/jam</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* No Slots Available - Request Custom Slot */}
      {availableSlots.length === 0 && !loading && (
        <div className="mb-6">
          <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/10 mb-4">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">
              Tidak ada slot tersedia untuk tanggal ini
            </p>
            <button
              onClick={() => {
                setCustomSlotData((prev) => ({
                  ...prev,
                  studioId: studioId || "",
                }))
                setIsCustomSlotModalOpen(true)
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4920E5] text-white rounded-[20px] font-semibold hover:bg-[#5B2CE8] transition-all shadow-lg hover:shadow-[0_10px_20px_0_#4920E5]"
            >
              <Plus className="w-5 h-5" />
              Request Custom Slot
            </button>
          </div>
        </div>
      )}

      {/* Custom Slot Request Success */}
      {customSlotSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-3"
        >
          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-300">
              Custom slot request submitted!
            </p>
            <p className="text-xs text-green-400">
              We'll review your request and get back to you soon.
            </p>
          </div>
        </motion.div>
      )}

      {/* Custom Slot Request Modal */}
      {isCustomSlotModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0B0B1B] rounded-2xl p-6 max-w-md w-full border border-white/10 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Request Custom Slot
            </h3>
            <p className="text-gray-400 mb-6">
              Request a custom time slot for your live streaming session
            </p>

            {validationErrors.length > 0 && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-300 mb-2">
                      Please fix the following errors:
                    </p>
                    <ul className="text-sm text-red-400 space-y-1 list-disc list-inside">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Studio <span className="text-red-400">*</span>
                </label>
                <select
                  value={customSlotData.studioId}
                  onChange={(e) =>
                    setCustomSlotData({
                      ...customSlotData,
                      studioId: e.target.value,
                    })
                  }
                  onBlur={() => handleFieldBlur("studioId")}
                  disabled={loadingStudios}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-[#4920E5] focus:outline-none appearance-none cursor-pointer ${
                    touchedFields.has("studioId") && !customSlotData.studioId
                      ? "border-red-500"
                      : "border-white/10"
                  } bg-white/5 text-white`}
                  style={{
                    backgroundImage: loadingStudios
                      ? "none"
                      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  {loadingStudios ? (
                    <option value="">Loading studios...</option>
                  ) : (
                    <>
                      <option value="">Select Studio</option>
                      {studios.map((studio) => (
                        <option
                          key={studio.id}
                          value={studio.id}
                          className="bg-[#1a1a2e] text-white"
                        >
                          {studio.name} - {studio.location}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={customSlotData.customerName}
                  onChange={(e) =>
                    setCustomSlotData({
                      ...customSlotData,
                      customerName: e.target.value,
                    })
                  }
                  onBlur={() => handleFieldBlur("customerName")}
                  className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border focus:ring-2 focus:ring-[#4920E5] focus:outline-none text-white ${
                    touchedFields.has("customerName") &&
                    !customSlotData.customerName.trim()
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={customSlotData.customerEmail}
                  onChange={(e) =>
                    setCustomSlotData({
                      ...customSlotData,
                      customerEmail: e.target.value,
                    })
                  }
                  onBlur={() => handleFieldBlur("customerEmail")}
                  className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border focus:ring-2 focus:ring-[#4920E5] focus:outline-none text-white ${
                    touchedFields.has("customerEmail") &&
                    (!customSlotData.customerEmail.trim() ||
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        customSlotData.customerEmail,
                      ))
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={customSlotData.customerPhone}
                  onChange={(e) =>
                    setCustomSlotData({
                      ...customSlotData,
                      customerPhone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none"
                  placeholder="+62 812 3456 7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={customSlotData.date}
                  onChange={(e) => {
                    setCustomSlotData({
                      ...customSlotData,
                      date: e.target.value,
                    })
                    handleFieldBlur("date")
                  }}
                  min={format(new Date(), "yyyy-MM-dd")}
                  className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border focus:ring-2 focus:ring-[#4920E5] focus:outline-none text-white ${
                    touchedFields.has("date") && !customSlotData.date
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Time <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    value={customSlotData.startTime}
                    onChange={(e) =>
                      setCustomSlotData({
                        ...customSlotData,
                        startTime: e.target.value,
                      })
                    }
                    onBlur={() => handleFieldBlur("startTime")}
                    className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border focus:ring-2 focus:ring-[#4920E5] focus:outline-none text-white ${
                      touchedFields.has("startTime") &&
                      !customSlotData.startTime
                        ? "border-red-500"
                        : "border-white/10"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Time <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    value={customSlotData.endTime}
                    onChange={(e) =>
                      setCustomSlotData({
                        ...customSlotData,
                        endTime: e.target.value,
                      })
                    }
                    onBlur={() => handleFieldBlur("endTime")}
                    className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border focus:ring-2 focus:ring-[#4920E5] focus:outline-none text-white ${
                      touchedFields.has("endTime") && !customSlotData.endTime
                        ? "border-red-500"
                        : "border-white/10"
                    }`}
                  />
                </div>
              </div>

              {customSlotData.startTime && customSlotData.endTime && (
                <div className="text-sm text-gray-400">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Duration:{" "}
                  {(() => {
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
                    return `${hours}h ${minutes}m`
                  })()}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={customSlotData.notes}
                  onChange={(e) =>
                    setCustomSlotData({
                      ...customSlotData,
                      notes: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none resize-none"
                  placeholder="Any special requirements..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setIsCustomSlotModalOpen(false)
                  setCustomSlotData({
                    studioId: studioId || "",
                    date: format(new Date(), "yyyy-MM-dd"),
                    startTime: "",
                    endTime: "",
                    notes: "",
                    customerName: "",
                    customerEmail: "",
                    customerPhone: "",
                  })
                  setValidationErrors([])
                  setTouchedFields(new Set())
                }}
                disabled={isSubmitting}
                className="px-6 py-2.5 border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSlotSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#4920E5] text-white rounded-xl font-semibold hover:bg-[#5B2CE8] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
