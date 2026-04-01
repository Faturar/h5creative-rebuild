"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Pencil, Trash2, Save, X } from "lucide-react"

interface Package {
  id: string
  name: string
  description: string
  price: number
  promoPrice: number | null
  durationMinutes: number
  platform: string
  includesHost: boolean
  includesStudio: boolean
  includesDevice: boolean
  isActive: boolean
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    promoPrice: "",
    durationMinutes: "120",
    platform: "TikTok",
    includesHost: true,
    includesStudio: true,
    includesDevice: true,
    isActive: true,
  })

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages")
      const result = await response.json()
      if (result.success) {
        setPackages(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch packages:", error)
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

  const handleSave = async () => {
    try {
      const url = editingPackage
        ? `/api/packages/${editingPackage.id}`
        : "/api/packages"
      const method = editingPackage ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          promoPrice: formData.promoPrice
            ? parseFloat(formData.promoPrice)
            : null,
          durationMinutes: parseInt(formData.durationMinutes),
        }),
      })

      const result = await response.json()
      if (result.success) {
        setShowModal(false)
        setEditingPackage(null)
        resetForm()
        fetchPackages()
      }
    } catch (error) {
      console.error("Failed to save package:", error)
    }
  }

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg)
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      promoPrice: pkg.promoPrice?.toString() || "",
      durationMinutes: pkg.durationMinutes.toString(),
      platform: pkg.platform,
      includesHost: pkg.includesHost,
      includesStudio: pkg.includesStudio,
      includesDevice: pkg.includesDevice,
      isActive: pkg.isActive,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return

    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()
      if (result.success) {
        fetchPackages()
      }
    } catch (error) {
      console.error("Failed to delete package:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      promoPrice: "",
      durationMinutes: "120",
      platform: "TikTok",
      includesHost: true,
      includesStudio: true,
      includesDevice: true,
      isActive: true,
    })
  }

  const openModal = () => {
    setEditingPackage(null)
    resetForm()
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Packages
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage live streaming packages
            </p>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add Package
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {pkg.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform</span>
                  <span className="font-medium text-gray-900">
                    {pkg.platform}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">
                    {pkg.durationMinutes} min
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price</span>
                  <span className="font-bold text-purple-600">
                    {formatPrice(pkg.price)}
                  </span>
                </div>
                {pkg.promoPrice && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Promo Price</span>
                    <span className="font-bold text-green-600">
                      {formatPrice(pkg.promoPrice)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {pkg.includesHost && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    Host Included
                  </span>
                )}
                {pkg.includesStudio && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    Studio Included
                  </span>
                )}
                {pkg.includesDevice && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                    Device Included
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    pkg.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {pkg.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingPackage ? "Edit Package" : "Add New Package"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Starter Package"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Describe the package..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (IDR)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Price (IDR)
                  </label>
                  <input
                    type="number"
                    value={formData.promoPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, promoPrice: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationMinutes: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) =>
                      setFormData({ ...formData, platform: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="TikTok">TikTok</option>
                    <option value="Shopee">Shopee</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Tokopedia">Tokopedia</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includesHost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        includesHost: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Includes Host</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includesStudio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        includesStudio: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Includes Studio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includesDevice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        includesDevice: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Includes Device</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Save className="w-5 h-5" />
                Save Package
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
