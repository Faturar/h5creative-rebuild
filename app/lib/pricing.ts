import { prisma } from "./prisma"

export interface PricingTier {
  id: string
  deviceType: string
  minHours: number
  maxHours: number | null
  pricePerHour: number
  isActive: boolean
}

export interface TimeSurcharge {
  id: string
  startTime: string
  endTime: string
  surcharge: number
  description: string
  isActive: boolean
}

export interface TimeSlot {
  startTime: string
  endTime: string
  date: string
}

export interface PricingBreakdown {
  basePrice: number
  tieredPrice: number
  surcharges: Array<{
    timeSlot: string
    amount: number
    reason: string
  }>
  totalSurcharge: number
  finalPrice: number
  pricingTier: PricingTier | null
  totalHours: number
}

/**
 * Get applicable pricing tier for a device type and total hours
 */
export async function getPricingTier(
  deviceType: string,
  totalHours: number,
): Promise<PricingTier | null> {
  try {
    const tier = await prisma.pricingTier.findFirst({
      where: {
        deviceType,
        isActive: true,
        minHours: { lte: totalHours },
        OR: [{ maxHours: null }, { maxHours: { gte: totalHours } }],
      },
      orderBy: { minHours: "desc" },
    })

    return tier
      ? {
          id: tier.id,
          deviceType: tier.deviceType,
          minHours: tier.minHours,
          maxHours: tier.maxHours,
          pricePerHour: Number(tier.pricePerHour),
          isActive: tier.isActive,
        }
      : null
  } catch (error) {
    console.error("Error getting pricing tier:", error)
    return null
  }
}

/**
 * Get all active time surcharges
 */
export async function getTimeSurcharges(): Promise<TimeSurcharge[]> {
  try {
    const surcharges = await prisma.timeSurcharge.findMany({
      where: { isActive: true },
      orderBy: { startTime: "asc" },
    })

    return surcharges.map((s) => ({
      id: s.id,
      startTime: s.startTime,
      endTime: s.endTime,
      surcharge: Number(s.surcharge),
      description: s.description,
      isActive: s.isActive,
    }))
  } catch (error) {
    console.error("Error getting time surcharges:", error)
    return []
  }
}

/**
 * Calculate surcharge for a specific time slot
 */
export function calculateTimeSlotSurcharge(
  startTime: string,
  endTime: string,
  surcharges: TimeSurcharge[],
): number {
  // Parse time to minutes for comparison
  const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }

  const startMinutes = parseTime(startTime)
  const endMinutes = parseTime(endTime)

  if (endMinutes <= startMinutes) return 0

  let totalSurcharge = 0

  // Check each surcharge period and calculate overlap
  for (const surcharge of surcharges) {
    const surchargeStart = parseTime(surcharge.startTime)
    const surchargeEnd = parseTime(surcharge.endTime)

    let overlapStart, overlapEnd

    // Handle overnight surcharges (e.g., 21:00 - 01:00)
    if (surchargeStart > surchargeEnd) {
      // Surcharge crosses midnight
      // Check overlap with first part (surchargeStart to 24:00)
      overlapStart = Math.max(startMinutes, surchargeStart)
      overlapEnd = Math.min(endMinutes, 24 * 60)

      if (overlapStart < overlapEnd) {
        totalSurcharge += surcharge.surcharge * ((overlapEnd - overlapStart) / 60)
      }

      // Check overlap with second part (00:00 to surchargeEnd)
      overlapStart = Math.max(startMinutes, 0)
      overlapEnd = Math.min(endMinutes, surchargeEnd)

      if (overlapStart < overlapEnd) {
        totalSurcharge += surcharge.surcharge * ((overlapEnd - overlapStart) / 60)
      }
    } else {
      // Normal time period
      overlapStart = Math.max(startMinutes, surchargeStart)
      overlapEnd = Math.min(endMinutes, surchargeEnd)

      if (overlapStart < overlapEnd) {
        totalSurcharge += surcharge.surcharge * ((overlapEnd - overlapStart) / 60)
      }
    }
  }

  return totalSurcharge
}

