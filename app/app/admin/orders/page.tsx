"use client"

import { useState, useEffect } from "react"
import {
  Eye,
  Download,
  RefreshCw,
  ClipboardList,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react"
import {
  AdminLayout,
  DataTable,
  Modal,
  Button,
  StatusBadge,
  Card,
} from "@/components/admin"

interface Order {
  id: string
  bookingCode: string
  status: string
  date: Date
  startTime: string
  endTime: string
  customerName: string
  customerEmail: string
  customerPhone: string
  businessName: string
  productCategory: string
  price: number
  notes: string | null
  createdAt: Date
  package: {
    name: string
    platform: string
  }
  host: {
    name: string
  }
  studio: {
    name: string
    location: string
  }
  payments: Array<{
    id: string
    status: string
    amount: number
    paidAt: Date | null
  }>
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/bookings")
      const result = await response.json()

      if (result.success) {
        setOrders(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusType = (
    status: string,
  ): "success" | "error" | "warning" | "info" => {
    switch (status) {
      case "PAID":
        return "success"
      case "PENDING":
        return "warning"
      case "CANCELLED":
        return "error"
      case "COMPLETED":
        return "success"
      case "IN_PROGRESS":
        return "info"
      case "FINISHED":
        return "success"
      default:
        return "info"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PAID":
        return "Lunas"
      case "PENDING":
        return "Menunggu"
      case "CANCELLED":
        return "Dibatalkan"
      case "COMPLETED":
        return "Selesai"
      case "IN_PROGRESS":
        return "Sedang Berlangsung"
      case "FINISHED":
        return "Selesai"
      default:
        return status
    }
  }

  const columns = [
    {
      key: "bookingCode",
      header: "Booking Code",
      render: (value: string) => (
        <span className="font-semibold text-[#4920E5]">{value}</span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      render: (_: string, row: Order) => (
        <div>
          <p className="font-medium text-white">{row.customerName}</p>
          <p className="text-sm text-gray-400">{row.businessName}</p>
        </div>
      ),
    },
    {
      key: "package",
      header: "Package",
      render: (_: string, row: Order) => (
        <div>
          <p className="font-medium text-white">{row.package.name}</p>
          <p className="text-sm text-gray-400">{row.host.name}</p>
        </div>
      ),
    },
    {
      key: "date",
      header: "Schedule",
      render: (_: Date, row: Order) => (
        <div>
          <p className="text-sm text-white">{formatDate(row.date)}</p>
          <p className="text-xs text-gray-400">
            {row.startTime} - {row.endTime}
          </p>
        </div>
      ),
    },
    {
      key: "price",
      header: "Amount",
      render: (value: number) => (
        <span className="font-semibold text-white">{formatPrice(value)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <StatusBadge
          status={getStatusLabel(value)}
          type={getStatusType(value)}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: unknown, row: Order) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedOrder(row)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="View order"
          >
            <Eye className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      ),
    },
  ]

  const stats = {
    total: orders.length,
    paid: orders.filter((o) => o.payments.some((p) => p.status === "SUCCESS"))
      .length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    completed: orders.filter((o) => o.status === "COMPLETED").length,
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Orders</h1>
            <p className="text-gray-400 mt-1">Manage booking orders</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={fetchOrders}
              icon={<RefreshCw className="w-5 h-5" />}
            >
              Refresh
            </Button>
            <Button variant="secondary" icon={<Download className="w-5 h-5" />}>
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#4920E5]/20 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-[#4920E5]" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Paid Orders</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.paid}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#12BB74]/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#12BB74]" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Pending</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Completed</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.completed}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Data Table */}
        <DataTable
          data={orders}
          columns={columns}
          loading={loading}
          emptyMessage="No orders found"
        />

        {/* Order Detail Modal */}
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title="Order Details"
          size="lg"
        >
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Booking Code</p>
                  <p className="font-semibold text-[#4920E5]">
                    {selectedOrder.bookingCode}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <StatusBadge
                    status={getStatusLabel(selectedOrder.status)}
                    type={getStatusType(selectedOrder.status)}
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-semibold text-white mb-3">
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="font-medium text-white">
                      {selectedOrder.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium text-white">
                      {selectedOrder.customerEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium text-white">
                      {selectedOrder.customerPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Business Name</p>
                    <p className="font-medium text-white">
                      {selectedOrder.businessName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-semibold text-white mb-3">
                  Booking Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Package</p>
                    <p className="font-medium text-white">
                      {selectedOrder.package.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Platform</p>
                    <p className="font-medium text-white">
                      {selectedOrder.package.platform}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Host</p>
                    <p className="font-medium text-white">
                      {selectedOrder.host.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Studio</p>
                    <p className="font-medium text-white">
                      {selectedOrder.studio.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-medium text-white">
                      {formatDate(selectedOrder.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-medium text-white">
                      {selectedOrder.startTime} - {selectedOrder.endTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-semibold text-white mb-3">
                  Payment Information
                </h3>
                <div className="space-y-2">
                  {selectedOrder.payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-white">
                          {formatPrice(payment.amount)}
                        </p>
                        <p className="text-sm text-gray-400">
                          {payment.paidAt
                            ? formatDateTime(payment.paidAt)
                            : "Not paid yet"}
                        </p>
                      </div>
                      <StatusBadge
                        status={payment.status}
                        type={getStatusType(payment.status)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="border-t border-white/10 pt-4">
                  <h3 className="font-semibold text-white mb-3">Notes</h3>
                  <p className="text-gray-400">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-gray-400">Created At</p>
                <p className="font-medium text-white">
                  {formatDateTime(selectedOrder.createdAt)}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  )
}
