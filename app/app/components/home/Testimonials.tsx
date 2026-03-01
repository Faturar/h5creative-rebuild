"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"

import starIcon from "@/public/assets/images/icons/Star.svg"
import logoTesti1 from "@/public/assets/images/logos/logo-testi.svg"
import logoTesti2 from "@/public/assets/images/logos/logo-testi2.svg"
import logoTesti3 from "@/public/assets/images/logos/logo-testi3.svg"
import logoTesti4 from "@/public/assets/images/logos/logo-testi4.svg"
import photo1 from "@/public/assets/images/photo/photo.png"
import photo2 from "@/public/assets/images/photo/photo2.png"
import photo3 from "@/public/assets/images/photo/photo3.png"

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

export default function Testimonials() {
  return (
    <motion.section
      id="Testimonials"
      className="bg-[#F4F5F8]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container max-w-[1130px] mx-auto pt-[180px] pb-[100px]">
        <motion.h2
          className="font-extrabold text-[50px] leading-[70px] text-center"
          variants={itemVariants}
        >
          I Have Delivered Success <br />
          For All My Clients
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 gap-[30px] mt-[50px]"
          variants={containerVariants}
        >
          <motion.div
            className="card-testi bg-white rounded-[30px] flex flex-col p-5 gap-5"
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-[40px] flex shrink-0">
              <Image src={logoTesti1} alt="logo" />
            </div>
            <p className="font-semibold text-[22px] leading-[40px]">
              "Her working method were truly different from other freelancers,
              she has this kind of mindset that can create user-center product
              and user loved it"
            </p>
            <div className="flex h-8">
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[70px] h-[70px] shrink-0">
                <Image src={photo1} alt="photo" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-xl leading-[30px]">Jessi Lyio</p>
                <p className="text-lg text-[#878C9C]">CPO Agolia Modd</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="card-testi bg-white rounded-[30px] flex flex-col p-5 gap-5"
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-[40px] flex shrink-0">
              <Image src={logoTesti2} alt="logo" />
            </div>
            <p className="font-semibold text-[22px] leading-[40px]">
              "She helped us to build our first prototype to win our investor
              and early users heart that generate huge attraction. Will hire her
              back again anytime soon"
            </p>
            <div className="flex h-8">
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[70px] h-[70px] shrink-0">
                <Image src={photo2} alt="photo" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-xl leading-[30px]">Mariam Sya</p>
                <p className="text-lg text-[#878C9C]">Founder TinderJobs</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="card-testi bg-white rounded-[30px] flex flex-col p-5 gap-5"
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-[40px] flex shrink-0">
              <Image src={logoTesti3} alt="logo" />
            </div>
            <p className="font-semibold text-[22px] leading-[40px]">
              "She helped us to build our first prototype to win our investor
              and early users heart that generate huge attraction. Will hire her
              back again anytime soon"
            </p>
            <div className="flex h-8">
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[70px] h-[70px] shrink-0">
                <Image src={photo3} alt="photo" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-xl leading-[30px]">John Ceyna</p>
                <p className="text-lg text-[#878C9C]">Investor at Wokiya</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="card-testi bg-white rounded-[30px] flex flex-col p-5 gap-5"
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-[40px] flex shrink-0">
              <Image src={logoTesti4} alt="logo" />
            </div>
            <p className="font-semibold text-[22px] leading-[40px]">
              "Her working method were truly different from other freelancers,
              she has this kind of mindset that can create user-center product
              and user loved it"
            </p>
            <div className="flex h-8">
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
              <Image src={starIcon} alt="star" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[70px] h-[70px] shrink-0">
                <Image src={photo1} alt="photo" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-xl leading-[30px]">Yein Balli</p>
                <p className="text-lg text-[#878C9C]">CMO Waniwani</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
