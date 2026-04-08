"use client"

import { motion } from "framer-motion"
import { Easing } from "framer-motion"
import { Video, Award } from "lucide-react"

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

export default function CompanyOverviewSection() {
  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={containerVariants}>
            <motion.div
              className="flex items-center gap-3 mb-6"
              variants={itemVariants}
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Since 2020
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              Your Partner to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Speed Your Growth
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Kami adalah creative agency yang berfokus membantu brand tumbuh lebih cepat di pasar digital melalui layanan Live Streaming Commerce, Content Management, dan Ads Management yang terintegrasi.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              {[
                'Live Streaming Commerce',
                'Content Management',
                'Ads Management',
              ].map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full"
                >
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">{service}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-3xl p-8 md:p-12 border border-purple-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4+</div>
                  <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Brand Partner</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                  <div className="text-sm text-gray-600">Live Streaming</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-2">2M+</div>
                  <div className="text-sm text-gray-600">GMV Terhasil</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
