"use client"

import Image, { type StaticImageData } from "next/image"
import { motion } from "framer-motion"

interface ProcessStepProps {
  step: number
  title: string
  description: string
  image?: StaticImageData
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

export default function ProcessStep({
  step,
  title,
  description,
  image,
}: ProcessStepProps) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
      variants={itemVariants}
      whileHover={{ y: -5 }}
    >
      <div className="text-[#2E2BFF] font-bold text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {String(step).padStart(2, "0")}
      </div>
      <h3 className="font-bold text-xl text-[#0B0B1B] mb-2">{title}</h3>
      <p className="text-[#0B0B1B]/70 text-sm leading-relaxed">{description}</p>
      {image && (
        <div className="mt-4 rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
    </motion.div>
  )
}
