"use client"

import { motion, Easing } from "framer-motion"
import { AlertCircle, Clock } from "lucide-react"

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

export default function AdditionalNotesSection() {
  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Catatan Penting
          </h2>
          <p className="text-lg text-gray-600">
            Informasi tambahan untuk kelancaran kerjasama
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-8 md:p-10"
          variants={itemVariants}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Biaya Tambahan
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Untuk live streaming di luar jam kerja standar, berlaku biaya tambahan
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
              <h4 className="text-lg font-bold text-gray-900">Jam Kerja Standar</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                <p className="text-gray-700">
                  <span className="font-semibold">Jam Normal:</span> 09.00 – 20.00
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                <p className="text-gray-700">
                  <span className="font-semibold">Extra Hours:</span> Sebelum jam 09.00 atau setelah jam 20.00
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-orange-200">
                <p className="text-sm text-gray-600 italic">
                  Biaya tambahan akan diinformasikan saat pembahasan package dan disepakati bersama sebelum kontrak dimulai.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jika Anda memiliki pertanyaan atau kebutuhan khusus terkait jadwal, silakan hubungi kami. Kami fleksibel dan dapat menyesuaikan dengan kebutuhan brand Anda.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
