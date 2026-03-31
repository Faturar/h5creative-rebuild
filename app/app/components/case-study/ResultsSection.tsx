"use client"

import { motion } from "framer-motion"
import StatCard from "@/app/components/shared/StatCard"
import { TrendingUp, TrendingDown, Users, Clock, Star } from "lucide-react"

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
      duration: 0.6,
    },
  },
}

interface StatItem {
  value: string
  label: string
  color: string
  icon: React.ReactNode
}

interface AchievementItem {
  iconColor: string
  text: string
}

interface ResultsSectionProps {
  statItems?: StatItem[]
  achievements?: AchievementItem[]
}

export default function ResultsSection({
  statItems: statItemsProp,
  achievements: achievementsProp,
}: ResultsSectionProps) {
  const displayStatItems = statItemsProp || [
    {
      value: "+45%",
      label: "User Engagement",
      color: "#2E2BFF",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      value: "-30%",
      label: "Bounce Rate",
      color: "#12BB74",
      icon: <TrendingDown className="w-6 h-6" />,
    },
    {
      value: "+60%",
      label: "Conversion Rate",
      color: "#2E2BFF",
      icon: <Users className="w-6 h-6" />,
    },
    {
      value: "+2.5x",
      label: "Time on Site",
      color: "#FFE7C2",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      value: "4.8/5",
      label: "User Rating",
      color: "#FFE7C2",
      icon: <Star className="w-6 h-6" />,
    },
  ]

  const displayAchievements = achievementsProp || [
    {
      iconColor: "#2E2BFF",
      text: "Increased user engagement from 15% to 45% within first month",
    },
    {
      iconColor: "#12BB74",
      text: "Reduced bounce rate by 30% through improved UX",
    },
    {
      iconColor: "#2E2BFF",
      text: "Achieved 60% increase in conversion rate for key actions",
    },
    {
      iconColor: "#FFE7C2",
      text: "Maintained 4.8/5 user rating across all reviews",
    },
  ]
  return (
    <section className="py-20 bg-gradient-to-br from-[#0B0B1B] to-[#1a1a2e]">
      <div className="container mx-auto px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            className="font-extrabold text-4xl md:text-5xl text-white mb-6"
            variants={itemVariants}
          >
            Results & Impact
          </motion.h2>

          <motion.p
            className="text-xl text-white/80 mb-12 max-w-3xl"
            variants={itemVariants}
          >
            The redesigned FinanceAI platform delivered exceptional results:
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {displayStatItems.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                icon={stat.icon}
              />
            ))}
          </div>

          <motion.div
            className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10"
            variants={itemVariants}
          >
            <h3 className="font-bold text-2xl text-white mb-4">
              Key Achievements
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#2E2BFF] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Increased user engagement from 15% to 45% within the first
                  month
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#12BB74] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Reduced bounce rate by 30% through improved UX
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#2E2BFF] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Achieved 60% increase in conversion rate for key actions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#FFE7C2] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#0B0B1B] font-bold">✓</span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Maintained 4.8/5 user rating across all reviews
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
