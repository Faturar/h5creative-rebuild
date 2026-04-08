"use client"

import { motion, Easing } from "framer-motion"
import { BarChart3, TrendingUp, FileText, Download } from "lucide-react"

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

export default function ReportingSection() {
  const reports = [
    {
      icon: FileText,
      title: "Weekly Live Report",
      description: "Laporan mingguan performa live streaming dengan metrik lengkap",
      features: [
        "Viewer count & peak viewers",
        "Engagement rate & interactions",
        "Product performance & top sellers",
        "Conversion rate & GMV",
      ],
    },
    {
      icon: BarChart3,
      title: "Account Report",
      description: "Laporan bulanan performa akun untuk tracking growth jangka panjang",
      features: [
        "Follower growth trend",
        "Content performance analysis",
        "Audience demographics",
        "Recommendations for improvement",
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
            Laporan Performa
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pantau dan optimasi hasil live streaming dengan laporan komprehensif
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <report.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {report.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {report.description}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {report.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-2xl text-center text-white"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Download className="w-6 h-6" />
            <h4 className="text-2xl font-bold">Akses Laporan Mudah</h4>
          </div>
          <p className="text-white/90 max-w-3xl mx-auto">
            Semua laporan akan dikirim secara berkala dan dapat diakses kapan saja. Kami juga menyediakan sesi review untuk mendiskusikan hasil dan strategi optimasi berikutnya.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
