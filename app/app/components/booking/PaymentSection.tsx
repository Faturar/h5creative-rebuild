"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

interface BookingData {
  packageId: string | null
  hostId: string | null
  studioId: string | null
  studioSlotId: string | null
  date: string | null
  startTime: string | null
  endTime: string | null
  customerName: string
  customerPhone: string
  customerEmail: string
  businessName: string
  productCategory: string
  notes: string
}

interface PaymentSectionProps {
  bookingData: BookingData
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
  canProceed: boolean
}

interface Package {
  id: string
  name: string
  price: number
  promoPrice: number | null
}

export default function PaymentSection({
  bookingData,
  onSubmit,
  onBack,
  isSubmitting,
  canProceed,
}: PaymentSectionProps) {
  const { actualTheme } = useTheme()
  const isDark = actualTheme === "dark"

  const [packageData, setPackageData] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (bookingData.packageId) {
      fetchPackage()
    }
  }, [bookingData.packageId])

  const fetchPackage = async () => {
    if (!bookingData.packageId) return

    try {
      const response = await fetch(`/api/packages`)
      const result = await response.json()
      if (result.success) {
        const pkg = result.data.find(
          (p: Package) => p.id === bookingData.packageId,
        )
        if (pkg) {
          setPackageData(pkg)
        }
      }
    } catch (error) {
      console.error("Failed to fetch package:", error)
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

  const totalPrice = packageData
    ? packageData.promoPrice || packageData.price
    : 0

  return (
    <div>
      <div className="text-center mb-8">
        <h2
          className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Konfirmasi & Pembayaran
        </h2>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Review detail booking dan lakukan pembayaran
        </p>
      </div>

      <div className="space-y-6">
        {/* Booking Summary */}
        <div
          className={`${isDark ? "bg-white/5 border border-white/10" : "bg-gradient-to-br from-purple-50 to-pink-50"} rounded-xl p-6`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Ringkasan
          </h3>

          <div className="space-y-3">
            <div
              className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
            >
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Nama Pelanggan
              </span>
              <span
                className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
              >
                {bookingData.customerName}
              </span>
            </div>
            <div
              className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
            >
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Email
              </span>
              <span
                className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
              >
                {bookingData.customerEmail}
              </span>
            </div>
            <div
              className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
            >
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                No. Telepon
              </span>
              <span
                className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
              >
                {bookingData.customerPhone}
              </span>
            </div>
            <div
              className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
            >
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Bisnis
              </span>
              <span
                className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
              >
                {bookingData.businessName}
              </span>
            </div>
            <div
              className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
            >
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Kategori Produk
              </span>
              <span
                className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
              >
                {bookingData.productCategory}
              </span>
            </div>
            {bookingData.notes && (
              <div
                className={`flex justify-between items-start py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
              >
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Catatan
                </span>
                <span
                  className={`font-medium text-right max-w-xs ${isDark ? "text-gray-200" : "text-gray-900"}`}
                >
                  {bookingData.notes}
                </span>
              </div>
            )}
            {bookingData.date &&
              bookingData.startTime &&
              bookingData.endTime && (
                <div
                  className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
                >
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Jadwal
                  </span>
                  <span
                    className={`font-medium text-right ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {new Date(bookingData.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    <br />
                    {bookingData.startTime} - {bookingData.endTime}
                  </span>
                </div>
              )}
          </div>
        </div>

        {/* Payment Information */}
        <div
          className={`${isDark ? "bg-white/5 border border-white/10" : "bg-white border-2 border-gray-200"} rounded-xl p-6`}
        >
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-purple-600" />
            <h3
              className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Metode Pembayaran
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                >
                  Pembayaran Aman
                </p>
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Transaksi Anda dilindungi dengan enkripsi SSL dan sistem
                  pembayaran terpercaya
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                >
                  Proses Cepat
                </p>
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Pembayaran diproses secara instan dan Anda akan menerima
                  konfirmasi segera
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Pembayaran</span>
              {loading ? (
                <div className="animate-pulse h-6 w-32 bg-gray-300 rounded"></div>
              ) : (
                <span className="text-2xl font-bold text-purple-600">
                  {formatPrice(totalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Termasuk pajak dan biaya layanan
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-1">Penting:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Pastikan data yang Anda masukkan sudah benar</li>
              <li>Pembayaran harus diselesaikan dalam 24 jam</li>
              <li>Slot akan dibatalkan otomatis jika pembayaran gagal</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex justify-between pt-6 border-t ${isDark ? "border-white/10" : "border-gray-200"}`}
        >
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className={`px-8 py-3 border-2 rounded-lg font-semibold hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark
                ? "border-white/20 text-white"
                : "border-gray-300 text-gray-700"
            }`}
          >
            Kembali
          </button>
          <button
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting || loading}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Bayar Sekarang</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
