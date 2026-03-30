"use client"

import { motion } from "framer-motion"
import {
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Heart,
  MessageCircle,
  Share2,
  X,
} from "lucide-react"

// Variabel animasi yang konsisten dengan kode sebelumnya
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export default function DeviceOfferSection() {
  return (
    <motion.section
      className="max-w-7xl mx-auto my-12 bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100 overflow-hidden relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* --- KIRI: KONTEN TEKS --- */}
        <motion.div
          className="flex flex-col justify-center space-y-6"
          variants={itemVariants}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Ikon Header */}
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 text-gray-900 border border-gray-200 shadow-sm">
            <Smartphone className="w-8 h-8" />
          </div>

          {/* Judul & Harga */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-2">
              DEVICE IPHONE
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-gray-900">
                5 JUTAAN
              </span>
            </div>
          </div>

          {/* Deskripsi */}
          <p className="text-gray-600 text-lg leading-relaxed">
            Kualitas kamera super jernih & stabilitas koneksi tinggi untuk
            tampilan profesional.
          </p>

          {/* Daftar Fitur */}
          <ul className="space-y-3 mt-4">
            {[
              "Kualitas HD / 4K",
              "Stabil & Anti Lag",
              "Lighting Optimization",
            ].map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-gray-700 font-medium"
              >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          {/* Tombol CTA */}
          <motion.a
            href="#"
            className="inline-flex items-center justify-center gap-3 bg-black text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300 mt-4 w-full sm:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            DAPATKAN PENAWARAN
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* --- KANAN: VISUAL SIMULASI IPHONE --- */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Bingkai HP iPhone */}
          <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden z-10">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20"></div>

            {/* Konten Layar (Gambar Background) */}
            <div className="absolute inset-0 bg-gray-200">
              {/* Gambar placeholder yang merepresentasikan live streaming produk */}
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                alt="Live Stream Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay Gradien Layar */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none"></div>

            {/* UI Bagian Atas: Profil & Badge Live */}
            <div className="absolute top-10 left-4 right-4 flex justify-between items-center z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full border border-white/30"></div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-bold shadow-black drop-shadow-md">
                    Official Store
                  </span>
                  <span className="text-[10px] text-gray-200">
                    12rb followers
                  </span>
                </div>
              </div>
              <div className="bg-red-600 px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-white">LIVE</span>
              </div>
            </div>

            {/* Tengah: Floating Hearts Animation */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-2 items-end pointer-events-none">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: [0, 1, 0], y: [-20, -80] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="text-red-500 drop-shadow-lg"
                >
                  <Heart className="w-6 h-6 fill-current" />
                </motion.div>
              ))}
            </div>

            {/* UI Bagian Bawah: Banner "Raya Big Sale" */}
            <div className="absolute bottom-6 left-4 right-4 z-20">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-white font-extrabold text-xl italic uppercase bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-red-500 drop-shadow-md">
                    Raya Big Sale
                  </h2>
                  <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded">
                    99% OFF
                  </span>
                </div>

                {/* Simulasi Carousel Produk Mini */}
                <div className="flex gap-2 overflow-hidden">
                  <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0 opacity-50"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0 opacity-50"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0 opacity-50"></div>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Mengambang (Komentar/Share) */}
            <div className="absolute bottom-44 right-4 flex flex-col gap-4 items-center z-20">
              <button className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/50 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Efek Cahaya (Glow) di belakang HP */}
          <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full -z-10"></div>
        </motion.div>
      </div>
    </motion.section>
  )
}
