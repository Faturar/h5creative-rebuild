"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence, Easing } from "framer-motion"

import messagesIcon from "@/public/assets/images/icons/messages.svg"
import arrowCircleDownIcon from "@/public/assets/images/icons/arrow-circle-down.svg"

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

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0)

  const faqs = [
    {
      question: "How Do I Work Usually?",
      answer:
        "As a freelancer, my work process is characterized by flexibility, self-discipline, and strong client communication.",
    },
    {
      question: "How Much Do I Charge Per Project?",
      answer:
        "I don't charge hourly. I charge based on the project brief and given timeline to finish that particular project.",
    },
    {
      question: "Can I Work Full-Time?",
      answer:
        "I don't work full-time. At this moment, I prefer to work remotely and based on certain projects only.",
    },
  ]

  return (
    <motion.section
      className="w-full bg-white py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-20 items-start">
          {/* LEFT SIDE */}
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
          >
            <motion.div
              className="w-20 h-20 flex rounded-full 
            bg-gradient-to-br from-[#2E2BFF] to-[#1C1AFF] 
            items-center justify-center 
            "
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={messagesIcon} alt="icon" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-[48px] font-semibold uppercase tracking-tight text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 mt-4 max-w-md">
                If you have any questions, feel free to contact us anytime.
              </p>
            </motion.div>

            <motion.button
              className="inline-flex items-center gap-3 
              bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] 
              px-8 py-4 rounded-lg text-white font-semibold 
              
              transition-all duration-300 
              hover:scale-[1.03] 
               w-fit"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* RIGHT SIDE ACCORDION */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
          >
            {faqs.map((faq, index) => {
              const isOpen = active === index

              return (
                <motion.div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300
                  ${
                    isOpen
                      ? "border-[#2E2BFF]"
                      : "border-gray-200 hover:border-[#2E2BFF]/50"
                  }`}
                  variants={itemVariants}
                >
                  <button
                    onClick={() => setActive(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <motion.span
                      className={`text-xl font-semibold transition ${
                        isOpen ? "text-[#2E2BFF]" : "text-gray-900"
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {faq.question}
                    </motion.span>

                    <motion.div transition={{ duration: 0.3 }}>
                      <Image
                        src={arrowCircleDownIcon}
                        alt="arrow"
                        className={`transition duration-300 ${
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
                          className="px-6 pb-6"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <p className="text-gray-500 leading-relaxed">
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
