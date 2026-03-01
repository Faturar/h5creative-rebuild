"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

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

export default function RecentWorkSection() {
  return (
    <motion.section
      className="w-full bg-[#0B0B0D] text-white py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-20 items-start">
          {/* LEFT COLUMN */}
          <motion.div className="w-1/2 space-y-28" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h2 className="text-[64px] leading-[1.05] font-semibold uppercase tracking-tight">
                TAKE A LOOK AT <br />
                OUR RECENT WORK
              </h2>
            </motion.div>

            <ProjectCard
              image="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e"
              height="h-[460px]"
            />

            <ProjectCard
              image="https://images.unsplash.com/photo-1558655146-9f40138edfeb"
              height="h-[420px]"
            />
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            className="w-1/2 space-y-28 mt-24"
            variants={containerVariants}
          >
            <ProjectCard
              image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
              height="h-[440px]"
            />

            <ProjectCard
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              height="h-[420px]"
            />

            {/* CTA BLOCK */}
            <motion.div variants={itemVariants}>
              <p className="text-gray-400 mb-8 max-w-md">
                We strive to develop real-world web solutions that are ideal for
                small to large projects with bespoke project requirements.
              </p>

              <motion.button
                className="inline-flex items-center gap-3 
                bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] 
                px-8 py-4 rounded-lg text-white font-semibold 
                shadow-[0_8px_25px_rgba(46,43,255,0.35)] 
                transition-all duration-300 
                hover:scale-[1.03] 
                hover:shadow-[0_12px_35px_rgba(46,43,255,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More Projects
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px]">
                  →
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function ProjectCard({ image, height }: { image: string; height: string }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative w-full ${height} rounded-[28px] overflow-hidden group`}
      >
        <Image
          src={image}
          alt="Project"
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Optional subtle overlay on hover */}
        <div className="absolute inset-0 bg-[#2E2BFF]/0 group-hover:bg-[#2E2BFF]/10 transition duration-500" />
      </div>

      <div className="text-sm text-gray-400 mt-6">
        2024 &nbsp; • &nbsp; Cary Neville
      </div>

      <motion.h3
        className="text-2xl font-medium leading-snug mt-3 
        transition-all duration-300 
        cursor-pointer 
        hover:text-[#2E2BFF] 
        hover:drop-shadow-[0_0_10px_rgba(46,43,255,0.5)]"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        A Workplace Consultancy Creating Inspiring Environments
      </motion.h3>
    </motion.div>
  )
}
