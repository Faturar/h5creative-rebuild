"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"
import { Phone, Dribbble, Mail } from "lucide-react"

import { FOOTER_DATA } from "@/app/constants/landingPageData"

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
      className="bg-[#0B0B1B] text-white pb-8 md:pb-[50px] border-t-[10px] border-[#4920E5] px-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container max-w-[1130px] mx-auto flex flex-col md:flex-row justify-between pt-16 md:pt-[100px] pb-8 md:pb-[50px] mb-8 md:mb-[50px] relative border-b border-[#585867] px-4 md:px-0">
        <Image
          src={FOOTER_DATA.eclipseImage}
          className="absolute h-[200px] md:h-[300px] top-[40px] md:top-[70px] -left-[10px] md:-left-[20px] z-0"
          alt="icon"
        />
        <motion.div
          className="flex shrink-0 h-fit z-10 mb-8 md:mb-0"
          variants={itemVariants}
        >
          <Image src={FOOTER_DATA.logo} alt="logo" />
        </motion.div>
        <motion.div
          className="flex flex-wrap gap-8 md:gap-[100px] z-10"
          variants={containerVariants}
        >
          {FOOTER_DATA.sections.map((section, index) => (
            <motion.div
              key={index}
              className={`flex flex-col gap-4 ${section.title === "Connect" ? "w-full md:w-auto" : "w-1/2 md:w-auto"}`}
              variants={itemVariants}
            >
              <p className="font-bold text-base md:text-lg">{section.title}</p>
              {section.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.href}
                  className={`font-medium text-sm md:text-base hover:font-semibold hover:text-[#FFE7C2] transition-all duration-300 ${
                    section.title === "Connect"
                      ? "flex items-center gap-[6px]"
                      : ""
                  }`}
                >
                  {section.title === "Connect" &&
                    "icon" in link &&
                    link.icon === "Phone" && <Phone className="w-4 h-4" />}
                  {section.title === "Connect" &&
                    "icon" in link &&
                    link.icon === "Dribbble" && (
                      <Dribbble className="w-4 h-4" />
                    )}
                  {section.title === "Connect" &&
                    "icon" in link &&
                    link.icon === "Mail" && <Mail className="w-4 h-4" />}
                  {link.text}
                </a>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.p
        className="text-xs md:text-sm text-[#A0A0AC] text-center px-4 md:px-0"
        variants={itemVariants}
      >
        {FOOTER_DATA.copyright}
      </motion.p>
    </motion.footer>
  )
}
