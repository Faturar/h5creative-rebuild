"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

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

interface CTASectionProps {
  ctaTitle?: string
  ctaSubtitle?: string
}

export default function CTASection({ ctaTitle, ctaSubtitle }: CTASectionProps) {
  const displayTitle = ctaTitle || "Let's Build Something Great Together"
  const displaySubtitle =
    ctaSubtitle ||
    "Ready to transform your digital presence? Let's create something amazing that drives real business results."
  return (
    <section className="py-20 bg-gradient-to-br from-[#2E2BFF] to-[#1C1AFF] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-8 lg:px-16 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            variants={itemVariants}
          >
            {displayTitle}
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {displaySubtitle}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              href="/book"
              className="inline-flex items-center gap-3 bg-white text-[#2E2BFF] font-bold px-10 py-5 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 text-white/80"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Results-driven approach</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
