"use client"

import Image, { type StaticImageData } from "next/image"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"

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

interface ShowcaseItem {
  image: StaticImageData
  title: string
  description: string
}

interface VisualShowcaseProps {
  showcaseItems: ShowcaseItem[]
}

export default function VisualShowcase({ showcaseItems }: VisualShowcaseProps) {
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
            Visual Showcase
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseItems.map((item, index) => (
              <motion.div
                key={index}
                className="group relative rounded-3xl overflow-hidden shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-bold text-xl text-[#0B0B1B] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#0B0B1B]/70 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
