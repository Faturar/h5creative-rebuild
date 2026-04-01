"use client"

import { motion } from "framer-motion"
import { User, Phone, Mail, Building, Tag, FileText } from "lucide-react"

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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Informasi Pelanggan
        </h2>
        <p className="text-gray-600">
          Lengkapi data diri dan informasi bisnis Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="customerName"
                value={bookingData.customerName}
                onChange={(e) => onChange({ customerName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="customerPhone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nomor Telepon
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="customerPhone"
                value={bookingData.customerPhone}
                onChange={(e) => onChange({ customerPhone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Contoh: 08123456789"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="customerEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="customerEmail"
                value={bookingData.customerEmail}
                onChange={(e) => onChange({ customerEmail: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="email@contoh.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nama Bisnis
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="businessName"
                value={bookingData.businessName}
                onChange={(e) => onChange({ businessName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Nama bisnis Anda"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="productCategory"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kategori Produk
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              id="productCategory"
              value={bookingData.productCategory}
              onChange={(e) => onChange({ productCategory: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none bg-white"
              required
            >
              <option value="">Pilih kategori produk</option>
              <option value="Fashion">Fashion</option>
              <option value="Beauty">Beauty</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Sports">Sports</option>
              <option value="Baby & Kids">Baby & Kids</option>
              <option value="Automotive">Automotive</option>
              <option value="Other">Lainnya</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Catatan Tambahan (Opsional)
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              id="notes"
              value={bookingData.notes}
              onChange={(e) => onChange({ notes: e.target.value })}
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              placeholder="Tambahkan catatan atau permintaan khusus..."
            />
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            Kembali
          </button>
          <button
            type="submit"
            disabled={!isValid()}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Lanjutkan ke Pembayaran
          </button>
        </div>
      </form>
    </div>
  )
}
