"use client"

import Image, { type StaticImageData } from "next/image"
import { motion } from "framer-motion"

interface ServiceCardProps {
  icon: StaticImageData
  title: string
  description?: string
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 group"
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="w-16 h-16 bg-[#2E2BFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2E2BFF]/20 transition-colors duration-300">
        <Image src={icon} alt={title} className="w-8 h-8" />
      </div>
      <h3 className="font-bold text-[#0B0B1B] mb-2">{title}</h3>
      {description && (
        <p className="text-[#0B0B1B]/70 text-sm">{description}</p>
      )}
    </motion.div>
  )
}
