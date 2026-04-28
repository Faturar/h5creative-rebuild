import { motion } from "framer-motion"
import { Play, CheckCircle2, ArrowRight, Volume2 } from "lucide-react"

// Reuse your existing variants for consistency
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export default function SpecialOfferSection() {
  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 bg-black relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background Grid Decoration (Optional, for depth) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* LEFT CONTENT: Text & Value Proposition */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 border border-gray-700 rounded-full text-gray-300 text-sm font-semibold mb-6 tracking-wide"
            variants={itemVariants}
          >
            KESUKSESAN KLIEN
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
            variants={itemVariants}
          >
            Live 2 Jam per Bulan,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Omzet Tembus 20 Jutaan!
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg leading-relaxed"
            variants={itemVariants}
          >
            Strategi "Gajian Sale" kami terbukti efektif. Lihat bagaimana kami
            membantu brand Purela (baby skincare) meroketkan penjualan mereka.
          </motion.p>

          <ul className="space-y-4 mb-10">
            {[
              "Demo Live Produk Purela Bayi",
              "Flash Sale FOMO - Stok Terbatas",
              "Host Ramah & Knowledgeable Tentang Bayi",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 text-gray-300 text-base"
                variants={itemVariants}
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="https://wa.me/6285811718049"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BOOKING SEKARANG
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* RIGHT CONTENT: Video Simulation (Gajian Sale) */}
        <motion.div
          className="relative w-full max-w-md mx-auto lg:max-w-full group"
          variants={itemVariants}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {/* Phone/Video Frame Container */}
          <div className="relative rounded-[2.5rem] border-4 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden aspect-[9/16]">
            {/* Video Element */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/assets/video/portofolio-live/portofolio-purela.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>

            {/* Video UI Elements - Top */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
              <div className="flex flex-col gap-2">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-max">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>{" "}
                  LIVE
                </span>
                <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded flex items-center gap-1 w-max">
                  <Volume2 className="w-3 h-3" /> 2.3K
                </span>
              </div>

              {/* Brand Watermark */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg">
                <span className="text-[10px] font-bold text-white tracking-wider">
                  PURELA OFFICIAL
                </span>
              </div>
            </div>



            {/* Video UI Elements - Bottom (Gajian Sale Banner) */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="bg-gradient-to-r from-blue-500 to-pink-500 p-4 rounded-2xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-white font-bold text-xl leading-tight">
                    Purela Baby Bundle 🍼
                  </h3>
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                    60% OFF
                  </span>
                </div>
                <p className="text-white/90 text-xs mb-3 line-clamp-1">
                  Paket Perawatan Bayi Lengkap - Beli 1 Gratis 2!
                </p>

                {/* Progress Bar Simulation */}
                <div className="w-full bg-black/30 rounded-full h-1.5 mb-1 overflow-hidden">
                  <div className="bg-white h-full rounded-full w-[85%]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-white/80 font-medium">
                  <span>Sold: 1024</span>
                  <span>Target: 1200</span>
                </div>
              </div>
            </div>

            {/* Video Controls (Play/Pause/Time) */}
            <div className="absolute bottom-4 right-4 z-20">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-[10px] text-white font-mono">00:42</span>
                <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div className="w-[58%] h-full bg-red-500"></div>
                </div>
                <span className="text-[10px] text-white font-mono">01:15</span>
              </div>
            </div>
          </div>

          {/* Decorative Glow behind phone */}
          <div className="absolute -inset-4 bg-purple-600/20 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.div>
      </div>
    </motion.section>
  )
}
