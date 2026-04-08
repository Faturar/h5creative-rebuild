"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  Package as PackageIcon,
  CheckCircle,
  Layers,
} from "lucide-react"
import {
  AdminLayout,
  DataTable,
  Modal,
  Button,
  StatusBadge,
  Card,
} from "@/components/admin"

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

  const columns = [
    {
      key: "name",
      header: "Package Name",
      render: (value: string, row: Package) => (
        <div>
          <p className="font-medium text-white">{value}</p>
          <p className="text-sm text-gray-400">{row.platform}</p>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (value: string) => (
        <p className="text-sm text-gray-400 line-clamp-2 max-w-xs">{value}</p>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (value: number, row: Package) => (
        <div>
          <p className="font-semibold text-[#4920E5]">{formatPrice(value)}</p>
          {row.promoPrice && (
            <p className="text-sm text-[#12BB74]">
              {formatPrice(row.promoPrice)}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "durationMinutes",
      header: "Duration",
      render: (value: number) => (
        <span className="text-sm text-white">{value} min</span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (value: boolean) => (
        <StatusBadge
          status={value ? "Active" : "Inactive"}
          type={value ? "success" : "error"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: unknown, row: Package) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Edit package"
          >
            <Pencil className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            aria-label="Delete package"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Packages</h1>
            <p className="text-gray-400 mt-1">Manage live streaming packages</p>
          </div>
          <Button onClick={openModal} icon={<Plus className="w-5 h-5" />}>
            Add Package
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Packages
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {packages.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#4920E5]/20 rounded-lg flex items-center justify-center">
                <PackageIcon className="w-6 h-6 text-[#4920E5]" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Active Packages
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {packages.filter((p) => p.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#12BB74]/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#12BB74]" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Platforms</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {new Set(packages.map((p) => p.platform)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Data Table */}
        <DataTable
          data={packages}
          columns={columns}
          loading={loading}
          emptyMessage="No packages found"
        />

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingPackage ? "Edit Package" : "Add New Package"}
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Package Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none"
                placeholder="e.g., Starter Package"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none resize-none"
                placeholder="Describe package..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (IDR)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Promo Price (IDR)
                </label>
                <input
                  type="number"
                  value={formData.promoPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, promoPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none"
                >
                  <option value="TikTok">TikTok</option>
                  <option value="Shopee">Shopee</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Tokopedia">Tokopedia</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
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
                  className="w-4 h-4 text-[#4920E5] rounded focus:ring-[#4920E5]"
                />
                <span className="text-sm text-gray-300">Includes Host</span>
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
                  className="w-4 h-4 text-[#4920E5] rounded focus:ring-[#4920E5]"
                />
                <span className="text-sm text-gray-300">Includes Studio</span>
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
                  className="w-4 h-4 text-[#4920E5] rounded focus:ring-[#4920E5]"
                />
                <span className="text-sm text-gray-300">Includes Device</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-4 h-4 text-[#4920E5] rounded focus:ring-[#4920E5]"
                />
                <span className="text-sm text-gray-300">Active</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} icon={<Save className="w-5 h-5" />}>
              Save Package
            </Button>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  )
}
