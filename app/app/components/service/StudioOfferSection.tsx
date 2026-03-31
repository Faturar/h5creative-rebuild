"use client"

import { motion } from "framer-motion"
import { Monitor, CheckCircle2, ArrowRight, Eye, Video } from "lucide-react"

// Variabel animasi yang konsisten
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export default function StudioOfferSection() {
  return (
    <motion.section
      className="max-w-7xl mx-auto my-12 bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100 overflow-hidden relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* --- KIRI: VISUAL SIMULASI STUDIO (HP) --- */}
        {/* Layout ini dibalik dari sebelumnya sesuai deskripsi gambar */}
        <motion.div
          className="relative flex justify-center items-center order-2 lg:order-1"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Bingkai HP */}
          <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden z-10">
            {/* Notch/Dynamic Island */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20"></div>

            {/* Konten Layar: Background Studio/Rak Produk */}
            <div className="absolute inset-0 bg-gray-800">
              {/* Gambar placeholder yang menyerupai studio/rak produk */}
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                alt="Studio Setup"
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            {/* Overlay Gradien */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

            {/* UI Bagian Atas: Header Studio */}
            <div className="absolute top-10 left-4 right-4 flex justify-between items-start z-20">
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold tracking-wider bg-black/30 backdrop-blur-sm px-2 py-1 rounded w-max">
                  H5 STUDIO
                </span>
              </div>
              <div className="bg-red-600 px-2 py-1 rounded flex items-center gap-1 shadow-lg animate-pulse">
                <span className="text-[10px] font-bold text-white">LIVE</span>
              </div>
            </div>

            {/* UI Bagian Tengah: Teks "LIVE SUPER SALE" */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center space-y-2">
                <motion.h2
                  className="text-4xl md:text-5xl font-black text-white italic uppercase leading-none drop-shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  LIVE <br />
                  <span className="text-yellow-400">SUPER SALE</span>
                </motion.h2>
                <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-semibold bg-black/40 px-4 py-1 rounded-full backdrop-blur-md w-max mx-auto border border-white/10">
                  <Eye className="w-4 h-4" />
                  <span>2.8K Watching</span>
                </div>
              </div>
            </div>

            {/* UI Bagian Bawah: Detail Produk/Studio */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-300 text-xs font-bold">
                    PROFESSIONAL SETUP
                  </span>
                  <Video className="w-4 h-4 text-white/70" />
                </div>
                <div className="flex gap-2">
                  <div className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-3/4"></div>
                  </div>
                  <span className="text-[10px] text-white font-mono">
                    00:45
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Efek Cahaya Studio di belakang HP */}
          <div className="absolute -inset-4 bg-blue-500/10 blur-[60px] rounded-full -z-10"></div>
        </motion.div>

        {/* --- KANAN: KONTEN TEKS --- */}
        <motion.div
          className="flex flex-col justify-center space-y-6 order-1 lg:order-2"
          variants={itemVariants}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Ikon Header */}
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 text-gray-900 border border-gray-200 shadow-sm">
            <Monitor className="w-8 h-8" />
          </div>

          {/* Judul & Harga */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-2">
              STUDIO DAN PERLENGKAPAN LIVE
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-gray-900">
                3 JUTAAN
              </span>
            </div>
          </div>

          {/* Deskripsi */}
          <p className="text-gray-600 text-lg leading-relaxed">
            Kami sediakan lighting, audio, dan background lengkap. Hasilkan
            visual yang memukau untuk menarik penonton.
          </p>

          {/* Daftar Fitur */}
          <ul className="space-y-3 mt-4">
            {[
              "Lighting Studio Jernih",
              "Audio High Quality",
              "Setup Lengkap (Kami yang Uris)",
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

          {/* Catatan Tambahan */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 flex items-start gap-3">
            <span className="font-bold">Tips:</span>
            <span>
              Kamu tinggal bawa produk, semua set up teknis kami urus agar fokus
              penjualanmu maksimal.
            </span>
          </div>

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
      </div>
    </motion.section>
  )
}
