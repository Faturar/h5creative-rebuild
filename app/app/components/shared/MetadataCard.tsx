"use client"

import { motion } from "framer-motion"

interface MetadataCardProps {
  label: string
  value: string
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

export default function MetadataCard({ label, value }: MetadataCardProps) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
    >
      <p className="text-white/60 text-sm mb-2 group-hover:text-white/80 transition-colors duration-300">
        {label}
      </p>
      <p className="text-white font-semibold text-base">{value}</p>
    </motion.div>
  )
}
