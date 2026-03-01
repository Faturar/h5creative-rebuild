"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence, Easing } from "framer-motion"

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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function BusinessSection() {
  const [active, setActive] = useState<string | null>("Websites")

  const services = [
    {
      title: "Brand Identity",
      description:
        "We strive to develop real-world web solutions that are ideal for small to large projects with bespoke project requirements.",
      image: "/assets/images/laptop.png",
    },
    {
      title: "Websites",
      description:
        "We strive to develop real-world web solutions that are ideal for small to large projects with bespoke project requirements.",
      image: "/assets/images/laptop.png",
    },
    {
      title: "SEO",
      description:
        "We strive to develop real-world web solutions that are ideal for small to large projects with bespoke project requirements.",
      image: "/assets/images/laptop.png",
    },
    {
      title: "Shopify",
      description:
        "We strive to develop real-world web solutions that are ideal for small to large projects with bespoke project requirements.",
      image: "/assets/images/laptop.png",
    },
  ]

  return (
    <motion.section
      className="w-full bg-[#ffffff] py-40"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-16 items-start">
        {/* LEFT CONTENT */}
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
        >
          <motion.h1
            className="text-[64px] leading-[1.1] font-bold uppercase text-gray-900 mb-6"
            variants={itemVariants}
          >
            How We Take Your Business To The Next Level
          </motion.h1>

          <motion.p
            className="text-gray-500 max-w-lg mb-10"
            variants={itemVariants}
          >
            We are a digital marketing agency with expertise, and we're on a
            mission to help you take the next step in your business.
          </motion.p>

          {/* UPDATED BUTTON */}
          <motion.button
            className="inline-flex items-center gap-3 
          bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] 
          px-8 py-4 rounded-lg text-white font-semibold 
          shadow-[0_8px_25px_rgba(46,43,255,0.35)] 
          transition-all duration-300 
          hover:scale-[1.03] 
          hover:shadow-[0_12px_35px_rgba(46,43,255,0.5)]"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Services
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px]">
              →
            </span>
          </motion.button>
        </motion.div>

        {/* RIGHT SERVICES */}
        <motion.div className="space-y-6" variants={containerVariants}>
          {services.map((service, index) => {
            const isActive = active === service.title

            return (
              <motion.div
                key={service.title}
                className="border-b border-gray-200 pb-6"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => setActive(isActive ? null : service.title)}
                  className="w-full flex justify-between items-center text-left group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.h3
                    className={`text-3xl font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#2E2BFF]"
                        : "text-gray-900 group-hover:text-[#2E2BFF]"
                    }`}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.span
                    className={`text-2xl transition-all duration-300 ${
                      isActive
                        ? "text-[#2E2BFF]"
                        : "text-gray-400 group-hover:text-[#2E2BFF]"
                    }`}
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ⌃
                  </motion.span>
                </motion.button>

                {/* ACCORDION CONTENT */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        className="flex gap-8 items-center mt-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="max-w-sm text-gray-500 text-sm leading-relaxed">
                          {service.description}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
