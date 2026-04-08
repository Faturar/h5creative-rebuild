"use client"

import { motion, Easing } from "framer-motion"
import { Lightbulb, Users, Target, Award, Clock, CheckCircle } from "lucide-react"

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

export default function BrandActivationWhyChooseUsSection() {
  const benefits = [
    {
      icon: Lightbulb,
      title: "Creative & Strategic Approach",
      description: "Innovative concepts backed by strategic thinking to deliver memorable brand experiences that resonate with your audience",
      color: "orange",
    },
    {
      icon: Users,
      title: "Experienced Execution Team",
      description: "Seasoned professionals with proven track record in managing successful activations across various industries",
      color: "red",
    },
    {
      icon: Target,
      title: "Data-Driven Insights",
      description: "Analytics-powered decisions with comprehensive reporting to measure campaign effectiveness and ROI",
      color: "purple",
    },
    {
      icon: Award,
      title: "End-to-End Service",
      description: "Complete solution from concept development to execution, handling all aspects of your activation campaign",
      color: "pink",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Strict project management ensuring your activation launches on time and exceeds expectations",
      color: "yellow",
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "History of successful campaigns with measurable impact on brand awareness, engagement, and conversions",
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
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Partner with a team that delivers impactful brand experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${benefit.color}-500 to-${benefit.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
