"use client"

import { motion, Easing } from "framer-motion"
import { Store, Smartphone, Rocket, Users, Lightbulb, Users2 } from "lucide-react"

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

export default function BrandActivationServicesSection() {
  const services = [
    {
      icon: Store,
      title: "Event Activation",
      description: "Booth setup, exhibition management, and roadshow execution with engaging brand experiences",
      color: "orange",
    },
    {
      icon: Smartphone,
      title: "Digital Campaign Activation",
      description: "Viral social media campaigns, hashtag challenges, and online engagement initiatives",
      color: "red",
    },
    {
      icon: Rocket,
      title: "Product Launch Activation",
      description: "Strategic product launches with memorable reveals and experiential events",
      color: "purple",
    },
    {
      icon: Users,
      title: "Influencer & KOL Activation",
      description: "Partnerships with influencers and key opinion leaders to amplify brand reach",
      color: "pink",
    },
    {
      icon: Lightbulb,
      title: "Experiential Marketing",
      description: "Immersive brand experiences that create lasting emotional connections",
      color: "yellow",
    },
    {
      icon: Users2,
      title: "Community Engagement Programs",
      description: "Building strong community relationships through targeted engagement activities",
      color: "blue",
    },
  ]

  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Activation Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive brand activation solutions to connect with your audience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100 hover:shadow-xl transition-all group"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${service.color}-500 to-${service.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
