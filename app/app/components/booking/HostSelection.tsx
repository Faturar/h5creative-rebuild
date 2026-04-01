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
  onNext: () => void
  onBack: () => void
}

export default function HostSelection({
  packageId,
  selectedHostId,
  onSelect,
  onNext,
  onBack,
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Pilih Host Profesional
        </h2>
        <p className="text-gray-400">
          Pilih host yang sesuai dengan produk dan brand Anda
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {hosts.map((host, index) => {
          const isSelected = selectedHostId === host.id

          return (
            <motion.div
              key={host.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(host.id)}
              className={`relative p-6 rounded-[30px] border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-[#4920E5] bg-[#4920E5]/20 shadow-lg scale-105"
                  : "border-white/10 bg-white/5 hover:border-[#4920E5]/50 hover:shadow-md hover:bg-white/10"
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#4920E5] rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4920E5] to-pink-500 flex items-center justify-center flex-shrink-0">
                  {host.photoUrl ? (
                    <img
                      src={host.photoUrl}
                      alt={host.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {host.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">
                    {host.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      {host.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({host.totalStreams} streams)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-[#4920E5]/20 text-[#4920E5] rounded-full text-sm font-medium border border-[#4920E5]/30">
                  {host.expertise}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {host.bio}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Video className="w-4 h-4 text-[#4920E5]" />
                <span>{host.languages}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 border-2 border-white/20 text-white rounded-[20px] font-semibold hover:bg-white/10 transition-all"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          disabled={!selectedHostId}
          className="px-8 py-3 bg-[#4920E5] text-white rounded-[20px] font-semibold hover:bg-[#5B2CE8] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_10px_20px_0_#4920E5]"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  )
}
