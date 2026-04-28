"use client"

import { useState } from "react"
import { motion, Easing } from "framer-motion"
import { Check, Crown, Sparkles, Zap, ChevronRight } from "lucide-react"
import Link from "next/link"
import {
  liveStreamingPackages,
  cameraEquipment,
} from "@/app/constants/packages"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function PricingPackagesSection() {
  const [activeType, setActiveType] = useState<"iphone" | "camera">("iphone")
  const packages =
    activeType === "iphone"
      ? liveStreamingPackages.iphone
      : liveStreamingPackages.camera || []
  console.log('activeType:', activeType)
  console.log('packages:', packages)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-[#0B0B1B] relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">
              PILIH PAKET YANG PAS BUAT KAMU
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Paket Harga
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Transparan, jelas, tanpa biaya tersembunyi
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          <button
            onClick={() => {
              console.log('Setting activeType to iphone')
              setActiveType("iphone")
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeType === "iphone"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
            }`}
          >
            iPhone
          </button>
          <button
            onClick={() => {
              console.log('Setting activeType to camera')
              setActiveType("camera")
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeType === "camera"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
            }`}
          >
            OBS Sistem
          </button>
        </motion.div>

        <div key={activeType} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => {
              const discount = Math.round(
                ((pkg.price - pkg.promoPrice) / pkg.price) * 100,
              )
              const hoursPerDay = pkg.totalHours / pkg.numberOfDays

              return (
                <motion.div
                  key={pkg.id}
                  variants={itemVariants}
                  className={`relative group overflow-hidden rounded-2xl transition-all duration-500 ${
                    pkg.isPopular
                      ? "bg-gradient-to-b from-purple-600/20 to-blue-600/20 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20"
                      : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10"
                  }`}
                  whileHover={{ y: -8 }}
                >
                  {pkg.isPopular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 p-1">
                      <div className="flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-bold text-yellow-400">
                          MOST POPULAR
                        </span>
                      </div>
                    </div>
                  )}

                  <div className={`p-6 ${pkg.isPopular ? "pt-12" : ""}`}>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {pkg.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Zap className="w-3 h-3 text-purple-400" />
                          <span>
                            {hoursPerDay} jam/hari • {pkg.numberOfDays} hari
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          pkg.isPopular ? "bg-purple-500/20" : "bg-white/5"
                        }`}
                      >
                        <Crown
                          className={`w-6 h-6 ${pkg.isPopular ? "text-yellow-400" : "text-gray-500"}`}
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                          {formatPrice(pkg.promoPrice)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(pkg.price)}
                        </span>
                        {discount > 0 && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-semibold">
                            -{discount}%
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                        <span>{pkg.hostCount} Host Profesional</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                        <span>{pkg.totalHours} Jam Live</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                        <span>
                          {pkg.workTimeStart} - {pkg.workTimeEnd}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                        <span>{pkg.workDays}</span>
                      </div>
                      {pkg.twibbonDesignCount > 0 && (
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-purple-400" />
                          </div>
                          <span>{pkg.twibbonDesignCount} Twibbon Design</span>
                        </div>
                      )}
                      {pkg.weeklyReport && (
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-purple-400" />
                          </div>
                          <span>Weekly Live Report</span>
                        </div>
                      )}
                    </div>

                    <Link
                      href="/booking"
                      className={`group/btn relative w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
                        pkg.isPopular
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02]"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <span>Book Sekarang</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
      </div>
    </motion.section>
  )
}
