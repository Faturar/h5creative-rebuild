"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, Easing } from "framer-motion"
import { ArrowRight, CheckCircle2, DollarSign, Star } from "lucide-react"

import { services } from "@/app/constants/services"

import Navbar from "@/app/components/home/Navbar"
import FooterFix from "@/app/components/home/FooterFix"

import logoTesti5 from "@/public/assets/images/logos/logo-testi5.svg"
import starIcon from "@/public/assets/images/icons/Star.svg"

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

export default function ServicesPage() {
  return (
    <main className="w-full bg-[#0B0B1B] min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="w-full py-20 md:py-32 lg:py-40 px-8 lg:px-16 bg-gradient-to-b from-[#0B0B1B] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              variants={itemVariants}
            >
              Our Services
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
              variants={itemVariants}
            >
              Comprehensive digital solutions to help your brand grow. From
              brand activation to digital marketing, we provide end-to-end
              services tailored to your business needs.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[#4920E5] rounded-full">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-white">
                  14+ Services
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#12BB74] rounded-full">
                <DollarSign className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-white">
                  Transparent Pricing
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#4920E5] rounded-full">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-white">
                  Expert Team
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-[#0B0B1B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {services.map((service) => (
              <Link key={service.slug} href={`/service/${service.slug}`}>
                <motion.div
                  className="group relative h-full bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-[30px] p-6 md:p-8 border border-white/10 hover:border-[#4920E5] transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Pricing Badge */}
                  {service.pricing && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#4920E5] to-[#6B21A8] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Pricing Available
                    </div>
                  )}

                  {/* Icon */}
                  {service.icon && (
                    <div className="w-14 h-14 rounded-xl bg-[#4920E5]/10 flex items-center justify-center mb-4 group-hover:bg-[#4920E5] transition-colors duration-300">
                      <service.icon className="w-7 h-7 text-[#4920E5] group-hover:text-white transition-colors duration-300" />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#4920E5] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Features Preview */}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {service.features.length > 3 && (
                          <span className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded">
                            +{service.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#4920E5] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-gradient-to-r from-[#4920E5] to-[#6B21A8]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={index}
                    src={starIcon}
                    className="w-6 h-6"
                    alt="star"
                  />
                ))}
              </div>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Let&apos;s discuss how we can help you achieve your business goals
              with our comprehensive digital services.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#4920E5] font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[#4920E5] transition-all duration-300"
              >
                Learn About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <FooterFix />
    </main>
  )
}
