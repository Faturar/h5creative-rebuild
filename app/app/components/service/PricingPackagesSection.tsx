"use client"

import { useState } from "react"
import { motion, Easing } from "framer-motion"
import { Check, Crown, Sparkles, Zap, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { liveStreamingPackages } from "@/app/constants/packages"

import "swiper/css"
import "swiper/css/pagination"

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
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

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-[#0B0B1B]">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">
              PILIH PAKET YANG PAS BUAT KAMU
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Paket Harga
          </h2>

          <p className="text-gray-400">
            Transparan, jelas, tanpa biaya tersembunyi
          </p>
        </div>

        {/* TOGGLE */}
        <div className="flex justify-center gap-4 mb-12">
          {["iphone", "camera"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                activeType === type
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-white/5 border border-white/10 text-gray-400"
              }`}
            >
              {type === "iphone" ? "iPhone" : "OBS Sistem"}
            </button>
          ))}
        </div>

        {/* ================= MOBILE (SWIPER) ================= */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1.15}
            spaceBetween={16}
            centeredSlides
            pagination={{ clickable: true }}
          >
            {packages.map((pkg) => (
              <SwiperSlide key={pkg.id}>
                <PricingCard pkg={pkg} formatPrice={formatPrice} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= DESKTOP (GRID) ================= */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {packages.map((pkg) => (
            <PricingCard key={pkg.id} pkg={pkg} formatPrice={formatPrice} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= CARD COMPONENT ================= */

function PricingCard({ pkg, formatPrice }: any) {
  const discount = Math.round(((pkg.price - pkg.promoPrice) / pkg.price) * 100)
  const hoursPerDay = pkg.totalHours / pkg.numberOfDays

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col h-full rounded-2xl p-6 transition ${
        pkg.isPopular
          ? "border-2 border-purple-500 bg-gradient-to-b from-purple-600/20 to-blue-600/20"
          : "border border-white/10 bg-white/5"
      }`}
    >
      {/* POPULAR */}
      {pkg.isPopular && (
        <div className="absolute top-0 left-0 right-0 text-center text-xs py-2 bg-yellow-400 text-black font-bold rounded-t-2xl">
          MOST POPULAR
        </div>
      )}

      {/* HEADER */}
      <div className={`mb-6 ${pkg.isPopular ? "mt-6" : ""}`}>
        <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
        <p className="text-sm text-gray-400">
          {hoursPerDay} jam/hari • {pkg.numberOfDays} hari
        </p>
      </div>

      {/* PRICE */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-white">
          {formatPrice(pkg.promoPrice)}
        </div>
        <div className="text-sm text-gray-500 line-through">
          {formatPrice(pkg.price)} (-{discount}%)
        </div>
      </div>

      {/* FEATURES */}
      <div className="space-y-3 flex-1 mb-6">
        {[
          `${pkg.hostCount} Host Profesional`,
          `${pkg.totalHours} Jam Live`,
          `${pkg.workTimeStart} - ${pkg.workTimeEnd}`,
          pkg.workDays,
        ].map((item: string, i: number) => (
          <div
            key={i}
            className="flex items-center gap-2 text-gray-300 text-sm"
          >
            <Check className="w-4 h-4 text-purple-400" />
            {item}
          </div>
        ))}

        {pkg.twibbonDesignCount > 0 && (
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Check className="w-4 h-4 text-purple-400" />
            {pkg.twibbonDesignCount} Twibbon Design
          </div>
        )}

        {pkg.weeklyReport && (
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Check className="w-4 h-4 text-purple-400" />
            Weekly Live Report
          </div>
        )}
      </div>

      {/* BUTTON */}
      <Link
        href="/booking"
        className={`w-full text-center py-3 rounded-xl font-semibold transition ${
          pkg.isPopular
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        Book Sekarang <ChevronRight className="inline w-4 h-4" />
      </Link>
    </motion.div>
  )
}
