"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  User,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  Video,
  DollarSign,
  Info,
  TrendingDown,
  AlertCircle,
} from "lucide-react"
import { TimeSlot } from "@/lib/pricing"
import PackageStats from "@/app/components/service/PackageStats"

interface BookingData {
  deviceType: string | null
  packageId: string | null
  hostId: string | null
  studioId: string | null
  studioSlotId: string | null
  date: string | null
  startTime: string | null
  endTime: string | null
  customerName: string
  customerPhone: string
  customerEmail: string
  businessName: string
  productCategory: string
  notes: string
  bookingId: string | null
  bookingCode: string | null
  totalHours?: number
  timeSlots?: TimeSlot[]
}

interface Package {
  id: string
  name: string
  price: number
  promoPrice: number | null
  totalHours: number
  numberOfDays: number
  bookingType: string
}

interface Host {
  id: string
  name: string
  photoUrl: string | null
}

interface Studio {
  id: string
  name: string
  location: string
}

export default function BookingSummary({
  bookingData,
}: {
  bookingData: BookingData
}) {
  const [packageData, setPackageData] = useState<Package | null>(null)
  const [hostData, setHostData] = useState<Host | null>(null)
  const [studioData, setStudioData] = useState<Studio | null>(null)
  const [pricingBreakdown, setPricingBreakdown] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [bookingData.packageId, bookingData.hostId, bookingData.studioId])

  useEffect(() => {
    console.log("BookingSummary useEffect triggered:", {
      packageId: bookingData.packageId,
      deviceType: bookingData.deviceType,
      totalHours: bookingData.totalHours,
      timeSlots: bookingData.timeSlots,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
    })

    if (
      !bookingData.packageId &&
      bookingData.deviceType &&
      bookingData.totalHours &&
      bookingData.timeSlots &&
      bookingData.timeSlots.length > 0 &&
      bookingData.timeSlots[0].startTime &&
      bookingData.timeSlots[0].endTime
    ) {
      calculatePricing()
    } else if (bookingData.packageId) {
      setPricingBreakdown(null)
    } else {
      setPricingBreakdown(null)
    }
  }, [
    bookingData.deviceType,
    bookingData.totalHours,
    bookingData.timeSlots,
    bookingData.packageId,
    bookingData.startTime,
    bookingData.endTime,
  ])

  const fetchData = async () => {
    if (
      !bookingData.packageId ||
      !bookingData.hostId ||
      !bookingData.studioId
    ) {
      setLoading(false)
      return
    }

    try {
      const [packagesRes, hostsRes, studiosRes] = await Promise.all([
        fetch("/api/packages"),
        fetch("/api/hosts"),
        fetch("/api/studios"),
      ])

      const [packagesResult, hostsResult, studiosResult] = await Promise.all([
        packagesRes.json(),
        hostsRes.json(),
        studiosRes.json(),
      ])

      if (packagesResult.success) {
        const pkg = packagesResult.data.find(
          (p: Package) => p.id === bookingData.packageId,
        )
        setPackageData(pkg || null)
      }

      if (hostsResult.success) {
        const host = hostsResult.data.find(
          (h: Host) => h.id === bookingData.hostId,
        )
        setHostData(host || null)
      }

      if (studiosResult.success) {
        const studio = studiosResult.data.find(
          (s: Studio) => s.id === bookingData.studioId,
        )
        setStudioData(studio || null)
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculatePricing = async () => {
    if (!bookingData.deviceType || !bookingData.totalHours) return

    const requestBody = {
      deviceType: bookingData.deviceType,
      totalHours: bookingData.totalHours,
      timeSlots: bookingData.timeSlots || [],
    }

    console.log("BookingSummary - Calculating pricing with:", requestBody)

    try {
      const res = await fetch("/api/pricing/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const result = await res.json()

      if (result.success) {
        console.log("BookingSummary - Pricing calculation result:", result.data)
        setPricingBreakdown(result.data)
      } else {
        console.error("Pricing calculation failed:", result.error)
      }
    } catch (error) {
      console.error("Error calculating pricing:", error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const totalPrice = packageData
    ? Number(packageData.promoPrice || packageData.price)
    : pricingBreakdown?.finalPrice || 0

  const hasData =
    bookingData.deviceType ||
    packageData ||
    hostData ||
    studioData ||
    bookingData.date

  if (!hasData) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-[30px] p-4 md:p-6 border border-white/10"
      suppressHydrationWarning
    >
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
        Ringkasan
      </h3>

      <div className="space-y-3 md:space-y-4">
        {bookingData.deviceType && (
          <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
            <Video className="w-5 h-5 md:w-6 md:h-6 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-400 font-medium">
                Perangkat
              </p>
              <p className="text-sm md:text-base font-semibold text-white">
                {bookingData.deviceType === "OBS Sistem"
                  ? "OBS Sistem"
                  : bookingData.deviceType}
              </p>
            </div>
          </div>
        )}

        {packageData && (
          <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-[#4920E5]/20 rounded-xl border border-[#4920E5]/30">
            <Package className="w-5 h-5 md:w-6 md:h-6 text-[#4920E5] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-400 font-medium">
                Paket
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-sm md:text-base font-semibold text-white">
                  {packageData.name}
                </p>
                <p className="text-sm md:text-base font-bold text-[#4920E5]">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </div>
          </div>
        )}

        {bookingData.date && bookingData.startTime && bookingData.endTime && (
          <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-orange-500/20 rounded-xl border border-orange-500/30">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-400 font-medium">
                Waktu Live
              </p>
              <div className="flex items-center gap-2 md:gap-3 mt-1">
                <p className="text-sm md:text-base font-semibold text-white">
                  {new Date(bookingData.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <Clock className="w-4 h-4 text-orange-400" />
                <p className="text-sm md:text-base font-semibold text-orange-400">
                  {bookingData.startTime} - {bookingData.endTime}
                </p>
              </div>
            </div>
          </div>
        )}

        {pricingBreakdown && !packageData && (
          <div className="p-3 md:p-4 bg-[#12BB74]/10 border-2 border-[#12BB74]/30 rounded-xl">
            <div className="flex items-start gap-2">
              <DollarSign className="w-5 h-5 text-[#12BB74] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm md:text-base font-bold text-[#12BB74] mb-2">
                  Total Harga
                </p>
                <div className="space-y-1 text-sm">
                  /{" "}
                  {pricingBreakdown.pricingTier && (
                    <div className="flex justify-between text-gray-300">
                      <span>Harga dasar:</span>
                      <span className="text-white font-medium">
                        {formatPrice(pricingBreakdown.tieredPrice)}
                      </span>
                    </div>
                  )}
                  {pricingBreakdown.totalSurcharge > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Biaya tambahan:</span>
                      <span className="text-white font-medium">
                        {formatPrice(pricingBreakdown.totalSurcharge)}
                      </span>
                    </div>
                  )}
                  {pricingBreakdown.surcharges.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <p className="text-xs text-gray-400 mb-1">
                        Detail biaya tambahan:
                      </p>
                      {pricingBreakdown.surcharges.map(
                        (surcharge: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex justify-between text-xs text-gray-400"
                          >
                            <span>
                              {surcharge.timeSlot} ({surcharge.reason})
                            </span>
                            <span>+{formatPrice(surcharge.amount)}</span>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white mt-2 pt-2 border-t border-white/20">
                    <span>Total:</span>
                    <span className="text-[#12BB74]">
                      / {formatPrice(pricingBreakdown.finalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
