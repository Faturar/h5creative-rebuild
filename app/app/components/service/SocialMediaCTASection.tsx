"use client"

import { motion, Easing } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"

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

export default function SocialMediaCTASection() {
  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          variants={itemVariants}
        >
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>LIMITED TIME OFFER</span>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          variants={itemVariants}
        >
          Ready to Scale Your Social Media?
        </motion.h2>

        <motion.p
          className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Transform your social media presence with our expert management. Drive engagement, grow your audience, and increase conversions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.a
            href="https://wa.me/6285811718049"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-purple-900 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Now
            <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://wa.me/6285811718049"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </motion.div>

        <motion.p
          className="text-white/60 text-sm mt-6"
          variants={itemVariants}
        >
          WhatsApp: 0858-1171-8049
        </motion.p>
      </div>
    </motion.section>
  )
}
