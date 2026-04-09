"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Search, Filter, Check, X } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"
import DataTable from "@/components/admin/DataTable"
import Modal from "@/components/admin/Modal"
import Button from "@/components/admin/Button"
import StatusBadge from "@/components/admin/StatusBadge"

interface PricingTier {
  id: string
  deviceType: string
  minHours: number
  maxHours: number | null
  pricePerHour: number
  isActive: boolean
}

export default function PricingTiersPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDevice, setFilterDevice] = useState<string>("all")
  const [formData, setFormData] = useState({
    deviceType: "iPhone",
    minHours: 0,
    maxHours: null as number | null,
    pricePerHour: 0,
    isActive: true,
  })

  useEffect(() => {
    fetchTiers()
  }, [])

  const fetchTiers = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/pricing-tiers")
      const result = await response.json()
      if (result.success) {
        setTiers(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch pricing tiers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingTier
        ? `/api/admin/pricing-tiers/${editingTier.id}`
        : "/api/admin/pricing-tiers"
      const method = editingTier ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (result.success) {
        await fetchTiers()
        handleCloseModal()
      } else {
        alert(result.error || "Failed to save pricing tier")
      }
    } catch (error) {
      console.error("Failed to save pricing tier:", error)
      alert("Failed to save pricing tier. Please try again.")
    }
  }

  const handleEdit = (tier: PricingTier) => {
    setEditingTier(tier)
    setFormData({
      deviceType: tier.deviceType,
      minHours: tier.minHours,
      maxHours: tier.maxHours,
      pricePerHour: tier.pricePerHour,
      isActive: tier.isActive,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pricing tier?")) return

    try {
      const response = await fetch(`/api/admin/pricing-tiers/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()
      if (result.success) {
        await fetchTiers()
      } else {
        alert(result.error || "Failed to delete pricing tier")
      }
    } catch (error) {
      console.error("Failed to delete pricing tier:", error)
      alert("Failed to delete pricing tier. Please try again.")
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTier(null)
    setFormData({
      deviceType: "iPhone",
      minHours: 0,
      maxHours: null,
      pricePerHour: 0,
      isActive: true,
    })
  }

  const filteredTiers = tiers.filter((tier) => {
    const matchesSearch =
      tier.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tier.pricePerHour.toString().includes(searchTerm)
    const matchesFilter =
      filterDevice === "all" || tier.deviceType === filterDevice
    return matchesSearch && matchesFilter
  })

  const columns = [
    {
      key: "deviceType",
      header: "Device Type",
      render: (value: string) => (
        <span
          className={`font-semibold ${
            value === "Camera+OBS" ? "text-[#FF6B35]" : "text-[#4920E5]"
          }`}
        >
          {value === "Camera+OBS" ? "Camera + OBS" : value}
        </span>
      ),
    },
    { key: "minHours", header: "Min Hours" },
    {
      key: "maxHours",
      header: "Max Hours",
      render: (value: number | null) => (value ? `${value}+` : "Unlimited"),
    },
    {
      key: "pricePerHour",
      header: "Price/Hour",
      render: (value: number) => `Rp ${value.toLocaleString("id-ID")}`,
    },
    {
      key: "isActive",
      header: "Status",
      render: (value: boolean) => (
        <StatusBadge status={value ? "active" : "inactive"} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: unknown, row: PricingTier) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Edit pricing tier"
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            aria-label="Delete pricing tier"
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Pricing Tiers
            </h1>
            <p className="text-gray-400 mt-1">
              Manage tiered pricing for live streaming services
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Pricing Tier
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search pricing tiers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterDevice}
              onChange={(e) => setFilterDevice(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
            >
              <option value="all">All Devices</option>
              <option value="iPhone">iPhone</option>
              <option value="Camera+OBS">Camera + OBS</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4920E5]"></div>
          </div>
        ) : (
          <DataTable data={filteredTiers} columns={columns} />
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTier ? "Edit Pricing Tier" : "Add Pricing Tier"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Device Type
              </label>
              <select
                value={formData.deviceType}
                onChange={(e) =>
                  setFormData({ ...formData, deviceType: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
                required
              >
                <option value="iPhone">iPhone</option>
                <option value="Camera+OBS">Camera + OBS</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Min Hours
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minHours: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Hours (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.maxHours || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxHours: e.target.value
                        ? parseInt(e.target.value)
                        : null,
                    })
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
                  placeholder="Unlimited"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price Per Hour (IDR)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={formData.pricePerHour}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerHour: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#4920E5] focus:ring-2 focus:ring-[#4920E5]"
              />
              <label htmlFor="isActive" className="text-sm text-gray-300">
                Active
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCloseModal}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {editingTier ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  )
}
