"use client"

import { useState, useEffect } from "react"
import {
  Eye,
  Mail,
  Phone,
  Building2,
  Users,
  DollarSign,
  BarChart3,
  Package as PackageIcon,
} from "lucide-react"
import {
  AdminLayout,
  DataTable,
  Modal,
  Button,
  StatusBadge,
  Card,
} from "@/components/admin"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  businessName: string
  productCategory: string
  totalBookings: number
  totalSpent: number
  lastBooking?: Date
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  )

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/bookings")
      const result = await response.json()

      if (result.success) {
        // Aggregate customer data from bookings
        const customerMap = new Map<string, Customer>()

        result.data.forEach((booking: any) => {
          const customerId = booking.customerEmail
          const existingCustomer = customerMap.get(customerId)

          if (existingCustomer) {
            existingCustomer.totalBookings += 1
            existingCustomer.totalSpent += Number(booking.price)
            existingCustomer.lastBooking = new Date(booking.date)
          } else {
            customerMap.set(customerId, {
              id: customerId,
              name: booking.customerName,
              email: booking.customerEmail,
              phone: booking.customerPhone,
              businessName: booking.businessName,
              productCategory: booking.productCategory,
              totalBookings: 1,
              totalSpent: Number(booking.price),
              lastBooking: new Date(booking.date),
            })
          }
        })

        setCustomers(Array.from(customerMap.values()))
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error)
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

  const columns = [
    {
      key: "name",
      header: "Customer",
      render: (_: string, row: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4920E5] to-[#6B21A8] rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {row.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-white">{row.name}</p>
            <p className="text-sm text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "businessName",
      header: "Business",
      render: (value: string, row: Customer) => (
        <div>
          <p className="font-medium text-white">{value}</p>
          <p className="text-sm text-gray-400">{row.productCategory}</p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Contact",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-white">{value}</span>
        </div>
      ),
    },
    {
      key: "totalBookings",
      header: "Total Bookings",
      render: (value: number) => (
        <span className="font-semibold text-[#4920E5]">{value}</span>
      ),
    },
    {
      key: "totalSpent",
      header: "Total Spent",
      render: (value: number) => (
        <span className="font-semibold text-white">{formatPrice(value)}</span>
      ),
    },
    {
      key: "lastBooking",
      header: "Last Booking",
      render: (value?: Date) => (
        <span className="text-sm text-white">
          {value ? formatDate(value) : "N/A"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: unknown, row: Customer) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCustomer(row)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="View customer"
          >
            <Eye className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      ),
    },
  ]

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.totalBookings > 0).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgSpent:
      customers.length > 0
        ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length
        : 0,
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Customers</h1>
            <p className="text-gray-400 mt-1">Manage customer information</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Customers
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#4920E5]/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4920E5]" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Active Customers
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.active}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#12BB74]/20 rounded-lg flex items-center justify-center">
                <PackageIcon className="w-6 h-6 text-[#12BB74]" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {formatPrice(stats.totalRevenue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg. Spent</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {formatPrice(stats.avgSpent)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Data Table */}
        <DataTable
          data={customers}
          columns={columns}
          loading={loading}
          emptyMessage="No customers found"
        />

        {/* Customer Detail Modal */}
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title="Customer Details"
          size="lg"
        >
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4920E5] to-[#6B21A8] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-gray-400">{selectedCustomer.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Phone className="w-5 h-5 text-[#4920E5]" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium text-white">
                      {selectedCustomer.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Mail className="w-5 h-5 text-[#4920E5]" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium text-white">
                      {selectedCustomer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Building2 className="w-5 h-5 text-[#4920E5]" />
                  <div>
                    <p className="text-sm text-gray-400">Business</p>
                    <p className="font-medium text-white">
                      {selectedCustomer.businessName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <PackageIcon className="w-5 h-5 text-[#4920E5]" />
                  <div>
                    <p className="text-sm text-gray-400">Category</p>
                    <p className="font-medium text-white">
                      {selectedCustomer.productCategory}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-[#4920E5]/20 to-[#6B21A8]/20 rounded-lg">
                  <p className="text-sm text-gray-400">Total Bookings</p>
                  <p className="text-2xl font-bold text-[#4920E5]">
                    {selectedCustomer.totalBookings}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#12BB74]/20 to-blue-500/20 rounded-lg">
                  <p className="text-sm text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-[#12BB74]">
                    {formatPrice(selectedCustomer.totalSpent)}
                  </p>
                </div>
              </div>

              {selectedCustomer.lastBooking && (
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-sm text-gray-400">Last Booking</p>
                  <p className="font-medium text-white">
                    {formatDate(selectedCustomer.lastBooking)}
                  </p>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  )
}
