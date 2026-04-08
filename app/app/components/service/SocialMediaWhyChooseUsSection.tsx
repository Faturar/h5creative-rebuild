"use client"

import { motion, Easing } from "framer-motion"
import { Users, BarChart3, Lightbulb, Zap, Award, Headphones } from "lucide-react"

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

export default function SocialMediaWhyChooseUsSection() {
  const benefits = [
    {
      icon: Users,
      title: "Experienced Team",
      description: "Our team of social media experts has managed campaigns for brands across various industries with proven results",
      color: "blue",
    },
    {
      icon: BarChart3,
      title: "Data-Driven Strategy",
      description: "We use analytics and insights to inform our decisions, ensuring your content strategy is optimized for maximum impact",
      color: "purple",
    },
    {
      icon: Lightbulb,
      title: "Creative Content Approach",
      description: "Innovative and engaging content that resonates with your audience and sets your brand apart from competitors",
      color: "yellow",
    },
    {
      icon: Zap,
      title: "Fast Response & Support",
      description: "Quick turnaround times and responsive communication to keep your social media running smoothly",
      color: "orange",
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "Consistently delivering results with increased engagement, follower growth, and conversion rates for our clients",
      color: "green",
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "Personalized attention and ongoing support to help you achieve your social media goals",
      color: "red",
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
            Partner with a team that delivers results and grows your brand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-${benefit.color}-100 flex items-center justify-center mb-4`}
              >
                <benefit.icon className={`w-7 h-7 text-${benefit.color}-600`} />
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
