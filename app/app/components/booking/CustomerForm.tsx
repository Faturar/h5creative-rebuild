"use client"

import { useState } from "react"
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
}

export default function CustomerForm({
  bookingData,
  onChange,
}: CustomerFormProps) {
  const { actualTheme } = useTheme()
  const isDark = actualTheme === "dark"

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[0-9]+$/

  const validateField = (fieldName: string, value: string) => {
    const newErrors = { ...errors }
    const trimmedValue = value.trim()

    switch (fieldName) {
      case "customerName":
        if (!trimmedValue) {
          newErrors.customerName = "Nama lengkap harus diisi"
        } else if (trimmedValue.length < 2) {
          newErrors.customerName = "Nama harus diisi minimal 2 karakter"
        } else {
          delete newErrors.customerName
        }
        break

      case "customerPhone":
        if (!trimmedValue) {
          newErrors.customerPhone = "Nomor telepon harus diisi"
        } else if (!phoneRegex.test(trimmedValue)) {
          newErrors.customerPhone = "Nomor telepon hanya boleh berisi angka"
        } else if (trimmedValue.length < 10) {
          newErrors.customerPhone = "Nomor telepon minimal 10 digit"
        } else if (trimmedValue.length > 15) {
          newErrors.customerPhone = "Nomor telepon maksimal 15 digit"
        } else {
          delete newErrors.customerPhone
        }
        break

      case "customerEmail":
        if (!trimmedValue) {
          newErrors.customerEmail = "Email harus diisi"
        } else if (!emailRegex.test(trimmedValue)) {
          newErrors.customerEmail =
            "Format email tidak valid. Contoh: nama@email.com"
        } else {
          delete newErrors.customerEmail
        }
        break

      case "businessName":
        if (!trimmedValue) {
          newErrors.businessName = "Nama bisnis harus diisi"
        } else if (trimmedValue.length < 2) {
          newErrors.businessName = "Nama bisnis minimal 2 karakter"
        } else {
          delete newErrors.businessName
        }
        break

      case "productCategory":
        if (!trimmedValue) {
          newErrors.productCategory = "Kategori produk harus dipilih"
        } else {
          delete newErrors.productCategory
        }
        break
    }

    setErrors(newErrors)
  }

  const handleFieldBlur = (fieldName: string, value: string) => {
    setTouchedFields(new Set([...touchedFields, fieldName]))
    validateField(fieldName, value)
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    onChange({ [fieldName]: value })
    if (touchedFields.has(fieldName)) {
      validateField(fieldName, value)
    }
  }

  const isValid = () => {
    return (
      bookingData.customerName.trim() &&
      bookingData.customerPhone.trim() &&
      bookingData.customerPhone.trim().length >= 10 &&
      bookingData.customerEmail.trim() &&
      emailRegex.test(bookingData.customerEmail.trim()) &&
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

      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-300 mb-2">
                Validasi gagal. Mohon perbaiki kesalahan berikut:
              </p>
              <ul className="text-sm text-red-400 space-y-2 list-disc list-inside">
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>{message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nama Lengkap
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <input
                type="text"
                id="customerName"
                value={bookingData.customerName}
                onChange={(e) =>
                  handleFieldChange("customerName", e.target.value)
                }
                onBlur={() =>
                  handleFieldBlur("customerName", bookingData.customerName)
                }
                className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all text-white placeholder:text-gray-500 ${
                  touchedFields.has("customerName") && errors.customerName
                    ? "border-red-500"
                    : "border-white/10"
                }`}
                placeholder="Masukkan nama lengkap"
                required
              />
              {touchedFields.has("customerName") && errors.customerName && (
                <div className="mt-1 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-red-400 flex-1">
                    {errors.customerName}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="customerPhone"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nomor Telepon
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <input
                type="tel"
                id="customerPhone"
                value={bookingData.customerPhone}
                onChange={(e) => {
                  const phoneValue = e.target.value.replace(/[^0-9]/g, "")
                  handleFieldChange("customerPhone", phoneValue)
                }}
                onBlur={() =>
                  handleFieldBlur("customerPhone", bookingData.customerPhone)
                }
                inputMode="numeric"
                pattern="[0-9]*"
                minLength={10}
                maxLength={15}
                className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all text-white placeholder:text-gray-500 ${
                  touchedFields.has("customerPhone") && errors.customerPhone
                    ? "border-red-500"
                    : "border-white/10"
                }`}
                placeholder="Contoh: 08123456789"
                required
              />
              {touchedFields.has("customerPhone") && errors.customerPhone && (
                <div className="mt-1 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-red-400 flex-1">
                    {errors.customerPhone}
                  </p>
                </div>
              )}
              {!touchedFields.has("customerPhone") && !errors.customerPhone && (
                <p className="mt-1 text-xs text-gray-500">
                  Minimal 10 digit, maksimal 15 digit
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="customerEmail"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <input
                type="email"
                id="customerEmail"
                value={bookingData.customerEmail}
                onChange={(e) =>
                  handleFieldChange("customerEmail", e.target.value)
                }
                onBlur={() =>
                  handleFieldBlur("customerEmail", bookingData.customerEmail)
                }
                autoCapitalize="off"
                autoCorrect="off"
                className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all text-white placeholder:text-gray-500 ${
                  touchedFields.has("customerEmail") && errors.customerEmail
                    ? "border-red-500"
                    : "border-white/10"
                }`}
                placeholder="email@contoh.com"
                required
              />
              {touchedFields.has("customerEmail") && errors.customerEmail && (
                <div className="mt-1 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-red-400 flex-1">
                    {errors.customerEmail}
                  </p>
                </div>
              )}
              {!touchedFields.has("customerEmail") && !errors.customerEmail && (
                <p className="mt-1 text-xs text-gray-500">
                  Gunakan format yang valid, contoh: nama@email.com
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nama Bisnis
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative group">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <input
                type="text"
                id="businessName"
                value={bookingData.businessName}
                onChange={(e) =>
                  handleFieldChange("businessName", e.target.value)
                }
                onBlur={() =>
                  handleFieldBlur("businessName", bookingData.businessName)
                }
                className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all text-white placeholder:text-gray-500 ${
                  touchedFields.has("businessName") && errors.businessName
                    ? "border-red-500"
                    : "border-white/10"
                }`}
                placeholder="Nama bisnis Anda"
                required
              />
              {touchedFields.has("businessName") && errors.businessName && (
                <div className="mt-1 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-red-400 flex-1">
                    {errors.businessName}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Kategori Produk
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative group">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#4920E5] transition-colors" />
              <select
                id="productCategory"
                value={bookingData.productCategory}
                onChange={(e) =>
                  handleFieldChange("productCategory", e.target.value)
                }
                onBlur={() =>
                  handleFieldBlur(
                    "productCategory",
                    bookingData.productCategory,
                  )
                }
                className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border focus:ring-2 focus:ring-[#4920E5] focus:border-transparent transition-all appearance-none text-white cursor-pointer ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white/5 border-white/10"
                } ${
                  touchedFields.has("productCategory") && errors.productCategory
                    ? "border-red-500"
                    : "border-white/10"
                }`}
                required
              >
                <option
                  value=""
                  disabled
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
              {touchedFields.has("productCategory") &&
                errors.productCategory && (
                  <div className="mt-1 flex items-start gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></div>
                    <p className="text-xs text-red-400 flex-1">
                      {errors.productCategory}
                    </p>
                  </div>
                )}
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
        </div>
      </form>
    </div>
  )
}
