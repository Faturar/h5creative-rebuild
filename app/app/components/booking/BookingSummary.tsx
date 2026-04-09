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
import { calculateTotalPrice, TimeSlot } from "@/lib/pricing"

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
    if (
      bookingData.deviceType &&
      bookingData.totalHours &&
      bookingData.timeSlots
    ) {
      calculatePricing()
    }
  }, [bookingData.deviceType, bookingData.totalHours, bookingData.timeSlots])

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

    try {
      const breakdown = await calculateTotalPrice(
        bookingData.deviceType,
        bookingData.totalHours,
        bookingData.timeSlots || [],
      )
      setPricingBreakdown(breakdown)
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

  const totalPrice =
    pricingBreakdown?.finalPrice ||
    (packageData ? packageData.promoPrice || packageData.price : 0)

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
      className="hidden 2xl:block bg-white/5 backdrop-blur-sm rounded-[30px] p-4 md:p-6 border border-white/10"
    >
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
        Ringkasan
      </h3>

      <div className="space-y-3 md:space-y-4">
        {bookingData.deviceType && (
          <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-purple-500/20 rounded-2xl border border-purple-500/30">
            <Video className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-white">
                Perangkat
              </p>
              <p className="text-xs md:text-sm text-gray-300">
                {bookingData.deviceType === "Camera+OBS"
                  ? "Camera + OBS"
                  : bookingData.deviceType}
              </p>
            </div>
          </div>
        )}
        {packageData && (
          <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-[#4920E5]/20 rounded-2xl border border-[#4920E5]/30">
            <Package className="w-4 h-4 md:w-5 md:h-5 text-[#4920E5] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-white">
                {packageData.name}
              </p>
              <p className="text-xs md:text-sm text-[#4920E5] font-semibold">
                {formatPrice(totalPrice)}
              </p>
            </div>
          </div>
        )}
        {hostData && (
          <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-blue-500/20 rounded-2xl border border-blue-500/30">
            <User className="w-4 h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-white">Host</p>
              <p className="text-xs md:text-sm text-gray-300">
                {hostData.name}
              </p>
            </div>
          </div>
        )}
        {studioData && (
          <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-[#12BB74]/20 rounded-2xl border border-[#12BB74]/30">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#12BB74] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-white">
                Studio
              </p>
              <p className="text-xs md:text-sm text-gray-300">
                {studioData.name}
              </p>
              <p className="text-xs text-gray-400">{studioData.location}</p>
            </div>
          </div>
        )}
        {bookingData.date && bookingData.startTime && bookingData.endTime && (
          <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-orange-500/20 rounded-2xl border border-orange-500/30">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-white">
                Jadwal
              </p>
              <p className="text-xs md:text-sm text-gray-300">
                {new Date(bookingData.date).toLocaleDateString("id-ID", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <div className="flex items-center gap-0.5 md:gap-1 mt-0.5 md:mt-1">
                <Clock className="w-2.5 h-2.5 md:w-3 md:h-3 text-orange-400" />
                <p className="text-xs md:text-sm text-gray-300">
                  {bookingData.startTime} - {bookingData.endTime}
                </p>
              </div>
            </div>
          </div>
        )}
        {totalPrice > 0 && (
          <>
            {/* Pricing Breakdown */}
            {pricingBreakdown && (
              <div className="pt-3 md:pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-[#4920E5]" />
                  <span className="font-semibold text-white">
                    Rincian Harga
                  </span>
                </div>

                {/* Base Price */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Harga dasar:</span>
                    <span className="text-white font-medium">
                      {formatPrice(pricingBreakdown.basePrice)}
                    </span>
                  </div>

                  {/* Pricing Tier Info */}
                  {pricingBreakdown.pricingTier && (
                    <div className="flex justify-between text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <TrendingDown className="w-3 h-3 text-[#12BB74]" />
                        Harga per jam:
                      </span>
                      <span className="text-[#12BB74] font-medium">
                        {formatPrice(pricingBreakdown.pricingTier.pricePerHour)}
                      </span>
                    </div>
                  )}

                  {/* Total Hours */}
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Total jam:</span>
                    <span className="text-white font-medium">
                      {pricingBreakdown.totalHours} jam
                    </span>
                  </div>

                  {/* Surcharges */}
                  {pricingBreakdown.surcharges &&
                    pricingBreakdown.surcharges.length > 0 && (
                      <div className="pt-2 border-t border-white/10">
                        <div className="flex items-center gap-1 mb-2">
                          <AlertCircle className="w-3 h-3 text-orange-400" />
                          <span className="text-xs font-medium text-orange-400">
                            Biaya tambahan waktu
                          </span>
                        </div>
                        {pricingBreakdown.surcharges.map(
                          (surcharge: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between text-xs text-gray-400 mb-1"
                            >
                              <span>{surcharge.timeSlot}</span>
                              <span className="text-orange-400">
                                +{formatPrice(surcharge.amount)}
                              </span>
                            </div>
                          ),
                        )}
                        <div className="flex justify-between text-sm text-orange-400 mt-2">
                          <span>Total biaya tambahan:</span>
                          <span className="font-medium">
                            +{formatPrice(pricingBreakdown.totalSurcharge)}
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                {/* Savings Info */}
                {pricingBreakdown.pricingTier &&
                  pricingBreakdown.pricingTier.minHours > 0 && (
                    <div className="p-3 bg-[#12BB74]/10 border border-[#12BB74]/30 rounded-xl mb-3">
                      <div className="flex items-start gap-2">
                        <TrendingDown className="w-4 h-4 text-[#12BB74] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-[#12BB74] mb-1">
                            Hemat dengan tier pricing
                          </p>
                          <p className="text-xs text-[#12BB74]/80">
                            Anda mendapatkan harga{" "}
                            {formatPrice(
                              pricingBreakdown.pricingTier.pricePerHour,
                            )}
                            /jam untuk pembelian {pricingBreakdown.totalHours}{" "}
                            jam
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            )}

            {/* Total */}
            <div className="pt-3 md:pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-[#4920E5]" />
                  <span className="font-semibold text-white">Total</span>
                </div>
                <span className="text-xl md:text-2xl font-bold text-[#4920E5]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
