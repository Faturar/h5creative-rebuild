"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

import logo from "@/public/assets/images/logos/logo.png"
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
      className="bg-[#0B0B0D] text-white border-t border-white/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container max-w-7xl mx-auto flex justify-between pt-[100px] pb-[60px] relative border-b border-white/10">
        {/* Optional subtle background element */}
        <Image
          src={eclipseImage}
          className="absolute h-[280px] top-[60px] -left-[40px] opacity-10"
          alt="background"
        />

        {/* LOGO */}
        <motion.div
          className="flex shrink-0 h-fit z-10"
          variants={itemVariants}
        >
          <Image src={logo} alt="logo" className="w-20 h-20 object-contain" />
        </motion.div>

        {/* LINKS */}
        <motion.div
          className="flex gap-[90px] z-10"
          variants={containerVariants}
        >
          {/* EXPLORE */}
          <motion.div className="flex flex-col gap-5" variants={itemVariants}>
            <p className="font-semibold uppercase text-sm tracking-wide text-white">
              Explore
            </p>

            {["Services", "Testimonials", "Pricing", "About"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-400 transition duration-300 hover:text-[#2E2BFF]"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>

          {/* SERVICES */}
          <motion.div className="flex flex-col gap-5" variants={itemVariants}>
            <p className="font-semibold uppercase text-sm tracking-wide text-white">
              Services
            </p>

            {[
              "UI/UX Design",
              "Web Development",
              "Data Science",
              "Digital Marketing",
            ].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-400 transition duration-300 hover:text-[#2E2BFF]"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>

          {/* ABOUT */}
          <motion.div className="flex flex-col gap-5" variants={itemVariants}>
            <p className="font-semibold uppercase text-sm tracking-wide text-white">
              About
            </p>

            {["My Profile", "How Do I Work", "Achievements", "Team A"].map(
              (item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-400 transition duration-300 hover:text-[#2E2BFF]"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.a>
              ),
            )}
          </motion.div>

          {/* CONNECT */}
          <motion.div className="flex flex-col gap-5" variants={itemVariants}>
            <p className="font-semibold uppercase text-sm tracking-wide text-white">
              Connect
            </p>

            <motion.a
              href="#"
              className="flex items-center gap-2 text-gray-400 transition duration-300 hover:text-[#2E2BFF]"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Image src={callIcon} alt="icon" />
              +1 2208 1996
            </motion.a>

            <motion.a
              href="#"
              className="flex items-center gap-2 text-gray-400 transition duration-300 hover:text-[#2E2BFF]"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Image src={dribbbleIcon} alt="icon" />
              buildwithangga
            </motion.a>

            <motion.a
              href="#"
              className="flex items-center gap-2 text-gray-400 transition duration-300 hover:text-[#2E2BFF]"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Image src={smsIcon} alt="icon" />
              team@bwa.com
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <motion.div
        className="py-6 text-center text-sm text-gray-500"
        variants={itemVariants}
      >
        All Rights Reserved. © 2026 YourBrand.
      </motion.div>
    </motion.footer>
  )
}
