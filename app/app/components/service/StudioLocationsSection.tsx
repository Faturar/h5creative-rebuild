"use client"

import { motion } from "framer-motion"
import { Easing } from "framer-motion"
import { MapPin, Truck } from "lucide-react"

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

export default function StudioLocationsSection() {
  const locations = [
    {
      city: "Head Office",
      address: "Depok, Jawa Barat",
      isMain: true,
    },
    {
      city: "Cabang",
      address: "Yogyakarta, DI Yogyakarta",
      isMain: false,
    },
  ]

  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-purple-50"
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
            Lokasi Studio
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kunjungi studio kami atau kirim produk untuk live streaming profesional
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              className={`relative p-8 rounded-3xl border-2 transition-all ${
                location.isMain
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white border-transparent'
                  : 'bg-white border-gray-200 hover:border-purple-300'
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {location.isMain && (
                <div className="absolute -top-3 left-8 bg-white text-purple-600 px-4 py-1 rounded-full text-xs font-bold">
                  HEAD OFFICE
                </div>
              )}
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    location.isMain
                      ? 'bg-white/20'
                      : 'bg-purple-100'
                  }`}
                >
                  <MapPin className={`w-7 h-7 ${location.isMain ? 'text-white' : 'text-purple-600'}`} />
                </div>
                <div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      location.isMain ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {location.city}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      location.isMain ? 'text-white/90' : 'text-gray-600'
                    }`}
                  >
                    {location.address}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 p-6 md:p-8 rounded-2xl flex items-start gap-4"
          variants={itemVariants}
        >
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Pengiriman Produk
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Untuk live streaming, produk dapat dikirim ke studio kami. Biaya pengiriman ditanggung oleh klien. Kami akan menyediakan informasi lengkap tentang alamat pengiriman setelah booking dikonfirmasi.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
