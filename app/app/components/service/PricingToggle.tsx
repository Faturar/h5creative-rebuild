"use client"

import { motion } from "framer-motion"

interface PricingToggleProps {
  activeType: 'iphone' | 'camera'
  onToggle: (type: 'iphone' | 'camera') => void
}

export default function PricingToggle({ activeType, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="bg-gray-100 rounded-full p-1 inline-flex gap-1">
        <motion.button
          onClick={() => onToggle('iphone')}
          className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeType === 'iphone'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          whileHover={{ scale: activeType === 'iphone' ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          iPhone
        </motion.button>
        <motion.button
          onClick={() => onToggle('camera')}
          className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeType === 'camera'
              ? 'bg-orange-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          whileHover={{ scale: activeType === 'camera' ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Camera + OBS
        </motion.button>
      </div>
    </div>
  )
}
