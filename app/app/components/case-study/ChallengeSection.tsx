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

interface ChallengeItem {
  title: string
  items: string[]
}

const challenges: ChallengeItem[] = [
  {
    title: "Client Problem",
    items: [
      "Existing finance apps were complex and overwhelming for average users",
      "Users struggled to understand their financial health at a glance",
      "Low engagement rates (only 15% monthly active users) and high churn",
    ],
  },
  {
    title: "Business Pain Points",
    items: [
      "Difficult to attract and retain users in a competitive market",
      "Competing against established financial institutions with bigger budgets",
      "Needed to differentiate and prove value quickly to new users",
    ],
  },
  {
    title: "User Problems",
    items: [
      "Information overload with too many data points",
      "Lack of actionable insights and personalized recommendations",
      "Poor mobile experience and slow load times",
    ],
  },
]

interface ChallengeSectionProps {
  challenges?: ChallengeItem[]
}

export default function ChallengeSection({
  challenges: challengesProp,
}: ChallengeSectionProps) {
  const displayChallenges = challengesProp || challenges

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
            variants={itemVariants}
          >
            The Challenge
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {displayChallenges.map((challenge, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <h3 className="font-bold text-xl text-[#0B0B1B] mb-4">
                  {challenge.title}
                </h3>
                <ul className="space-y-3 text-[#0B0B1B]/70">
                  {challenge.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-[#2E2BFF] mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
