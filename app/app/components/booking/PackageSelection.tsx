"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Check, Sparkles, Tag } from "lucide-react"

interface Package {
  id: string
  name: string
  description: string
  price: number
  promoPrice: number | null
  durationMinutes: number
  platform: string
  includesHost: boolean
  includesStudio: boolean
  includesDevice: boolean
}

interface PackageSelectionProps {
  selectedPackageId: string | null
  onSelect: (packageId: string) => void
  onNext: () => void
}

export default function PackageSelection({
  selectedPackageId,
  onSelect,
  onNext,
}: PackageSelectionProps) {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages")
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0 && mins > 0) {
      return `${hours} jam ${mins} menit`
    } else if (hours > 0) {
      return `${hours} jam`
    }
    return `${mins} menit`
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Pilih Paket Live Streaming
        </h2>
        <p className="text-gray-400">
          Pilih paket yang sesuai dengan kebutuhan bisnis Anda
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
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

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  {isSelected && (
                    <div className="w-8 h-8 bg-[#4920E5] rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#4920E5] font-semibold mb-2">
                  <Sparkles className="w-4 h-4" />
                  {pkg.platform}
                </div>
              </div>

              <div className="mb-4">
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

              <p className="text-gray-300 text-sm mb-4 min-h-[60px]">
                {pkg.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-[#4920E5]" />
                  <span>{formatDuration(pkg.durationMinutes)}</span>
                </div>
                {pkg.includesHost && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#12BB74]" />
                    <span>Termasuk Host Profesional</span>
                  </div>
                )}
                {pkg.includesStudio && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#12BB74]" />
                    <span>Termasuk Studio</span>
                  </div>
                )}
                {pkg.includesDevice && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#12BB74]" />
                    <span>Termasuk Peralatan</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedPackageId}
          className="px-8 py-3 bg-[#4920E5] text-white rounded-[20px] font-semibold hover:bg-[#5B2CE8] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_10px_20px_0_#4920E5]"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  )
}
