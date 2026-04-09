"use client"

import { motion, Easing } from "framer-motion"
import { Star, Quote } from "lucide-react"

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

export default function SocialMediaTestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Founder, Glow Beauty",
      content: "Their social media management transformed our brand. Our engagement increased by 180% in just 3 months. The team is incredibly responsive and creative!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "CEO, TechStart Solutions",
      content: "Professional and results-driven. They helped us establish a strong LinkedIn presence that generated quality leads for our B2B business.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Amanda Rodriguez",
      role: "Marketing Director, Fashion Forward",
      content: "The team consistently delivers high-quality content that resonates with our audience. Our follower growth and engagement have never been better.",
      rating: 5,
      avatar: "AR",
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
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real feedback from businesses we've helped grow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200" />
                <p className="text-gray-600 leading-relaxed pl-6">
                  {testimonial.content}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
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
