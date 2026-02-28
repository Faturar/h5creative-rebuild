"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import Navbar from "@/app/components/Navbar"
import logo1 from "@/public/assets/images/logos/logoipsum1.png"
import logo2 from "@/public/assets/images/logos/logoipsum2.png"
import logo3 from "@/public/assets/images/logos/logoipsum3.png"
import logo4 from "@/public/assets/images/logos/logoipsum4.png"
import eclipseImage from "@/public/assets/images/Ellipse.svg"

export default function Header() {
  const fadeUp = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.section
      id="Header"
      className="flex flex-col gap-[100px] bg-[#0B0B1B] relative"
      style={{ overflowAnchor: "none" }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
    >
      <motion.div
        className="z-10"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Navbar />
      </motion.div>
      <div className="hero container max-w-282.5 mx-auto flex justify-between items-center relative">
        <motion.div
          className="flex flex-col items-center justify-center gap-6 h-fit w-fit text-white z-10 text-center mx-auto"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1
            className="font-extrabold text-[80px] leading-22.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            H5 CREATIVE STUDIO
          </motion.h1>
          <motion.p
            className="font-semibold text-xl max-w-[880px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          >
            Our best works are based on creative ideas and inspired by many
            artistic and creative digital communities.
          </motion.p>
          <motion.button
            className="font-bold text-[18px] leading-9.75 rounded-[20px] p-[14px_36px] bg-[#CDF30E] text-[#0B0B1B] w-fit mt-8 transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Lets Grow Your Business
          </motion.button>
        </motion.div>
        <Image
          src={eclipseImage}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          alt="background icon"
        />
      </div>
      <motion.div
        className="company-logos w-full overflow-hidden pb-47.5"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="group/slider flex flex-nowrap w-max items-center">
          <div className="logo-container animate-[slide_25s_linear_infinite] group-hover/slider:pause-animate flex gap-17.5 pl-17.5 items-center flex-nowrap">
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo1}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo2}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo3}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo4}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo1}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo2}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo3}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo4}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
          </div>
          <div className="logo-container animate-[slide_25s_linear_infinite] group-hover/slider:pause-animate flex gap-17.5 pl-17.5 items-center flex-nowrap">
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo1}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo2}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo3}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo4}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo1}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo2}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo3}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo4}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="stats container max-w-282.5 mx-auto bg-linear-to-r from-[#FFEDD3] to-[#FFCD83] flex justify-between items-center px-25 rounded-[30px] w-full h-45 absolute transform -translate-x-1/2 translate-y-1/2 bottom-0 left-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">20+</p>
          <p className="font-semibold text-lg">Employes</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">1000+</p>
          <p className="font-semibold text-lg">Design Created</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">10+</p>
          <p className="font-semibold text-lg">Commercial</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">100+</p>
          <p className="font-semibold text-lg">Project</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">80+</p>
          <p className="font-semibold text-lg">UMKM</p>
        </div>
      </motion.div>
    </motion.section>
  )
}
