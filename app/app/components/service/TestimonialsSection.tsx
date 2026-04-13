"use client"

import { motion, Easing } from "framer-motion"
import Image from "next/image"

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

export default function TestimonialsSection() {
  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Success Stories from Our Clients
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Real results from brands who partnered with H5 Creative
          </p>
        </motion.div>
        <motion.div
          className="relative max-w-5xl mx-auto"
          variants={itemVariants}
        >
          <div className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
              <div>
                <Image
                  width={1080}
                  height={1080}
                  src={"/assets/images/live/live-streaming-dashboard.webp"}
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <p className="text-xl font-semibold mb-2">
                    Dashboard view of live streaming analytics
                  </p>
                  <p className="text-white/80">
                    Track performance metrics in real-time
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
