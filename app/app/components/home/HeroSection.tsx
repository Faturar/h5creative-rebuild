"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

import logo1 from "@/public/assets/images/logos/logoipsum1.png"
import logo2 from "@/public/assets/images/logos/logoipsum2.png"
import logo3 from "@/public/assets/images/logos/logoipsum3.png"
import logo4 from "@/public/assets/images/logos/logoipsum4.png"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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

const floatVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
      delay: 0.4,
    },
  },
}

export default function HeroSection() {
  return (
    <section className="section-wrap pt-8 md:pt-10">
      <motion.div
        className="grid items-center gap-8 md:gap-14 lg:grid-cols-[1.1fr_0.9fr] max-w-7xl mx-auto px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT SIDE */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="flex items-center gap-3 text-sm text-[#6f6c74]"
            variants={itemVariants}
          >
            <span className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-pink-100 text-[10px] md:text-[11px] font-semibold text-pink-500">
              SUP
            </span>
            On demand live support
          </motion.div>

          <motion.h1
            className="mt-6 text-[36px] md:text-[52px] leading-[0.96] font-semibold text-[#111116] sm:text-[64px] lg:text-[78px]"
            variants={itemVariants}
          >
            Awesome
            <br />
            Solution For
            <br />
            Your Business
          </motion.h1>

          <motion.div
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4"
            variants={itemVariants}
          >
            <motion.button
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-3 md:px-8 md:py-4 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <span className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-white/20 text-xs">
                →
              </span>
            </motion.button>

            <motion.button
              className="inline-flex items-center gap-3 rounded-full bg-[#efe6de] px-6 py-3 md:px-8 md:py-4 text-sm font-medium text-[#1c1c22] transition hover:bg-[#e6ddd4]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
              <span className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-white text-xs">
                →
              </span>
            </motion.button>
          </motion.div>

          <motion.p
            className="mt-6 md:mt-8 max-w-[480px] text-sm md:text-base leading-7 md:leading-8 text-[#6f6c74]"
            variants={itemVariants}
          >
            We create compelling web designs that are right-fit for your target
            groups and built for measurable business growth.
          </motion.p>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="relative mx-auto w-full max-w-[320px] md:max-w-[400px] lg:mx-0 lg:justify-self-end"
          variants={floatVariants}
        >
          {/* Growth Card */}
          <motion.div
            className="absolute -left-6 md:-left-10 top-4 md:top-6 z-10 rounded-[18px] md:rounded-[22px] bg-[#111116] px-4 md:px-5 py-4 md:py-5 text-white shadow-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-xs text-gray-400">Growth Index</p>
            <p className="mt-1 text-2xl md:text-3xl font-bold">99%</p>
            <div className="mt-3 flex gap-1.5">
              {[18, 24, 20, 26, 22].map((bar, index) => (
                <motion.span
                  key={index}
                  className="w-2 rounded-full bg-purple-500"
                  style={{ height: `${bar}px` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Main Image */}
          <motion.div
            className="relative h-[320px] md:h-[420px] overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#d9dbe2] shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978"
              alt="Business portrait"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Bottom Floating Card */}
          <motion.div
            className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 rounded-[18px] md:rounded-[22px] bg-white px-4 md:px-5 py-3 md:py-4 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-[10px] md:text-[11px] text-[#6f6c74]">01</p>
            <p className="text-xs md:text-sm font-semibold text-[#111116]">
              Decided Quality
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* LOGO STRIP */}
      <motion.div
        className="mt-12 md:mt-16 overflow-hidden border-t border-[#e7e3ec] pt-6 md:pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="group/slider flex w-max items-center">
          {[1, 2].map((loop) => (
            <div
              key={loop}
              className="flex animate-[slide_25s_linear_infinite] items-center gap-8 md:gap-14 pr-8 md:pr-14 group-hover/slider:[animation-play-state:paused]"
            >
              {[logo1, logo2, logo3, logo4, logo1, logo2, logo3, logo4].map(
                (logo, index) => (
                  <motion.div
                    key={index}
                    className="h-5 md:h-7 shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Image
                      src={logo}
                      alt="client logo"
                      className="h-full w-auto object-contain grayscale brightness-75 contrast-75 opacity-70 transition-all duration-500 hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:opacity-100"
                    />
                  </motion.div>
                ),
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
