"use client"

import Image, { type StaticImageData } from "next/image"
import { motion } from "framer-motion"
import ServiceCard from "@/app/components/shared/ServiceCard"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface ServiceItem {
  icon: StaticImageData
  title: string
  description: string
}

interface ServicesSectionProps {
  services: ServiceItem[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            className="font-extrabold text-4xl md:text-5xl text-[#0B0B1B] mb-12"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                },
              },
            }}
          >
            Services Used
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
