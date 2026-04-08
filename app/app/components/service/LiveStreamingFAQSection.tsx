"use client"

import { useState } from "react"
import { motion, AnimatePresence, Easing } from "framer-motion"
import { MessageCircle, ChevronDown } from "lucide-react"

import { liveStreamingFAQ } from "@/app/constants/faq"

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function LiveStreamingFAQSection() {
  const [active, setActive] = useState<number | null>(
    liveStreamingFAQ.defaultActiveIndex,
  )

  return (
    <motion.section
      className="w-full bg-white py-20 md:py-32 px-8 lg:px-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
          >
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 flex rounded-full 
            bg-gradient-to-br from-[#2E2BFF] to-[#1C1AFF] 
            items-center justify-center 
            "
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-[36px] md:text-[48px] font-semibold uppercase tracking-tight text-gray-900">
                {liveStreamingFAQ.title}
              </h2>
              <p className="text-gray-500 mt-4 max-w-md text-sm md:text-base">
                {liveStreamingFAQ.description}
              </p>
            </motion.div>

            <motion.button
              className="inline-flex items-center gap-3 
              bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] 
              px-6 py-3 md:px-8 md:py-4 rounded-lg text-white font-semibold 
              
              transition-all duration-300 
              hover:scale-[1.03] 
               w-fit"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {liveStreamingFAQ.buttonText}
            </motion.button>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 md:gap-6"
            variants={containerVariants}
          >
            {liveStreamingFAQ.faqs.map((faq) => {
              const isOpen = active === faq.id - 1

              return (
                <motion.div
                  key={faq.id}
                  className={`rounded-xl md:rounded-2xl border transition-all duration-300
                  ${
                    isOpen
                      ? "border-[#2E2BFF]"
                      : "border-gray-200 hover:border-[#2E2BFF]/50"
                  }`}
                  variants={itemVariants}
                >
                  <button
                    onClick={() => setActive(isOpen ? null : faq.id - 1)}
                    className="w-full flex justify-between items-center p-4 md:p-6 text-left"
                  >
                    <motion.span
                      className={`text-lg md:text-xl font-semibold transition ${
                        isOpen ? "text-[#2E2BFF]" : "text-gray-900"
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {faq.question}
                    </motion.span>

                    <motion.div transition={{ duration: 0.3 }}>
                      <ChevronDown
                        className={`w-4 h-4 md:w-5 md:h-5 text-[#2E2BFF] transition duration-300 ${
                          isOpen ? "rotate-180 opacity-100" : "opacity-60"
                        }`}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          className="px-4 md:px-6 pb-4 md:pb-6"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
