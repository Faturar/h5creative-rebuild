"use client"

interface PackageStatsProps {
  totalHours: number
  hosts: number
  days: number
}

export default function PackageStats({ totalHours, hosts, days }: PackageStatsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Total Jam Live</span>
          <span className="text-2xl font-bold text-purple-600">{totalHours}</span>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">Jam</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Liver Per Hari</span>
          <span className="text-2xl font-bold text-blue-600">{hosts}</span>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">Orang</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-gradient-to-r from-cyan-50 to-green-50 p-4 rounded-lg border border-cyan-100">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Berapa Hari</span>
          <span className="text-2xl font-bold text-cyan-600">{days}</span>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">Hari</span>
        </div>
      </div>
    </div>
  )
}
