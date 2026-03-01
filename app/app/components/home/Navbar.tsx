"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

import logo from "@/public/assets/images/logos/logo.png"

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function Navbar() {
  return (
    <motion.nav
      className="container max-w-7xl mx-auto flex justify-between items-center py-8 z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.a
        href="#"
        className="flex shrink-0"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Image src={logo} alt="logo" className="w-16 h-16 object-contain" />
      </motion.a>
      <motion.div
        className="flex gap-[50px] items-center"
        variants={containerVariants}
      >
        <motion.ul
          className="flex gap-[50px] items-center text-white"
          variants={containerVariants}
        >
          {["Home", "Services", "Testimonials", "Pricing", "About"].map(
            (item) => (
              <motion.li key={item} variants={itemVariants}>
                <motion.a
                  href="#"
                  className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.a>
              </motion.li>
            ),
          )}
        </motion.ul>
        <motion.button
          className="inline-flex items-center gap-4 rounded-lg 
          bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] 
          px-6 py-2.5 font-semibold text-white 
          shadow-[0_8px_25px_rgba(46,43,255,0.35)] 
          transition-all duration-300 
          hover:scale-[1.03] 
          hover:shadow-[0_12px_35px_rgba(46,43,255,0.5)]"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Konsultasi Sekarang
        </motion.button>
      </motion.div>
    </motion.nav>
  )
}
