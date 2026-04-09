"use client"

import { motion, Easing } from "framer-motion"
import { ArrowRight, Users, TrendingUp, Target, Sparkles, Zap } from "lucide-react"

import Navbar from "@/app/components/home/Navbar"
import FooterFix from "@/app/components/home/FooterFix"
import BrandActivationServicesSection from "@/app/components/service/BrandActivationServicesSection"
import BrandActivationProcessSection from "@/app/components/service/BrandActivationProcessSection"
import BrandActivationWhyChooseUsSection from "@/app/components/service/BrandActivationWhyChooseUsSection"
import BrandActivationPortfolioSection from "@/app/components/service/BrandActivationPortfolioSection"
import BrandActivationTestimonialsSection from "@/app/components/service/BrandActivationTestimonialsSection"
import BrandActivationFAQSection from "@/app/components/service/BrandActivationFAQSection"
import BrandActivationCTASection from "@/app/components/service/BrandActivationCTASection"
import SpecialOfferSection from "@/app/components/service/SpecialOfferSection"
import CompanyOverviewSection from "@/app/components/service/CompanyOverviewSection"
import ValuePropositionSection from "@/app/components/service/ValuePropositionSection"
import ServicesDetailsSection from "@/app/components/service/ServicesDetailsSection"
import WorkflowProcessSection from "@/app/components/service/WorkflowProcessSection"
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

export default function BrandActivationPage() {
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
          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[80vh] w-full items-center justify-between">
            <motion.div
              className="lg:w-1/2 text-white pr-0 lg:pr-8"
              variants={containerVariants}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                variants={itemVariants}
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>BRAND ACTIVATION SERVICES</span>
              </motion.div>

              <motion.h1
                className="text-[40px] leading-[1.1] font-extrabold tracking-tight md:text-[56px] xl:text-[64px]"
                variants={itemVariants}
              >
                Turn Your Brand into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  an Experience
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-[550px] text-base leading-7 text-gray-300 md:text-lg"
                variants={itemVariants}
              >
                We help brands connect with audiences through impactful online & offline activations that create memorable experiences and drive real results.
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
                  Plan Your Activation
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-6 mt-12"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">5x</div>
                    <div className="text-xs text-gray-400">More Engagement</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">420%</div>
                    <div className="text-xs text-gray-400">Avg Growth</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-xs text-gray-400">Campaigns</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative h-[500px] w-full hidden md:flex items-center justify-center"
              variants={itemVariants}
            >
              <div className="absolute w-96 h-96 bg-orange-600/30 rounded-full blur-3xl"></div>

              <motion.div
                className="absolute w-[300px] h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden -rotate-6 -translate-x-16 translate-y-8 z-0"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <div className="text-white text-2xl font-bold mb-2">LAUNCH EVENT</div>
                    <div className="text-white/80 text-sm">5,000+ Attendees</div>
                    <div className="mt-4 bg-white/20 rounded-lg px-4 py-2 inline-block">
                      <span className="text-white text-sm font-semibold">+340% Impact</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute w-[320px] h-[440px] bg-white rounded-2xl shadow-2xl overflow-hidden z-10 rotate-3"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎪</div>
                    <div className="text-white text-2xl font-bold mb-2">FESTIVAL</div>
                    <div className="text-white/80 text-sm">12,000+ Visitors</div>
                    <div className="mt-4 bg-white/20 rounded-lg px-4 py-2 inline-block">
                      <span className="text-white text-sm font-semibold">+580% Growth</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute w-[260px] h-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden rotate-12 translate-x-20 translate-y-12 z-0"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-5xl mb-4">🚀</div>
                    <div className="text-white text-xl font-bold mb-2">CAMPAIGN</div>
                    <div className="text-white/80 text-xs">15M+ Reach</div>
                    <div className="mt-3 bg-white/20 rounded-lg px-3 py-1 inline-block">
                      <span className="text-white text-xs font-semibold">+420% ROI</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-[#0B0B1B]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What is Brand Activation?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Brand activation is the process of bringing your brand to life through interactive experiences that create emotional connections with your target audience. It's about transforming passive awareness into active engagement and memorable experiences that drive action.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We integrate both online and offline channels—from social media campaigns and hashtag challenges to physical events and experiential marketing—to deliver comprehensive activation strategies that amplify your brand's presence and impact.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            <motion.div
              className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 p-8 rounded-2xl border border-orange-500/20"
              variants={itemVariants}
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Emotional Connection
              </h3>
              <p className="text-gray-300">
                Create meaningful experiences that resonate with your audience and build lasting brand loyalty
              </p>
            </motion.div>

            <motion.div
              className="text-center bg-gradient-to-br from-red-500/10 to-pink-500/10 p-8 rounded-2xl border border-red-500/20"
              variants={itemVariants}
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                High Engagement
              </h3>
              <p className="text-gray-300">
                Drive active participation through interactive campaigns that captivate and motivate your audience
              </p>
            </motion.div>

            <motion.div
              className="text-center bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-8 rounded-2xl border border-purple-500/20"
              variants={itemVariants}
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Memorable Impact
              </h3>
              <p className="text-gray-300">
                Deliver unforgettable experiences that make your brand stand out and stay top-of-mind
              </p>
            </motion.div>
          </motion.div>
         </div>
       </motion.section>

      <SpecialOfferSection />
      <CompanyOverviewSection />
      <ValuePropositionSection />
      <ServicesDetailsSection />
      <WorkflowProcessSection />
      <BrandActivationServicesSection />
      <BrandActivationProcessSection />
      <BrandActivationWhyChooseUsSection />
      <BrandActivationPortfolioSection />
      <TestimonialsSection />
      <ReportingSection />
      <AdditionalNotesSection />
      <BrandActivationTestimonialsSection />
      <BrandActivationFAQSection />
      <BrandActivationCTASection />

      <FooterFix />
    </>
  )
}
