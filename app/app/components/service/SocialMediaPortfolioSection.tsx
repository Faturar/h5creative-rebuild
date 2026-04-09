"use client"

import { motion, Easing } from "framer-motion"
import { TrendingUp, Users, Eye } from "lucide-react"

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

export default function SocialMediaPortfolioSection() {
  const caseStudies = [
    {
      title: "Fashion Brand",
      platform: "Instagram",
      period: "3 Months",
      before: {
        followers: "5.2K",
        engagement: "2.1%",
        reach: "15K",
      },
      after: {
        followers: "18.7K",
        engagement: "5.8%",
        reach: "125K",
      },
      growth: "259%",
      color: "from-pink-500 to-purple-600",
    },
    {
      title: "E-commerce Store",
      platform: "TikTok",
      period: "2 Months",
      before: {
        followers: "1.1K",
        engagement: "3.2%",
        reach: "8K",
      },
      after: {
        followers: "45.2K",
        engagement: "9.1%",
        reach: "890K",
      },
      growth: "4000%",
      color: "from-gray-900 to-gray-700",
    },
    {
      title: "B2B Tech Company",
      platform: "LinkedIn",
      period: "6 Months",
      before: {
        followers: "3.5K",
        engagement: "1.8%",
        reach: "20K",
      },
      after: {
        followers: "12.8K",
        engagement: "4.5%",
        reach: "180K",
      growth: "265%",
      },
      color: "from-blue-500 to-blue-700",
    },
  ]

  return (
    <motion.section
      className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white"
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
            Portfolio & Case Studies
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real results from brands we've partnered with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div
                className={`h-32 bg-gradient-to-br ${study.color} flex items-center justify-center`}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">
                    +{study.growth}
                  </div>
                  <div className="text-white/80 text-sm font-medium">
                    Overall Growth
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {study.title}
                  </h3>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {study.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <span className="font-semibold text-gray-700">
                    Platform:
                  </span>
                  {study.platform}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Followers</span>
                        <span className="font-semibold text-gray-900">
                          {study.before.followers} → {study.after.followers}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Engagement</span>
                        <span className="font-semibold text-gray-900">
                          {study.before.engagement} → {study.after.engagement}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "70%" }}
                          transition={{ duration: 1, delay: 0.6 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Reach</span>
                        <span className="font-semibold text-gray-900">
                          {study.before.reach} → {study.after.reach}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "90%" }}
                          transition={{ duration: 1, delay: 0.7 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
