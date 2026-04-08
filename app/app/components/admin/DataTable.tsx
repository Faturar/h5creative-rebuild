"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (value: any, row: T) => React.ReactNode
  className?: string
  hideOnMobile?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  pagination?: boolean
  pageSize?: number
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (row: T) => void
}

export default function DataTable<T>({
  data,
  columns,
  searchable = true,
  pagination = true,
  pageSize = 10,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
}: DataTableProps<T>) {
  const { actualTheme } = useTheme()
  const isDark = actualTheme === "dark"
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter columns based on screen size
  const visibleColumns = useMemo(() => {
    if (typeof window === "undefined") return columns
    const isMobile = window.innerWidth < 768
    return columns.filter((column) => !column.hideOnMobile || !isMobile)
  }, [columns])

  // Filter data based on search term
  const filteredData = searchTerm
    ? data.filter((row) =>
        columns.some((column) => {
          const value = row[column.key as keyof T]
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        }),
      )
    : data

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = pagination
    ? filteredData.slice(startIndex, endIndex)
    : filteredData

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div
      className={`backdrop-blur-sm rounded-[30px] border overflow-hidden ${
        isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
      }`}
    >
      {/* Search bar */}
      {searchable && (
        <div
          className={`p-4 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}
        >
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none ${
                isDark
                  ? "bg-white/5 border border-white/10 text-white placeholder:text-gray-500"
                  : "bg-white border border-gray-400 text-gray-900 placeholder:text-gray-500"
              }`}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className={`border-b ${isDark ? "bg-[#1a1a2e]/10 border-white/5" : "bg-gray-100 border-gray-300"}`}
          >
            <tr>
              {visibleColumns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                    isDark ? "text-gray-200" : "text-gray-900"
                  } ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`divide-y ${isDark ? "divide-white/10" : "divide-gray-200"}`}
          >
            {loading ? (
              <tr>
                <td
                  colSpan={visibleColumns.length}
                  className={`px-6 py-12 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  <div className="flex items-center justify-center">
                    <div
                      className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? "border-[#4920E5]" : "border-gray-400"}`}
                    ></div>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length}
                  className={`px-6 py-12 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}`}
                >
                  {visibleColumns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 text-sm whitespace-nowrap ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } ${column.className || ""}`}
                    >
                      {column.render
                        ? column.render(row[column.key as keyof T], row)
                        : String(row[column.key as keyof T])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div
          className={`px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isDark ? "border-white/10" : "border-gray-200"}`}
        >
          <div
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
            entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft
                className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 2),
                  Math.min(totalPages, currentPage + 1),
                )
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[#4920E5] text-white"
                        : `${isDark ? "text-gray-700 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"}`
                    }`}
                  >
                    {page}
                  </button>
                ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
              aria-label="Next page"
            >
              <ChevronRight
                className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
