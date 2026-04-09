"use client"

import { motion } from "framer-motion"
import { Easing } from "framer-motion"
import { Smartphone, Lightbulb, Mic, Monitor, Camera, Package } from "lucide-react"

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

export default function EquipmentShowcaseSection() {
  const equipments = [
    {
      icon: Smartphone,
      title: "Device Live Streaming",
      description: "iPhone berkualitas tinggi untuk video jernih dan stabil selama live streaming",
      color: "blue",
    },
    {
      icon: Lightbulb,
      title: "Lighting Professional",
      description: "Sistem pencahayaan profesional untuk hasil visual yang optimal dan menarik",
      color: "yellow",
    },
    {
      icon: Mic,
      title: "Microphone",
      description: "Audio berkualitas tinggi untuk komunikasi yang jelas dengan audience",
      color: "red",
    },
    {
      icon: Camera,
      title: "Sony Camera",
      description: "Kamera profesional Sony untuk hasil video broadcast quality",
      color: "purple",
    },
    {
      icon: Monitor,
      title: "Computer & OBS",
      description: "PC spesifikasi tinggi dengan OBS Software untuk control yang profesional",
      color: "green",
    },
    {
      icon: Package,
      title: "Product Display Property",
      description: "Property display produk untuk presentasi yang menarik dan profesional",
      color: "orange",
    },
  ]

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
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Equipment Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Peralatan profesional untuk hasil live streaming berkualitas tinggi
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipments.map((equipment, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-${equipment.color}-100 flex items-center justify-center mb-4 group-hover:bg-${equipment.color}-200 transition-colors`}
              >
                <equipment.icon className={`w-8 h-8 text-${equipment.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {equipment.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {equipment.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
