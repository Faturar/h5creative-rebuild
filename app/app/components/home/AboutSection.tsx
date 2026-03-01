"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function CorporateSection() {
  return (
    <motion.section
      className="w-full bg-[#F4ECE4] py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1fr_1.05fr] items-center gap-16">
        {/* LEFT IMAGE */}
        <motion.div
          className="relative h-[420px] lg:h-[520px] overflow-hidden rounded-[32px] shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978"
            alt="Team Working"
            fill
            className="object-cover"
            priority
          />

          {/* Premium Badge */}
          <motion.div
            className="absolute bottom-6 left-6 rounded-2xl bg-green-500 px-6 py-4 text-white shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-2xl font-bold leading-none">28+</p>
            <p className="text-xs uppercase tracking-wide opacity-90">
              Years Experience
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
        >
          <motion.h2
            className="text-[44px] leading-[1.05] font-semibold text-[#14131a] lg:text-[60px]"
            variants={itemVariants}
          >
            Powerful Agency
            <br />
            For Corporate
            <br />
            Business.
          </motion.h2>

          <motion.p
            className="mt-8 max-w-[560px] text-base leading-8 text-[#6B6872]"
            variants={itemVariants}
          >
            We strive to develop real-world web solutions that are ideal for
            small to large projects with bespoke project requirements.
          </motion.p>

          {/* Premium Gradient Button */}
          <motion.button
            type="button"
            className="mt-10 btn-primary inline-flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read About Us
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px]">
              -&gt;
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
