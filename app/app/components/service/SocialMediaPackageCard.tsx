"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, Sparkles, Instagram, Facebook, Linkedin, Video } from "lucide-react"
import { SocialMediaPackage } from "@/app/constants/packages"

interface SocialMediaPackageCardProps {
  package: SocialMediaPackage
  isHighlighted?: boolean
}

export default function SocialMediaPackageCard({ package: pkg, isHighlighted = false }: SocialMediaPackageCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const discount = Math.round(((pkg.normalPrice - pkg.specialPrice) / pkg.normalPrice) * 100)

  return (
    <motion.div
      className={`relative rounded-2xl p-6 border-2 transition-all duration-300 ${
        isHighlighted
          ? 'border-purple-600 bg-gradient-to-b from-purple-50 to-white shadow-xl'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
      }`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            MOST POPULAR
          </div>
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>{pkg.platforms}</span>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className="text-sm text-gray-500 line-through mb-1">
          {formatPrice(pkg.normalPrice)}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl font-bold text-purple-600">
            {formatPrice(pkg.specialPrice)}
          </span>
          {discount > 0 && (
            <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-semibold">
              -{discount}%
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">/month</div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-around text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">{pkg.postsPerMonth}</div>
            <div className="text-xs text-gray-500">Posts</div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div>
            <div className="text-lg font-bold text-gray-900">{pkg.reelsPerMonth}</div>
            <div className="text-xs text-gray-500">Reels</div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div>
            <div className="text-lg font-bold text-gray-900">{pkg.storiesPerMonth}</div>
            <div className="text-xs text-gray-500">Stories</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-2 text-sm">
          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
          <span className="text-gray-600">
            {pkg.contentTypes.join(', ')}
          </span>
        </div>
        {pkg.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/booking"
        className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
          isHighlighted
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-[1.02]'
            : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
        }`}
      >
        Book Now
      </Link>
    </motion.div>
  )
}
