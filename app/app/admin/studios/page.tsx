"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Edit,
  Trash2,
  MapPin,
  Users,
  Camera,
  Wifi,
  Image as ImageIcon,
} from "lucide-react"
import { AdminLayout, DataTable, Modal, Button, Card } from "@/components/admin"

interface Studio {
  id: string
  name: string
  location: string
  description: string
  photoUrl: string | null
  capacity: number
  equipment: string
  amenities: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface StudioFormData {
  name: string
  location: string
  description: string
  photoUrl: string | null
  capacity: number
  equipment: string
  amenities: string | null
  isActive: boolean
}

const initialFormData: StudioFormData = {
  name: "",
  location: "",
  description: "",
  photoUrl: null,
  capacity: 4,
  equipment: "[]",
  amenities: null,
  isActive: true,
}

export default function AdminStudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudio, setEditingStudio] = useState<Studio | null>(null)
  const [formData, setFormData] = useState<StudioFormData>(initialFormData)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    fetchStudios()
  }, [])

  const fetchStudios = async () => {
    try {
      const response = await fetch("/api/studios")
      const result = await response.json()
      if (result.success) {
        setStudios(result.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch studios:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateStudio = async () => {
    try {
      const response = await fetch("/api/studios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      if (result.success) {
        setIsModalOpen(false)
        resetForm()
        fetchStudios()
      } else {
        alert(result.error || "Failed to create studio")
      }
    } catch (error) {
      console.error("Failed to create studio:", error)
      alert("Failed to create studio")
    }
  }

  const handleUpdateStudio = async () => {
    if (!editingStudio) return

    try {
      const response = await fetch(`/api/studios/${editingStudio.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      if (result.success) {
        setIsModalOpen(false)
        resetForm()
        fetchStudios()
      } else {
        alert(result.error || "Failed to update studio")
      }
    } catch (error) {
      console.error("Failed to update studio:", error)
      alert("Failed to update studio")
    }
  }

  const handleDeleteStudio = async (id: string) => {
    if (!confirm("Are you sure you want to delete this studio?")) return

    try {
      const response = await fetch(`/api/studios/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()

      if (result.success) {
        fetchStudios()
      } else {
        alert(result.error || "Failed to delete studio")
      }
    } catch (error) {
      console.error("Failed to delete studio:", error)
      alert("Failed to delete studio")
    }
  }

  const handleEditClick = (studio: Studio) => {
    setEditingStudio(studio)
    setFormData({
      name: studio.name,
      location: studio.location,
      description: studio.description,
      photoUrl: studio.photoUrl,
      capacity: studio.capacity,
      equipment: studio.equipment,
      amenities: studio.amenities,
      isActive: studio.isActive,
    })
    setImagePreview(studio.photoUrl)
    setIsModalOpen(true)
  }

  const handleCreateClick = () => {
    setEditingStudio(null)
    resetForm()
    setIsModalOpen(true)
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setImagePreview(null)
    setEditingStudio(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      })

      const result = await response.json()

      if (result.success) {
        setFormData({ ...formData, photoUrl: result.data.imageUrl })
        setImagePreview(result.data.imageUrl)
      } else {
        alert(result.error || "Failed to upload image")
      }
    } catch (error) {
      console.error("Failed to upload image:", error)
      alert("Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = () => {
    setFormData({ ...formData, photoUrl: null })
    setImagePreview(null)
  }

  const parseJson = (jsonString: string | null) => {
    if (!jsonString) return []
    try {
      return JSON.parse(jsonString)
    } catch {
      return []
    }
  }

  const columns = [
    {
      key: "name",
      header: "Studio",
      render: (_: string, row: Studio) => (
        <div className="flex items-center gap-3">
          {row.photoUrl && (
            <img
              src={row.photoUrl}
              alt={row.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div>
            <p className="font-medium text-white">{row.name}</p>
            <p className="text-sm text-gray-400">{row.location}</p>
          </div>
        </div>
      ),
    },
    {
      key: "capacity",
      header: "Capacity",
      render: (value: number) => (
        <div className="flex items-center gap-2 text-gray-300">
          <Users className="w-4 h-4" />
          <span>{value} people</span>
        </div>
      ),
    },
    {
      key: "equipment",
      header: "Equipment",
      render: (value: string) => {
        const equipment = parseJson(value)
        return (
          <div className="flex flex-wrap gap-1">
            {equipment.slice(0, 3).map((item: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30"
              >
                <Camera className="w-3 h-3" />
                {item}
              </span>
            ))}
            {equipment.length > 3 && (
              <span className="text-xs text-gray-400">
                +{equipment.length - 3} more
              </span>
            )}
          </div>
        )
      },
    },
    {
      key: "status",
      header: "Status",
      render: (_: unknown, row: Studio) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.isActive
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: unknown, row: Studio) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Edit studio"
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => handleDeleteStudio(row.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            aria-label="Delete studio"
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
            <h1 className="text-2xl font-bold text-white">Manage Studios</h1>
            <p className="text-gray-400 mt-1">
              Create and manage studio locations
            </p>
          </div>
          <Button
            onClick={handleCreateClick}
            icon={<Plus className="w-5 h-5" />}
          >
            Add Studio
          </Button>
        </div>

        {/* Studios Table */}
        <Card>
          <DataTable
            data={studios}
            columns={columns}
            loading={loading}
            emptyMessage="No studios found"
            pagination={false}
          />
        </Card>

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            resetForm()
          }}
          title={editingStudio ? "Edit Studio" : "Add New Studio"}
          size="lg"
        >
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Studio Image
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#4920E5]/50 transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Studio preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                      aria-label="Remove image"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-400">
                      Drag and drop an image, or click to select
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                      id="studio-image-upload"
                    />
                    <label
                      htmlFor="studio-image-upload"
                      className="inline-block px-4 py-2 bg-[#4920E5] text-white rounded-lg hover:bg-[#4920E5]/80 transition-colors cursor-pointer"
                    >
                      {uploadingImage ? "Uploading..." : "Choose Image"}
                    </label>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended size: 800x600px. Max file size: 5MB
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Studio Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none"
                placeholder="e.g., Studio A"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none"
                  placeholder="e.g., Jakarta, Indonesia"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none resize-none"
                placeholder="Describe the studio..."
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Capacity
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none"
                  placeholder="e.g., 4"
                />
              </div>
            </div>

            {/* Equipment (JSON) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Equipment (JSON array)
              </label>
              <textarea
                value={formData.equipment}
                onChange={(e) =>
                  setFormData({ ...formData, equipment: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none resize-none font-mono text-sm"
                placeholder='["Camera", "Lighting", "Microphone"]'
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter equipment as a JSON array of strings
              </p>
            </div>

            {/* Amenities (JSON) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amenities (JSON array, optional)
              </label>
              <textarea
                value={formData.amenities || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amenities: e.target.value || null,
                  })
                }
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none resize-none font-mono text-sm"
                placeholder='["WiFi", "Air Conditioning", "Refreshments"]'
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter amenities as a JSON array of strings (optional)
              </p>
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#4920E5] focus:ring-[#4920E5] focus:ring-offset-0"
              />
              <label htmlFor="isActive" className="text-sm text-gray-300">
                Studio is active
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  editingStudio ? handleUpdateStudio : handleCreateStudio
                }
              >
                {editingStudio ? "Update Studio" : "Create Studio"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  )
}
