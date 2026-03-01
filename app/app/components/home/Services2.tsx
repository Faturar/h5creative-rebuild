"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

import services1 from "@/public/assets/images/services1.png"
import services2 from "@/public/assets/images/services2.png"
import services3 from "@/public/assets/images/services3.png"
import crownIcon from "@/public/assets/images/icons/crown.svg"
import codeIcon from "@/public/assets/images/icons/code.svg"
import cubeIcon from "@/public/assets/images/icons/3dcube.svg"

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

export default function Services2() {
  return (
    <motion.section
      id="Services"
      className="w-full bg-white py-[150px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          className="flex justify-between items-center mb-[70px]"
          variants={itemVariants}
        >
          <h2 className="font-bold text-[48px] leading-[1.1] uppercase text-gray-900">
            Actually, I Do Design <br /> & Code For Living
          </h2>

          <motion.a
            href="#"
            className="bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF]
            text-white font-semibold
            px-8 py-4 rounded-full
            transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Services
          </motion.a>
        </motion.div>

        {/* GRID */}
        <motion.div
          className="grid grid-cols-3 gap-[30px]"
          variants={containerVariants}
        >
          {/* CARD 1 */}
          <motion.div
            className="p-[50px] pb-0 rounded-[30px] flex flex-col gap-[40px] 
          bg-white border border-gray-200 
          hover:border-[#2E2BFF] transition duration-300"
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 40px rgba(46, 43, 255, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-5">
              <p className="font-semibold text-[28px] leading-[40px] text-gray-900">
                High-Quality Mobile App UI/UX Design
              </p>
              <p className="text-gray-500 leading-[30px]">
                Delivering great experience to users so that they are
                comfortable while using your product.
              </p>
            </div>

            <div className="w-full h-[320px]">
              <Image
                src={services1}
                className="w-full object-contain"
                alt="image"
              />
            </div>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            className="p-[50px] pb-0 rounded-[30px] flex flex-col gap-[40px] 
          bg-white border border-gray-200 
          hover:border-[#2E2BFF] transition duration-300"
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 40px rgba(46, 43, 255, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-5">
              <p className="font-semibold text-[28px] leading-[40px] text-gray-900">
                AI Business Dashboard Finance Company
              </p>
              <p className="text-gray-500 leading-[30px]">
                Delivering great experience to users so that they are
                comfortable while using product.
              </p>
            </div>

            <div className="w-full h-[320px]">
              <Image
                src={services2}
                className="w-full object-contain"
                alt="image"
              />
            </div>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            className="p-[50px] pb-0 rounded-[30px] flex flex-col gap-[40px] 
          bg-white border border-gray-200 
          hover:border-[#2E2BFF] transition duration-300"
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 40px rgba(46, 43, 255, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-5">
              <p className="font-semibold text-[28px] leading-[40px] text-gray-900">
                AI Business Dashboard Finance Company
              </p>
              <p className="text-gray-500 leading-[30px]">
                Delivering great experience to users so that they are
                comfortable while using product.
              </p>
            </div>

            <div className="w-full h-[320px]">
              <Image
                src={services2}
                className="w-full object-contain"
                alt="image"
              />
            </div>
          </motion.div>

          {/* LARGE CARD */}
          <motion.div
            className="col-span-3 p-[50px] pb-0 rounded-[30px] flex gap-[50px] 
          bg-white border border-gray-200 
          hover:border-[#2E2BFF] transition duration-300"
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 40px rgba(46, 43, 255, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-[40px]">
              <motion.div
                className="flex items-center justify-center w-20 h-20 rounded-full bg-[#2E2BFF]/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={cubeIcon}
                  className="w-10 h-10 object-contain"
                  alt="icon"
                />
              </motion.div>

              <div className="flex flex-col gap-5">
                <p className="font-semibold text-[28px] leading-[40px] text-gray-900">
                  Robust Plugins Connected Machine Learning
                </p>
                <p className="text-gray-500 leading-[30px]">
                  Delivering great experience to users so that they are
                  comfortable while using your product to grow.
                </p>
              </div>
            </div>

            <div className="w-[450px] h-[320px] flex shrink-0">
              <Image
                src={services3}
                className="w-full object-contain"
                alt="image"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
