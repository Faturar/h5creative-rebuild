"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Filter,
  Search,
  Eye,
  MoreVertical,
} from "lucide-react"

interface Booking {
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

interface Stats {
  totalBookings: number
  totalRevenue: number
  paidBookings: number
  pendingBookings: number
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    totalRevenue: 0,
    paidBookings: 0,
    pendingBookings: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings")
      const result = await response.json()

      if (result.success) {
        setBookings(result.data)
        calculateStats(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data: Booking[]) => {
    const totalBookings = data.length
    const totalRevenue = data
      .filter((b) => b.payments.some((p) => p.status === "SUCCESS"))
      .reduce((sum, b) => sum + Number(b.price), 0)
    const paidBookings = data.filter((b) =>
      b.payments.some((p) => p.status === "SUCCESS"),
    ).length
    const pendingBookings = data.filter((b) => b.status === "PENDING").length

    setStats({ totalBookings, totalRevenue, paidBookings, pendingBookings })
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700"
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "CANCELLED":
        return "bg-red-100 text-red-700"
      case "COMPLETED":
        return "bg-blue-100 text-blue-700"
      case "IN_PROGRESS":
        return "bg-purple-100 text-purple-700"
      case "FINISHED":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.businessName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Kelola booking live streaming</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Booking
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.totalBookings}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {formatPrice(stats.totalRevenue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Booking Paid
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.paidBookings}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.pendingBookings}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari booking code, nama, atau bisnis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Tidak ada booking ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-purple-600">
                          {booking.bookingCode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.customerName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.businessName}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.package.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.host.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-900">
                            {formatDate(booking.date)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">
                          {formatPrice(Number(booking.price))}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-purple-600 hover:text-purple-900 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Detail Booking
                </h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <MoreVertical className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Booking Code</p>
                  <p className="font-semibold text-purple-600">
                    {selectedBooking.bookingCode}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedBooking.status)}`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Informasi Pelanggan
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nama</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.customerEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Telepon</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.customerPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bisnis</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.businessName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Detail Booking
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Paket</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.package.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Platform</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.package.platform}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Host</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.host.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Studio</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.studio.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedBooking.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Waktu</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.startTime} - {selectedBooking.endTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Pembayaran</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-bold text-gray-900">
                      {formatPrice(Number(selectedBooking.price))}
                    </span>
                  </div>
                  {selectedBooking.payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600">Status Pembayaran</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Catatan</h3>
                  <p className="text-gray-600">{selectedBooking.notes}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">
                  Dibuat pada: {formatDateTime(selectedBooking.createdAt)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
