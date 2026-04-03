"use client"

import { ButtonHTMLAttributes, forwardRef } from "react"
import { Loader2 } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      disabled,
      className = "",
      ...props
    },
    ref,
  ) => {
    const { actualTheme } = useTheme()
    const isDark = actualTheme === "dark"

    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-[#4920E5] to-[#6B21A8] text-white hover:from-[#5B2FE8] hover:to-[#7D2FB8] shadow-lg hover:shadow-xl focus:ring-[#4920E5]",
      secondary: isDark
        ? "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 focus:ring-white"
        : "bg-gray-100 text-gray-900 border-2 border-gray-300 hover:bg-gray-200 focus:ring-gray-500",
      danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl focus:ring-red-500",
      ghost: isDark
        ? "text-gray-300 hover:bg-white/10 focus:ring-white"
        : "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    }

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon}
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
