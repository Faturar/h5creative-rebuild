"use client"

import { useState, useEffect } from "react"
import {
  RefreshCw,
  Calendar,
  Clock,
  MapPin,
  User,
  Check,
  X,
  MessageSquare,
} from "lucide-react"
import { AdminLayout, Card, Button, Modal, StatusBadge } from "@/components/admin"
import {
  format,
  isPast,
} from "date-fns"
import { id as localeId } from "date-fns/locale"

interface CustomSlotRequest {
  id: string
  studioId: string
  date: Date | string
  startTime: string
  endTime: string
  customerName: string
  customerPhone?: string
  customerEmail?: string
  notes?: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  adminNotes?: string
  studioSlotId?: string
  createdAt: Date | string
  studio: {
    name: string
    location: string
  }
}

export default function AdminSlotRequestsPage() {
  const [requests, setRequests] = useState<CustomSlotRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedRequest, setSelectedRequest] = useState<CustomSlotRequest | null>(null)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchRequests()
  }, [selectedStatus])

  const fetchRequests = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedStatus) params.append("status", selectedStatus)

      const response = await fetch(`/api/slot-requests?${params.toString()}`)
      const result = await response.json()
      if (result.success) {
        setRequests(result.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch slot requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRequest = async () => {
    if (!selectedRequest) return

    setActionLoading(true)
    try {
      const response = await fetch(`/api/slot-requests/${selectedRequest.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", notes: adminNotes }),
      })

      const result = await response.json()
      if (result.success) {
        setIsApproveModalOpen(false)
        setSelectedRequest(null)
        setAdminNotes("")
        fetchRequests()
      } else {
        alert(result.error || "Failed to approve request")
      }
    } catch (error) {
      console.error("Failed to approve request:", error)
      alert("Failed to approve request")
    } finally {
      setActionLoading(false)
    }
  }

  const handleRejectRequest = async () => {
    if (!selectedRequest) return

    setActionLoading(true)
    try {
      const response = await fetch(`/api/slot-requests/${selectedRequest.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", notes: adminNotes }),
      })

      const result = await response.json()
      if (result.success) {
        setIsRejectModalOpen(false)
        setSelectedRequest(null)
        setAdminNotes("")
        fetchRequests()
      } else {
        alert(result.error || "Failed to reject request")
      }
    } catch (error) {
      console.error("Failed to reject request:", error)
      alert("Failed to reject request")
    } finally {
      setActionLoading(false)
    }
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getStatusType = (
    status: string,
  ): "success" | "error" | "warning" | "info" => {
    switch (status) {
      case "APPROVED":
        return "success"
      case "PENDING":
        return "warning"
      case "REJECTED":
        return "error"
      default:
        return "info"
    }
  }

  return (
      <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Slot Requests</h1>
            <p className="text-gray-400 mt-1">Manage custom slot requests from clients</p>
          </div>
          <Button
            variant="secondary"
            onClick={fetchRequests}
            icon={<RefreshCw className="w-5 h-5" />}
          >
            Refresh
          </Button>
        </div>

        <Card title="Filter Requests">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </Card>

        <Card title="Requests">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4920E5]"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400">No slot requests found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 rounded-xl border bg-white/5 border-white/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <User className="w-4 h-4 text-[#4920E5]" />
                        <span className="font-semibold text-white">
                          {request.customerName}
                        </span>
                        <StatusBadge
                          status={request.status}
                          type={getStatusType(request.status)}
                        />
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(request.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {request.startTime} - {request.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{request.studio.name}</span>
                        </div>
                      </div>
                      {request.customerEmail && (
                        <p className="text-sm text-gray-400">
                          {request.customerEmail}
                        </p>
                      )}
                      {request.customerPhone && (
                        <p className="text-sm text-gray-400">
                          {request.customerPhone}
                        </p>
                      )}
                      {request.notes && (
                        <div className="mt-2 p-2 bg-blue-500/10 rounded-lg">
                          <p className="text-sm text-blue-300">
                            <MessageSquare className="w-3 h-3 inline mr-1" />
                            {request.notes}
                          </p>
                        </div>
                      )}
                      {request.adminNotes && (
                        <div className="mt-2 p-2 bg-purple-500/10 rounded-lg">
                          <p className="text-sm text-purple-300">
                            Admin Note: {request.adminNotes}
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Requested at {formatDate(request.createdAt)}
                      </p>
                    </div>
                    {request.status === "PENDING" && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedRequest(request)
                            setIsApproveModalOpen(true)
                            setAdminNotes("")
                          }}
                          className="p-2 hover:bg-green-500/10 rounded-lg transition-colors"
                          aria-label="Approve request"
                        >
                          <Check className="w-5 h-5 text-green-400" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRequest(request)
                            setIsRejectModalOpen(true)
                            setAdminNotes("")
                          }}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                          aria-label="Reject request"
                        >
                          <X className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => {
          setIsApproveModalOpen(false)
          setSelectedRequest(null)
          setAdminNotes("")
        }}
        title="Approve Slot Request"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to approve this custom slot request? A new
            slot will be created for the client.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Admin Notes (Optional)
            </label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsApproveModalOpen(false)
                setSelectedRequest(null)
                setAdminNotes("")
              }}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApproveRequest}
              disabled={actionLoading}
              className="bg-green-500 hover:bg-green-600"
            >
              {actionLoading ? "Processing..." : "Approve"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false)
          setSelectedRequest(null)
          setAdminNotes("")
        }}
        title="Reject Slot Request"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to reject this custom slot request?
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rejection Reason (Required)
            </label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#4920E5] focus:outline-none"
              placeholder="Please provide a reason for rejection..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsRejectModalOpen(false)
                setSelectedRequest(null)
                setAdminNotes("")
              }}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRejectRequest}
              disabled={actionLoading || !adminNotes.trim()}
              className="bg-red-500 hover:bg-red-600"
            >
              {actionLoading ? "Processing..." : "Reject"}
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}
