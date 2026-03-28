"use client"

import { motion } from "framer-motion"
import ProcessStep from "@/app/components/shared/ProcessStep"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

interface ProcessItem {
  step: number
  title: string
  description: string
}

const processItems: ProcessItem[] = [
  {
    step: 1,
    title: "Research",
    description:
      "Conducted extensive user research, including 20+ interviews, competitive analysis, and persona development to understand user needs and pain points.",
  },
  {
    step: 2,
    title: "Wireframing",
    description:
      "Created low-fidelity wireframes to map out user flows and information architecture, focusing on simplicity and clarity.",
  },
  {
    step: 3,
    title: "UI Design",
    description:
      "Developed high-fidelity designs with a modern, clean aesthetic that balances functionality with visual appeal.",
  },
  {
    step: 4,
    title: "Development",
    description:
      "Built the platform using React and Next.js, implementing AI algorithms and ensuring optimal performance and accessibility.",
  },
]

interface DesignProcessProps {
  processItems?: ProcessItem[]
}

export default function DesignProcess({
  processItems: processItemsProp,
}: DesignProcessProps) {
  const displayProcessItems = processItemsProp || processItems

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
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                },
              },
            }}
          >
            Design Process
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProcessItems.map((item) => (
              <ProcessStep
                key={item.step}
                step={item.step}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
