"use client"

import { motion, Easing } from "framer-motion"
import { Instagram, Facebook, Linkedin, Video as VideoIcon } from "lucide-react"

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

export default function SocialMediaPlatformsSection() {
  const platforms = [
    {
      icon: Instagram,
      name: "Instagram",
      color: "from-pink-500 to-purple-600",
      users: "2B+",
      description: "Visual storytelling and reels to engage with your audience"
    },
    {
      icon: VideoIcon,
      name: "TikTok",
      color: "from-gray-900 to-gray-700",
      users: "1B+",
      description: "Short-form videos to reach younger audiences and go viral"
    },
    {
      icon: Facebook,
      name: "Facebook",
      color: "from-blue-600 to-blue-800",
      users: "3B+",
      description: "Community building and targeted advertising"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      color: "from-blue-500 to-blue-700",
      users: "900M+",
      description: "Professional networking and B2B marketing (optional)"
    },
  ]

  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gray-50"
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
            Platforms We Manage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Strategic management across all major social media platforms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div
                className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4`}
              >
                <platform.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {platform.name}
              </h3>
              <p className="text-sm text-purple-600 font-semibold mb-2">
                {platform.users} Users
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                {platform.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
