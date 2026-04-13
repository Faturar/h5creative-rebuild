"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
} from "lucide-react"
import { AdminLayout, Card, Button, Modal, StatusBadge } from "@/components/admin"
import {
  format,
  addDays,
  startOfWeek,
  isToday,
  isPast,
} from "date-fns"
import { id as localeId } from "date-fns/locale"

interface StudioSlot {
  id: string
  studioId: string
  date: Date | string
  startTime: string
  endTime: string
  isBooked: boolean
  studio: {
    name: string
    location: string
  }
}

interface Studio {
  id: string
  name: string
  location: string
}

interface SlotFormData {
  studioId: string
  date: string
  startTime: string
  endTime: string
}

export default function AdminSlotsPage() {
  const [slots, setSlots] = useState<StudioSlot[]>([])
  const [studios, setStudios] = useState<Studio[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSlot, setEditingSlot] = useState<StudioSlot | null>(null)
  const [selectedStudio, setSelectedStudio] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [formData, setFormData] = useState<SlotFormData>({
    studioId: "",
    date: "",
    startTime: "",
    endTime: "",
  })
  const [deletingSlotId, setDeletingSlotId] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    fetchStudios()
    fetchSlots()
  }, [selectedStudio, selectedDate])

  const fetchSlots = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedStudio) params.append("studioId", selectedStudio)
      if (selectedDate) params.append("date", selectedDate)

      const response = await fetch(`/api/slots?${params.toString()}`)
      const result = await response.json()
      if (result.success) {
        setSlots(result.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch slots:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStudios = async () => {
    try {
      const response = await fetch("/api/studios")
      const result = await response.json()
      if (result.success) {
        setStudios(result.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch studios:", error)
    }
  }

  const handleCreateSlot = async () => {
    try {
      const response = await fetch("/api/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (result.success) {
        setIsModalOpen(false)
        setFormData({ studioId: "", date: "", startTime: "", endTime: "" })
        fetchSlots()
      } else {
        alert(result.error || "Failed to create slot")
      }
    } catch (error) {
      console.error("Failed to create slot:", error)
      alert("Failed to create slot")
    }
  }

  const handleUpdateSlot = async () => {
    if (!editingSlot) return

    try {
      const response = await fetch(`/api/slots?id=${editingSlot.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (result.success) {
        setIsModalOpen(false)
        setEditingSlot(null)
        setFormData({ studioId: "", date: "", startTime: "", endTime: "" })
        fetchSlots()
      } else {
        alert(result.error || "Failed to update slot")
      }
    } catch (error) {
      console.error("Failed to update slot:", error)
      alert("Failed to update slot")
    }
  }

  const handleDeleteSlot = async () => {
    if (!deletingSlotId) return

    try {
      const response = await fetch(`/api/slots?id=${deletingSlotId}`, {
        method: "DELETE",
      })

      const result = await response.json()
      if (result.success) {
        setIsDeleteModalOpen(false)
        setDeletingSlotId(null)
        fetchSlots()
      } else {
        alert(result.error || "Failed to delete slot")
      }
    } catch (error) {
      console.error("Failed to delete slot:", error)
      alert("Failed to delete slot")
    }
  }

  const handleEditClick = (slot: StudioSlot) => {
    setEditingSlot(slot)
    setFormData({
      studioId: slot.studioId,
      date: format(slot.date, "yyyy-MM-dd"),
      startTime: slot.startTime,
      endTime: slot.endTime,
    })
    setIsModalOpen(true)
  }

  const handleDeleteClick = (slotId: string) => {
    setDeletingSlotId(slotId)
    setIsDeleteModalOpen(true)
  }

  const handleCreateClick = () => {
    setEditingSlot(null)
    setFormData({ studioId: "", date: "", startTime: "", endTime: "" })
    setIsModalOpen(true)
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getWeekDays = () => {
    const days = []
    const start = startOfWeek(new Date(), { weekStartsOn: 1 })
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i))
    }
    return days
  }

  const weekDays = getWeekDays()

  return (
      <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Slots</h1>
            <p className="text-gray-400 mt-1">Create and manage studio time slots</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={fetchSlots}
              icon={<RefreshCw className="w-5 h-5" />}
            >
              Refresh
            </Button>
            <Button onClick={handleCreateClick} icon={<Plus className="w-5 h-5" />}>
              Create Slot
            </Button>
          </div>
        </div>

        <Card title="Filter Slots">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Studio
              </label>
              <select
                value={selectedStudio}
                onChange={(e) => setSelectedStudio(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none"
              >
                <option value="">All Studios</option>
                {studios.map((studio) => (
                  <option key={studio.id} value={studio.id}>
                    {studio.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none"
              />
            </div>
          </div>
        </Card>

        <Card title="Slots">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4920E5]"></div>
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-white mx-auto mb-3" />
              <p className="text-gray-400">No slots found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-4 rounded-xl border ${
                    slot.isBooked
                      ? "bg-white/5 border-white/10 opacity-60"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-white" />
                        <span className="font-semibold text-white">
                          {formatDate(slot.date)}
                        </span>
                        {slot.isBooked && (
                          <StatusBadge status="Booked" type="warning" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{slot.studio.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!slot.isBooked && (
                        <>
                          <button
                            onClick={() => handleEditClick(slot)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Edit slot"
                          >
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(slot.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                            aria-label="Delete slot"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingSlot(null)
          setFormData({ studioId: "", date: "", startTime: "", endTime: "" })
        }}
        title={editingSlot ? "Edit Slot" : "Create New Slot"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Studio
            </label>
            <select
              value={formData.studioId}
              onChange={(e) =>
                setFormData({ ...formData, studioId: e.target.value })
              }
              disabled={!!editingSlot}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none disabled:opacity-50"
            >
              <option value="">Select Studio</option>
              {studios.map((studio) => (
                <option key={studio.id} value={studio.id}>
                  {studio.name} - {studio.location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              disabled={!!editingSlot}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none disabled:opacity-50"
            />
          </div>
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
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none"
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
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false)
                setEditingSlot(null)
                setFormData({ studioId: "", date: "", startTime: "", endTime: "" })
              }}
            >
              Cancel
            </Button>
            <Button onClick={editingSlot ? handleUpdateSlot : handleCreateSlot}>
              {editingSlot ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setDeletingSlotId(null)
        }}
        title="Delete Slot"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete this slot? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false)
                setDeletingSlotId(null)
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteSlot}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}