/**
 * Calculate total pricing breakdown for a booking
 */
export async function calculateTotalPrice(
  deviceType: string,
  totalHours: number,
  timeSlots: TimeSlot[],
): Promise<PricingBreakdown> {
  try {
    // Get pricing tier
    const pricingTier = await getPricingTier(deviceType, totalHours)

    // Get time surcharges
    const surcharges = await getTimeSurcharges()

    // Calculate base price using tiered pricing
    const tieredPrice = pricingTier ? pricingTier.pricePerHour * totalHours : 0

    // Calculate surcharges for each time slot
    const slotSurcharges: Array<{
      timeSlot: string
      amount: number
      reason: string
    }> = []

    for (const slot of timeSlots) {
      const totalSurchargeForSlot = calculateTimeSlotSurcharge(
        slot.startTime,
        slot.endTime,
        surcharges,
      )

      if (totalSurchargeForSlot > 0) {
        // Find which surcharge periods overlap with this slot
        const parseTime = (time: string): number => {
          const [hours, minutes] = time.split(":").map(Number)
          return hours * 60 + minutes
        }

        const slotStart = parseTime(slot.startTime)
        const slotEnd = parseTime(slot.endTime)

        for (const surcharge of surcharges) {
          const surchargeStart = parseTime(surcharge.startTime)
          const surchargeEnd = parseTime(surcharge.endTime)

          let overlapStart, overlapEnd
          let overlapDuration = 0

          // Handle overnight surcharges (e.g., 21:00 - 01:00)
          if (surchargeStart > surchargeEnd) {
            // Check overlap with first part (surchargeStart to 24:00)
            overlapStart = Math.max(slotStart, surchargeStart)
            overlapEnd = Math.min(slotEnd, 24 * 60)

            if (overlapStart < overlapEnd) {
              overlapDuration += (overlapEnd - overlapStart) / 60
            }

            // Check overlap with second part (00:00 to surchargeEnd)
            overlapStart = Math.max(slotStart, 0)
            overlapEnd = Math.min(slotEnd, surchargeEnd)

            if (overlapStart < overlapEnd) {
              overlapDuration += (overlapEnd - overlapStart) / 60
            }
          } else {
            // Normal time period
            overlapStart = Math.max(slotStart, surchargeStart)
            overlapEnd = Math.min(slotEnd, surchargeEnd)

            if (overlapStart < overlapEnd) {
              overlapDuration = (overlapEnd - overlapStart) / 60
            }
          }

          if (overlapDuration > 0) {
            const surchargeAmount = surcharge.surcharge * overlapDuration
            slotSurcharges.push({
              timeSlot: `${slot.startTime} - ${slot.endTime}`,
              amount: surchargeAmount,
              reason: surcharge.description,
            })
          }
        }
      }
    }

    const totalSurcharge = slotSurcharges.reduce((sum, s) => sum + s.amount, 0)
    const finalPrice = tieredPrice + totalSurcharge

    return {
      basePrice: tieredPrice,
      tieredPrice,
      surcharges: slotSurcharges,
      totalSurcharge,
      finalPrice,
      pricingTier,
      totalHours,
    }
  } catch (error) {
    console.error("Error calculating total price:", error)
    return {
      basePrice: 0,
      tieredPrice: 0,
      surcharges: [],
      totalSurcharge: 0,
      finalPrice: 0,
      pricingTier: null,
      totalHours,
    }
  }
}

/**
 * Validate minimum purchase requirements
 */
export function validateMinimumDays(
  bookingType: "custom" | "package",
  numberOfDays: number,
): { valid: boolean; message?: string } {
  if (bookingType === "custom" && numberOfDays < 6) {
    return {
      valid: false,
      message: "Minimal pembelian untuk custom jam adalah 6 hari dengan minimal 12 jam total",
    }
  }

  if (bookingType === "package" && numberOfDays < 5) {
    return {
      valid: false,
      message: "Minimal pembelian untuk paket jam adalah 5 hari. Paket dengan durasi kurang dari 5 hari tidak dapat dipilih.",
    }
  }

  return { valid: true }
}

