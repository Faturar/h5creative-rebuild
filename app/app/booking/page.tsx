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
} from "lucide-react"
import logoTesti5 from "@/public/assets/images/logos/logo-testi5.svg"
import starIcon from "@/public/assets/images/icons/Star.svg"
import PackageSelection from "@/components/booking/PackageSelection"
import HostSelection from "@/components/booking/HostSelection"
import StudioSelection from "@/components/booking/StudioSelection"
import TimeSlotSelection from "@/components/booking/TimeSlotSelection"
import CustomerForm from "@/components/booking/CustomerForm"
import PaymentSection from "@/components/booking/PaymentSection"
import BookingSummary from "@/components/booking/BookingSummary"

type BookingStep =
  | "package"
  | "host"
  | "studio"
  | "slot"
  | "customer"
  | "payment"
  | "success"

interface BookingData {
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
  const [currentStep, setCurrentStep] = useState<BookingStep>("package")
  const [bookingData, setBookingData] = useState<BookingData>({
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

  const steps = [
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

    try {
      // Create booking
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      const bookingResult = await bookingResponse.json()

      if (!bookingResult.success) {
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
    <section className="bg-[#0B0B1B] flex min-h-screen">
      {/* Left Sidebar - Testimonial Card */}
      <div className="hidden lg:flex w-[660px] min-h-screen flex-col p-[30px_40px] justify-end overflow-hidden bg-[url('/assets/images/background/side-image.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col bg-white p-[30px] gap-5 rounded-[30px] w-[580px]">
          <div className="flex h-10 items-start overflow-hidden">
            <Image
              src={logoTesti5}
              className="h-full object-contain"
              alt="logo"
            />
          </div>
          <p className="font-semibold text-[22px] leading-[40px] text-gray-800">
            Platform live streaming profesional untuk bisnis Anda. Tingkatkan
            penjualan dengan host berpengalaman dan studio modern.
          </p>
          <div className="flex h-8 w-fit shrink-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={starIcon}
                className="w-full h-full"
                alt="star"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="flex flex-col flex-1 items-center justify-center mx-auto py-4 bg-[url('/assets/images/Ellipse.svg')] bg-center bg-no-repeat bg-contain bg-[length:540px]">
        {/* Progress Steps */}
        <div className="w-full max-w-4xl mb-8 px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep
              const isCompleted = index < stepIndex
              const isClickable = isCompleted

              return (
                <div
                  key={step.id}
                  className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
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
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#4920E5] text-white shadow-lg scale-110"
                          : isCompleted
                            ? "bg-[#12BB74] text-white"
                            : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
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
                      className={`flex-1 h-1 mx-4 rounded ${
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
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 max-w-4xl w-full mx-auto"
          >
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {/* Step Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-[30px] p-8 border border-white/10"
              >
                {currentStep === "package" && (
                  <PackageSelection
                    selectedPackageId={bookingData.packageId}
                    onSelect={(packageId) =>
                      setBookingData((prev) => ({ ...prev, packageId }))
                    }
                    onNext={handleNext}
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

          {/* Booking Summary - Sticky on Desktop */}
          {currentStep !== "success" && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingSummary bookingData={bookingData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
