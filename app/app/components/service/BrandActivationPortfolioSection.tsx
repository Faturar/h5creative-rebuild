"use client"

import { motion, Easing } from "framer-motion"
import { Users, TrendingUp, Eye, ArrowRight } from "lucide-react"

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
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

export default function BrandActivationPortfolioSection() {
  const campaigns = [
    {
      title: "Tech Product Launch",
      client: "TechStart Solutions",
      type: "Product Launch Activation",
      color: "from-blue-600 to-purple-600",
      metrics: {
        attendance: "5,000+",
        engagement: "85%",
        reach: "2.5M",
      },
      growth: "340%",
      description: "Multi-city product launch with interactive demo stations and influencer partnerships",
    },
    {
      title: "Food Festival Campaign",
      client: "Foodie Paradise",
      type: "Event Activation",
      color: "from-orange-500 to-red-600",
      metrics: {
        attendance: "12,000+",
        engagement: "92%",
        reach: "8.3M",
      },
      growth: "580%",
      description: "Three-day food festival with brand booths, cooking demos, and social challenges",
    },
    {
      title: "Brand Awareness Campaign",
      client: "Glow Beauty",
      type: "Digital Campaign Activation",
      color: "from-pink-500 to-rose-600",
      metrics: {
        attendance: "N/A",
        engagement: "78%",
        reach: "15.2M",
      },
      growth: "420%",
      description: "Viral hashtag challenge with KOL partnerships across TikTok and Instagram",
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
            Successful brand activations that delivered real results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div
                className={`h-48 bg-gradient-to-br ${campaign.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                      +{campaign.growth}
                    </div>
                    <div className="text-white/90 font-medium">
                      Brand Impact
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {campaign.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-orange-600 font-semibold">
                      {campaign.client}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {campaign.description}
                </p>

                <div className="space-y-3 mb-6">
                  {campaign.metrics.attendance !== "N/A" && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Attendance</span>
                          <span className="font-semibold text-gray-900">
                            {campaign.metrics.attendance}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Engagement</span>
                        <span className="font-semibold text-gray-900">
                          {campaign.metrics.engagement}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Reach</span>
                        <span className="font-semibold text-gray-900">
                          {campaign.metrics.reach}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  className="w-full flex items-center justify-center gap-2 text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  View Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
