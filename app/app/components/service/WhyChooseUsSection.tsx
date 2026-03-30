"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Layers,
  MonitorPlay,
  Zap,
  Video,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

// Data points sesuai gambar
const timelineData = [
  {
    title: "Chosen by Hundreds of Brands",
    desc: "Kami dipercaya oleh berbagai brand terkemuka untuk mengelola strategi live commerce mereka.",
    icon: Building2,
  },
  {
    title: "Flexible Plans That Scale",
    desc: "Paket yang fleksibel dan dapat disesuaikan dengan skala tujuan bisnis Anda saat ini.",
    icon: Layers,
  },
  {
    title: "PM-Led Sessions",
    desc: "Sesi yang dipimpin Project Manager dengan monitoring real-time untuk hasil maksimal.",
    icon: MonitorPlay,
  },
  {
    title: "Fast, Proactive & Friendly Team",
    desc: "Tim yang responsif, cepat bertindak, dan ramah dalam setiap kolaborasi.",
    icon: Zap,
  },
  {
    title: "Studio-Grade Production",
    desc: "Kualitas produksi setingkat studio profesional yang terbukti meningkatkan konversi.",
    icon: Video,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export default function WhyChooseUsSection() {
  return (
    <section className="w-full bg-[#0B0B1B] py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Why Growth Brands Choose{" "}
            <span className="text-blue-400">Upscale House</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = item.icon
              // Zig-zag layout logic
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center justify-between md:justify-normal ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                  variants={itemVariants}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Empty Spacer for desktop layout balance */}
                  <div className="hidden md:block w-5/12"></div>

                  {/* Center Dot & Icon */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-[#0B0B1B] border-2 border-blue-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 pl-20 md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300 group">
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Brand Collection Wall (Logo Cloud) */}
        <motion.div
          className="mt-24 pt-12 border-t border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <p className="text-center text-gray-500 text-sm font-semibold uppercase tracking-widest mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 opacity-50">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center justify-center hover:bg-white/10 transition-colors"
                variants={itemVariants}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="font-bold text-gray-400 text-lg">Brand {i}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
