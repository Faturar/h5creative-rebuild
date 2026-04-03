"use client"

import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

type StatusType = "success" | "error" | "warning" | "info" | "default"

interface StatusBadgeProps {
  status: string
  type?: StatusType
  size?: "sm" | "md"
}

const statusConfig: Record<
  StatusType,
  {
    bgClass: string
    textClass: string
    icon?: React.ReactNode
  }
> = {
  success: {
    bgClass: "bg-[#12BB74]/20",
    textClass: "text-[#12BB74]",
    icon: <CheckCircle className="w-3 h-3" />,
  },
  error: {
    bgClass: "bg-red-500/20",
    textClass: "text-red-400",
    icon: <XCircle className="w-3 h-3" />,
  },
  warning: {
    bgClass: "bg-yellow-500/20",
    textClass: "text-yellow-400",
    icon: <AlertCircle className="w-3 h-3" />,
  },
  info: {
    bgClass: "bg-blue-500/20",
    textClass: "text-blue-400",
    icon: <Clock className="w-3 h-3" />,
  },
  default: {
    bgClass: "bg-gray-500/20",
    textClass: "text-gray-400",
  },
}

export default function StatusBadge({
  status,
  type = "default",
  size = "md",
}: StatusBadgeProps) {
  const config = statusConfig[type]
  const sizeClasses =
    size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bgClass} ${config.textClass} ${sizeClasses}`}
    >
      {config.icon}
      {status}
    </span>
  )
}
