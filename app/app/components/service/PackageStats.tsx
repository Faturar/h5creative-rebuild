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
    <div className="flex flex-wrap gap-2 justify-center">
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Clock className="w-4 h-4 text-purple-600" />
        <span className="text-sm font-semibold text-gray-900">{totalHours} Jam</span>
      </div>
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Clock className="w-4 h-4 text-purple-600" />
        <span className="text-sm font-semibold text-gray-900">{hoursPerDay}/hari</span>
      </div>
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Users className="w-4 h-4 text-purple-600" />
        <span className="text-sm font-semibold text-gray-900">{hosts} Host</span>
      </div>
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Calendar className="w-4 h-4 text-purple-600" />
        <span className="text-sm font-semibold text-gray-900">{days} Hari</span>
      </div>
    </div>
  )
}
