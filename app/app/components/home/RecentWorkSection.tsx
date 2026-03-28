"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { RECENT_WORK_SECTION_DATA } from "@/app/constants/landingPageData"

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

// Project Card Component
function ProjectCard({
  project,
}: {
  project: (typeof RECENT_WORK_SECTION_DATA.projects)[0]
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative w-full ${project.height} rounded-[20px] md:rounded-[28px] overflow-hidden group`}
      >
        <Image
          src={project.image}
          alt="Project"
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Optional subtle overlay on hover */}
        <div className="absolute inset-0 bg-[#2E2BFF]/0 group-hover:bg-[#2E2BFF]/10 transition duration-500" />
      </div>

      <div className="text-xs md:text-sm text-gray-400 mt-4 md:mt-6">
        {project.year} &nbsp; • &nbsp; {project.author}
      </div>

      <motion.h3
        className="text-lg md:text-2xl font-medium leading-snug mt-2 md:mt-3 
        transition-all duration-300 
        cursor-pointer 
        hover:text-[#2E2BFF] 
        hover:drop-shadow-[0_0_10px_rgba(46,43,255,0.5)]"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        {project.title}
      </motion.h3>
    </motion.div>
  )
}

export default function RecentWorkSection() {
  return (
    <motion.section
      className="w-full bg-[#0B0B0D] text-white py-20 md:py-32 lg:pt-16 lg:pb-28 xl:py-32 px-8 lg:px-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN */}
          <motion.div
            className="w-full lg:w-1/2 space-y-12 lg:space-y-20"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-[40px] leading-[1.05] md:text-[64px] font-semibold uppercase tracking-tight">
                {RECENT_WORK_SECTION_DATA.titleLine1} <br />
                {RECENT_WORK_SECTION_DATA.titleLine2}
              </h2>
              <p className="text-gray-400 mt-4 md:mt-6 max-w-md text-sm md:text-base">
                {RECENT_WORK_SECTION_DATA.description}
              </p>
            </motion.div>

            {/* First two projects */}
            {RECENT_WORK_SECTION_DATA.projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            className="w-full lg:w-1/2 space-y-16 lg:space-y-28 md:mt-8 lg:mt-24"
            variants={containerVariants}
          >
            {/* Next two projects */}
            {RECENT_WORK_SECTION_DATA.projects.slice(2, 4).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* CTA BLOCK */}
            <motion.div variants={itemVariants}>
              <motion.button
                className="inline-flex items-center gap-3 
                bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] 
                px-6 py-3 md:px-8 md:py-4 rounded-lg text-white font-semibold 
                shadow-[0_8px_25px_rgba(46,43,255,0.35)] 
                transition-all duration-300 
                hover:scale-[1.03] 
                hover:shadow-[0_12px_35px_rgba(46,43,255,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {RECENT_WORK_SECTION_DATA.buttonText}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
