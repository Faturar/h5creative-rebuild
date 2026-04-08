"use client"

import { motion, Easing } from "framer-motion"
import { Star, Quote } from "lucide-react"

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

export default function BrandActivationTestimonialsSection() {
  const testimonials = [
    {
      name: "David Kim",
      role: "Marketing Director, TechStart Solutions",
      content: "Our product launch was a massive success! The team executed flawlessly and exceeded all our expectations. We reached 5,000+ attendees and generated incredible buzz across all platforms.",
      rating: 5,
      result: "340% Increase in Brand Awareness",
      avatar: "DK",
    },
    {
      name: "Jennifer Lee",
      role: "Founder, Foodie Paradise",
      content: "The food festival activation was absolutely incredible. From concept to execution, everything was handled professionally. Our brand presence grew exponentially and customer engagement skyrocketed.",
      rating: 5,
      result: "12,000+ Attendees, 580% Growth",
      avatar: "JL",
    },
    {
      name: "Michael Torres",
      role: "CEO, Retail Brand",
      content: "Best activation campaign we've ever done. The creative concept was innovative, execution was perfect, and the results speak for themselves. Our brand is now top-of-mind for our target audience.",
      rating: 5,
      result: "420% Engagement Rate",
      avatar: "MT",
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
            Real results from brands we've partnered with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-orange-50 to-white p-6 md:p-8 rounded-2xl border border-orange-100 hover:shadow-2xl transition-all"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
                ))}
              </div>

              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-orange-200" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  {testimonial.content}
                </p>
              </div>

              <div className="bg-orange-100/50 border border-orange-200 rounded-lg p-3 mb-4">
                <p className="text-orange-700 font-semibold text-sm">
                  {testimonial.result}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-orange-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
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