/**
 * Check if a time is within operational hours
 */
export function isOperationalHour(time: string, deviceType: string): boolean {
  const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }

  const timeMinutes = parseTime(time)

  // Define operational hours for each device type
  const operationalHours = {
    iPhone: { start: "09:00", end: "20:00" },
    "OBS Sistem": { start: "09:00", end: "20:00" },
  }

  const hours = operationalHours[deviceType as keyof typeof operationalHours]
  if (!hours) return true // Default to operational if device type not found

  const startMinutes = parseTime(hours.start)
  const endMinutes = parseTime(hours.end)

  return timeMinutes >= startMinutes && timeMinutes <= endMinutes
}

/**
 * Get all pricing tiers for a device type
 */
export async function getPricingTiers(
  deviceType: string,
): Promise<PricingTier[]> {
  try {
    const tiers = await prisma.pricingTier.findMany({
      where: {
        deviceType,
        isActive: true,
      },
      orderBy: { minHours: "asc" },
    })

    return tiers.map((t) => ({
      id: t.id,
      deviceType: t.deviceType,
      minHours: t.minHours,
      maxHours: t.maxHours,
      pricePerHour: Number(t.pricePerHour),
      isActive: t.isActive,
    }))
  } catch (error) {
    console.error("Error getting pricing tiers:", error)
    return []
  }
}

/**
 * Calculate duration in hours from time slot
 */
export function calculateSlotHours(startTime: string, endTime: string): number {
  const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours + minutes / 60
  }

  const start = parseTime(startTime)
  const end = parseTime(endTime)

  // Handle overnight slots
  if (end < start) {
    return 24 - start + end
  }

  return end - start
}

/**
 * Get available time slots for a device type
 */
export function getAvailableTimeSlots(): Array<{
  startTime: string
  endTime: string
  label: string
}> {
  return [
    { startTime: "09:00", endTime: "11:00", label: "09:00 - 11:00" },
    { startTime: "11:00", endTime: "13:00", label: "11:00 - 13:00" },
    { startTime: "13:00", endTime: "15:00", label: "13:00 - 15:00" },
    { startTime: "14:00", endTime: "16:00", label: "14:00 - 16:00" },
    { startTime: "16:00", endTime: "18:00", label: "16:00 - 18:00" },
    { startTime: "18:00", endTime: "20:00", label: "18:00 - 20:00" },
    { startTime: "19:00", endTime: "21:00", label: "19:00 - 21:00" },
  ]
}

/**
 * Format price to Indonesian Rupiah
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Get surcharge info for a time slot
 */
export async function getSurchargeInfo(
  startTime: string,
  endTime: string,
): Promise<{ hasSurcharge: boolean; amount: number; description: string }> {
  const surcharges = await getTimeSurcharges()
  const surcharge = calculateTimeSlotSurcharge(startTime, endTime, surcharges)

  if (surcharge > 0) {
    // Find which surcharge applies
    const parseTime = (time: string): number => {
      const [hours, minutes] = time.split(":").map(Number)
      return hours * 60 + minutes
    }

    const startMinutes = parseTime(startTime)
    const applicableSurcharge = surcharges.find((s) => {
      const surchargeStart = parseTime(s.startTime)
      const surchargeEnd = parseTime(s.endTime)

      if (surchargeStart > surchargeEnd) {
        return startMinutes >= surchargeStart || startMinutes < surchargeEnd
      } else {
        return startMinutes >= surchargeStart && startMinutes < surchargeEnd
      }
    })

    return {
      hasSurcharge: true,
      amount: surcharge,
      description: applicableSurcharge?.description || "Surcharge",
    }
  }

  return {
    hasSurcharge: false,
    amount: 0,
    description: "Normal operational hours",
  }
}
