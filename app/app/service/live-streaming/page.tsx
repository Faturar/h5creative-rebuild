"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Easing } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Star,
  Video,
  Smartphone,
  Monitor,
  Zap,
  TrendingUp,
  MessageCircle,
  ShoppingCart,
  Award,
  Clock,
  BarChart3,
  Target,
  Play,
} from "lucide-react"

import Navbar from "@/app/components/home/Navbar"
import FooterFix from "@/app/components/home/FooterFix"
import SpecialOfferSection from "@/app/components/service/SpecialOfferSection"
import DeviceOfferSection from "@/app/components/service/DeviceOfferSection"
import StudioOfferSection from "@/app/components/service/StudioOfferSection"
import LiveStreamSlider from "@/app/components/service/LiveStreamSlider"
import WhyChooseUsSection from "@/app/components/service/WhyChooseUsSection"

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

export default function LiveStreamingPage() {
  return (
    <>
      {/* HERO SECTION - Dark Themed */}
      <motion.section
        className="flex flex-col gap-8 bg-[#0B0B1B] relative min-h-screen pb-16 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Decoration - Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <Navbar scrollTransparent />

        <motion.div
          className="hero container max-w-7xl mx-auto flex justify-between items-center relative px-8 lg:px-16 z-10"
          variants={containerVariants}
        >
          <div className="relative flex flex-col sm:flex-row gap-8 lg:gap-16 min-h-[80vh] w-full items-center justify-between">
            {/* LEFT CONTENT */}
            <motion.div
              className="lg:w-1/2 text-white pr-0 lg:pr-8"
              variants={containerVariants}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                variants={itemVariants}
              >
                <Video className="w-4 h-4 text-red-500" />
                <span>#GAKPERLUMAHAL BUAT OPTIMASI PENJUALAN ONLINE</span>
              </motion.div>

              <motion.h1
                className="text-[40px] leading-[1.1] font-extrabold tracking-tight md:text-[56px] xl:text-[64px]"
                variants={itemVariants}
              >
                Optimasikan Produk Bisnis Kamu Lewat{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Live Shopping!
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-[550px] text-base leading-7 text-gray-300 md:text-lg"
                variants={itemVariants}
              >
                Buat Live Streaming yang Proper gak MURAH! Kami sediakan host
                profesional, device berkualitas, dan studio lengkap untuk
                meningkatkan penjualanmu.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8"
                variants={itemVariants}
              >
                <motion.a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-white text-black font-bold px-8 py-4 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  CHAT WHATSAPP
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE VISUAL - MULTIPLE PHONES (Reference Improvement) */}
            <motion.div
              className="lg:w-1/2 relative h-[500px] w-full hidden md:flex items-center justify-center"
              variants={itemVariants}
            >
              {/* Background Glow */}
              <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>

              {/* Phone 1 - Back Left */}
              <motion.div
                className="absolute w-[240px] h-[480px] bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden -rotate-6 -translate-x-16 translate-y-8 z-0"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                      <span className="text-white text-xs font-bold">
                        Toko Baju
                      </span>
                    </div>
                    <div className="bg-red-600 px-2 py-1 rounded text-[10px] font-bold text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>{" "}
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-xl relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-3">
                      <p className="text-white text-xs">Promo Terbatas! 🔥</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phone 2 - Front Center */}
              <motion.div
                className="absolute w-[260px] h-[520px] bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden z-10 rotate-3"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                      <span className="text-white text-xs font-bold">
                        Skincare ID
                      </span>
                    </div>
                    <div className="bg-red-600 px-2 py-1 rounded text-[10px] font-bold text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>{" "}
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
                      <Users className="w-3 h-3" /> 2.4K
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-green-400" />
                        <span className="text-white text-[10px]">
                          Serum Set disc 50%!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phone 3 - Back Right */}
              <motion.div
                className="absolute w-[220px] h-[440px] bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden rotate-12 translate-x-20 translate-y-12 z-0"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                    <div className="bg-red-600 px-2 py-1 rounded text-[10px] font-bold text-white">
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-xl relative">
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-900/50"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
      <SpecialOfferSection />
      <DeviceOfferSection />
      <StudioOfferSection />
      <LiveStreamSlider />
      <WhyChooseUsSection />
      {/* STATISTICS SECTION */}
      <motion.section
        className="w-full py-[80px] md:py-[100px] px-4 md:px-8 lg:px-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-black" />
                <span className="text-[48px] font-bold text-black">76</span>
              </div>
              <p className="text-lg font-semibold text-gray-600 uppercase tracking-wide">
                Project Selesai
              </p>
            </motion.div>
            <motion.div
              className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-black" />
                <span className="text-[48px] font-bold text-black">65</span>
              </div>
              <p className="text-lg font-semibold text-gray-600 uppercase tracking-wide">
                Client Senang
              </p>
            </motion.div>
            <motion.div
              className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Star className="w-8 h-8 text-black" />
                <span className="text-[48px] font-bold text-black">8</span>
              </div>
              <p className="text-lg font-semibold text-gray-600 uppercase tracking-wide">
                Tim Support
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SPECIAL OFFER SECTION */}
      <motion.section
        className="w-full py-20 px-4 md:px-8 lg:px-16 bg-black text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4 py-1 bg-white text-black text-sm font-bold rounded-full mb-6"
            variants={itemVariants}
          >
            PENAWARAN SPESIAL
          </motion.span>
          <motion.h2
            className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] font-bold uppercase mb-6 tracking-tight"
            variants={itemVariants}
          >
            Semua kebutuhan di atas bisa kamu dapat mulai{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              2 JUTAAN
            </span>{" "}
            aja!
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 mb-8"
            variants={itemVariants}
          >
            untuk Live 2 Jam per Bulan di H5 Creative!
          </motion.p>
          <motion.a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DAPATKAN PENAWARAN
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.section>
      {/* BENEFITS SECTION */}
      <motion.section
        className="w-full py-[80px] md:py-[100px] px-4 md:px-8 lg:px-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="font-bold text-[32px] leading-[1.1] md:text-[42px] uppercase text-gray-900 mb-4">
              Keunggulan Live Streaming
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Interaksi Langsung",
                desc: "Real-time dengan calon pembeli",
                color: "blue",
              },
              {
                icon: Award,
                title: "Tingkatkan Kepercayaan",
                desc: "Bukti nyata produk real time",
                color: "green",
              },
              {
                icon: TrendingUp,
                title: "Penjualan Naik",
                desc: "Atmosfer 'beli sekarang' yang efektif",
                color: "purple",
              },
              {
                icon: ShoppingCart,
                title: "Fokus Closing",
                desc: "Ribet setup kami yang urus",
                color: "orange",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-6 rounded-2xl border border-gray-200 hover:bg-gray-50 transition duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full bg-${benefit.color}-50 flex items-center justify-center`}
                >
                  <benefit.icon
                    className={`w-6 h-6 text-${benefit.color}-600`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* BRAND COLLABORATION SECTION - Black & White Aesthetic */}
      <motion.section
        className="w-full py-[80px] md:py-[100px] px-4 md:px-8 lg:px-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="font-bold text-[32px] leading-[1.1] md:text-[42px] uppercase text-gray-900 mb-4">
              #BRANDTERIMABERES
            </h2>
            <p className="text-lg text-gray-600">
              BRAND YANG SUDAH BERKOLABORASI BERSAMA KAMI
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-center h-24 hover:border-black transition-colors"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-xl font-bold text-gray-300 hover:text-black transition-colors">
                  Brand {item}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* LIVE STREAMING EXAMPLES SECTION */}
      <motion.section
        className="w-full py-[80px] md:py-[100px] px-4 md:px-8 lg:px-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="font-bold text-[32px] leading-[1.1] md:text-[42px] uppercase text-gray-900 mb-4">
              Contoh Live Streaming
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                type: "Fashion",
                platform: "TikTok",
                color: "from-blue-500/20 to-blue-600/20",
              },
              {
                type: "Beauty",
                platform: "Shopee",
                color: "from-orange-500/20 to-orange-600/20",
              },
              {
                type: "F&B",
                platform: "Instagram",
                color: "from-pink-500/20 to-pink-600/20",
              },
              {
                type: "Tech",
                platform: "Tokopedia",
                color: "from-green-500/20 to-green-600/20",
              },
            ].map((video, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Phone Frame */}
                <div
                  className={`relative w-[260px] h-[480px] bg-gradient-to-br ${video.color} rounded-[40px] overflow-hidden shadow-2xl border-[8px] border-gray-900`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80">
                    {/* UI Elements */}
                    <div className="absolute top-6 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>{" "}
                      LIVE
                    </div>
                    <div className="absolute top-6 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Users className="w-3 h-3" /> {1 + index}K
                    </div>

                    {/* Center Play */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/40 cursor-pointer hover:bg-white/30 transition-colors">
                        <Play
                          className="w-6 h-6 text-white ml-1"
                          fill="white"
                        />
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                        <p className="text-white text-xs font-semibold mb-1">
                          🔥 Flash Sale!
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-[10px]">
                            Stock Terbatas
                          </span>
                          <ShoppingCart className="w-3 h-3 text-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-900 font-bold text-center">
                  {video.type}
                </p>
                <p className="text-gray-500 text-sm text-center">
                  {video.platform}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" variants={itemVariants}>
            <motion.a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black font-semibold border-b-2 border-black pb-1 hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Lihat Lebih Banyak
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
      {/* CONTACT FORM SECTION */}
      <motion.section
        className="w-full py-[80px] md:py-[100px] px-4 md:px-8 lg:px-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <h2 className="font-bold text-[32px] leading-[1.1] md:text-[40px] uppercase text-gray-900 mb-2">
              Hubungi Kami
            </h2>
            <p className="text-gray-500">Isi form untuk konsultasi gratis</p>
          </motion.div>
          <motion.form className="space-y-6" variants={containerVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Brand
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                  placeholder="Masukkan nama brand"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                  placeholder="Nama PIC"
                />
              </motion.div>
            </div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Domisili
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                  placeholder="Kota"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                  placeholder="WhatsApp"
                />
              </motion.div>
            </motion.div>
            <motion.div className="text-center pt-4" variants={itemVariants}>
              <motion.button
                type="submit"
                className="inline-flex items-center gap-2 bg-black text-white font-semibold px-10 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                KIRIM
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </motion.section>
      {/* FINAL CTA SECTION */}
      <motion.section
        className="w-full py-16 px-4 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Gak ada kata TERLAMBAT buat naikkan penjualanmu.
          </motion.h2>
          <motion.a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5 text-green-500" />
            CHAT VIA WHATSAPP SEKARANG!
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.section>
      {/* FOOTER */}
      <FooterFix />
    </>
  )
}
