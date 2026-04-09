"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

type BookingStep =
  | "device"
  | "package"
  | "host"
  | "studio"
  | "slot"
  | "customer"
  | "payment"
  | "success"

interface FloatingNavigationProps {
  currentStep: BookingStep
  stepIndex: number
  canProceed: () => boolean
  isSubmitting: boolean
  onNext: () => void
  onBack: () => void
  onSubmit: () => void
}

export default function FloatingNavigation({
  currentStep,
  stepIndex,
  canProceed,
  isSubmitting,
  onNext,
  onBack,
  onSubmit,
}: FloatingNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 bg-gradient-to-t from-[#0B0B1B] via-[#0B0B1B]/95 to-transparent relative"
    >
      <div className="bg-[#1A1A2E]/90 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-2xl fixed z-50 bottom-4 right-4 left-4 lg:right-8 lg:left-auto">
        <div className="flex items-center justify-between gap-3">
          {stepIndex > 0 && (
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2 lg:w-56"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Kembali
            </button>
          )}
          <button
            onClick={currentStep === "payment" ? onSubmit : onNext}
            disabled={!canProceed() || isSubmitting}
            className={`flex-1 px-6 py-3 bg-[#4920E5] text-white rounded-xl font-semibold hover:bg-[#5B2CE8] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_10px_20px_0_#4920E5] flex items-center justify-center gap-2 lg:w-56 ${stepIndex === 0 ? "ml-auto" : ""}`}
          >
            {currentStep === "payment" ? (
              isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Bayar Sekarang
                  <ChevronRight className="w-5 h-5" />
                </>
              )
            ) : (
              <>
                Lanjutkan
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
