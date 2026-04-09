"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Search, Clock, DollarSign } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"
import DataTable from "@/components/admin/DataTable"
import Modal from "@/components/admin/Modal"
import Button from "@/components/admin/Button"
import StatusBadge from "@/components/admin/StatusBadge"

interface TimeSurcharge {
  id: string
  startTime: string
  endTime: string
  surcharge: number
  description: string
  isActive: boolean
}

export default function TimeSurchargesPage() {
  const [surcharges, setSurcharges] = useState<TimeSurcharge[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSurcharge, setEditingSurcharge] =
    useState<TimeSurcharge | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    startTime: "07:00",
    endTime: "21:00",
    surcharge: 0,
    description: "Normal operational hours",
    isActive: true,
  })

  useEffect(() => {
    fetchSurcharges()
  }, [])

  const fetchSurcharges = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/time-surcharges")
      const result = await response.json()
      if (result.success) {
        setSurcharges(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch time surcharges:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingSurcharge
        ? `/api/admin/time-surcharges/${editingSurcharge.id}`
        : "/api/admin/time-surcharges"
      const method = editingSurcharge ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (result.success) {
        await fetchSurcharges()
        handleCloseModal()
      } else {
        alert(result.error || "Failed to save time surcharge")
      }
    } catch (error) {
      console.error("Failed to save time surcharge:", error)
      alert("Failed to save time surcharge. Please try again.")
    }
  }

  const handleEdit = (surcharge: TimeSurcharge) => {
    setEditingSurcharge(surcharge)
    setFormData({
      startTime: surcharge.startTime,
      endTime: surcharge.endTime,
      surcharge: surcharge.surcharge,
      description: surcharge.description,
      isActive: surcharge.isActive,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this time surcharge?")) return

    try {
      const response = await fetch(`/api/admin/time-surcharges/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()
      if (result.success) {
        await fetchSurcharges()
      } else {
        alert(result.error || "Failed to delete time surcharge")
      }
    } catch (error) {
      console.error("Failed to delete time surcharge:", error)
      alert("Failed to delete time surcharge. Please try again.")
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSurcharge(null)
    setFormData({
      startTime: "07:00",
      endTime: "21:00",
      surcharge: 0,
      description: "Normal operational hours",
      isActive: true,
    })
  }

  const filteredSurcharges = surcharges.filter((surcharge) => {
    return (
      surcharge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surcharge.startTime.includes(searchTerm) ||
      surcharge.endTime.includes(searchTerm) ||
      surcharge.surcharge.toString().includes(searchTerm)
    )
  })

  const columns = [
    {
      key: "startTime",
      header: "Time Period",
      render: (_: any, row: TimeSurcharge) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#4920E5]" />
          <span className="font-medium text-white">
            {row.startTime} - {row.endTime}
          </span>
        </div>
      ),
    },
    {
      key: "surcharge",
      header: "Surcharge",
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#12BB74]" />
          <span
            className={`font-semibold ${value > 0 ? "text-[#12BB74]" : "text-gray-400"}`}
          >
            {value > 0 ? `+Rp ${value.toLocaleString("id-ID")}` : "Normal"}
          </span>
        </div>
      ),
    },
    { key: "description", header: "Description" },
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
      render: (_: unknown, row: TimeSurcharge) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Edit time surcharge"
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            aria-label="Delete time surcharge"
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
              Time Surcharges
            </h1>
            <p className="text-gray-400 mt-1">
              Manage additional charges for non-operational hours
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Time Surcharge
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search time surcharges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
          />
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4920E5]"></div>
          </div>
        ) : (
          <DataTable data={filteredSurcharges} columns={columns} />
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={
            editingSurcharge ? "Edit Time Surcharge" : "Add Time Surcharge"
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Surcharge Amount (IDR)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={formData.surcharge}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    surcharge: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
                placeholder="0 for normal hours"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter 0 for normal operational hours
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4920E5]"
                placeholder="e.g., Evening surcharge, Early morning surcharge"
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
                {editingSurcharge ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  )
}
