"use client"

import { motion } from "framer-motion"
import { User, Phone, Mail, Building, Tag, FileText, Info } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

interface BookingData {
  customerName: string
  customerPhone: string
  customerEmail: string
  businessName: string
  productCategory: string
  notes: string
}

interface CustomerFormProps {
  bookingData: BookingData
  onChange: (data: Partial<BookingData>) => void
  onNext: () => void
  onBack: () => void
}

export default function CustomerForm({
  bookingData,
  onChange,
  onNext,
  onBack,
}: CustomerFormProps) {
  const { actualTheme } = useTheme()
  const isDark = actualTheme === "dark"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isValid = () => {
    return (
      bookingData.customerName.trim() &&
      bookingData.customerPhone.trim() &&
      bookingData.customerEmail.trim() &&
      bookingData.businessName.trim() &&
      bookingData.productCategory.trim()
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Informasi Pelanggan
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Lengkapi data diri dan informasi bisnis Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nama Lengkap
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <input
                type="text"
                id="customerName"
                value={bookingData.customerName}
                onChange={(e) => onChange({ customerName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all text-white placeholder:text-gray-500"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="customerPhone"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nomor Telepon
            </label>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <input
                type="tel"
                id="customerPhone"
                value={bookingData.customerPhone}
                onChange={(e) => onChange({ customerPhone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all text-white placeholder:text-gray-500"
                placeholder="Contoh: 08123456789"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="customerEmail"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <input
                type="email"
                id="customerEmail"
                value={bookingData.customerEmail}
                onChange={(e) => onChange({ customerEmail: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all text-white placeholder:text-gray-500"
                placeholder="email@contoh.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nama Bisnis
            </label>
            <div className="relative group">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <input
                type="text"
                id="businessName"
                value={bookingData.businessName}
                onChange={(e) => onChange({ businessName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all text-white placeholder:text-gray-500"
                placeholder="Nama bisnis Anda"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Kategori Produk
            </label>
            <div className="relative group">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <select
                id="productCategory"
                value={bookingData.productCategory}
                onChange={(e) => onChange({ productCategory: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all appearance-none text-white ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white/5 border-white/10"
                }`}
                required
              >
                <option
                  value=""
                  className={isDark ? "text-gray-400" : "text-gray-900"}
                >
                  Pilih kategori produk
                </option>
                <option
                  value="Fashion"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Fashion
                </option>
                <option
                  value="Beauty"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Beauty
                </option>
                <option
                  value="Food & Beverage"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Food & Beverage
                </option>
                <option
                  value="Electronics"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Electronics
                </option>
                <option
                  value="Home & Living"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Home & Living
                </option>
                <option
                  value="Health & Wellness"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Health & Wellness
                </option>
                <option
                  value="Sports"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Sports
                </option>
                <option
                  value="Baby & Kids"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Baby & Kids
                </option>
                <option
                  value="Automotive"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Automotive
                </option>
                <option
                  value="Other"
                  className={isDark ? "text-gray-900" : "text-gray-900"}
                >
                  Lainnya
                </option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Catatan Tambahan{" "}
              <span className="text-gray-500 text-xs">(Opsional)</span>
            </label>
            <div className="relative group">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <textarea
                id="notes"
                value={bookingData.notes}
                onChange={(e) => onChange({ notes: e.target.value })}
                rows={4}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all resize-none text-white placeholder:text-gray-500"
                placeholder="Tambahkan catatan atau permintaan khusus..."
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col md:flex-row justify-between pt-6 md:pt-8 gap-4 border-t border-white/10">
            <button
              type="button"
              onClick={onBack}
              className={`px-6 md:px-8 py-3 border-2 rounded-xl font-semibold hover:bg-white/10 transition-all ${
                isDark
                  ? "border-white/20 text-white"
                  : "border-white/20 text-gray-300"
              }`}
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={!isValid()}
              className="px-6 md:px-8 py-3 bg-linear-to-r from-[#4920E5] to-pink-600 text-white rounded-xl font-semibold hover:from-[#5B2CE8] hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_10px_20px_0_#4920E5]"
            >
              Lanjutkan ke Pembayaran
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
