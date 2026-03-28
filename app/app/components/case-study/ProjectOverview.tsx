"use client"

import { motion } from "framer-motion"

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

interface ProjectOverviewProps {
  overview?: string[]
}

export default function ProjectOverview({ overview }: ProjectOverviewProps) {
  const displayOverview = overview || [
    "FinanceAI is a cutting-edge fintech platform that revolutionizes personal finance management through artificial intelligence. Built for modern professionals who want to take control of their financial future, the platform provides real-time insights, personalized recommendations, and automated budget management.",
    "We partnered with FinTech Innovations Inc. to design and develop a complete web application that combines sophisticated AI algorithms with an intuitive user experience, making financial management accessible and engaging for everyone.",
  ]

  return (
    <section id="overview" className="py-20 bg-white">
      <div className="container mx-auto px-8 lg:px-16 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            className="font-extrabold text-4xl md:text-5xl text-[#0B0B1B] mb-8"
            variants={itemVariants}
          >
            Project Overview
          </motion.h2>

          <motion.div className="space-y-6" variants={containerVariants}>
            {displayOverview.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-lg md:text-xl text-[#0B0B1B]/80 leading-relaxed"
                variants={itemVariants}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
