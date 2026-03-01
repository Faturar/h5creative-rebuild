"use client"

import { motion, Easing } from "framer-motion"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function StatisticSection() {
  return (
    <motion.div
      className="stats container max-w-7xl mx-auto 
    bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] 
    flex justify-between items-center 
    px-20 rounded-[30px] w-full h-45 
    absolute transform -translate-x-1/2 translate-y-1/2 
    bottom-0 left-1/2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="text-center"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-extrabold text-[40px] text-white">$230M</p>
        <p className="font-semibold text-lg text-white/70">Valuation</p>
      </motion.div>

      <motion.div
        className="text-center"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-extrabold text-[40px] text-white">31,934</p>
        <p className="font-semibold text-lg text-white/70">Projects</p>
      </motion.div>

      <motion.div
        className="text-center"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-extrabold text-[40px] text-white">245</p>
        <p className="font-semibold text-lg text-white/70">Startups IPO</p>
      </motion.div>

      <motion.div
        className="text-center"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-extrabold text-[40px] text-white">9/10</p>
        <p className="font-semibold text-lg text-white/70">Successful</p>
      </motion.div>

      <motion.div
        className="text-center"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-extrabold text-[40px] text-white">562</p>
        <p className="font-semibold text-lg text-white/70">Companies</p>
      </motion.div>
    </motion.div>
  )
}
