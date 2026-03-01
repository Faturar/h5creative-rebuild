"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

import logo from "@/public/assets/images/logos/logo.svg"
import eclipseImage from "@/public/assets/images/Ellipse.svg"
import callIcon from "@/public/assets/images/icons/call.svg"
import dribbbleIcon from "@/public/assets/images/icons/dribbble.svg"
import smsIcon from "@/public/assets/images/icons/sms.svg"

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

export default function Footer() {
  return (
    <motion.footer
      className="bg-[#0B0B1B] text-white pb-[50px] border-t-[10px] border-[#4920E5]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container max-w-[1130px] mx-auto flex justify-between pt-[100px] pb-[50px] mb-[50px] relative border-b border-[#585867]">
        <Image
          src={eclipseImage}
          className="absolute h-[300px] top-[70px] -left-[20px] z-0"
          alt="icon"
        />
        <motion.div
          className="flex shrink-0 h-fit z-10"
          variants={itemVariants}
        >
          <Image src={logo} alt="logo" />
        </motion.div>
        <motion.div
          className="flex gap-[100px] z-10"
          variants={containerVariants}
        >
          <motion.div className="flex flex-col gap-5" variants={itemVariants}>
            <p className="font-bold text-lg">Explore</p>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              Services
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              Testimonials
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              Pricing
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              About
            </a>
          </motion.div>
          <motion.div className="flex flex-col gap-5" variants={itemVariants}>
            <p className="font-bold text-lg">Services</p>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              UI/UX Design
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              Web Development
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              Data Science
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              Digital Marketing
            </a>
          </motion.div>
          <motion.div className="flex flex-col gap-5" variants={itemVariants}>
            <p className="font-bold text-lg">About</p>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              My Profile
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              How do I work
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              Achievements
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300"
            >
              Team A
            </a>
          </motion.div>
          <motion.div className="flex flex-col gap-5" variants={itemVariants}>
            <p className="font-bold text-lg">Connect</p>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300 flex items-center gap-[6px]"
            >
              <Image src={callIcon} alt="icon" />
              +1 2208 1996
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300 flex items-center gap-[6px]"
            >
              <Image src={dribbbleIcon} alt="icon" />
              buildwithangga
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300 flex items-center gap-[6px]"
            >
              <Image src={smsIcon} alt="icon" />
              team@bwa.com
            </a>
          </motion.div>
        </motion.div>
      </div>
      <motion.p
        className="text-sm text-[#A0A0AC] text-center"
        variants={itemVariants}
      >
        All Rights Reserved. Copyright BuildWithAngga 2024.
      </motion.p>
    </motion.footer>
  )
}
