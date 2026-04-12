"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Clock,
  Check,
  Sparkles,
  Tag,
  Calendar,
  Video,
  FileText,
  Users,
  Sliders,
  Package as PackageIcon,
} from "lucide-react"
import PackageStats from "@/app/components/service/PackageStats"

interface Package {
  id: string
  name: string
  packageType: string
  description: string
  price: number
  promoPrice: number | null
  totalHours: number
  numberOfDays: number
  durationPerSession: number
  workTimeStart: string
  workTimeEnd: string
  workDays: string
  hostCount: number
  twibbonDesignCount: number
  weeklyReport: boolean
  accountReport: boolean
  includesHost: boolean
  includesStudio: boolean
  includesDevice: boolean
  bookingType: string
  tieredPrice: boolean
}

interface PackageSelectionProps {
  deviceType: string | null
  selectedPackageId: string | null
  onSelect: (packageId: string) => void
  onBookingTypeChange?: (bookingType: "custom" | "package") => void
  onCustomHoursChange?: (hours: number) => void
  onCustomDaysChange?: (days: number) => void
  onHoursPerDayChange?: (hours: number) => void
  onValidationChange?: (isValid: boolean) => void
}

type BookingType = "custom" | "package"

export default function PackageSelection({
  deviceType,
  selectedPackageId,
  onSelect,
  onBookingTypeChange,
  onCustomHoursChange,
  onCustomDaysChange,
  onHoursPerDayChange,
  onValidationChange,
}: PackageSelectionProps) {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingType, setBookingType] = useState<BookingType>("package")
  const [customHours, setCustomHours] = useState<number>(28)
  const [customDays, setCustomDays] = useState<number>(14)
  const [hoursPerDay, setHoursPerDay] = useState<number>(2)
  const [pricingBreakdown, setPricingBreakdown] = useState<{
    finalPrice: number
    pricingTier: { pricePerHour: number } | null
  } | null>(null)
  const [loadingPricing, setLoadingPricing] = useState(false)

  const validateCustomBooking = () => {
    if (customDays < 6) {
      return { valid: false, message: "Minimal pembelian untuk custom jam adalah 6 hari" }
    }
    if (customHours < 12) {
      return { valid: false, message: "Minimal 12 jam total untuk custom booking" }
    }
    return { valid: true, message: "" }
  }

  const validatePackageBooking = (pkg: Package) => {
    if (pkg.numberOfDays < 5) {
      return { valid: false, message: `Minimal pembelian untuk paket jam adalah 5 hari (paket ini ${pkg.numberOfDays} hari)` }
    }
    return { valid: true, message: "" }
  }

  const getValidationWarning = () => {
    if (bookingType === "custom") {
      const validation = validateCustomBooking()
      if (!validation.valid) {
        return validation.message
      }
    } else if (bookingType === "package" && selectedPackageId) {
      const selectedPackage = packages.find((p) => p.id === selectedPackageId)
      if (selectedPackage) {
        const validation = validatePackageBooking(selectedPackage)
        if (!validation.valid) {
          return validation.message
        }
      }
    }
    return null
  }

  useEffect(() => {
    fetchPackages()
  }, [deviceType, bookingType])

  useEffect(() => {
    if (bookingType === "custom" && customHours > 0 && deviceType) {
      calculateCustomPricing()
    }
  }, [customHours, deviceType, bookingType])

  useEffect(() => {
    const validation = getValidationWarning()
    onValidationChange?.(validation === null)
  }, [bookingType, customHours, customDays, hoursPerDay, selectedPackageId, packages])

  const fetchPackages = async () => {
    try {
      const url = deviceType
        ? `/api/packages?packageType=${encodeURIComponent(deviceType)}&bookingType=${bookingType}`
        : `/api/packages?bookingType=${bookingType}`
      const response = await fetch(url)
      const result = await response.json()
      if (result.success) {
        setPackages(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch packages:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateCustomPricing = async () => {
    if (!deviceType) return

    setLoadingPricing(true)
    try {
      const response = await fetch("/api/pricing/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceType,
          totalHours: customHours,
          timeSlots: [], // Will be filled in time slot selection
        }),
      })

      const result = await response.json()
      if (result.success) {
        setPricingBreakdown(result.data)
        onCustomHoursChange?.(customHours)
      }
    } catch (error) {
      console.error("Failed to calculate pricing:", error)
    } finally {
      setLoadingPricing(false)
    }
  }

  const handleBookingTypeChange = (type: BookingType) => {
    setBookingType(type)
    onBookingTypeChange?.(type)
    setPackages([])
    setLoading(true)
  }

  const handleCustomHoursChange = (hours: number) => {
    setCustomHours(hours)
    // Calculate days based on hours per day
    const calculatedDays = hoursPerDay > 0 ? Math.ceil(hours / hoursPerDay) : 0
    setCustomDays(calculatedDays)
    onCustomHoursChange?.(hours)
    onCustomDaysChange?.(calculatedDays)
  }

  const handleHoursPerDayChange = (hours: number) => {
    setHoursPerDay(hours)
    // Recalculate days based on new hours per day
    const calculatedDays = hours > 0 ? Math.ceil(customHours / hours) : 0
    setCustomDays(calculatedDays)
    onHoursPerDayChange?.(hours)
    onCustomDaysChange?.(calculatedDays)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4920E5]"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Pilih Paket Live Streaming
        </h2>
        <p className="text-sm md:text-base text-gray-400">
          {deviceType
            ? `Paket untuk ${deviceType === "Camera+OBS" ? "Camera + OBS" : deviceType}`
            : "Pilih paket yang sesuai dengan kebutuhan bisnis Anda"}
        </p>
      </div>

      {/* Booking Type Tabs */}
      <div className="flex justify-center mb-6 md:mb-8">
        <div className="bg-white/5 rounded-full p-1 flex gap-1">
          <button
            onClick={() => handleBookingTypeChange("package")}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all ${
              bookingType === "package"
                ? "bg-[#4920E5] text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <PackageIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-medium">Paket Jam</span>
          </button>
          <button
            onClick={() => handleBookingTypeChange("custom")}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all ${
              bookingType === "custom"
                ? "bg-[#4920E5] text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Sliders className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-medium">Custom Jam</span>
          </button>
        </div>
      </div>

      {bookingType === "package" && (
        <div className="mb-6 p-4 bg-[#4920E5]/10 border-2 border-[#4920E5]/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#4920E5] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-base md:text-lg font-bold text-white mb-1">
                Minimal pembelian untuk Paket Jam
              </p>
              <p className="text-sm md:text-base text-gray-300">
                Minimal pembelian 5 hari untuk paket jam tersedia untuk dipilih. Paket dengan durasi kurang dari 5 hari tidak dapat dipilih.
              </p>
            </div>
          </div>
        </div>
      )}

      {bookingType === "custom" && (
        <div className="mb-6 p-4 bg-[#4920E5]/10 border-2 border-[#4920E5]/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#4920E5] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-base md:text-lg font-bold text-white mb-1">
                Minimal pembelian untuk Custom Jam
              </p>
              <p className="text-sm md:text-base text-gray-300">
                Minimal pembelian 6 hari dengan minimal 12 jam total untuk custom booking.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom Hours Section */}
      {bookingType === "custom" && (
        <div className="mb-6 md:mb-8 p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">
            Tentukan Jam Live Streaming
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                Total Jam
              </label>
              <input
                type="number"
                min="12"
                max="500"
                value={customHours}
                onChange={(e) =>
                  handleCustomHoursChange(parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
              />
              <p className="text-xs md:text-sm text-gray-400 mt-2">
                Minimal 12 jam
              </p>
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                Jam per Hari
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={hoursPerDay}
                onChange={(e) =>
                  handleHoursPerDayChange(parseInt(e.target.value) || 1)
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
              />
              <p className="text-xs md:text-sm text-gray-400 mt-2">
                Maksimal 12 jam/hari
              </p>
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                Estimasi Hari
              </label>
              <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-lg font-semibold">
                {customDays} hari
              </div>
              <p className="text-xs md:text-sm text-gray-400 mt-2">
                {customHours} jam ÷ {hoursPerDay} jam/hari
              </p>
            </div>
          </div>

          {!validateCustomBooking().valid && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-sm text-red-400">
                {validateCustomBooking().message}
              </p>
            </div>
          )}

          {pricingBreakdown && (
            <div className="mt-4 p-4 bg-[#4920E5]/10 border border-[#4920E5]/30 rounded-xl">
              <h4 className="text-sm md:text-base font-semibold text-white mb-2">
                Estimasi Harga
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Harga per jam:</span>
                  <span className="text-white font-medium">
                    {pricingBreakdown.pricingTier
                      ? `Rp ${pricingBreakdown.pricingTier.pricePerHour.toLocaleString("id-ID")}`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Total jam:</span>
                  <span className="text-white font-medium">
                    {customHours} jam
                  </span>
                </div>
                <div className="flex justify-between text-base text-white font-bold mt-2 pt-2 border-t border-white/20">
                  <span>Estimasi Total:</span>
                  <span className="text-[#12BB74]">
                    Rp {pricingBreakdown.finalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Package Selection */}
      {bookingType === "package" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {packages.map((pkg, index) => {
            const isSelected = selectedPackageId === pkg.id
            const displayPrice = pkg.promoPrice || pkg.price
            const hasPromo = pkg.promoPrice !== null
            const validation = validatePackageBooking(pkg)
            const isValid = validation.valid

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => isValid && onSelect(pkg.id)}
                className={`relative p-6 rounded-[30px] border-2 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#4920E5] bg-[#4920E5]/20 shadow-lg scale-105"
                    : !isValid
                      ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
                      : "border-white/10 bg-white/5 hover:border-[#4920E5]/50 hover:shadow-md hover:bg-white/10"
                }`}
              >
                {hasPromo && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-md">
                    <Tag className="w-3 h-3" />
                    Promo
                  </div>
                )}

                <div className="mb-3 md:mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {pkg.name}
                    </h3>
                    {isSelected && (
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-[#4920E5] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-2 text-xs md:text-sm font-semibold mb-2 ${
                      pkg.packageType === "Camera+OBS"
                        ? "text-[#FF6B35]"
                        : "text-[#4920E5]"
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">
                      {pkg.packageType === "Camera+OBS"
                        ? "Camera + OBS"
                        : "iPhone"}
                    </span>
                    <span className="sm:hidden">
                      {pkg.packageType === "Camera+OBS"
                        ? "Camera+OBS"
                        : "iPhone"}
                    </span>
                  </div>
                </div>

                <div className="mb-3 md:mb-4">
                  {hasPromo ? (
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-[#12BB74]">
                        {formatPrice(displayPrice)}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(pkg.price)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-white">
                      {formatPrice(displayPrice)}
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4 min-h-[60px]">
                  {pkg.description}
                </p>

                <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                  <PackageStats
                    totalHours={pkg.totalHours}
                    hosts={pkg.hostCount}
                    days={pkg.numberOfDays}
                  />
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4 text-[#4920E5]" />
                    <span>{pkg.durationPerSession} Jam per sesi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4 text-[#4920E5]" />
                    <span>
                      {pkg.workTimeStart} - {pkg.workTimeEnd}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4 text-[#4920E5]" />
                    <span>{pkg.workDays}</span>
                  </div>
                  {pkg.twibbonDesignCount > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Sparkles className="w-4 h-4 text-[#12BB74]" />
                      <span>{pkg.twibbonDesignCount} Twibbon Design</span>
                    </div>
                  )}
                  {pkg.weeklyReport && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FileText className="w-4 h-4 text-[#12BB74]" />
                      <span>Weekly Report</span>
                    </div>
                  )}
                  {pkg.accountReport && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FileText className="w-4 h-4 text-[#12BB74]" />
                      <span>Account Report</span>
                    </div>
                  )}
                </div>
                {!isValid && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    {validation.message}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
