"use client"

import { ReactNode } from "react"
import { useTheme } from "@/contexts/ThemeContext"

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  headerAction?: ReactNode
}

export default function Card({
  children,
  className = "",
  title,
  subtitle,
  headerAction,
}: CardProps) {
  const { actualTheme } = useTheme()

  const isDark = actualTheme === "dark"

  return (
    <div
      className={`${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"} backdrop-blur-sm rounded-[30px] border overflow-hidden ${className}`}
    >
      {(title || subtitle || headerAction) && (
        <div
          className={`px-6 py-4 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3
                  className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
