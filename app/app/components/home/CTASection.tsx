"use client"

import { motion, Easing } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { CTA_SECTION_DATA } from "@/app/constants/landingPageData"

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

// Stat Card Component
const StatCard = ({
  stat,
  index,
}: {
  stat: (typeof CTA_SECTION_DATA.stats)[0]
  index: number
}) => {
  return (
    <motion.div
      className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 overflow-hidden group"
      variants={itemVariants}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>

      <div className="relative z-10">
        <motion.div
          className="text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
        >
          {stat.value}
        </motion.div>
        <div className="text-white/90 font-medium">{stat.label}</div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  )
}

export default function CTASection() {
  return (
    <motion.section
      className="w-full bg-gradient-to-br from-[#2E2BFF] to-[#1C1AFF] py-32 text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            className="text-[72px] leading-[1.05] font-bold uppercase mb-6 tracking-tight"
            variants={itemVariants}
          >
            {CTA_SECTION_DATA.title}
          </motion.h2>
          <motion.p
            className="text-2xl text-white/90 max-w-3xl mx-auto mb-6 font-light"
            variants={itemVariants}
          >
            {CTA_SECTION_DATA.subtitle}
          </motion.p>
          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto font-light"
            variants={itemVariants}
          >
            {CTA_SECTION_DATA.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {CTA_SECTION_DATA.stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <motion.button
            className="relative bg-white text-[#2E2BFF] font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden group"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <span className="relative z-10 flex items-center">
              {CTA_SECTION_DATA.primaryButtonText}
              <ArrowRight className="ml-3 w-5 h-5" />
            </span>
          </motion.button>

          <motion.button
            className="relative bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg overflow-hidden group"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <span className="relative z-10">
              {CTA_SECTION_DATA.secondaryButtonText}
            </span>
          </motion.button>
        </div>

        {/* Decorative element */}
        <motion.div
          className="flex justify-center mt-12"
          variants={itemVariants}
        >
          <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
