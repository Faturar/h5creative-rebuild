"use client"

import { motion, Easing } from "framer-motion"
import { Calendar, PenTool, Clock, MessageSquare, BarChart, TrendingUp } from "lucide-react"

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

export default function SocialMediaServicesSection() {
  const services = [
    {
      icon: Calendar,
      title: "Content Planning & Strategy",
      description: "Strategic content calendar and planning aligned with your business goals and target audience",
      color: "blue",
    },
    {
      icon: PenTool,
      title: "Content Creation",
      description: "Professional design and compelling copywriting for posts, reels, stories, and carousels",
      color: "purple",
    },
    {
      icon: Clock,
      title: "Posting & Scheduling",
      description: "Optimized posting schedules for maximum reach and engagement across platforms",
      color: "green",
    },
    {
      icon: MessageSquare,
      title: "Engagement",
      description: "Active community management including responding to comments and DMs to build relationships",
      color: "orange",
    },
    {
      icon: BarChart,
      title: "Analytics & Reporting",
      description: "Comprehensive monthly reports with actionable insights and performance metrics",
      color: "pink",
    },
    {
      icon: TrendingUp,
      title: "Hashtag & Trend Research",
      description: "Ongoing research on trending topics and hashtags to boost content discoverability",
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
            Services Included
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to grow your social media presence and drive results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all border border-gray-100 hover:border-purple-200"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-${service.color}-100 flex items-center justify-center mb-4`}
              >
                <service.icon className={`w-7 h-7 text-${service.color}-600`} />
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
