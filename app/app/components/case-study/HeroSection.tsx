"use client"

import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import MetadataCard from "@/app/components/shared/MetadataCard"

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

interface HeroSectionProps {
  heroImage: StaticImageData
  logo: StaticImageData
  title?: string
  subtitle?: string
  metadata?: ProjectMetadata[]
}

interface ProjectMetadata {
  label: string
  value: string
}

const projectMetadata: ProjectMetadata[] = [
  { label: "Client", value: "FinTech Innovations Inc." },
  { label: "Industry", value: "Financial Services" },
  { label: "Timeline", value: "12 weeks" },
  { label: "Services", value: "UI/UX Design, Web Development, Brand Identity" },
]

export default function HeroSection({
  heroImage,
  logo,
  title,
  subtitle,
  metadata,
}: HeroSectionProps) {
  const displayTitle = title || "Transforming Financial Management Through AI"
  const displaySubtitle =
    subtitle ||
    "How we helped a fintech startup build an intelligent finance platform that increased user engagement by 45%"
  const displayMetadata = metadata || projectMetadata

  return (
    <section className="min-h-screen bg-[#0B0B1B] relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2E2BFF]/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0B1B]" />

      {/* Content */}
      <div className="container mx-auto px-8 lg:px-16 py-20 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-tight max-w-5xl"
            variants={itemVariants}
          >
            {displayTitle}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/80 mt-6 max-w-3xl leading-relaxed"
            variants={itemVariants}
          >
            {displaySubtitle}
          </motion.p>

          {/* Hero Image */}
          <motion.div
            className="mt-12 w-full max-w-5xl rounded-[40px] overflow-hidden shadow-2xl"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={heroImage}
              alt="FinanceAI Platform"
              className="w-full h-auto"
              priority
            />
          </motion.div>

          {/* Metadata */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full max-w-5xl"
            variants={containerVariants}
          >
            {displayMetadata.map((item, index) => (
              <MetadataCard key={index} label={item.label} value={item.value} />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-12"
            variants={itemVariants}
          >
            <Link
              href="/book"
              className="bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] text-white font-bold px-8 py-4 rounded-full hover:shadow-[0_10px_30px_rgba(46,43,255,0.4)] hover:scale-105 transition-all duration-300 text-center"
            >
              Start a Project
            </Link>
            <Link
              href="#overview"
              className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 text-center"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
