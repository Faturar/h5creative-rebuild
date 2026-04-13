"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  Package,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Video,
} from "lucide-react"
import DeviceSelection from "@/components/booking/DeviceSelection"
import PackageSelection from "@/components/booking/PackageSelection"
import HostSelection from "@/components/booking/HostSelection"
import StudioSelection from "@/components/booking/StudioSelection"
import TimeSlotSelection from "@/components/booking/TimeSlotSelection"
import CustomerForm from "@/components/booking/CustomerForm"
import PaymentSection from "@/components/booking/PaymentSection"
import BookingSummary from "@/components/booking/BookingSummary"
import SidebarSlider from "@/components/booking/SidebarSlider"
import FloatingNavigation from "@/components/booking/FloatingNavigation"

type BookingStep =
  | "device"
  | "package"
  | "host"
  | "studio"
  | "slot"
  | "customer"
  | "payment"
  | "success"

interface TimeSlot {
  startTime: string
  endTime: string
  date: string
}

interface BookingData {
  deviceType: string | null
  packageId: string | null
  hostId: string | null
  studioId: string | null
  studioSlotId: string | null
  date: string | null
  startTime: string | null
  endTime: string
  customerName: string
  customerPhone: string
  customerEmail: string
  businessName: string
  productCategory: string
  notes: string
  bookingId: string | null
  bookingCode: string | null
  bookingType: string | null
  customHours: number | null
  customDays: number | null
  hoursPerDay: number | null
  totalHours?: number
  timeSlots?: TimeSlot[]
}

