"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export default function SidebarSlider() {
  return (
    <div className="p-4 flex-1 flex flex-col justify-end overflow-hidden bg-[url('/assets/images/background/livestream3.png')] bg-cover bg-center bg-no-repeat lg:sticky top-0 h-screen">
      {/* <div className="flex flex-col bg-white p-[24px] xl:p-[30px] lg:gap-2 xl:gap-4 rounded-[30px] sticky bottom-[16px] xl:bottom-[30px]">
        <Slide1 />
      </div> */}
    </div>
  )
}

function Slide1() {
  return (
    <>
      <h1 className="text-base lg:text-xl xl:text-2xl font-bold">
        Optimasi Penjualan Kamu Sekarang!
      </h1>
      <p className="text-sm xl:text-lg leading-6 xl:leading-8 text-gray-800">
        Kami Bantu Live Streaming kamu dengan konsep, branding dan traffic yang
        meningkat!
      </p>
      <CountdownTimer />
    </>
  )
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 57,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds -= 1
        } else if (minutes > 0) {
          minutes -= 1
          seconds = 59
        } else if (hours > 0) {
          hours -= 1
          minutes = 59
          seconds = 59
        } else {
          hours = 23
          minutes = 59
          seconds = 57
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (value: number) => value.toString().padStart(2, "0")

  return (
    <div className="bg-gradient-to-r from-[#4920E5] to-[#6B21A8] rounded-2xl p-4 mt-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs md:text-sm font-semibold text-white mb-1">
            promo peluncuran yang akan habis pada tanggal 12
          </p>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-base md:text-md font-bold text-white">
                {formatTime(timeLeft.hours)}
              </span>
              <p className="text-[10px] text-white/80">Jam</p>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-base md:text-md font-bold text-white">
                {formatTime(timeLeft.minutes)}
              </span>
              <p className="text-[10px] text-white/80">Menit</p>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-base md:text-md font-bold text-white">
                {formatTime(timeLeft.seconds)}
              </span>
              <p className="text-[10px] text-white/80">Detik</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
