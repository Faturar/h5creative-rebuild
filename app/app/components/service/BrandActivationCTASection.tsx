"use client"

import { motion, Easing } from "framer-motion"
import { ArrowRight, Zap, Rocket, Target } from "lucide-react"

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

export default function BrandActivationCTASection() {
  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-black relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Siap Membantu Kebutuhan Brand Activation Anda
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-10"
          variants={itemVariants}
        >
          <motion.a
            href="https://h5creative.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold hover:text-gray-300 transition-colors"
            variants={itemVariants}
          >
            Website: h5creative.id
          </motion.a>
          <motion.a
            href="https://instagram.com/h5.creative"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold hover:text-gray-300 transition-colors"
            variants={itemVariants}
          >
            Instagram: @h5.creative
          </motion.a>
          <div className="text-white text-sm">
            WhatsApp: 0858-1171-8049
          </div>
        </motion.div>

        <motion.p
          className="text-gray-400 mb-6 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Gak ada kata TERLAMBAT buat naikkan brand awareness Anda.
        </motion.p>

        <motion.a
          href="https://wa.me/6285811718049"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-4 rounded-lg hover:bg-gray-200 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="w-5 h-5 text-orange-600" />
          CHAT VIA WHATSAPP SEKARANG
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </motion.section>
  )
}
