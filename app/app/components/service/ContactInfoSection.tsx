"use client"

import { motion, Easing } from "framer-motion"
import Link from "next/link"
import { Globe, Instagram, MessageCircle } from "lucide-react"

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

export default function ContactInfoSection() {
  const contacts = [
    {
      icon: Globe,
      title: "Website",
      value: "h5creative.id",
      link: "https://h5creative.id",
      color: "blue",
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@h5.creative",
      link: "https://instagram.com/h5.creative",
      color: "purple",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "0858-1171-8049",
      link: "https://wa.me/6285811718049",
      color: "green",
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
            Hubungi Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Siap membantu kebutuhan live streaming brand Anda
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contacts.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-${contact.color}-100 flex items-center justify-center mb-4 group-hover:bg-${contact.color}-200 transition-colors`}
              >
                <contact.icon className={`w-8 h-8 text-${contact.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {contact.title}
              </h3>
              <p className="text-xl font-bold text-gray-900">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
