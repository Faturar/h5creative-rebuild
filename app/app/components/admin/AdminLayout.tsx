"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useTheme } from "@/contexts/ThemeContext"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Calendar,
  Clock,
  Building2,
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Packages", href: "/admin/packages", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Studios", href: "/admin/studios", icon: Building2 },
  { name: "Slots", href: "/admin/slots", icon: Calendar },
  { name: "Slot Requests", href: "/admin/slot-requests", icon: Clock },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { actualTheme } = useTheme()
  const isDark = actualTheme === "dark"

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0B0B1B]" : "bg-gray-100"}`}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 backdrop-blur-sm border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={`flex items-center justify-between h-16 px-6 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}
          >
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#4920E5] to-[#6B21A8] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H5</span>
              </div>
              <span
                className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Admin
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
            >
              <X
                className={`w-5 h-5 ${isDark ? "text-white" : "text-gray-900"}`}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#4920E5] to-[#6B21A8] text-white shadow-lg"
                      : isDark
                        ? "text-gray-300 hover:bg-white/5"
                        : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-white" : isDark ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div
            className={`p-4 border-t ${isDark ? "border-white/10" : "border-gray-200"}`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4920E5] to-[#6B21A8] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium truncate ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Admin User
                </p>
                <p
                  className={`text-sm truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  admin@h5creative.com
                </p>
              </div>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
              >
                <LogOut
                  className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navbar */}
        <header
          className={`sticky top-0 z-30 backdrop-blur-sm border-b ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}
        >
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
              >
                <Menu
                  className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-900"}`}
                />
              </button>
              <div className="relative hidden sm:block">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`w-80 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none ${
                    isDark
                      ? "bg-white/5 border border-white/10 text-white placeholder:text-gray-500"
                      : "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400"
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className={`relative p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
              >
                <Bell
                  className={`w-5 h-5 ${isDark ? "text-white" : "text-gray-900"}`}
                />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
