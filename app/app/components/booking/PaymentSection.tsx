"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Info,
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
  deviceType: string | null
  bookingType: string | null
  customHours: number | null
  customDays: number | null
  hoursPerDay: number | null
  totalHours?: number
  timeSlots?: any[]
}

interface PaymentSectionProps {
  bookingData: BookingData
  isSubmitting: boolean
  canProceed: boolean
}

interface Package {
  id: string
  name: string
  price: number
  promoPrice: number | null
  totalHours?: number
  numberOfDays?: number
}

export default function PaymentSection({
  bookingData,
  isSubmitting,
  canProceed,
}: PaymentSectionProps) {
  const { actualTheme } = useTheme()
  const isDark = actualTheme === "dark"

  const [packageData, setPackageData] = useState<Package | null>(null)
  const [pricingBreakdown, setPricingBreakdown] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (bookingData.packageId) {
      fetchPackage()
      setPricingBreakdown(null)
    } else if (bookingData.deviceType && bookingData.totalHours) {
      calculatePricing()
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [
    bookingData.packageId,
    bookingData.deviceType,
    bookingData.totalHours,
    bookingData.timeSlots,
  ])

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

  const calculatePricing = async () => {
    if (!bookingData.deviceType || !bookingData.totalHours) return

    try {
      const res = await fetch("/api/pricing/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceType: bookingData.deviceType,
          totalHours: bookingData.totalHours,
          timeSlots: bookingData.timeSlots || [],
        }),
      })

      const result = await res.json()

      if (result.success) {
        setPricingBreakdown(result.data)
      }
    } catch (error) {
      console.error("Error calculating pricing:", error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const totalPrice =
    packageData
      ? packageData.promoPrice || packageData.price
      : pricingBreakdown?.finalPrice || 0

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

        {/* Booking Details */}
        {(bookingData.deviceType || packageData || pricingBreakdown) && (
          <div
            className={`${isDark ? "bg-white/5 border border-white/10" : "bg-gradient-to-br from-blue-50 to-purple-50"} rounded-xl p-6`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Detail Booking
            </h3>

            <div className="space-y-3">
              {bookingData.deviceType && (
                <div
                  className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
                >
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Tipe Perangkat
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {bookingData.deviceType === "OBS Sistem"
                      ? "OBS Sistem"
                      : bookingData.deviceType}
                  </span>
                </div>
              )}

              {bookingData.bookingType === "custom" &&
                bookingData.totalHours && (
                  <div
                    className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
                  >
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Jenis Booking
                    </span>
                    <span
                      className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                    >
                      Custom Jam ({bookingData.customHours} jam -{" "}
                      {bookingData.customDays} hari)
                    </span>
                  </div>
                )}

              {pricingBreakdown && (
                <div
                  className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
                >
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Harga per Jam
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {pricingBreakdown.pricingTier
                      ? formatPrice(pricingBreakdown.pricingTier.pricePerHour)
                      : "N/A"}
                  </span>
                </div>
              )}

              {pricingBreakdown && (
                <div
                  className={`flex justify-between items-center py-2 border-b ${isDark ? "border-white/10" : "border-purple-200"}`}
                >
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Total Jam
                  </span>
                  <span
                    className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {pricingBreakdown.totalHours} jam
                  </span>
                </div>
              )}

              {pricingBreakdown?.surcharges &&
                pricingBreakdown.surcharges.length > 0 && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                    <p
                      className={`text-sm font-semibold mb-2 ${isDark ? "text-orange-300" : "text-orange-700"}`}
                    >
                      Biaya Tambahan Waktu
                    </p>
                    {pricingBreakdown.surcharges.map(
                      (surcharge: any, index: number) => (
                        <div
                          key={index}
                          className={`flex justify-between text-xs mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                        >
                          <span>{surcharge.timeSlot}</span>
                          <span className="text-orange-600 font-medium">
                            +{formatPrice(surcharge.amount)}
                          </span>
                        </div>
                      ),
                    )}
                    <div
                      className={`flex justify-between text-sm font-semibold mt-2 pt-2 border-t ${isDark ? "border-orange-400/30" : "border-orange-200"}`}
                    >
                      <span
                        className={
                          isDark ? "text-orange-300" : "text-orange-700"
                        }
                      >
                        Total Biaya Tambahan
                      </span>
                      <span className="text-orange-600">
                        +{formatPrice(pricingBreakdown.totalSurcharge)}
                      </span>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Rincian Harga - Detailed Price Breakdown */}
        {(pricingBreakdown || packageData) && (
          <div
            className={`${isDark ? "bg-[#12BB74]/10 border-2 border-[#12BB74]/30" : "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"} rounded-xl p-6`}
          >
            <div className="flex items-start gap-3 mb-4">
              <DollarSign
                className={`w-6 h-6 flex-shrink-0 mt-0.5 ${isDark ? "text-[#12BB74]" : "text-green-600"}`}
              />
              <div>
                <h3
                  className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Rincian Harga
                </h3>
                <p
                  className={`text-xs md:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Detail pembayaran Anda
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {packageData ? (
                <div className="space-y-3">
                  {packageData.price && packageData.promoPrice && (
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Harga Asli
                        </span>
                        <span
                          className={`text-sm line-through text-gray-400`}
                        >
                          {formatPrice(packageData.price)}
                        </span>
                      </div>
                      <div
                        className={`flex justify-between text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        <span>{packageData.totalHours} jam × {packageData.numberOfDays} hari</span>
                        <span>Diskon</span>
                      </div>
                    </div>
                  )}

                  {packageData.promoPrice && (
                    <div
                      className={`flex justify-between items-center p-4 rounded-lg ${isDark ? "bg-[#12BB74]/20 border-2 border-[#12BB74]/40" : "bg-green-100 border-2 border-green-300"}`}
                    >
                      <div>
                        <span
                          className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          Total Pembayaran
                        </span>
                        {packageData.promoPrice < packageData.price && (
                          <p
                            className={`text-xs text-[#12BB74]`}
                          >
                            Hemat {formatPrice(packageData.price - packageData.promoPrice)} (
                            {Math.round(
                              ((packageData.price - packageData.promoPrice) / packageData.price) * 100
                            )}
                            %)
                          </p>
                        )}
                      </div>
                      <span
                        className={`text-2xl font-bold text-[#12BB74]`}
                      >
                        {formatPrice(packageData.promoPrice)}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                    {pricingBreakdown.pricingTier && (
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                          >
                            Harga dasar
                          </span>
                          <span
                            className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                          >
                            {formatPrice(pricingBreakdown.tieredPrice)}
                          </span>
                        </div>
                        <div className={`flex justify-between text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          <span>
                            {formatPrice(pricingBreakdown.pricingTier.pricePerHour)} × {pricingBreakdown.totalHours} jam
                          </span>
                          <span>Normal operational hours</span>
                        </div>
                      </div>
                    )}

                    {pricingBreakdown.totalSurcharge > 0 && (
                      <div
                        className={`p-4 rounded-lg ${isDark ? "bg-orange-500/10 border border-orange-500/30" : "bg-orange-50 border border-orange-200"}`}
                      >
                        <div className="flex items-start gap-2 mb-3">
                          <Info
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? "text-orange-400" : "text-orange-600"}`}
                          />
                          <p
                            className={`text-sm font-semibold ${isDark ? "text-orange-300" : "text-orange-800"}`}
                          >
                            Biaya Tambahan (Jam Non-Operasional)
                          </p>
                        </div>
                        <div className="space-y-2">
                          {pricingBreakdown.surcharges.map(
                            (surcharge: any, index: number) => (
                              <div
                                key={index}
                                className={`flex justify-between items-center py-2 border-b ${isDark ? "border-orange-400/20" : "border-orange-200"}`}
                              >
                                <div className="flex-1">
                                  <div
                                    className={`text-xs font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                                  >
                                    {surcharge.timeSlot}
                                  </div>
                                  <div
                                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                                  >
                                    {surcharge.reason}
                                  </div>
                                </div>
                                <span
                                  className={`text-sm font-bold text-orange-600 flex-shrink-0 ml-4`}
                                >
                                  +{formatPrice(surcharge.amount)}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-orange-500/30">
                          <span
                            className={`text-sm font-bold ${isDark ? "text-orange-300" : "text-orange-800"}`}
                          >
                            Total Biaya Tambahan
                          </span>
                          <span className="text-base font-bold text-orange-600">
                            +{formatPrice(pricingBreakdown.totalSurcharge)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div
                      className={`flex justify-between items-center p-4 rounded-lg ${isDark ? "bg-[#12BB74]/20 border-2 border-[#12BB74]/40" : "bg-green-100 border-2 border-green-300"}`}
                    >
                      <div>
                        <span
                          className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          Total Pembayaran
                        </span>
                        <p
                          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Termasuk semua biaya
                        </p>
                      </div>
                      <span
                        className={`text-2xl font-bold text-[#12BB74]`}
                      >
                        {formatPrice(pricingBreakdown.finalPrice)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

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

          <div className="mt-6 space-y-4">
            <div
              className={`flex items-center justify-between ${isDark ? "bg-[#4920E5]/10 border-2 border-[#4920E5]/30" : "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200"} rounded-xl p-5`}
            >
              <div>
                <span
                  className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-700"}`}
                >
                  Total Pembayaran
                </span>
                <p
                  className={`text-xs md:text-sm ${isDark ? "text-gray-300" : "text-gray-400"}`}
                >
                  Termasuk pajak dan biaya layanan
                </p>
              </div>
              {loading ? (
                <div className="animate-pulse h-7 w-32 bg-gray-300 rounded"></div>
              ) : (
                <span className={`text-2xl md:text-3xl font-bold text-white`}>
                  {formatPrice(totalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Terms */}
        <div
          className={`${isDark ? "bg-blue-500/10 border-2 border-blue-500/30" : "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200"} rounded-xl p-5`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className={`w-5 h-5 md:w-6 md:h-6 ${isDark ? "text-blue-400" : "text-blue-600"} flex-shrink-0 mt-0.5`}
            />
            <div className="text-sm md:text-base">
              <p
                className={`font-bold mb-3 ${isDark ? "text-blue-300" : "text-blue-900"}`}
              >
                Penting:
              </p>
              <ul
                className={`space-y-2 md:space-y-3 ${isDark ? "text-blue-200" : "text-blue-800"}`}
              >
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span className="text-sm md:text-base">
                    Pastikan data yang Anda masukkan sudah benar
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span className="text-sm md:text-base">
                    Pembayaran harus diselesaikan dalam 24 jam
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span className="text-sm md:text-base">
                    Slot akan dibatalkan otomatis jika pembayaran gagal
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
