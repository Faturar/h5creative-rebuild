"use client"

import { motion, Easing } from "framer-motion"
import SocialMediaPackageCard from "./SocialMediaPackageCard"
import { socialMediaPackages } from "@/app/constants/packages"

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

export default function SocialMediaPricingSection() {
  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pricing Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the package that best fits your business needs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {socialMediaPackages.map((pkg) => (
            <SocialMediaPackageCard
              key={pkg.id}
              package={pkg}
              isHighlighted={pkg.isPopular}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
