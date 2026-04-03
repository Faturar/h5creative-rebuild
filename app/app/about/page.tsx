"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Target,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  Zap,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react"

import Navbar from "@/app/components/home/Navbar"
import FooterFix from "@/app/components/home/FooterFix"

import logoTesti5 from "@/public/assets/images/logos/logo-testi5.svg"
import starIcon from "@/public/assets/images/icons/Star.svg"

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
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
}

const milestones = [
  { value: "100+", label: "Brands", icon: Users },
  { value: "150+", label: "Projects", icon: Award },
  { value: "3", label: "Years", icon: TrendingUp },
  { value: "100M+", label: "Ads Spending", icon: Star },
]

const industries = [
  "F&B Brands",
  "Skincare",
  "Fashion",
  "Property",
  "Event Organizers",
  "Corporate Clients",
]

const coreServices = [
  {
    title: "Brand Activation",
    description:
      "Transform your brand with comprehensive activation strategies",
  },
  {
    title: "Social Media Management",
    description: "Build and grow your social media presence",
  },
  {
    title: "TikTok Management",
    description: "Reach younger audiences with engaging TikTok content",
  },
  {
    title: "Live Streaming",
    description: "Professional live streaming and live shopping",
  },
  {
    title: "Content Production",
    description: "High-quality photo and video production",
  },
  {
    title: "Digital Marketing",
    description: "Complete digital marketing solutions",
  },
  {
    title: "Logo, Print & Packaging Design",
    description: "Visual design services for branding",
  },
  {
    title: "Web Development",
    description: "Modern, fast, and conversion-oriented websites",
  },
]

const capabilities = [
  {
    title: "Business Transformation",
    description:
      "We help brands undergo complete transformations - rename, reposition, rebrand, or relaunch - to stay relevant and competitive in the digital age.",
    icon: Target,
  },
  {
    title: "Refreshing Digital Presence",
    description:
      "We revitalize your digital footprint across all channels, ensuring your brand maintains a fresh, modern, and engaging online presence.",
    icon: TrendingUp,
  },
  {
    title: "Connecting Brands with Digital Audiences",
    description:
      "We bridge the gap between brands and their digital audiences through strategic content, targeted campaigns, and meaningful engagement.",
    icon: Users,
  },
]

const process = [
  {
    step: "Discovery",
    description:
      "We start by understanding your business, goals, and target audience through in-depth research and consultation.",
  },
  {
    step: "Strategy",
    description:
      "Based on our findings, we develop a comprehensive strategy that aligns with your objectives and market positioning.",
  },
  {
    step: "Creation",
    description:
      "Our creative team brings the strategy to life with compelling content, stunning visuals, and innovative solutions.",
  },
  {
    step: "Execution",
    description:
      "We execute the plan across all relevant channels, ensuring consistency and quality at every touchpoint.",
  },
  {
    step: "Optimization",
    description:
      "We continuously monitor, analyze, and optimize our efforts to maximize results and ROI.",
  },
]

