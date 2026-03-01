"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

import messagesNotifIcon from "@/public/assets/images/icons/messages-notif.svg"
import programmingNotifIcon from "@/public/assets/images/icons/programming-notif.svg"
import likeNotifIcon from "@/public/assets/images/icons/like-notif.svg"

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
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function Workflow() {
  return (
    <motion.section
      id="Workflow"
      className="container max-w-[1130px] mx-auto pt-[100px] pb-[200px] relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="flex flex-col gap-[50px] justify-center">
        <motion.h2
          className="font-extrabold text-[50px] leading-[70px] text-center"
          variants={itemVariants}
        >
          My Workflow Suitable <br />
          For Any Project
        </motion.h2>
        <motion.div
          className="flex justify-between items-center"
          variants={containerVariants}
        >
          <motion.div
            className="w-[350px] flex flex-col shrink-0 gap-[30px] items-center"
            variants={itemVariants}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-none">
              <Image src={messagesNotifIcon} alt="icon" />
            </div>
            <div className="flex flex-col gap-[10px] text-center">
              <p className="font-extrabold text-[22px] leading-[33px]">
                Research & Validate
              </p>
              <p className="text-lg leading-[34px]">
                Ensuring all requirements were matching with market conditions
              </p>
            </div>
          </motion.div>
          <motion.div
            className="w-[350px] flex flex-col shrink-0 gap-[30px] items-center"
            variants={itemVariants}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-none">
              <Image src={programmingNotifIcon} alt="icon" />
            </div>
            <div className="flex flex-col gap-[10px] text-center">
              <p className="font-extrabold text-[22px] leading-[33px]">
                Building with Teams
              </p>
              <p className="text-lg leading-[34px]">
                Working with agile framework to product a better results
              </p>
            </div>
          </motion.div>
          <motion.div
            className="w-[350px] flex flex-col shrink-0 gap-[30px] items-center"
            variants={itemVariants}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-none">
              <Image src={likeNotifIcon} alt="icon" />
            </div>
            <div className="flex flex-col gap-[10px] text-center">
              <p className="font-extrabold text-[22px] leading-[33px]">
                Deliver to Clients
              </p>
              <p className="text-lg leading-[34px]">
                We bring an instant results to the clients so that they are
                happys
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="stats container max-w-[1130px] mx-auto bg-gradient-to-r from-[#FFEDD3] to-[#FFCD83] flex justify-between items-center px-[100px] rounded-[30px] w-full h-[180px] absolute transform -translate-x-1/2 translate-y-1/2 bottom-0 left-1/2"
        variants={statVariants}
      >
        <motion.div
          className="text-center w-fit h-fit"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-extrabold text-[40px] leading-[60px]">$230M</p>
          <p className="font-semibold text-lg">Valuation</p>
        </motion.div>
        <motion.div
          className="text-center w-fit h-fit"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-extrabold text-[40px] leading-[60px]">31,934</p>
          <p className="font-semibold text-lg">Projects</p>
        </motion.div>
        <motion.div
          className="text-center w-fit h-fit"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-extrabold text-[40px] leading-[60px]">245</p>
          <p className="font-semibold text-lg">Startups IPO</p>
        </motion.div>
        <motion.div
          className="text-center w-fit h-fit"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-extrabold text-[40px] leading-[60px]">9/10</p>
          <p className="font-semibold text-lg">Successful</p>
        </motion.div>
        <motion.div
          className="text-center w-fit h-fit"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-extrabold text-[40px] leading-[60px]">562</p>
          <p className="font-semibold text-lg">Companies</p>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
