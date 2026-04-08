"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  ChevronRight,
  CheckCircle,
  XCircle,
  Package,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Video,
} from "lucide-react"
import logoTesti5 from "@/public/assets/images/logos/logo-testi5.svg"
import starIcon from "@/public/assets/images/icons/Star.svg"
import DeviceSelection from "@/components/booking/DeviceSelection"
import PackageSelection from "@/components/booking/PackageSelection"
import HostSelection from "@/components/booking/HostSelection"
import StudioSelection from "@/components/booking/StudioSelection"
import TimeSlotSelection from "@/components/booking/TimeSlotSelection"
import CustomerForm from "@/components/booking/CustomerForm"
import PaymentSection from "@/components/booking/PaymentSection"
import BookingSummary from "@/components/booking/BookingSummary"

type BookingStep =
  | "device"
  | "package"
  | "host"
  | "studio"
  | "slot"
  | "customer"
  | "payment"
  | "success"

interface BookingData {
  deviceType: string | null
  packageId: string | null
  hostId: string | null
  studioId: string | null
  studioSlotId: string | null
  date: string | null
  startTime: string | null
  endTime: string | null
  customerName: string
  customerPhone: string
  customerEmail: string
  businessName: string
  productCategory: string
  notes: string
  bookingId: string | null
  bookingCode: string | null
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
    endTime: null,
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    businessName: "",
    productCategory: "",
    notes: "",
    bookingId: null,
    bookingCode: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

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

  const canProceed = () => {
    switch (currentStep) {
      case "device":
        return bookingData.deviceType !== null
      case "package":
        return bookingData.packageId !== null
      case "host":
        return bookingData.hostId !== null
      case "studio":
        return bookingData.studioId !== null
      case "slot":
        return bookingData.studioSlotId !== null
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
        throw new Error(bookingResult.error || "Failed to create booking")
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
        throw new Error(paymentResult.error || "Failed to create payment")
      }

      // Redirect to Midtrans payment page
      if (paymentResult.data.redirectUrl) {
        window.location.href = paymentResult.data.redirectUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#0B0B1B] flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar - Testimonial Card */}
      <div className="hidden lg:flex flex-1 flex-col p-[30px_40px] justify-end overflow-hidden bg-[url('/assets/images/background/livestream.png')] bg-cover bg-center bg-no-repeat sticky top-0 h-screen">
        <div className="flex flex-col bg-white p-[30px] gap-4 rounded-[30px] sticky bottom-[30px]">
          <h1 className="text-3xl font-bold">Livestream Service</h1>
          <p className="text-xl leading-8 text-gray-800">
            Platform live streaming profesional untuk bisnis Anda. Tingkatkan
            penjualan dengan host berpengalaman dan studio modern.
          </p>
        </div>
      </div>

      {/* Mobile Testimonial Banner */}
      <div className="lg:hidden bg-gradient-to-r from-[#4920E5] to-[#6B21A8] p-4">
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
      </div>

      {/* Right Main Content */}
      <div className="flex flex-col flex-3 items-center justify-center mx-auto py-3 md:py-6 lg:py-8 px-3 md:px-4 bg-[url('/assets/images/Ellipse.svg')] bg-center bg-no-repeat bg-contain bg-[length:540px]">
        {/* Progress Steps */}
        <div className="w-full max-w-4xl mb-4 md:mb-6 lg:mb-8">
          <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep
              const isCompleted = index < stepIndex
              const isClickable = isCompleted

              return (
                <div
                  key={step.id}
                  className={`h-20 md:h-24 flex items-center shrink-0 ${index < steps.length - 1 ? "flex-1 min-w-[70px] md:min-w-[80px]" : "min-w-[50px] md:min-w-[60px]"}`}
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
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#4920E5] text-white shadow-lg scale-110"
                          : isCompleted
                            ? "bg-[#12BB74] text-white"
                            : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                    </div>
                    <span
                      className={`mt-0.5 md:mt-1 text-xs md:text-sm font-medium ${
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 lg:gap-8 w-full max-w-6xl">
          {/* Step Content */}
          <div className="lg:col-span-2 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-[30px] p-3 md:p-4 lg:p-6 lg:p-8 border border-white/10"
              >
                {currentStep === "device" && (
                  <DeviceSelection
                    selectedDevice={bookingData.deviceType}
                    onSelect={(deviceType) =>
                      setBookingData((prev) => ({ ...prev, deviceType }))
                    }
                    onNext={handleNext}
                  />
                )}
                {currentStep === "package" && (
                  <PackageSelection
                    deviceType={bookingData.deviceType}
                    selectedPackageId={bookingData.packageId}
                    onSelect={(packageId) =>
                      setBookingData((prev) => ({ ...prev, packageId }))
                    }
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === "host" && (
                  <HostSelection
                    packageId={bookingData.packageId}
                    selectedHostId={bookingData.hostId}
                    onSelect={(hostId) =>
                      setBookingData((prev) => ({ ...prev, hostId }))
                    }
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === "studio" && (
                  <StudioSelection
                    selectedStudioId={bookingData.studioId}
                    onSelect={(studioId) =>
                      setBookingData((prev) => ({ ...prev, studioId }))
                    }
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === "slot" && (
                  <TimeSlotSelection
                    studioId={bookingData.studioId}
                    selectedSlotId={bookingData.studioSlotId}
                    onSelect={(slotId, date, startTime, endTime) =>
                      setBookingData((prev) => ({
                        ...prev,
                        studioSlotId: slotId,
                        date,
                        startTime,
                        endTime,
                      }))
                    }
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === "customer" && (
                  <CustomerForm
                    bookingData={bookingData}
                    onChange={(data) =>
                      setBookingData((prev) => ({ ...prev, ...data }))
                    }
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === "payment" && (
                  <PaymentSection
                    bookingData={bookingData}
                    onSubmit={handleSubmit}
                    onBack={handleBack}
                    isSubmitting={isSubmitting}
                    canProceed={canProceed()}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Booking Summary - Sticky on Desktop, Bottom on Mobile */}
          {currentStep !== "success" && (
            <div className="lg:col-span-1 order-first lg:order-last mb-3 lg:mb-0">
              <div className="lg:sticky lg:top-8">
                <BookingSummary bookingData={bookingData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
