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
  date: Date
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
  onNext: () => void
  onBack: () => void
}

export default function TimeSlotSelection({
  studioId,
  selectedSlotId,
  onSelect,
  onNext,
  onBack,
}: TimeSlotSelectionProps) {
  const [slots, setSlots] = useState<StudioSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<StudioSlot | null>(null)

  useEffect(() => {
    if (studioId) {
      fetchSlots()
    }
  }, [studioId, selectedDate])

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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Pilih Waktu Live Streaming
        </h2>
        <p className="text-gray-400">
          Pilih tanggal dan jam slot yang tersedia
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      {/* Date Selector */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => handleDateChange(-7)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            disabled={loading}
            aria-label="Minggu sebelumnya"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </button>
          <h3 className="text-lg font-semibold text-white">
            {format(selectedDate, "MMMM yyyy", { locale: localeId })}
          </h3>
          <button
            onClick={() => handleDateChange(7)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            disabled={loading}
            aria-label="Minggu berikutnya"
          >
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
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
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">
          Slot Tersedia -{" "}
          {format(selectedDate, "EEEE, d MMMM yyyy", { locale: localeId })}
        </h3>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4920E5]"></div>
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400 mb-2">
              Tidak ada slot tersedia untuk tanggal ini
            </p>
            <p className="text-sm text-gray-500">
              Coba pilih tanggal lain atau hubungi kami untuk informasi lebih
              lanjut
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map((slot) => {
              const isSelected = selectedSlotId === slot.id
              const isAvailable = !slot.isBooked

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
                        : "border-white/10 hover:border-[#4920E5]/50 hover:shadow-md hover:bg-white/10"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#4920E5] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
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
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-300 mb-1">
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

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={loading}
          className="px-8 py-3 border-2 border-white/20 text-white rounded-[20px] font-semibold hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          disabled={!selectedSlotId || loading}
          className="px-8 py-3 bg-[#4920E5] text-white rounded-[20px] font-semibold hover:bg-[#5B2CE8] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_10px_20px_0_#4920E5]"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  )
}