export default function BookingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<BookingStep>("device")
  const [bookingData, setBookingData] = useState<BookingData>({
    deviceType: null,
    packageId: null,
    hostId: null,
    studioId: null,
    studioSlotId: null,
    date: null,
    startTime: null,
    endTime: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    businessName: "",
    productCategory: "",
    notes: "",
    bookingId: null,
    bookingCode: null,
    bookingType: null,
    customHours: null,
    customDays: null,
    hoursPerDay: null,
    totalHours: 0,
    timeSlots: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [packageValidationWarning, setPackageValidationWarning] = useState<
    string | null
  >(null)
  const [packages, setPackages] = useState<any[]>([])

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packageTypeParam = bookingData.deviceType
          ? `?packageType=${encodeURIComponent(bookingData.deviceType)}`
          : ""
        const response = await fetch(`/api/packages${packageTypeParam}`)
        const result = await response.json()
        if (result.success) {
          setPackages(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error)
      }
    }
    fetchPackages()
  }, [bookingData.deviceType])

  useEffect(() => {
    if (bookingData.packageId && packages.length > 0) {
      const selectedPackage = packages.find(
        (p) => p.id === bookingData.packageId,
      )
      if (selectedPackage) {
        setBookingData((prev) => ({
          ...prev,
          totalHours: selectedPackage.totalHours,
        }))
        // Validate package on load
        if (selectedPackage.numberOfDays < 5) {
          setPackageValidationWarning(
            `Minimal pembelian untuk paket jam adalah 5 hari (paket ini ${selectedPackage.numberOfDays} hari). Paket ini tidak dapat dipilih.`,
          )
        } else {
          setPackageValidationWarning(null)
        }
      }
    }
  }, [bookingData.packageId, packages])

  useEffect(() => {
    if (bookingData.bookingType === "custom") {
      const days = bookingData.customDays || 0
      const hours = bookingData.customHours || 0
      if (days < 6 || hours < 12) {
        setPackageValidationWarning(
          `Minimal pembelian untuk custom jam adalah 6 hari dengan minimal 12 jam total`,
        )
      } else {
        setPackageValidationWarning(null)
      }
    }
  }, [bookingData.bookingType, bookingData.customDays, bookingData.customHours])

  const steps = [
    { id: "device", title: "Pilih Perangkat", icon: Video },
    { id: "package", title: "Pilih Paket", icon: Package },
    { id: "host", title: "Pilih Host", icon: User },
    { id: "studio", title: "Pilih Studio", icon: MapPin },
    { id: "slot", title: "Pilih Waktu", icon: Calendar },
    { id: "customer", title: "Data Pelanggan", icon: User },
    { id: "payment", title: "Pembayaran", icon: CreditCard },
  ]

  const stepIndex = steps.findIndex((s) => s.id === currentStep)

  const handleNext = () => {
    const nextStepIndex = stepIndex + 1
    if (nextStepIndex < steps.length) {
      setCurrentStep(steps[nextStepIndex].id as BookingStep)
    }
  }

  const handleBack = () => {
    const prevStepIndex = stepIndex - 1
    if (prevStepIndex >= 0) {
      setCurrentStep(steps[prevStepIndex].id as BookingStep)
    }
  }

  const handleStepClick = (stepId: BookingStep) => {
    // Allow going back to previous steps
    const clickedIndex = steps.findIndex((s) => s.id === stepId)
    if (clickedIndex < stepIndex) {
      setCurrentStep(stepId)
    }
  }

  const calculateHoursFromTimeSlots = (
    timeSlots: TimeSlot[] | undefined,
  ): number => {
    if (!timeSlots || timeSlots.length === 0) return 0

    return timeSlots.reduce((total, slot) => {
      const [startHours, startMinutes] = slot.startTime.split(":").map(Number)
      const [endHours, endMinutes] = slot.endTime.split(":").map(Number)

      const startTotalMinutes = startHours * 60 + startMinutes
      const endTotalMinutes = endHours * 60 + endMinutes

      let duration = endTotalMinutes - startTotalMinutes

      // Handle overnight slots
      if (duration < 0) {
        duration = 24 * 60 + duration
      }

      return total + duration / 60
    }, 0)
  }

  const canProceed = (): boolean => {
    switch (currentStep) {
      case "device":
        return bookingData.deviceType !== null
      case "package":
        return (
          packageValidationWarning === null &&
          ((bookingData.bookingType === "package" &&
            bookingData.packageId !== null) ||
            (bookingData.bookingType === "custom" &&
              bookingData.customHours !== null &&
              bookingData.customHours >= 12 &&
              bookingData.customDays !== null &&
              bookingData.customDays >= 6))
        )
      case "host":
        return bookingData.hostId !== null
      case "studio":
        return bookingData.studioId !== null
      case "slot":
        return (
          (bookingData.studioSlotId !== null ||
            (bookingData.date !== null &&
              bookingData.startTime !== null &&
              bookingData.endTime !== "")) &&
          bookingData.date !== null &&
          bookingData.startTime !== null &&
          bookingData.endTime !== ""
        )
      case "customer":
        return !!(
          bookingData.customerName &&
          bookingData.customerPhone &&
          bookingData.customerEmail &&
          bookingData.businessName &&
          bookingData.productCategory
        )
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    if (!canProceed()) return

    setIsSubmitting(true)
    setError(null)
    setValidationErrors([])

    try {
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      const bookingResult = await bookingResponse.json()

      if (!bookingResult.success) {
        if (bookingResult.details && Array.isArray(bookingResult.details)) {
          setValidationErrors(bookingResult.details)
          setError(null)
          setIsSubmitting(false)
          return
        }
        throw new Error(bookingResult.error || "Gagal membuat booking")
      }

      const booking = bookingResult.data
      setBookingData((prev) => ({
        ...prev,
        bookingId: booking.id,
        bookingCode: booking.bookingCode,
      }))

      // Create payment
      const paymentResponse = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.id }),
      })

      const paymentResult = await paymentResponse.json()

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || "Gagal membuat pembayaran")
      }

      // Redirect to Midtrans payment page
      if (paymentResult.data.redirectUrl) {
        window.location.href = paymentResult.data.redirectUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#0B0B1B] flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden lg:flex flex-1 flex-col justify-end overflow-hidden lg:sticky top-0 h-screen">
        <SidebarSlider />
      </div>

      {/* Mobile Testimonial Banner */}
      {/* <div className="lg:hidden bg-gradient-to-r from-[#4920E5] to-[#6B21A8] p-4">
        <div className="flex flex-col items-center text-white text-center">
          <div className="flex h-8 items-center mb-2">
            <Image
              src={logoTesti5}
              className="h-full object-contain"
              alt="logo"
            />
          </div>
          <p className="font-semibold text-sm md:text-base leading-tight mb-2">
            Platform live streaming profesional untuk bisnis Anda
          </p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={starIcon}
                className="w-5 h-5"
                alt="star"
              />
            ))}
          </div>
        </div>
      </div> */}

      {/* Right Main Content */}
      <div className="flex flex-col flex-3 items-center justify-center mx-auto py-4 md:py-6 lg:py-12 px-4 md:px-8 xl:px-8 bg-[url('/assets/images/Ellipse.svg')] bg-center bg-no-repeat bg-contain bg-[length:540px]">
        {/* Progress Steps */}
        <div className="w-full max-w-4xl mb-4 md:mb-6 lg:mb-8">
          <div className="grid grid-cols-4 lg:grid-cols-7 justify-center overflow-x-auto pb-2 scrollbar-hide">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep
              const isCompleted = index < stepIndex
              const isClickable = isCompleted

              return (
                <div
                  key={step.id}
                  className={`h-24 md:h-28 flex items-center justify-center shrink-0 ${index < steps.length - 1 ? "flex-1 min-w-[80px]" : "min-w-[60px]"}`}
                >
                  <div
                    className={`flex flex-col items-center cursor-pointer ${
                      isClickable ? "hover:opacity-80" : ""
                    }`}
                    onClick={() =>
                      isClickable && handleStepClick(step.id as BookingStep)
                    }
                  >
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#4920E5] text-white shadow-lg scale-110"
                          : isCompleted
                            ? "bg-[#12BB74] text-white"
                            : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                      )}
                    </div>
                    <span
                      className={`mt-0.5 md:mt-1 text-xs md:text-sm font-medium text-center ${
                        isActive
                          ? "text-[#4920E5]"
                          : isCompleted
                            ? "text-[#12BB74]"
                            : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 md:h-1 mx-1.5 md:mx-4 rounded ${
                        isCompleted ? "bg-[#12BB74]" : "bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 md:mb-6 p-3 md:p-4 bg-red-500/10 border border-red-500/30 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 max-w-4xl w-full mx-auto"
          >
            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-400 text-sm md:text-base">{error}</p>
          </motion.div>
        )}

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 md:mb-6 p-3 md:p-4 bg-red-500/10 border border-red-500/30 rounded-xl md:rounded-2xl max-w-4xl w-full mx-auto"
          >
            <div className="flex items-start gap-2 md:gap-3">
              <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm md:text-base font-medium text-red-300 mb-2">
                  Validasi gagal. Mohon perbaiki kesalahan berikut:
                </p>
                <ul className="text-sm md:text-base text-red-400 space-y-1 list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Package Validation Warning */}
        {packageValidationWarning && currentStep === "package" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 md:mb-6 p-3 md:p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl md:rounded-2xl max-w-4xl w-full mx-auto"
          >
            <div className="flex items-start gap-2 md:gap-3">
              <XCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm md:text-base font-medium text-yellow-300 mb-2">
                  Perhatian - Syarat Belum Terpenuhi
                </p>
                <p className="text-sm md:text-base text-yellow-400">
                  {packageValidationWarning}. Mohon sesuaikan pilihan Anda
                  sebelum melanjutkan.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-8 w-full max-w-6xl pb-24 relative">
          {/* Step Content */}
          <div className="lg:col-span-3 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-[30px] p-4 md:p-4 lg:p-8 border border-white/10"
              >
                {currentStep === "device" && (
                  <DeviceSelection
                    selectedDevice={bookingData.deviceType}
                    onSelect={(deviceType) =>
                      setBookingData((prev) => ({ ...prev, deviceType }))
                    }
                  />
                )}
                {currentStep === "package" && (
                  <PackageSelection
                    deviceType={bookingData.deviceType}
                    selectedPackageId={bookingData.packageId}
                    onSelect={(packageId) =>
                      setBookingData((prev) => ({
                        ...prev,
                        packageId,
                        bookingType: "package",
                      }))
                    }
                    onBookingTypeChange={(bookingType) =>
                      setBookingData((prev) => {
                        const updated: any = { ...prev, bookingType }
                        if (bookingType === "custom") {
                          updated.packageId = null
                          updated.totalHours = prev.customHours
                          updated.timeSlots = []
                        } else {
                          updated.packageId = null
                          updated.customHours = null
                          updated.customDays = null
                          updated.hoursPerDay = null
                        }
                        setPackageValidationWarning(null)
                        return updated
                      })
                    }
                    onCustomHoursChange={(customHours) =>
                      setBookingData((prev) => ({
                        ...prev,
                        customHours,
                        totalHours: customHours,
                      }))
                    }
                    onCustomDaysChange={(customDays) =>
                      setBookingData((prev) => ({ ...prev, customDays }))
                    }
                    onHoursPerDayChange={(hoursPerDay) =>
                      setBookingData((prev) => ({ ...prev, hoursPerDay }))
                    }
                    onValidationChange={(isValid) => {
                      if (bookingData.bookingType === "custom") {
                        const days = bookingData.customDays || 0
                        const hours = bookingData.customHours || 0
                        const hoursPerDay = bookingData.hoursPerDay || 2
                        if (days < 6) {
                          setPackageValidationWarning(
                            `Minimal pembelian untuk custom jam adalah 6 hari (saat ini ${days} hari). Tingkatkan jam per hari atau total jam untuk memenuhi syarat.`,
                          )
                        } else if (hours < 12) {
                          setPackageValidationWarning(
                            `Minimal 12 jam total untuk custom booking (saat ini ${hours} jam).`,
                          )
                        } else {
                          setPackageValidationWarning(null)
                        }
                      } else if (
                        bookingData.bookingType === "package" &&
                        bookingData.packageId
                      ) {
                        const selectedPackage = packages.find(
                          (p) => p.id === bookingData.packageId,
                        )
                        if (
                          selectedPackage &&
                          selectedPackage.numberOfDays < 5
                        ) {
                          setPackageValidationWarning(
                            `Minimal pembelian untuk paket jam adalah 5 hari (paket ini ${selectedPackage.numberOfDays} hari). Paket ini tidak dapat dipilih.`,
                          )
                        } else {
                          setPackageValidationWarning(null)
                        }
                      } else {
                        setPackageValidationWarning(null)
                      }
                    }}
                  />
                )}
                {currentStep === "host" && (
                  <HostSelection
                    packageId={bookingData.packageId}
                    selectedHostId={bookingData.hostId}
                    onSelect={(hostId) =>
                      setBookingData((prev) => ({ ...prev, hostId }))
                    }
                  />
                )}
                {currentStep === "studio" && (
                  <StudioSelection
                    selectedStudioId={bookingData.studioId}
                    onSelect={(studioId) =>
                      setBookingData((prev) => ({ ...prev, studioId }))
                    }
                  />
                )}
                {currentStep === "slot" && (
                  <TimeSlotSelection
                    studioId={bookingData.studioId}
                    selectedSlotId={bookingData.studioSlotId}
                    onSelect={(slotId, date, startTime, endTime) =>
                      setBookingData((prev) => {
                        const newTimeSlots = [
                          {
                            date,
                            startTime,
                            endTime,
                          },
                        ]
                        return {
                          ...prev,
                          studioSlotId: slotId,
                          date,
                          startTime,
                          endTime,
                          totalHours:
                            prev.customHours ||
                            calculateHoursFromTimeSlots(newTimeSlots),
                          timeSlots: newTimeSlots,
                        }
                      })
                    }
                  />
                )}
                {currentStep === "customer" && (
                  <CustomerForm
                    bookingData={bookingData}
                    onChange={(data) =>
                      setBookingData((prev) => ({ ...prev, ...data }))
                    }
                  />
                )}
                {currentStep === "payment" && (
                  <PaymentSection
                    bookingData={bookingData}
                    isSubmitting={isSubmitting}
                    canProceed={canProceed()}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Booking Summary - Sticky on Desktop, Bottom on Mobile */}
          {currentStep !== "success" && (
            <div className="lg:col-span-3 order-first lg:order-last mb-3 lg:mb-0">
              <div className="lg:sticky lg:top-8 flex flex-col gap-4">
                <BookingSummary bookingData={bookingData} />
                <FloatingNavigation
                  currentStep={currentStep}
                  stepIndex={stepIndex}
                  canProceed={canProceed}
                  isSubmitting={isSubmitting}
                  onNext={handleNext}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
