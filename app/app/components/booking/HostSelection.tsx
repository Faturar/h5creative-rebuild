"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Star, Video, Award } from "lucide-react"

interface Host {
  id: string
  name: string
  bio: string
  photoUrl: string | null
  portfolioUrl: string | null
  expertise: string
  rating: number
  totalStreams: number
  languages: string
}

interface HostSelectionProps {
  packageId: string | null
  selectedHostId: string | null
  onSelect: (hostId: string) => void
}

export default function HostSelection({
  packageId,
  selectedHostId,
  onSelect,
}: HostSelectionProps) {
  const [hosts, setHosts] = useState<Host[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHosts()
  }, [packageId])

  const fetchHosts = async () => {
    try {
      const params = new URLSearchParams()
      if (packageId) params.append("packageId", packageId)

      const response = await fetch(`/api/hosts?${params}`)
      const result = await response.json()
      if (result.success) {
        setHosts(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch hosts:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4920E5]"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Pilih Host Profesional
        </h2>
        <p className="text-sm md:text-base text-gray-400">
          Pilih host yang sesuai dengan produk dan brand Anda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {hosts.map((host, index) => {
          const isSelected = selectedHostId === host.id

          return (
            <motion.div
              key={host.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(host.id)}
              className={`relative overflow-hidden rounded-[30px] border-2 cursor-pointer transition-all h-[350px] sm:h-[400px] md:h-[450px] ${
                isSelected
                  ? "border-[#4920E5] shadow-lg scale-105"
                  : "border-white/10 hover:border-[#4920E5]/50 hover:shadow-md"
              }`}
            >
              {/* Background Photo */}
              <div className="absolute inset-0">
                {host.photoUrl ? (
                  <img
                    src={host.photoUrl}
                    alt={host.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#4920E5] to-pink-500 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">
                      {host.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {isSelected && (
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#4920E5] rounded-full flex items-center justify-center shadow-lg z-10">
                  <Check className="w-6 h-6 text-white" />
                </div>
              )}

              {/* Content Overlay */}
              <div className="relative z-10 flex flex-col h-full p-4 md:p-6 justify-end">
                <div className="mb-2 md:mb-3">
                  <span className="inline-block px-2 md:px-3 py-1 bg-[#4920E5] text-white rounded-full text-xs md:text-sm font-medium shadow-lg">
                    {host.expertise}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
                  {host.name}
                </h3>

                <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-base md:text-lg font-semibold text-white">
                    {host.rating}
                  </span>
                  <span className="text-sm md:text-base text-gray-300">
                    ({host.totalStreams} streams)
                  </span>
                </div>

                <p className="text-gray-200 text-xs md:text-sm md:text-base mb-3 md:mb-4 line-clamp-2">
                  {host.bio}
                </p>

                <div className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base text-white">
                  <Video className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">{host.languages}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
