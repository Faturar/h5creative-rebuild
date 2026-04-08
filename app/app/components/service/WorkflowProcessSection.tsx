"use client"

import { motion } from "framer-motion"
import { Easing } from "framer-motion"
import { CheckCircle, FileText, Calendar, User } from "lucide-react"

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

export default function WorkflowProcessSection() {
  const steps = [
    {
      step: "01",
      icon: CheckCircle,
      title: "Deal & Payment",
      description: "Diskusi kebutuhan dan finalisasi paket yang sesuai dengan budget dan tujuan brand Anda",
    },
    {
      step: "02",
      icon: Calendar,
      title: "Penjadwalan & Persiapan",
      description: "Penjadwalan live sesuai preferensi Anda. Kami membutuhkan H+7 untuk persiapan optimal",
    },
    {
      step: "03",
      icon: FileText,
      title: "Konsep & Visual Design",
      description: "Pengembangan live concept, visual design untuk twibbon/banner, dan rundown program",
    },
    {
      step: "04",
      icon: User,
      title: "Host Briefing",
      description: "Briefing mendalam ke host tentang produk, selling point, dan strategi closing",
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
            Workflow Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Proses terstruktur untuk hasil live streaming yang maksimal
          </p>
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-blue-600 -translate-x-1/2" />
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
                variants={itemVariants}
              >
                <div className="flex-1 text-center lg:text-left">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100 inline-block text-left">
                    <div
                      className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4 ${
                        index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                      }`}
                    >
                      {step.step}
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 z-10">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-2xl text-center text-white"
          variants={itemVariants}
        >
          <h4 className="text-2xl font-bold mb-2">H+7 Preparation Time</h4>
          <p className="text-white/90 max-w-3xl mx-auto">
            Setelah deal dan pembayaran, kami memberikan waktu 7 hari untuk persiapan yang optimal. Ini termasuk pengembangan konsep, desain visual, penjadwalan, dan briefing host untuk memastikan hasil live streaming terbaik untuk brand Anda.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
