"use client"

import Image from "next/image"
import { motion, Easing } from "framer-motion"
import { Box } from "lucide-react"

import {
  SERVICES_DATA,
  FEATURED_SERVICE_DATA,
  SERVICES_SECTION_DATA,
} from "@/app/constants/landingPageData"

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

// Service Card Component
const ServiceCard = ({ service }: { service: (typeof SERVICES_DATA)[0] }) => {
  return (
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
          {service.title}
        </p>
        <p className="text-gray-500 leading-[30px]">{service.description}</p>
      </div>

      <div className="w-full h-[320px]">
        <Image
          src={service.image}
          className="w-full object-contain"
          alt={service.alt}
        />
      </div>
    </motion.div>
  )
}

// Featured Service Card Component
const FeaturedServiceCard = ({
  service,
}: {
  service: typeof FEATURED_SERVICE_DATA
}) => {
  return (
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
          <Box className="w-10 h-10 text-[#2E2BFF]" />
        </motion.div>

        <div className="flex flex-col gap-5">
          <p className="font-semibold text-[28px] leading-[40px] text-gray-900">
            {service.title}
          </p>
          <p className="text-gray-500 leading-[30px]">{service.description}</p>
        </div>
      </div>

      <div className="w-[450px] h-[320px] flex shrink-0">
        <Image
          src={service.image}
          className="w-full object-contain"
          alt={service.alt}
        />
      </div>
    </motion.div>
  )
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
            {SERVICES_SECTION_DATA.titleLine1} <br />
            {SERVICES_SECTION_DATA.titleLine2}
          </h2>

          <motion.a
            href={SERVICES_SECTION_DATA.buttonLink}
            className="bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF]
            text-white font-semibold
            px-8 py-4 rounded-full
            transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {SERVICES_SECTION_DATA.buttonText}
          </motion.a>
        </motion.div>

        {/* GRID */}
        <motion.div
          className="grid grid-cols-3 gap-[30px]"
          variants={containerVariants}
        >
          {/* SERVICES CARDS */}
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}

          {/* FEATURED SERVICE CARD */}
          <FeaturedServiceCard service={FEATURED_SERVICE_DATA} />
        </motion.div>
      </div>
    </motion.section>
  )
}
