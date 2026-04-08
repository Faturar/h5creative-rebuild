"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Check, Sparkles, Tag, Calendar, Video, FileText, Users } from "lucide-react"

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
}

interface PackageSelectionProps {
  deviceType: string | null
  selectedPackageId: string | null
  onSelect: (packageId: string) => void
  onNext: () => void
  onBack?: () => void
}

export default function PackageSelection({
  deviceType,
  selectedPackageId,
  onSelect,
  onNext,
  onBack,
}: PackageSelectionProps) {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [deviceType])

  const fetchPackages = async () => {
    try {
      const url = deviceType
        ? `/api/packages?packageType=${encodeURIComponent(deviceType)}`
        : "/api/packages"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {packages.map((pkg, index) => {
          const isSelected = selectedPackageId === pkg.id
          const displayPrice = pkg.promoPrice || pkg.price
          const hasPromo = pkg.promoPrice !== null

          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(pkg.id)}
              className={`relative p-6 rounded-[30px] border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-[#4920E5] bg-[#4920E5]/20 shadow-lg scale-105"
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
                  <h3 className="text-lg md:text-xl font-bold text-white">{pkg.name}</h3>
                  {isSelected && (
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#4920E5] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className={`flex items-center gap-2 text-xs md:text-sm font-semibold mb-2 ${
                  pkg.packageType === "Camera+OBS" ? "text-[#FF6B35]" : "text-[#4920E5]"
                }`}>
                  <Video className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">
                    {pkg.packageType === "Camera+OBS" ? "Camera + OBS" : "iPhone"}
                  </span>
                  <span className="sm:hidden">
                    {pkg.packageType === "Camera+OBS" ? "Camera+OBS" : "iPhone"}
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
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-[#4920E5]" />
                  <span>{pkg.totalHours} Jam / {pkg.numberOfDays} Hari</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="w-4 h-4 text-[#4920E5]" />
                  <span>{pkg.durationPerSession} Jam per sesi</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-[#4920E5]" />
                  <span>{pkg.workTimeStart} - {pkg.workTimeEnd}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="w-4 h-4 text-[#4920E5]" />
                  <span>{pkg.workDays}</span>
                </div>
                {pkg.hostCount > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Users className="w-4 h-4 text-[#12BB74]" />
                    <span>{pkg.hostCount} Host {pkg.hostCount > 1 ? "(1-2 Host)" : ""}</span>
                  </div>
                )}
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
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-white/10 text-white rounded-[20px] font-semibold hover:bg-white/20 transition-all border border-white/20"
          >
            Kembali
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!selectedPackageId}
          className={`px-6 md:px-8 py-2.5 md:py-3 bg-[#4920E5] text-white rounded-[20px] font-semibold hover:bg-[#5B2CE8] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_10px_20px_0_#4920E5] ${onBack ? "" : "ml-auto"}`}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  )
}
