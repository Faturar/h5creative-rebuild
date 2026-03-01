"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

const clients = [
  "/assets/clients/client1.png",
  "/assets/clients/client2.png",
  "/assets/clients/client3.png",
  "/assets/clients/client4.png",
  "/assets/clients/client5.png",
  "/assets/clients/client6.png",
  "/assets/clients/client7.png",
  "/assets/clients/client8.png",
  "/assets/clients/client9.png",
  "/assets/clients/client10.png",
  "/assets/clients/client11.png",
  "/assets/clients/client12.png",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

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

export default function ClientsSection() {
  return (
    <motion.section
      className="w-full bg-[#0B0B0D] py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <h2 className="text-[56px] font-semibold uppercase tracking-tight text-white">
            OUR CLIENTS
          </h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* LOGO GRID */}
        <motion.div
          className="grid grid-cols-4 md:grid-cols-6 gap-10"
          variants={containerVariants}
        >
          {clients.map((logo, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center 
              bg-white/5 
              border border-white/10 
              rounded-2xl 
              h-28 
              backdrop-blur-md
              transition-all duration-300
              hover:bg-[#2E2BFF]/10
              hover:border-[#2E2BFF]/40
              hover:shadow-[0_0_25px_rgba(46,43,255,0.4)]"
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={logo}
                alt="Client Logo"
                width={120}
                height={60}
                className="object-contain opacity-70 hover:opacity-100 transition"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
