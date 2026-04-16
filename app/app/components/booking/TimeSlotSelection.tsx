"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Check,
  Clock,
  AlertCircle,
  DollarSign,
  Info,
} from "lucide-react"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"

interface TimeSlotSelectionProps {
  studioId: string | null
  onSelect: (
    slotId: string | null,
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
  onSelect,
  customerName = "",
  customerEmail = "",
  customerPhone = "",
  deviceType,
  totalHours,
}: TimeSlotSelectionProps) {
  const [selectionMode] = useState<"custom">("custom")
  const [customSlotData, setCustomSlotData] = useState({
    studioId: studioId || "",
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
    if (customSlotData.startTime && customSlotData.endTime) {
      fetchCustomSurcharge()
    }
  }, [customSlotData.startTime, customSlotData.endTime])

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

  const validateCustomTime = () => {
    const errors: string[] = []

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
      format(new Date(), "yyyy-MM-dd"),
      customSlotData.startTime,
      customSlotData.endTime,
    )
  }

  const handleCustomTimeChange = (
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setCustomSlotData((prev) => ({ ...prev, [field]: value }))
    setTouchedFields(new Set([...touchedFields, field]))
    setValidationErrors([])
  }

  if (!studioId) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-400">Silakan pilih studio terlebih dahulu</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Pilih Waktu Live Streaming
        </h2>
        <p className="text-sm md:text-base text-gray-400">
          Pilih jam live streaming untuk hari ini
        </p>
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
            <Clock className="w-5 h-5 md:w-6 md:h-6  text-white" />
            Tentukan Waktu Live Streaming untuk Hari Ini
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm md:text-base font-semibold text-white mb-2">
                Jam Mulai
              </label>
              <input
                type="time"
                value={customSlotData.startTime}
                onChange={(e) =>
                  handleCustomTimeChange("startTime", e.target.value)
                }
                className="time-white w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#4920E5] focus:border-[#4920E5] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base font-semibold text-white mb-2">
                Jam Selesai
              </label>
              <input
                type="time"
                value={customSlotData.endTime}
                onChange={(e) =>
                  handleCustomTimeChange("endTime", e.target.value)
                }
                className="time-white w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#4920E5] focus:border-[#4920E5] transition-all"
              />
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
                endHours * 60 + endMinutes - (startHours * 60 + startMinutes)
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
                    <span className="font-medium">
                      07:00 - 21:00: Harga normal
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <span className="font-medium">
                      21:00 - 01:00: +Rp 15.000/jam
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"></div>
                    <span className="font-medium">
                      01:00 - 07:00: +Rp 20.000/jam
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
