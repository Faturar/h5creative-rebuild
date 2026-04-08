"use client"

import { motion } from "framer-motion"
import { Video, Smartphone } from "lucide-react"

type DeviceType = "iPhone" | "Camera+OBS"

interface DeviceSelectionProps {
  selectedDevice: string | null
  onSelect: (deviceType: DeviceType) => void
  onNext: () => void
}

export default function DeviceSelection({
  selectedDevice,
  onSelect,
  onNext,
}: DeviceSelectionProps) {
  const devices = [
    {
      type: "iPhone" as DeviceType,
      icon: Smartphone,
      title: "iPhone",
      description: "Live streaming menggunakan iPhone untuk kualitas yang baik dan fleksibel",
      color: "from-[#4920E5] to-[#6B21A8]",
      features: ["Fleksibel & portable", "Kualitas HD", "Mudah dioperasikan", "Cocok untuk indoor"],
    },
    {
      type: "Camera+OBS" as DeviceType,
      icon: Video,
      title: "Camera + OBS",
      description: "Live streaming profesional dengan kamera DSLR dan OBS untuk kualitas terbaik",
      color: "from-[#FF6B35] to-[#E85D04]",
      features: ["Kualitas 4K/Full HD", "Multi-camera setup", "Advanced controls", "Cocok untuk professional production"],
    },
  ]

  return (
    <div>
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Pilih Perangkat Live Streaming
        </h2>
        <p className="text-sm md:text-base text-gray-400">
          Pilih perangkat yang sesuai dengan kebutuhan live streaming Anda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {devices.map((device, index) => {
          const isSelected = selectedDevice === device.type
          const Icon = device.icon

          return (
            <motion.div
              key={device.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(device.type)}
              className={`relative p-6 rounded-[30px] border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-[#4920E5] bg-[#4920E5]/20 shadow-xl scale-105"
                  : "border-white/10 bg-white/5 hover:border-[#4920E5]/50 hover:shadow-lg hover:bg-white/10"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-3 md:mb-4 bg-gradient-to-br ${device.color}`}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {device.title}
                </h3>

                <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                  {device.description}
                </p>

                <ul className="space-y-1 md:space-y-2 w-full">
                  {device.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-br ${device.color}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isSelected && (
                  <div className="mt-4 md:mt-6 w-10 h-10 bg-[#4920E5] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedDevice}
          className="px-6 md:px-8 py-2.5 md:py-3 bg-[#4920E5] text-white rounded-[20px] font-semibold hover:bg-[#5B2CE8] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_10px_20px_0_#4920E5]"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  )
}
