"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, MapPin, Users, Wifi, Camera, Mic } from "lucide-react"

interface Studio {
  id: string
  name: string
  location: string
  description: string
  photoUrl: string | null
  capacity: number
  equipment: string
  amenities: string | null
}

interface StudioSelectionProps {
  selectedStudioId: string | null
  onSelect: (studioId: string) => void
  onNext: () => void
  onBack: () => void
}

export default function StudioSelection({
  selectedStudioId,
  onSelect,
  onNext,
  onBack,
}: StudioSelectionProps) {
  const [studios, setStudios] = useState<Studio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudios()
  }, [])

  const fetchStudios = async () => {
    try {
      const response = await fetch("/api/studios")
      const result = await response.json()
      if (result.success) {
        setStudios(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch studios:", error)
    } finally {
      setLoading(false)
    }
  }

  const parseJson = (jsonString: string | null) => {
    if (!jsonString) return []
    try {
      return JSON.parse(jsonString)
    } catch {
      return []
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
        <h2 className="text-3xl font-bold text-white mb-2">Pilih Studio</h2>
        <p className="text-gray-400">
          Pilih studio profesional untuk live streaming Anda
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {studios.map((studio, index) => {
          const isSelected = selectedStudioId === studio.id
          const equipment = parseJson(studio.equipment)
          const amenities = parseJson(studio.amenities)

          return (
            <motion.div
              key={studio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(studio.id)}
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

              {studio.photoUrl && (
                <div className="mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={studio.photoUrl}
                    alt={studio.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {studio.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-[#4920E5]" />
                  <span>{studio.location}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{studio.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                <Users className="w-4 h-4 text-[#4920E5]" />
                <span>Kapasitas: {studio.capacity} orang</span>
              </div>

              {equipment.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Peralatan:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {equipment.slice(0, 4).map((item: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30"
                      >
                        <Camera className="w-3 h-3" />
                        {item}
                      </span>
                    ))}
                    {equipment.length > 4 && (
                      <span className="inline-block px-2 py-1 bg-white/10 text-gray-400 rounded text-xs">
                        +{equipment.length - 4} lainnya
                      </span>
                    )}
                  </div>
                </div>
              )}

              {amenities.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Fasilitas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {amenities.slice(0, 3).map((item: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#12BB74]/20 text-[#12BB74] rounded text-xs border border-[#12BB74]/30"
                      >
                        <Wifi className="w-3 h-3" />
                        {item}
                      </span>
                    ))}
                    {amenities.length > 3 && (
                      <span className="inline-block px-2 py-1 bg-white/10 text-gray-400 rounded text-xs">
                        +{amenities.length - 3} lainnya
                      </span>
                    )}
                  </div>
                </div>
              )}
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
          disabled={!selectedStudioId}
          className="px-8 py-3 bg-[#4920E5] text-white rounded-[20px] font-semibold hover:bg-[#5B2CE8] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_10px_20px_0_#4920E5]"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  )
}
