"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Clock, AlertCircle, Info, DollarSign } from "lucide-react"
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
  durationPerSession?: number | null
  hoursPerDay?: number | null
  bookingType?: string | null
}

export default function TimeSlotSelection({
  studioId,
  onSelect,
  customerName = "",
  customerEmail = "",
  customerPhone = "",
  deviceType,
  totalHours,
  durationPerSession,
  hoursPerDay,
  bookingType,
}: TimeSlotSelectionProps) {
  const [selectionMode] = useState<"custom">("custom")
  const [customSlotData, setCustomSlotData] = useState({
    studioId: studioId || "",
    startTime: "",
    endTime: "",
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [pricingBreakdown, setPricingBreakdown] = useState<any>(null)
  const [selectedTime, setSelectedTime] = useState<{
    date: string
    startTime: string
    endTime: string
  } | null>(null)

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
      const durationHours = duration / 60

      if (duration < 30) {
        errors.push("Durasi minimal adalah 30 menit")
      } else if (duration > 480) {
        errors.push("Durasi maksimal adalah 8 jam per sesi")
      }

      const requiredHours =
        bookingType === "package" ? durationPerSession : hoursPerDay

      if (requiredHours && durationHours !== requiredHours) {
        errors.push(
          `Durasi harus sama dengan ${requiredHours} jam (jam per hari)`,
        )
      }
    }

    return errors
  }

  const calculatePricing = async (
    date: string,
    startTime: string,
    endTime: string,
  ) => {
    if (!deviceType || !totalHours) return

    try {
      const response = await fetch("/api/pricing/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceType,
          totalHours,
          timeSlots: [
            {
              date,
              startTime,
              endTime,
            },
          ],
        }),
      })

      const result = await response.json()
      if (result.success) {
        setPricingBreakdown(result.data)
      }
    } catch (error) {
      console.error("Error calculating pricing:", error)
    }
  }

  const handleCustomTimeSelect = () => {
    const errors = validateCustomTime()

    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors([])

    const selectedDate = format(new Date(), "yyyy-MM-dd")
    console.log("TimeSlotSelection - Selecting time:", {
      date: selectedDate,
      startTime: customSlotData.startTime,
      endTime: customSlotData.endTime,
    })

    setSelectedTime({
      date: selectedDate,
      startTime: customSlotData.startTime,
      endTime: customSlotData.endTime,
    })

    calculatePricing(
      selectedDate,
      customSlotData.startTime,
      customSlotData.endTime,
    )

    onSelect(
      null,
      selectedDate,
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

          {pricingBreakdown && selectedTime && (
            <div className="mt-4 p-4 bg-[#12BB74]/10 border-2 border-[#12BB74]/30 rounded-xl">
              <div className="flex items-start gap-2">
                <DollarSign className="w-5 h-5 text-[#12BB74] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-base font-bold text-[#12BB74] mb-2">
                    Estimasi Harga
                  </p>
                  <div className="space-y-1 text-sm">
                    {pricingBreakdown.pricingTier && (
                      <div className="flex justify-between text-gray-300">
                        <span>Harga dasar:</span>
                        <span className="text-white font-medium">
                          Rp {pricingBreakdown.tieredPrice.toLocaleString("id-ID")}
                        </span>
                      </div>
                    )}
                    {pricingBreakdown.totalSurcharge > 0 && (
                      <div className="flex justify-between text-gray-300">
                        <span>Biaya tambahan:</span>
                        <span className="text-white font-medium">
                          Rp {pricingBreakdown.totalSurcharge.toLocaleString("id-ID")}
                        </span>
                      </div>
                    )}
                    {pricingBreakdown.surcharges && pricingBreakdown.surcharges.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <p className="text-xs text-gray-400 mb-1">Detail biaya tambahan:</p>
                        {pricingBreakdown.surcharges.map((surcharge: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-xs text-gray-400">
                            <span>{surcharge.timeSlot} ({surcharge.reason})</span>
                            <span>+Rp {surcharge.amount.toLocaleString("id-ID")}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-white mt-2 pt-2 border-t border-white/20">
                      <span>Total:</span>
                      <span className="text-[#12BB74]">
                        Rp {pricingBreakdown.finalPrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 md:p-5 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl">
            <div className="flex items-start gap-2 md:gap-3">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-base md:text-lg font-bold text-blue-300 mb-3">
                  Informasi Waktu
                </p>
                <ul className="text-sm md:text-base text-blue-400 space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span className="font-medium">
                      Durasi harus sama dengan 2 jam
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="font-medium">
                      07:00 - 21:00: Normal price
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <span className="font-medium">
                      21:00 - 01:00: +Rp 15,000/jam
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"></div>
                    <span className="font-medium">
                      01:00 - 07:00: +Rp 20,000/jam
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
