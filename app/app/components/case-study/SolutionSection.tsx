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

interface SolutionItem {
  title: string
  description: string
}

const solutions: SolutionItem[] = [
  {
    title: "Strategy",
    description:
      "Simplify complexity with intelligent AI that learns from user behavior. Focus on actionable insights, not data overload. Create delightful micro-interactions that make finance engaging.",
  },
  {
    title: "UX Decisions",
    description:
      "Progressive disclosure of information based on user expertise. Personalized dashboard that adapts to individual financial goals. Gamification elements (progress bars, achievements) to increase engagement.",
  },
  {
    title: "Design Thinking",
    description:
      "User-centered design throughout the entire process. Rapid prototyping and A/B testing with real users. Iterative refinement based on continuous feedback.",
  },
]

interface SolutionSectionProps {
  solutions?: SolutionItem[]
}

export default function SolutionSection({
  solutions: solutionsProp,
}: SolutionSectionProps) {
  const displaySolutions = solutionsProp || solutions

  return (
    <section className="py-20 bg-white">
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
            Our Approach
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {displaySolutions.map((solution, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <h3 className="font-bold text-2xl text-[#0B0B1B] mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-[#0B0B1B]/70 leading-relaxed">
                    {solution.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="bg-gradient-to-br from-[#2E2BFF]/10 to-[#1C1AFF]/5 rounded-3xl p-8 lg:p-12"
              variants={itemVariants}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2E2BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B0B1B]">Research</h4>
                    <p className="text-[#0B0B1B]/70 text-sm">
                      Deep user research & analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2E2BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B0B1B]">Strategy</h4>
                    <p className="text-[#0B0B1B]/70 text-sm">
                      Data-driven approach planning
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2E2BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B0B1B]">Design</h4>
                    <p className="text-[#0B0B1B]/70 text-sm">
                      Iterative UI/UX creation
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2E2BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B0B1B]">Development</h4>
                    <p className="text-[#0B0B1B]/70 text-sm">
                      High-quality implementation
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
