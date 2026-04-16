"use client"

import Image from "next/image"
import Link from "next/link"
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
    <Link href={`/service/${service.slug}`}>
      <motion.div
        className="col-span-1 p-[30px] pb-0 md:p-[40px] md:pb-0 rounded-[20px] md:rounded-[30px] flex flex-col gap-[30px] md:gap-[40px]
    bg-white border border-gray-200
    hover:border-[#2E2BFF] transition duration-300 cursor-pointer"
        variants={itemVariants}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 40px rgba(46, 43, 255, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-4 md:gap-5">
          <p className="font-semibold text-[20px] leading-[28px] md:text-[28px] md:leading-[40px] text-gray-900">
            {service.title}
          </p>
          <p className="text-gray-500 text-sm leading-[22px] md:text-base md:leading-[30px]">
            {service.description}
          </p>
        </div>

        <div className="w-full h-[300px] md:h-[320px] lg:h-[240px]">
          <Image
            src={service.image}
            className="w-full object-contain"
            alt={service.alt}
          />
        </div>
      </motion.div>
    </Link>
  )
}

// Featured Service Card Component
const FeaturedServiceCard = ({
  service,
}: {
  service: typeof FEATURED_SERVICE_DATA
}) => {
  return (
    <Link href={`/service/${service.slug}`}>
      <motion.div
        className="lg:col-span-3! p-[30px] pb-0 md:p-[40px] md:pb-0 rounded-[20px] md:rounded-[30px] flex flex-col md:flex-row gap-[30px] md:gap-[50px]
    bg-white border border-gray-200
    hover:border-[#2E2BFF] transition duration-300 cursor-pointer"
        variants={itemVariants}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 40px rgba(46, 43, 255, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-[30px] md:gap-[40px]">
          <motion.div
            className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2E2BFF]/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Box className="w-8 h-8 md:w-10 md:h-10 text-[#2E2BFF]" />
          </motion.div>

          <div className="flex flex-col gap-4 md:gap-5">
            <p className="font-semibold text-[20px] leading-[28px] md:text-[28px] md:leading-[40px] text-gray-900">
              {service.title}
            </p>
            <p className="text-gray-500 text-sm leading-[22px] md:text-base md:leading-[30px]">
              {service.description}
            </p>
          </div>
        </div>

        <div className="w-full h-[200px] md:w-[300px] md:h-[220px] lg:w-[450px] lg:h-[320px] flex shrink-0">
          <Image
            src={service.image}
            className="w-full object-contain"
            alt={service.alt}
          />
        </div>
      </motion.div>
    </Link>
  )
}

export default function Services2() {
  return (
    <motion.section
      id="Services"
      className="w-full bg-white py-[80px] md:py-[100px] lg:py-[120px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* HEADER */}
        <motion.div
          className="mb-[50px] md:mb-[70px]"
          variants={itemVariants}
        >
          <h2 className="font-bold text-[32px] leading-[1.1] md:text-[48px] lg:text-[40px] text-gray-900">
            Optimasi Penjualan Kamu Sekarang!
          </h2>
          <p className="mt-4 text-[18px] leading-[28px] md:text-[20px] md:leading-[32px] text-gray-600">
            Kami Bantu Live Streaming kamu deng gak ush slide2 dibuat coundown promo aja
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          className="flex flex-col gap-[20px] md:gap-[30px]"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-[20px] md:gap-[30px]">
            {/* SERVICES CARDS */}
            {SERVICES_DATA.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <FeaturedServiceCard service={FEATURED_SERVICE_DATA} />
        </motion.div>
      </div>
    </motion.section>
  )
}
