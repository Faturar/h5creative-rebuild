"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { HEADER_DATA } from "@/app/constants/landingPageData"

import Navbar from "./Navbar"
import LogoSection from "./LogoSection"
import StatisticSection from "./StatisticSection"

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
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function Header() {
  return (
    <motion.section
      id="Header"
      className="flex flex-col gap-8 bg-[#0B0B1B] relative h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Navbar />
      {/* <div className="hero container max-w-7xl mx-auto flex justify-between items-center relative">
        <div className="flex flex-col gap-12.5 h-fit w-fit text-white z-10">
          <p className="font-semibold text-2xl">I'm Shayna 👋</p>
          <h1 className="font-extrabold text-[80px] leading-22.5">
            Professional Designer & Dev
          </h1>
          <button className="font-bold text-[26px] leading-9.75 rounded-[30px] p-[30px_40px] bg-[#4920E5] w-fit transition-all duration-300 hover:shadow-[0_10px_20px_0_#4920E5]">
            Explore Now
          </button>
        </div>
        <div className="flex max-w-117.75 max-h-141.75 z-10">
          <Image
            src={heroImage}
            className="w-full h-full object-contain"
            alt="hero image"
          />
        </div>
        <Image
          src={eclipseImage}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          alt="background icon"
        />
      </div> */}
      <motion.div
        className="hero container max-w-7xl mx-auto flex justify-between items-center relative"
        variants={containerVariants}
      >
        <div className="relative flex h-[80vh] w-full items-center justify-between bg-[#0B0B1B]">
          {/* LEFT CONTENT */}
          <motion.div className="text-white" variants={containerVariants}>
            <motion.h1
              className="text-[72px] leading-[1.05] font-extrabold tracking-tight lg:text-[72px]"
              variants={itemVariants}
            >
              {HEADER_DATA.title}{" "}
              <span className="inline-block bg-[#2E2BFF] px-6 py-2">
                {HEADER_DATA.highlightedText}
              </span>{" "}
            </motion.h1>

            <motion.p
              className="mt-8 max-w-[650px] text-lg leading-8 text-white/80"
              variants={itemVariants}
            >
              {HEADER_DATA.description}
            </motion.p>

            <motion.button
              className="mt-16 inline-flex items-center gap-4 rounded-lg bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] px-8 py-4 text-lg font-semibold text-white shadow-[0_8px_25px_rgba(46,43,255,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(46,43,255,0.5)]"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-6 h-6" />
              {HEADER_DATA.buttonText}
            </motion.button>
          </motion.div>

          {/* RIGHT SIDE VISUAL */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-[420px] w-[420px] overflow-hidden rounded-[28px] shadow-2xl">
              <Image
                src={HEADER_DATA.heroImage}
                alt={HEADER_DATA.heroAlt}
                fill
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* <LogoSection /> */}
      {/* <StatisticSection /> */}
    </motion.section>
  )
}
