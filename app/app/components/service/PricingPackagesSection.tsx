"use client"

import { useState } from "react"
import { motion, AnimatePresence, Easing } from "framer-motion"
import PricingToggle from "./PricingToggle"
import PackageCard from "./PackageCard"
import { liveStreamingPackages, cameraEquipment } from "@/app/constants/packages"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function PricingPackagesSection() {
  const [activeType, setActiveType] = useState<'iphone' | 'camera'>('iphone')
  const packages = activeType === 'iphone' ? liveStreamingPackages.iphone : liveStreamingPackages.camera

  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Paket Harga
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan budget brand Anda
          </p>
        </motion.div>

        <PricingToggle activeType={activeType} onToggle={setActiveType} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                isHighlighted={pkg.isPopular}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {activeType === 'camera' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 p-6 rounded-2xl"
          >
            <h4 className="text-lg font-bold text-gray-900 mb-3">Peralatan Tambahan untuk Paket OBS Sistem:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cameraEquipment.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
