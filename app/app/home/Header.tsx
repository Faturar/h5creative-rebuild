"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import logo from "@/public/assets/images/logos/logo.png"
import logo1 from "@/public/assets/images/logos/logoipsum1.png"
import logo2 from "@/public/assets/images/logos/logoipsum2.png"
import logo3 from "@/public/assets/images/logos/logoipsum3.png"
import logo4 from "@/public/assets/images/logos/logoipsum4.png"
import heroImage from "@/public/assets/images/hero-image.png"
import eclipseImage from "@/public/assets/images/Ellipse.svg"

export default function Header() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      id="Header"
      className="flex flex-col gap-[100px] bg-[#0B0B1B] relative"
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
      <motion.nav
        className="container max-w-[1130px] mx-auto flex justify-between items-center pt-[30px] z-10"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <a href="#" className="w-[160px] flex shrink-0 h-fit">
          <Image
            src={logo}
            alt="logo"
            className="w-12"
            width={40}
            height={48}
          />
        </a>
        <ul className="flex gap-[50px] items-center text-white">
          <li>
            <a
              href="#"
              className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a
              href="#"
              className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
            >
              About
            </a>
          </li>
        </ul>
        <button className="bg-[#CDF30E] font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]">
          Contact Us
        </button>
      </motion.nav>
      <div className="hero container max-w-282.5 mx-auto flex justify-between items-center relative">
        <motion.div
          className="flex flex-col items-center justify-center gap-6 h-fit w-fit text-white z-10 text-center mx-auto"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1
            className="font-extrabold text-[80px] leading-22.5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            H5 CREATIVE STUDIO
          </motion.h1>
          <motion.p
            className="font-semibold text-xl max-w-[880px]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          >
            Our utmost works are based on creative ideas and are inspired by
            many artistic and creative digital communities.
          </motion.p>
          <motion.button
            className="font-bold text-[18px] leading-9.75 rounded-[20px] p-[14px_36px] bg-[#CDF30E] text-[#0B0B1B] w-fit mt-8 transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
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
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">$230M</p>
          <p className="font-semibold text-lg">Valuation</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">31,934</p>
          <p className="font-semibold text-lg">Projects</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">245</p>
          <p className="font-semibold text-lg">Startups IPO</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">9/10</p>
          <p className="font-semibold text-lg">Successful</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">562</p>
          <p className="font-semibold text-lg">Companies</p>
        </div>
      </motion.div>
    </motion.section>
  )
}
