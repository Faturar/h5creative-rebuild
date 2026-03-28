"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"
import { Phone, Mail, ArrowRight } from "lucide-react"

import { CONTACT_SECTION_DATA } from "@/app/constants/landingPageData"

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

export default function ContactSection() {
  return (
    <motion.section
      className="w-full bg-white pt-16 pb-24 xl:py-32 relative overflow-hidden px-8 lg:px-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E2BFF]/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2E2BFF]/3 rounded-full -ml-48 -mb-48"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-[40px] lg:text-[64px] leading-[1.1] font-bold uppercase text-gray-900 mb-6"
            variants={itemVariants}
          >
            {CONTACT_SECTION_DATA.title}
          </motion.h2>
          <motion.p
            className="text-base lg:text-xl text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {CONTACT_SECTION_DATA.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT COLUMN - CONTACT INFO */}
          <motion.div className="space-y-12" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <p className="text-lg text-gray-600 mb-8">
                {CONTACT_SECTION_DATA.description}
              </p>

              <div className="space-y-6">
                {CONTACT_SECTION_DATA.contactInfo.map((info) => (
                  <motion.a
                    key={info.id}
                    href={info.link}
                    className="flex items-center gap-4 text-gray-900 group"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#2E2BFF]/10 flex items-center justify-center group-hover:bg-[#2E2BFF]/20 transition-all duration-300">
                      {info.type === "Telepon" ? (
                        <Phone className="w-7 h-7 text-[#2E2BFF]" />
                      ) : (
                        <Mail className="w-7 h-7 text-[#2E2BFF]" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{info.type}</p>
                      <p className="font-medium group-hover:text-[#2E2BFF] transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Additional visual element */}
              <motion.div
                className="mt-12 p-6 bg-[#2E2BFF]/5 rounded-2xl border border-[#2E2BFF]/10"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700">
                  Kami siap membantu Anda 24/7. Hubungi kami untuk konsultasi
                  gratis tentang project Anda.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - CONTACT FORM */}
          <motion.div
            className="bg-[#0B0B0D] rounded-[30px] p-10 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Form decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2E2BFF]/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#2E2BFF]/5 rounded-full -ml-12 -mb-12"></div>

            <form className="space-y-6 relative z-10">
              {CONTACT_SECTION_DATA.formFields.map((field) => (
                <motion.div key={field.id} variants={itemVariants}>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2E2BFF] focus:border-transparent transition-all backdrop-blur-sm"
                      rows={5}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2E2BFF] focus:border-transparent transition-all backdrop-blur-sm"
                    />
                  )}
                </motion.div>
              ))}

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(46,43,255,0.3)] flex items-center justify-center"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {CONTACT_SECTION_DATA.buttonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
