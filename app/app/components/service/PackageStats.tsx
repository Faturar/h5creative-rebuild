"use client"

import { Clock, Users, Calendar } from "lucide-react"

interface PackageStatsProps {
  totalHours: number
  hosts: number
  days: number
}

export default function PackageStats({
  totalHours,
  hosts,
  days,
}: PackageStatsProps) {
  const hoursPerDay = totalHours / days

  return (
    <div className="space-y-2 md:space-y-3">
      {/* Total Jam Live */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#4920E5]/10 to-[#6B21A8]/10 dark:from-[#4920E5]/20 dark:to-[#6B21A8]/20 p-3 md:p-4 rounded-xl border-2 border-[#4920E5]/20 dark:border-[#4920E5]/30">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-[#4920E5]/20 p-2 md:p-2.5 rounded-lg">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#4920E5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Jam Live
            </span>
            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {totalHours}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs md:text-sm font-semibold text-[#4920E5] dark:text-[#A78BFA]">
            Jam
          </span>
        </div>
      </div>
      {/* Jam Per Hari */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#6B21A8]/10 to-[#12BB74]/10 dark:from-[#6B21A8]/20 dark:to-[#12BB74]/20 p-3 md:p-4 rounded-xl border-2 border-[#6B21A8]/20 dark:border-[#6B21A8]/30">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-[#6B21A8]/20 p-2 md:p-2.5 rounded-lg">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#6B21A8]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
              Jam Per Hari
            </span>
            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {hoursPerDay}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs md:text-sm font-semibold text-[#6B21A8] dark:text-[#C084FC]">
            Jam
          </span>
        </div>
      </div>

      {/* Orang */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#12BB74]/10 to-[#0891B2]/10 dark:from-[#12BB74]/20 dark:to-[#0891B2]/20 p-3 md:p-4 rounded-xl border-2 border-[#12BB74]/20 dark:border-[#12BB74]/30">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-[#12BB74]/20 p-2 md:p-2.5 rounded-lg">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
              Orang
            </span>
            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {hosts}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs md:text-sm font-semibold text-[#12BB74] dark:text-[#34D399]">
            Host
          </span>
        </div>
      </div>

      {/* Berapa Hari */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#0891B2]/10 to-[#4920E5]/10 dark:from-[#0891B2]/20 dark:to-[#4920E5]/20 p-3 md:p-4 rounded-xl border-2 border-[#0891B2]/20 dark:border-[#0891B2]/30">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-[#0891B2]/20 p-2 md:p-2.5 rounded-lg">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
              Berapa Hari
            </span>
            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {days}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs md:text-sm font-semibold text-[#0891B2] dark:text-[#38BDF8]">
            Hari
          </span>
        </div>
      </div>
    </div>
  )
}
