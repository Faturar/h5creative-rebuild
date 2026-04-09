"use client"

import { motion, Easing } from "framer-motion"
import { Search, Lightbulb, PlayCircle, BarChart } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function BrandActivationProcessSection() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Research & Strategy",
      description: "Deep dive into your brand, target audience, and market to develop a data-driven activation strategy",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Concept & Creative Planning",
      description: "Brainstorm innovative concepts and develop creative assets that align with your brand identity",
    },
    {
      number: "03",
      icon: PlayCircle,
      title: "Execution & Activation",
      description: "Execute the activation with precision, managing all logistics and on-ground operations",
    },
    {
      number: "04",
      icon: BarChart,
      title: "Monitoring & Reporting",
      description: "Track performance in real-time and provide comprehensive analytics and insights post-campaign",
    },
  ]

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
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From concept to execution, we ensure seamless activation campaigns
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-red-500 to-purple-500 transform -translate-x-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:ml-auto'}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0"
                    >
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-orange-600 mb-1 block">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
