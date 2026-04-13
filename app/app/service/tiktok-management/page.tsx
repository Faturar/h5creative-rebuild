"use client"

import { motion, Easing } from "framer-motion"
import { ArrowRight, Users, Video, Play, TrendingUp } from "lucide-react"

import Navbar from "@/app/components/home/Navbar"
import FooterFix from "@/app/components/home/FooterFix"
import SpecialOfferSection from "@/app/components/service/SpecialOfferSection"
import CompanyOverviewSection from "@/app/components/service/CompanyOverviewSection"
import ValuePropositionSection from "@/app/components/service/ValuePropositionSection"
import ServicesDetailsSection from "@/app/components/service/ServicesDetailsSection"
import EquipmentShowcaseSection from "@/app/components/service/EquipmentShowcaseSection"
import StudioLocationsSection from "@/app/components/service/StudioLocationsSection"
import WorkflowProcessSection from "@/app/components/service/WorkflowProcessSection"
import PricingPackagesSection from "@/app/components/service/PricingPackagesSection"
import TestimonialsSection from "@/app/components/service/TestimonialsSection"
import ReportingSection from "@/app/components/service/ReportingSection"
import AdditionalNotesSection from "@/app/components/service/AdditionalNotesSection"

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

export default function TikTokManagementPage() {
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
                <Video className="w-4 h-4 text-pink-500" />
                <span>#JANGAN BIARKAN KONTEN KAMU PASAR</span>
              </motion.div>

              <motion.h1
                className="text-[40px] leading-[1.1] font-extrabold tracking-tight md:text-[56px] xl:text-[64px]"
                variants={itemVariants}
              >
                Optimasikan Bisnis Kamu Lewat{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                  TikTok!
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-[550px] text-base leading-7 text-gray-300 md:text-lg"
                variants={itemVariants}
              >
                Buat konten TikTok yang viral dan menarik! Kami sediakan tim
                profesional, strategi konten, dan analisis data untuk meningkatkan
                brand awareness dan penjualanmu.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8"
                variants={itemVariants}
              >
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-white text-black font-bold px-8 py-4 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                >
                  BOOK SEKARANG
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-6 mt-12"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">10M+</div>
                    <div className="text-xs text-gray-400">Total Views</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">500K+</div>
                    <div className="text-xs text-gray-400">Followers Gained</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <Video className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-xs text-gray-400">Viral Rate</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative h-[500px] w-full hidden md:flex items-center justify-center"
              variants={itemVariants}
            >
              <div className="absolute w-96 h-96 bg-pink-600/30 rounded-full blur-3xl"></div>

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
                        TikTok Brand
                      </span>
                    </div>
                    <div className="bg-red-600 px-2 py-1 rounded text-[10px] font-bold text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>{" "}
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-pink-900 to-purple-900 rounded-xl relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-3">
                      <p className="text-white text-xs">Viral Video! 🔥</p>
                    </div>
                  </div>
                </div>
              </motion.div>

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
                      <div className="w-8 h-8 bg-pink-600 rounded-full"></div>
                      <span className="text-white text-xs font-bold">
                        Skincare ID
                      </span>
                    </div>
                    <div className="bg-red-600 px-2 py-1 rounded text-[10px] font-bold text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>{" "}
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-pink-900 to-purple-900 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
                      <Users className="w-3 h-3" /> 5.2M
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 flex items-center gap-2">
                        <Play className="w-4 h-4 text-pink-400" />
                        <span className="text-white text-[10px]">
                          Challenge 50% OFF!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

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
                    <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                    <div className="bg-red-600 px-2 py-1 rounded text-[10px] font-bold text-white">
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-xl relative">
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/50"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <SpecialOfferSection />
      <CompanyOverviewSection />
      <ValuePropositionSection />
      <ServicesDetailsSection />
      <EquipmentShowcaseSection />
      <StudioLocationsSection />
      <WorkflowProcessSection />
      <PricingPackagesSection />
      <TestimonialsSection />
      <ReportingSection />
      <AdditionalNotesSection />

      <FooterFix />
    </>
  )
}
