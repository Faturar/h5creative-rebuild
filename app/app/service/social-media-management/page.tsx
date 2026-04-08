"use client"

import { motion, Easing } from "framer-motion"
import { ArrowRight, Smartphone, BarChart, Share2, Calendar, MessageSquare, TrendingUp, Sparkles, Heart, Play, Users } from "lucide-react"

import Navbar from "@/app/components/home/Navbar"
import FooterFix from "@/app/components/home/FooterFix"
import SocialMediaServicesSection from "@/app/components/service/SocialMediaServicesSection"
import SocialMediaPlatformsSection from "@/app/components/service/SocialMediaPlatformsSection"
import SocialMediaWhyChooseUsSection from "@/app/components/service/SocialMediaWhyChooseUsSection"
import SocialMediaPortfolioSection from "@/app/components/service/SocialMediaPortfolioSection"
import SocialMediaPricingSection from "@/app/components/service/SocialMediaPricingSection"
import SocialMediaTestimonialsSection from "@/app/components/service/SocialMediaTestimonialsSection"
import SocialMediaFAQSection from "@/app/components/service/SocialMediaFAQSection"
import SocialMediaCTASection from "@/app/components/service/SocialMediaCTASection"
import ValuePropositionSection from "@/app/components/service/ValuePropositionSection"
import CompanyOverviewSection from "@/app/components/service/CompanyOverviewSection"
import ServicesDetailsSection from "@/app/components/service/ServicesDetailsSection"
import WorkflowProcessSection from "@/app/components/service/WorkflowProcessSection"
import SpecialOfferSection from "@/app/components/service/SpecialOfferSection"
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

export default function SocialMediaManagementPage() {
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
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>SOCIAL MEDIA MANAGEMENT</span>
              </motion.div>

              <motion.h1
                className="text-[40px] leading-[1.1] font-extrabold tracking-tight md:text-[56px] xl:text-[64px]"
                variants={itemVariants}
              >
                Grow Your Brand with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Strategic Social Media Management
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-[550px] text-base leading-7 text-gray-300 md:text-lg"
                variants={itemVariants}
              >
                Increase engagement, build brand awareness, and drive conversions with our expert social media management services. We handle everything from content creation to analytics.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8"
                variants={itemVariants}
              >
                <motion.a
                  href="https://wa.me/6285811718049"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-white text-black font-bold px-8 py-4 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-6 mt-12"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">3x</div>
                    <div className="text-xs text-gray-400">More Engagement</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">250%</div>
                    <div className="text-xs text-gray-400">Avg Growth</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-xs text-gray-400">Client Satisfaction</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative h-[500px] w-full hidden md:flex items-center justify-center"
              variants={itemVariants}
            >
              <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>

              <motion.div
                className="absolute w-[320px] h-[480px] bg-white rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden -rotate-6 -translate-x-16 translate-y-8 z-0"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"></div>
                      <span className="text-gray-900 text-xs font-bold">
                        Glow Beauty
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200"></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-3">
                      <p className="text-gray-900 text-xs font-bold mb-1">New Collection! ✨</p>
                      <p className="text-gray-600 text-[10px]">Swipe to explore</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute w-[340px] h-[520px] bg-white rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden z-10 rotate-3"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full"></div>
                      <span className="text-gray-900 text-xs font-bold">
                        Fashion Forward
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔥</div>
                      <p className="text-gray-900 text-sm font-bold">50% OFF</p>
                      <p className="text-gray-600 text-xs">Limited Time</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                          <span className="text-gray-900 text-[10px] font-bold">12.5K</span>
                        </div>
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute w-[280px] h-[440px] bg-white rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden rotate-12 translate-x-20 translate-y-12 z-0"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-full"></div>
                      <span className="text-gray-900 text-xs font-bold">
                        TechStart
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-xl relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-teal-100 to-blue-100"></div>
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
      <WorkflowProcessSection />
      <SocialMediaPricingSection />
      <TestimonialsSection />
      <ReportingSection />
      <AdditionalNotesSection />

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
              Social Media Campaigns
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                type: "Fashion & Beauty",
                platform: "Instagram",
                color: "from-pink-500/20 to-purple-500/20",
              },
              {
                type: "Lifestyle",
                platform: "TikTok",
                color: "from-gray-900/20 to-gray-700/20",
              },
              {
                type: "Business",
                platform: "Facebook",
                color: "from-blue-500/20 to-blue-700/20",
              },
              {
                type: "B2B",
                platform: "LinkedIn",
                color: "from-blue-600/20 to-indigo-600/20",
              },
            ].map((video, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`relative w-[260px] h-[480px] bg-gradient-to-br ${video.color} rounded-[40px] overflow-hidden shadow-2xl border-[8px] border-gray-900`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80">
                    <div className="absolute top-6 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>{" "}
                      ACTIVE
                    </div>
                    <div className="absolute top-6 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Users className="w-3 h-3" /> {5 + index}K
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/40 cursor-pointer hover:bg-white/30 transition-colors">
                        <Play
                          className="w-6 h-6 text-white ml-1"
                          fill="white"
                        />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                        <p className="text-white text-xs font-semibold mb-1">
                          ✨ Engaging Content
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-[10px]">
                            Consistent Posting
                          </span>
                          <MessageSquare className="w-3 h-3 text-white/80" />
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
              href="https://wa.me/6285811718049"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black font-semibold border-b-2 border-black pb-1 hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              LIHAT LEBIH BANYAK
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            </motion.div>
         </div>
      </motion.section>

      <SocialMediaServicesSection />
      <SocialMediaPlatformsSection />
      <SocialMediaWhyChooseUsSection />
      <SocialMediaPortfolioSection />
      <SocialMediaTestimonialsSection />
      <SocialMediaFAQSection />

      <motion.section
        className="w-full py-16 px-4 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Siap Membantu Kebutuhan Social Media Brand Anda
          </motion.h2>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-10"
            variants={itemVariants}
          >
            <motion.a
              href="https://h5creative.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-gray-300 transition-colors"
              variants={itemVariants}
            >
              Website: h5creative.id
            </motion.a>
            <motion.a
              href="https://instagram.com/h5.creative"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-gray-300 transition-colors"
              variants={itemVariants}
            >
              Instagram: @h5.creative
            </motion.a>
            <div className="text-white text-sm">
              WhatsApp: 0858-1171-8049
            </div>
          </motion.div>

          <motion.p
            className="text-gray-400 mb-6 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Gak ada kata TERLAMBAT buat naikkan engagement brand Anda.
          </motion.p>

          <motion.a
            href="https://wa.me/6285811718049"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-4 rounded-lg hover:bg-gray-200 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5 text-purple-500" />
            CHAT VIA WHATSAPP SEKARANG
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.section>

      <FooterFix />
    </>
  )
}
