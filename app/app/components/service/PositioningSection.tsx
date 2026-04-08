"use client"

import { motion, Easing } from "framer-motion"
import { Sparkles, Video, Users, BarChart } from "lucide-react"

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

export default function PositioningSection() {
  const services = [
    {
      icon: Video,
      title: "Live Streaming Production",
      description: "Setup profesional untuk hasil berkualitas tinggi",
    },
    {
      icon: Users,
      title: "Live Host",
      description: "Host terlatih untuk engagement dan closing efektif",
    },
    {
      icon: BarChart,
      title: "Campaign Optimization",
      description: "Strategi optimasi berbasis data dan performa",
    },
    {
      icon: Sparkles,
      title: "Sales Conversion Strategy",
      description: "Pendekatan berorientasi hasil penjualan",
    },
  ]

  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-700"
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
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>CREATIVE COMMERCE PARTNER</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Mitra Kreatif untuk Pertumbuhan Brand Anda
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Kami menggabungkan kreativitas dan strategi untuk mengoptimalkan live commerce dan meningkatkan penjualan brand Anda
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
