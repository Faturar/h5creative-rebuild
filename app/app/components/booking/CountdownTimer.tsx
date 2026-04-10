"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export default function CountdownTimer() {
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
        <Clock className="w-6 h-6 text-white flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm md:text-base font-semibold text-white mb-1">
            promo launching yang akan habis pada tanggal 12
          </p>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-lg md:text-xl font-bold text-white">
                {formatTime(hours)}
              </span>
              <p className="text-[10px] text-white/80">Jam</p>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-lg md:text-xl font-bold text-white">
                {formatTime(minutes)}
              </span>
              <p className="text-[10px] text-white/80">Menit</p>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-lg md:text-xl font-bold text-white">
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
