"use client"

import Image, { type StaticImageData } from "next/image"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

interface TestimonialSectionProps {
  avatar: StaticImageData
  companyLogo?: StaticImageData
  quote?: string
  author?: string
  role?: string
}

export default function TestimonialSection({
  avatar,
  companyLogo,
  quote,
  author,
  role,
}: TestimonialSectionProps) {
  const displayQuote =
    quote ||
    "The team transformed our vision into reality. The new platform exceeded our expectations and delivered measurable business results. Our user engagement increased by 45% within first month of launch."
  const displayAuthor = author || "Sarah Chen"
  const displayRole = role || "CEO, FinTech Innovations Inc."
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-8 lg:px-16 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            className="bg-[#F8F9FA] rounded-3xl p-8 md:p-12 lg:p-16 relative"
            variants={itemVariants}
          >
            <motion.div
              className="text-6xl md:text-8xl text-[#2E2BFF] font-serif mb-6"
              variants={itemVariants}
            >
              &ldquo;
            </motion.div>

            <motion.p
              className="text-2xl md:text-3xl text-[#0B0B1B] leading-relaxed mb-8"
              variants={itemVariants}
            >
              The team transformed our vision into reality. The new platform
              exceeded our expectations and delivered measurable business
              results. Our user engagement increased by 45% within the first
              month of launch.
            </motion.p>

            <motion.div
              className="flex items-center gap-4"
              variants={itemVariants}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={avatar}
                  alt="Sarah Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-xl text-[#0B0B1B]">Sarah Chen</p>
                <p className="text-[#0B0B1B]/70">
                  CEO, FinTech Innovations Inc.
                </p>
              </div>
            </motion.div>

            {companyLogo && (
              <motion.div
                className="mt-8 pt-8 border-t border-[#0B0B1B]/10"
                variants={itemVariants}
              >
                <div className="w-32 md:w-40 opacity-50">
                  <Image
                    src={companyLogo}
                    alt="FinTech Innovations"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
