import { ReactNode } from "react"

interface StatCardProps {
  value: string
  label: string
  color?: string
  icon?: ReactNode
}

export default function StatCard({
  value,
  label,
  color = "#2E2BFF",
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <div
        className="text-4xl md:text-5xl font-extrabold mb-2 group-hover:scale-110 transition-transform duration-300"
        style={{ color }}
      >
        {value}
      </div>
      <p className="text-white/80 font-medium text-sm md:text-base">{label}</p>
    </div>
  )
}
