"use client"

import { motion, Easing } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import thumbnail1 from "@/public/assets/images/thumbnails/thumbnail1.png"
import thumbnail2 from "@/public/assets/images/thumbnails/thumbnail2.png"
import thumbnail3 from "@/public/assets/images/thumbnails/thumbnail3.png"

import FeaturedProject from "./FeaturedProject"

const featuredProjects = [
  {
    id: 1,
    thumbnail: thumbnail1,
    title: "AI Finance SaaS Dashboard",
    category: "UI/UX Design",
  },
  {
    id: 2,
    thumbnail: thumbnail2,
    title: "Portfolio Website Development",
    category: "Website Development",
  },
  {
    id: 3,
    thumbnail: thumbnail3,
    title: "Startup Landing Page Conversion",
    category: "Product Marketing",
  },
]

export default function FeaturedProjects() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as Easing,
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as Easing },
    },
  }

  return (
    <motion.section
      id="Projects"
      className="w-full flex flex-col overflow-x-hidden pb-16 md:pb-[100px] pt-20 md:pt-[180px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div
        className="mb-8 md:mb-[50px] flex flex-col gap-[10px] px-4 md:px-0"
        variants={itemVariants}
      >
        <h2 className="font-extrabold text-[36px] md:text-[50px] leading-[40px] md:leading-[70px] text-center">
          Our Featured Project
        </h2>
        <p className="text-base md:text-lg text-center">
          Working with awesome team from around the world
        </p>
      </motion.div>

      <motion.div
        className="projects mb-6 md:mb-[30px] flex w-full flex-col gap-6 overflow-hidden px-4 md:px-0"
        variants={itemVariants}
      >
        <div className="w-full overflow-hidden">
          <div className="mx-auto w-full">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              grabCursor
              watchOverflow
              speed={550}
              loop
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                480: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 1, spaceBetween: 16 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 24 },
                1536: { slidesPerView: 3, spaceBetween: 24 },
              }}
            >
              {featuredProjects.map((project) => (
                <SwiperSlide key={project.id} className="!h-auto">
                  <FeaturedProject
                    thumbnail={project.thumbnail}
                    title={project.title}
                    category={project.category}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
