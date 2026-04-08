"use client"

import { motion } from "framer-motion"
import { Easing } from "framer-motion"
import { Video, Mic, Calendar, Target } from "lucide-react"

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

export default function ServicesDetailsSection() {
  const services = [
    {
      icon: Mic,
      title: "Professional Host",
      description: "Host berpengalaman dengan kemampuan komunikasi yang baik, pengetahuan produk, dan skill closing yang terlatih",
      features: [
        "6M+ salary untuk kualitas terbaik",
        "Training produk sebelum live",
        "Skill closing dan interaksi audience",
        "Pengalaman di berbagai industri",
      ],
    },
    {
      icon: Video,
      title: "Studio & Equipment",
      description: "Studio profesional dengan peralatan lengkap untuk hasil live streaming berkualitas tinggi",
      features: [
        "Studio value 3M+ lengkap",
        "Lighting profesional",
        "Audio system berkualitas",
        "Background yang estetik",
      ],
    },
    {
      icon: Calendar,
      title: "Scheduled Live",
      description: "Penjadwalan live yang terstruktur sesuai kebutuhan dan target penjualan brand Anda",
      features: [
        "Fleksibilitas jadwal",
        "Pilihan package 14-26 hari",
        "Sesuaikan jam kerja brand",
        "Konsultasi strategi jadwal",
      ],
    },
    {
      icon: Target,
      title: "Campaign Optimization",
      description: "Optimasi campaign dan laporan performa untuk meningkatkan hasil live streaming berkelanjutan",
      features: [
        "Weekly Live Report",
        "Account Report bulanan",
        "Analisis performa produk",
        "Rekomendasi improvement",
      ],
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
            Layanan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Solusi lengkap untuk live streaming yang proper dan berorientasi hasil
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-purple-200 hover:shadow-xl transition-all"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 mt-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
