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

export default function Services() {
  return (
    <motion.section
      id="Services"
      className="container max-w-[1130px] mx-auto pt-[190px] pb-[100px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="flex flex-col gap-[50px]">
        <motion.div
          className="flex justify-between items-center"
          variants={itemVariants}
        >
          <h2 className="font-extrabold text-[50px] leading-[70px]">
            Actually, I Do Design <br />& Code for Living
          </h2>
          <motion.a
            href="#"
            className="font-bold text-lg bg-[#0B0B1B] rounded-full w-fit h-fit p-[14px_30px] text-white transition-all duration-300 hover:bg-white hover:text-[#0B0B1B] hover:ring hover:ring-[#0B0B1B]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Services
          </motion.a>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-[30px]"
          variants={containerVariants}
        >
          <motion.div
            className="p-[50px] pb-0 rounded-[30px] flex flex-col gap-[50px] bg-[#F4F5F8]"
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-center justify-center shrink-0 w-20 h-20 rounded-full bg-[#4920E5]"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={crownIcon}
                className="w-10 h-10 object-contain"
                alt="icon"
              />
            </motion.div>
            <div className="flex flex-col gap-5">
              <p className="font-extrabold text-[32px] leading-[48px]">
                High-Quality Mobile App UI/UX Design
              </p>
              <p className="text-lg leading-[34px]">
                Delivering great experience to users so that they are
                comfortable while using your product.
              </p>
            </div>
            <div className="w-full h-[350px]">
              <Image
                src={services1}
                className="w-full object-contain"
                alt="image"
              />
            </div>
          </motion.div>
          <motion.div
            className="p-[50px] pb-0 rounded-[30px] flex flex-col gap-[50px] bg-[#F4F5F8]"
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-center justify-center shrink-0 w-20 h-20 rounded-full bg-[#12BB74]"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={codeIcon}
                className="w-10 h-10 object-contain"
                alt="icon"
              />
            </motion.div>
            <div className="flex flex-col gap-5">
              <p className="font-extrabold text-[32px] leading-[48px]">
                AI Business Dashboard Finance Company
              </p>
              <p className="text-lg leading-[34px]">
                Delivering great experience to users so that they are
                comfortable while using product.
              </p>
            </div>
            <div className="w-full h-[350px]">
              <Image
                src={services2}
                className="w-full object-contain"
                alt="image"
              />
            </div>
          </motion.div>
          <motion.div
            className="col-span-2 p-[50px] pb-0 rounded-[30px] flex gap-[50px] bg-[#F4F5F8]"
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-[50px]">
              <motion.div
                className="flex items-center justify-center shrink-0 w-20 h-20 rounded-full bg-[#E64D56]"
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
                <p className="font-extrabold text-[32px] leading-[48px]">
                  Robust Plugins Connected Machine Learning
                </p>
                <p className="text-lg leading-[34px]">
                  Delivering great experience to users so that they are
                  comfortable while using your product to grow.
                </p>
              </div>
            </div>
            <div className="w-[450px] h-[350px] flex shrink-0">
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
