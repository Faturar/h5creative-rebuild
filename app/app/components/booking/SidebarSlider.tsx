"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, TrendingUp, Quote, Star } from "lucide-react"

export default function SidebarSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="p-4 flex-1 flex flex-col justify-end overflow-hidden bg-[url('/assets/images/background/livestream.png')] bg-cover bg-center bg-no-repeat lg:sticky top-0 h-screen">
      <div className="flex flex-col bg-white p-[24px] xl:p-[30px] lg:gap-2 xl:gap-4 rounded-[30px] sticky bottom-[16px] xl:bottom-[30px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentSlide === 0 && <Slide1 />}
            {currentSlide === 1 && <Slide2 />}
            {currentSlide === 2 && <Slide3 />}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-6 bg-[#4920E5]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Slide1() {
  return (
    <>
      <h1 className="text-base lg:text-xl xl:text-2xl font-bold">
        Livestream Service
      </h1>
      <p className="text-sm xl:text-lg leading-6 xl:leading-8 text-gray-800">
        Tingkatkan penjualan dengan host profesional dan studio modern.
      </p>
      <CountdownTimer />
    </>
  )
}

function Slide2() {
  return (
    <>
      <h1 className="text-base lg:text-xl xl:text-2xl font-bold">
        Statistik Brand Live
      </h1>
      <p className="text-sm xl:text-xl leading-6 xl:leading-8 text-gray-800">
        Ratusan brand sukses meningkatkan penjualan bersama kami.
      </p>
      <StatisticsCounter />
    </>
  )
}

function Slide3() {
  return (
    <>
      <h1 className="text-base lg:text-xl xl:text-2xl font-bold">
        Pengalaman Live H5 Creative
      </h1>
      <p className="text-sm xl:text-xl leading-6 xl:leading-8 text-gray-800">
        Apa kata klien tentang pengalaman live streaming kami?
      </p>
      <Testimonial />
    </>
  )
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 24 * 60 * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const formatTime = (value: number) => value.toString().padStart(2, "0")

  return (
    <div className="bg-gradient-to-r from-[#4920E5] to-[#6B21A8] rounded-2xl p-4 mt-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs md:text-sm font-semibold text-white mb-1">
            promo launching yang akan habis pada tanggal 12
          </p>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-base md:text-md font-bold text-white">
                {formatTime(hours)}
              </span>
              <p className="text-[10px] text-white/80">Jam</p>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-base md:text-md font-bold text-white">
                {formatTime(minutes)}
              </span>
              <p className="text-[10px] text-white/80">Menit</p>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-base md:text-md font-bold text-white">
                {formatTime(seconds)}
              </span>
              <p className="text-[10px] text-white/80">Detik</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatisticsCounter() {
  const [count, setCount] = useState(0)
  const targetCount = 487

  useEffect(() => {
    const duration = 2000
    const increment = targetCount / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetCount) {
        setCount(targetCount)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [])

  const formatCount = (value: number) => value.toLocaleString("id-ID")

  return (
    <div className="bg-gradient-to-r from-[#12BB74] to-[#0D9E5F] rounded-2xl p-4 mt-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xl md:text-sm font-semibold text-white mb-1">
            Berapa brand yang sudah live
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <span className="text-xl md:text-2xl font-bold text-white">
              {formatCount(count)}
            </span>
            <p className="text-[10px] text-white/80">Brand Aktif</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Testimonial() {
  const testimonials = [
    {
      name: "Sarah Wijaya",
      brand: "Fashion Store",
      rating: 5,
      text: "Layanan live streaming H5 Creative sangat membantu meningkatkan penjualan kami hingga 300% dalam sebulan!",
    },
    {
      name: "Budi Santoso",
      brand: "Elektronik Jaya",
      rating: 5,
      text: "Host-nya profesional dan studio-nya modern. Sangat puas dengan hasilnya!",
    },
    {
      name: "Dewi Lestari",
      brand: "Beauty Corner",
      rating: 5,
      text: "Tim yang responsive dan hasil yang memuaskan. Recommended!",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const testimonial = testimonials[currentIndex]

  return (
    <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-2xl p-4 mt-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm md:text-base font-semibold text-white mb-1">
            {testimonial.name}
          </p>
          <p className="text-[10px] md:text-xs text-white/80 mb-2">
            {testimonial.brand}
          </p>
          <p className="text-xs md:text-sm text-white/90 leading-relaxed">
            &quot;{testimonial.text}&quot;
          </p>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star key={index} className="w-3 h-3 text-white fill-white" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
