"use client"

import { useState } from "react"
import { motion, AnimatePresence, Easing } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

import { BUSINESS_SECTION_DATA } from "@/app/constants/landingPageData"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export default function BusinessSection() {
  const [active, setActive] = useState<string | null>(
    BUSINESS_SECTION_DATA.defaultActiveService,
  )

  return (
    <motion.section
      className="w-full bg-white py-20 md:py-24 lg:py-40 px-8 lg:px-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* LEFT CONTENT */}
        <motion.div className="flex flex-col gap-6 items-start">
          <motion.h1
            className="text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold uppercase text-gray-900"
            variants={itemVariants}
          >
            {BUSINESS_SECTION_DATA.title}
          </motion.h1>

          <motion.p className="text-gray-500 max-w-lg" variants={itemVariants}>
            {BUSINESS_SECTION_DATA.description}
          </motion.p>

          {/* BUTTON */}
          <motion.button
            className="hidden sm:inline-flex items-center gap-3 
              bg-linear-to-r from-[#2E2BFF] to-[#1C1AFF] 
              px-6 py-3 md:px-8 md:py-4 rounded-lg text-white font-semibold 
              shadow-[0_8px_25px_rgba(46,43,255,0.35)] 
              transition-all duration-300 
              hover:shadow-[0_12px_35px_rgba(46,43,255,0.5)]"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {BUSINESS_SECTION_DATA.buttonText}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* RIGHT SERVICES */}
        <motion.div className="space-y-6" variants={containerVariants}>
          {BUSINESS_SECTION_DATA.services.map((service) => {
            const isActive = active === service.title

            return (
              <motion.div
                key={service.id}
                className="border-b border-gray-200 pb-6"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => setActive(isActive ? null : service.title)}
                  className="w-full flex justify-between items-center text-left group"
                  whileHover={{ x: 5 }}
                >
                  <motion.h3
                    className={`text-2xl xl:text-3xl font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#2E2BFF]"
                        : "text-gray-900 group-hover:text-[#2E2BFF]"
                    }`}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className={`w-6 h-6 transition-all duration-300 ${
                        isActive
                          ? "text-[#2E2BFF]"
                          : "text-gray-400 group-hover:text-[#2E2BFF]"
                      }`}
                    />
                  </motion.div>
                </motion.button>

                {/* ACCORDION */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        className="mt-6 max-w-sm text-gray-500 text-sm leading-relaxed"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {service.description}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {/* BUTTON */}
          <motion.button
            className="sm:hidden inline-flex items-center mt-8 gap-3 
              bg-linear-to-r from-[#2E2BFF] to-[#1C1AFF] 
              px-6 py-3 md:px-8 md:py-4 rounded-lg text-white font-semibold 
              shadow-[0_8px_25px_rgba(46,43,255,0.35)] 
              transition-all duration-300 
              hover:shadow-[0_12px_35px_rgba(46,43,255,0.5)]"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {BUSINESS_SECTION_DATA.buttonText}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
