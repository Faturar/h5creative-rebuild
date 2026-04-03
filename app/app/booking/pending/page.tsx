"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Home, RefreshCw } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

interface Booking {
  id: string
  bookingCode: string
  status: string
  date: Date
  startTime: string
  endTime: string
  customerName: string
  customerEmail: string
  package: {
    name: string
    price: number
  }
  host: {
    name: string
  }
  studio: {
    name: string
    location: string
  }
}

function BookingPendingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const { actualTheme } = useTheme()
  const isDark = actualTheme === "dark"

  const orderId = searchParams.get("order_id")

  useEffect(() => {
    if (orderId) {
      fetchBooking()
    }
  }, [orderId])

  const fetchBooking = async () => {
    if (!orderId) return

    try {
      const response = await fetch(`/api/bookings?bookingCode=${orderId}`)
      const result = await response.json()

      if (result.success && result.data.length > 0) {
        setBooking(result.data[0])
      }
    } catch (error) {
      console.error("Failed to fetch booking:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark
            ? "bg-[#0B0B1B]"
            : "bg-gradient-to-br from-yellow-50 to-orange-50"
        }`}
      >
        <div
          className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? "border-yellow-400" : "border-yellow-600"}`}
        ></div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 ${
        isDark
          ? "bg-[#0B0B1B]"
          : "bg-gradient-to-br from-yellow-50 to-orange-50"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${isDark ? "bg-white/5 backdrop-blur-sm border border-white/10" : "bg-white"} rounded-2xl shadow-xl p-8`}
        >
          {/* Pending Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Clock className="w-10 h-10 text-yellow-600" />
            </motion.div>
            <h1
              className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Pembayaran Pending
            </h1>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Menunggu konfirmasi pembayaran Anda
            </p>
          </div>

          {/* Info Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${isDark ? "bg-yellow-500/10 border-yellow-500/20" : "bg-yellow-50 border-yellow-200"} border rounded-xl p-6 mb-6`}
          >
            <h3
              className={`font-semibold mb-2 ${isDark ? "text-yellow-400" : "text-yellow-900"}`}
            >
              Informasi:
            </h3>
            <ul
              className={`space-y-2 text-sm ${isDark ? "text-yellow-300" : "text-yellow-800"}`}
            >
              <li>• Pembayaran Anda sedang diproses oleh sistem</li>
              <li>• Proses ini biasanya memakan waktu 1-24 jam</li>
              <li>
                • Anda akan menerima email konfirmasi setelah pembayaran selesai
              </li>
              <li>• Slot yang Anda pilih akan ditahan sementara</li>
            </ul>
          </motion.div>

          {/* Booking Details */}
          {booking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`${isDark ? "bg-white/5 border border-white/10" : "bg-gray-50"} rounded-xl p-6 mb-6`}
            >
              <div
                className={`flex items-center justify-between mb-4 pb-4 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}
              >
                <div>
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Kode Booking
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {booking.bookingCode}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Status
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      isDark
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    PENDING
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Nama
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {booking.customerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Email
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {booking.customerEmail}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Paket
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {booking.package.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Host
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {booking.host.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Studio
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {booking.studio.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Lokasi
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {booking.studio.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Tanggal
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {formatDate(booking.date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Waktu
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
                <div
                  className={`flex justify-between pt-3 border-t ${isDark ? "border-white/10" : "border-gray-200"}`}
                >
                  <span
                    className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Total
                  </span>
                  <span className="text-xl font-bold text-purple-600">
                    {formatPrice(booking.package.price)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* What to do next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-8"
          >
            <h3
              className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Apa yang perlu dilakukan?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Periksa email Anda secara berkala untuk update status
                  pembayaran
                </p>
              </li>
              <li className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Jika pembayaran tidak selesai dalam 24 jam, slot akan
                  dibatalkan otomatis
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <button
              onClick={() => router.push("/")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 rounded-lg font-semibold transition-all ${
                isDark
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Home
                className={`w-5 h-5 ${isDark ? "text-white" : "text-gray-700"}`}
              />
              Kembali ke Beranda
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function BookingPendingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:bg-[#0B0B1B] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 dark:border-yellow-400"></div>
        </div>
      }
    >
      <BookingPendingContent />
    </Suspense>
  )
}
