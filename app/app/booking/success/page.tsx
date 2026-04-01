"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, Home, Download, Mail } from "lucide-react"

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

export default function BookingSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Success Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pembayaran Berhasil!
            </h1>
            <p className="text-gray-600">Booking Anda telah dikonfirmasi</p>
          </div>

          {/* Booking Details */}
          {booking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Kode Booking</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {booking.bookingCode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    PAID
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama</span>
                  <span className="font-medium text-gray-900">
                    {booking.customerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-gray-900">
                    {booking.customerEmail}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paket</span>
                  <span className="font-medium text-gray-900">
                    {booking.package.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Host</span>
                  <span className="font-medium text-gray-900">
                    {booking.host.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Studio</span>
                  <span className="font-medium text-gray-900">
                    {booking.studio.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lokasi</span>
                  <span className="font-medium text-gray-900">
                    {booking.studio.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(booking.date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waktu</span>
                  <span className="font-medium text-gray-900">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="text-xl font-bold text-purple-600">
                    {formatPrice(booking.package.price)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <h3 className="font-semibold text-gray-900">
              Langkah Selanjutnya:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Konfirmasi booking telah dikirim ke email Anda. Silakan cek
                  inbox atau folder spam.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Download className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Simpan kode booking Anda untuk referensi dan check-in pada
                  hari live streaming.
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            <button
              onClick={() => router.push("/")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