export default function AboutPage() {
  return (
    <main className="w-full bg-[#0B0B1B] min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="w-full py-20 md:py-32 lg:py-40 px-8 lg:px-16 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c22dba?w=1920&q=80"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B1B]/90 via-[#0B0B1B]/80 to-[#0B0B1B] z-10"></div>

        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              variants={itemVariants}
            >
              About H5Creative
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-[#FFE7C2] font-semibold mb-4"
              variants={itemVariants}
            >
              Digital Advertising Agency Handling 360° Campaigns
            </motion.p>
            <motion.p
              className="text-lg text-white/80 leading-relaxed mb-8"
              variants={itemVariants}
            >
              We focus on artistic + innovative digital ideas for brand and
              business growth
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4920E5] to-[#6B21A8] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-[#0B0B1B]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                variants={itemVariants}
              >
                Who We Are
              </motion.h2>
              <motion.div
                className="space-y-4 text-white/80"
                variants={itemVariants}
              >
                <p className="leading-relaxed">
                  H5Creative is a creative agency based in Java, Indonesia, with
                  a laser focus on Digital Business Development. We combine
                  strategy, content, and branding to help businesses grow
                  digitally in today&apos;s competitive landscape.
                </p>
                <p className="leading-relaxed">
                  As a full-service digital advertising agency, we handle 360°
                  campaigns that encompass every aspect of your digital
                  presence. From brand activation to social media management,
                  from content production to web development - we deliver
                  comprehensive solutions that drive real results.
                </p>
                <p className="leading-relaxed">
                  Our approach is simple yet powerful: artistic creativity meets
                  innovative technology. We believe in creating digital
                  experiences that not only look stunning but also perform
                  exceptionally, helping your brand stand out and achieve
                  sustainable growth.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="H5Creative Team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* KEY CAPABILITIES */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-[#1a1a2e] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1460925895913-44d8ce7d2d5874e0c081"
            alt="Capabilities Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              What We Do Best
            </motion.h2>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our expertise spans across multiple domains, ensuring
              comprehensive digital solutions for your brand
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl md:rounded-[30px] border border-white/10 hover:border-[#4920E5] transition-all duration-300 hover:shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#4920E5]/10 flex items-center justify-center mb-6">
                  <capability.icon className="w-7 h-7 text-[#4920E5]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {capability.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-[#0B0B1B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Our Journey So Far
            </motion.h2>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              In just 3 years, we&apos;ve achieved remarkable milestones working
              with diverse brands
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4920E5] to-[#6B21A8] flex items-center justify-center mx-auto mb-4">
                  <milestone.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {milestone.value}
                </div>
                <div className="text-white/70 font-medium">
                  {milestone.label}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="text-center text-white/70 mt-12 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            Our team has managed over 100 million IDR in ad spending, delivering
            measurable results for our clients across various industries.
          </motion.p>
        </div>
      </section>

      {/* INDUSTRIES SERVED */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Industries We&apos;ve Worked With
            </motion.h2>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our diverse portfolio spans multiple industries, giving us unique
              insights and experience
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#12BB74] transition-all duration-300 flex items-center gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <CheckCircle2 className="w-6 h-6 text-[#12BB74] flex-shrink-0" />
                <span className="text-white font-semibold">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES OVERVIEW */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-[#0B0B1B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Our Core Services
            </motion.h2>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Comprehensive digital solutions tailored to your business needs
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <Link key={index} href="/service">
                <motion.div
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-[#4920E5]/10 transition-all duration-300 cursor-pointer group"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4920E5] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <Link
              href="/service"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4920E5] to-[#6B21A8] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Explore All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-[#1a1a2e] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1600880290722-f1e00d1c5248fba838d3b0d49d1d?w=1920&q=80"
            alt="Process Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              How We Work
            </motion.h2>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our proven methodology for successful project delivery
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="relative bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#4920E5] transition-all duration-300 hover:shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#4920E5] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.step}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-gradient-to-r from-[#4920E5] to-[#6B21A8]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={index}
                    src={starIcon}
                    className="w-6 h-6"
                    alt="star"
                  />
                ))}
              </div>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Ready to Grow Your Brand?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Let&apos;s discuss how H5Creative can help your business achieve
              its digital goals. Whether you need a complete brand
              transformation, social media management, or anything in between -
              we&apos;re here to help.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#4920E5] font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/service"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[#4920E5] transition-all duration-300"
              >
                View Our Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-[#0B0B1B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Get in Touch
            </motion.h2>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              We&apos;d love to hear from you. Reach out to discuss your next
              project.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              <div className="w-14 h-14 rounded-full bg-[#4920E5]/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-[#4920E5]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email</h3>
              <a
                href="mailto:hello@h5creative.com"
                className="text-[#4920E5] hover:underline"
              >
                hello@h5creative.com
              </a>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              <div className="w-14 h-14 rounded-full bg-[#4920E5]/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-[#4920E5]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
              <a
                href="tel:+6281234567890"
                className="text-[#4920E5] hover:underline"
              >
                +62 812-3456-7890
              </a>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              <div className="w-14 h-14 rounded-full bg-[#4920E5]/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-[#4920E5]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Location</h3>
              <p className="text-white/70">Java, Indonesia</p>
            </motion.div>
          </div>
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 text-white/70">
              <Clock className="w-5 h-5" />
              <span>
                Monday - Friday: 9:00 AM - 6:00 PM | Saturday: 9:00 AM - 2:00 PM
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <FooterFix />
    </main>
  )
}
