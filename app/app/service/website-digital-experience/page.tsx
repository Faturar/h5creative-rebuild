"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Easing } from "framer-motion"
import { ArrowRight, CheckCircle2, Monitor, Layout, Zap } from "lucide-react"

import Navbar from "@/app/components/home/Navbar"
import FooterFix from "@/app/components/home/FooterFix"

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

export default function WebsiteDigitalExperiencePage() {
  return (
    <>
      <motion.section
        className="flex flex-col gap-8 bg-[#0B0B1B] relative min-h-screen pb-16 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
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
            <motion.div
              className="lg:w-1/2 text-white pr-0 lg:pr-8"
              variants={containerVariants}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                variants={itemVariants}
              >
                <Monitor className="w-4 h-4 text-indigo-500" />
                <span>#WEBSITE YANG KONVERSI TINGGI</span>
              </motion.div>

              <motion.h1
                className="text-[40px] leading-[1.1] font-extrabold tracking-tight md:text-[56px] xl:text-[64px]"
                variants={itemVariants}
              >
                Website &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                  Digital Experience
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-[550px] text-base leading-7 text-gray-300 md:text-lg"
                variants={itemVariants}
              >
                Kami desain dan develop website yang tidak hanya indah tapi juga
                sangat fungsional dan berfokus konversi. Menggunakan desain
                user-centered dan teknologi cutting-edge, kami buat pengalaman
                digital yang mendorong hasil.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8"
                variants={itemVariants}
              >
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-white text-black font-bold px-8 py-4 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                >
                  BOOKING SEKARANG
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative h-[500px] w-full hidden md:flex items-center justify-center"
              variants={itemVariants}
            >
              <div className="absolute w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>

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
                      <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                      <span className="text-white text-xs font-bold">
                        Website
                      </span>
                    </div>
                    <div className="bg-indigo-600 px-2 py-1 rounded text-[10px] font-bold text-white">
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <Monitor className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="w-full py-20 md:py-32 px-8 lg:px-16 bg-[#0B0B1B]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Layanan Website Development
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Website modern, cepat, dan berorientasi konversi
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              {
                icon: Layout,
                title: "UI/UX Design & Prototyping",
                description:
                  "Desain antarmuka dan pengalaman pengguna yang intuitif",
              },
              {
                icon: Zap,
                title: "Frontend & Backend Development",
                description:
                  "Pengembangan frontend dan backend dengan praktik terbaik",
              },
              {
                icon: Monitor,
                title: "Performance Optimization",
                description:
                  "Optimasi performa untuk kecepatan dan SEO",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all"
                variants={itemVariants}
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="w-full py-20 md:py-32 px-8 lg:px-16 bg-gradient-to-r from-indigo-500 to-purple-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Siap untuk Membuat Website yang Mengkonversi?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Mari diskusikan bagaimana kami bisa membantu membuat
              pengalaman digital yang mendorong hasil untuk bisnis kamu.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-3 bg-white text-indigo-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              BOOKING SEKARANG
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <FooterFix />
    </>
  )
}
