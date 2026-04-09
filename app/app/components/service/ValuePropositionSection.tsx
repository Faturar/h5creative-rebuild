"use client"

import { motion } from "framer-motion"
import { Easing } from "framer-motion"
import { TrendingUp, Target, Users, DollarSign, Zap, Heart } from "lucide-react"

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

export default function ValuePropositionSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Tingkatkan Konversi",
      description: "Live streaming dapat meningkatkan conversion rate hingga 3x lebih tinggi dibanding konten statis",
      color: "blue",
    },
    {
      icon: Heart,
      title: "Engagement Tinggi",
      description: "Interaksi real-time dengan audience meningkatkan trust dan keterlibatan brand",
      color: "purple",
    },
    {
      icon: DollarSign,
      title: "GMV Meningkat",
      description: "Faktor urgensi dan FOMO pada live shopping mendorong pembelian spontan",
      color: "green",
    },
    {
      icon: Users,
      title: "Brand Awareness",
      description: "Jangkauan audience lebih luas dengan platform live streaming yang populer",
      color: "orange",
    },
    {
      icon: Zap,
      title: "End-to-End Service",
      description: "Dari host profesional, equipment, hingga laporan performa - semua kami urus",
      color: "yellow",
    },
    {
      icon: Target,
      title: "Targeted Sales",
      description: "Strategi closing yang efektif dengan host yang terlatih mengoptimalkan penjualan",
      color: "red",
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
            Mengapa Live Streaming?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Manfaat nyata yang bisa Anda dapatkan dengan layanan live streaming profesional
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-${benefit.color}-100 flex items-center justify-center mb-4`}
              >
                <benefit.icon className={`w-7 h-7 text-${benefit.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
