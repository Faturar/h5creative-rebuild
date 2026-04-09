import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { Prisma } from "@prisma/client"
import { sendBookingConfirmationEmail } from "@/lib/email"
import { calculateTotalPrice, validateMinimumDays } from "@/lib/pricing"

type BookingStatus =
  | "PENDING"
  | "PAID"
  | "CANCELLED"
  | "COMPLETED"
  | "IN_PROGRESS"
  | "FINISHED"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const bookingSchema = z.object({
  packageId: z.string().uuid(),
  hostId: z.string().uuid(),
  studioId: z.string().uuid(),
  studioSlotId: z.string().uuid(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(10),
  customerEmail: z.string().min(1).max(255).regex(emailRegex, {
    message: "Invalid email address format",
  }),
  businessName: z.string().min(2),
  productCategory: z.string().min(2),
  notes: z.string().optional(),
  deviceType: z.string().optional(),
  totalHours: z.number().optional(),
  timeSlots: z
    .array(
      z.object({
        startTime: z.string(),
        endTime: z.string(),
        date: z.string(),
      }),
    )
    .optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const bookingCode = searchParams.get("bookingCode")

    const bookings = await prisma.booking.findMany({
      where: {
        ...(status && { status: status as BookingStatus }),
        ...(bookingCode && { bookingCode }),
      },
      include: {
        package: true,
        host: true,
        studio: true,
        studioSlot: true,
        payments: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: bookings })
  } catch (error) {
    console.error("Failed to fetch bookings:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // Generate booking code
    const bookingCode = `BK${Date.now().toString().slice(-8)}`

    // Get package data
    const packageData = await prisma.package.findUnique({
      where: { id: validatedData.packageId },
    })

    if (!packageData) {
      return NextResponse.json(
        { success: false, error: "Package not found" },
        { status: 404 },
      )
    }

    // Validate minimum purchase requirements
    const bookingType = packageData.bookingType as "custom" | "package"
    const numberOfDays = validatedData.totalHours
      ? Math.ceil(validatedData.totalHours / 2)
      : packageData.numberOfDays

    const validation = validateMinimumDays(bookingType, numberOfDays)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.message },
        { status: 400 },
      )
    }

    // Calculate dynamic pricing if device type and total hours are provided
    let price = Number(packageData.promoPrice || packageData.price)
    let basePrice = price
    let surcharge = 0
    let finalPrice = price
    let pricingTierId: string | null = null
    let totalHours = validatedData.totalHours || packageData.totalHours

    if (
      validatedData.deviceType &&
      validatedData.totalHours &&
      validatedData.timeSlots
    ) {
      const pricingBreakdown = await calculateTotalPrice(
        validatedData.deviceType,
        validatedData.totalHours,
        validatedData.timeSlots,
      )

      basePrice = pricingBreakdown.basePrice
      surcharge = pricingBreakdown.totalSurcharge
      finalPrice = pricingBreakdown.finalPrice
      pricingTierId = pricingBreakdown.pricingTier?.id || null
      totalHours = pricingBreakdown.totalHours
    }

    // Create booking
    const booking = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // Update studio slot as booked
        await tx.studioSlot.update({
          where: { id: validatedData.studioSlotId },
          data: { isBooked: true },
        })

        // Create booking
        const newBooking = await tx.booking.create({
          data: {
            bookingCode,
            packageId: validatedData.packageId,
            hostId: validatedData.hostId,
            studioId: validatedData.studioId,
            studioSlotId: validatedData.studioSlotId,
            date: new Date(validatedData.date),
            startTime: validatedData.startTime,
            endTime: validatedData.endTime,
            customerName: validatedData.customerName,
            customerPhone: validatedData.customerPhone,
            customerEmail: validatedData.customerEmail,
            businessName: validatedData.businessName,
            productCategory: validatedData.productCategory,
            price: finalPrice,
            totalHours,
            basePrice,
            surcharge,
            finalPrice,
            pricingTierId,
            notes: validatedData.notes,
          },
          include: {
            package: true,
            host: true,
            studio: true,
            studioSlot: true,
          },
        })

        return newBooking
      },
    )

    await sendBookingConfirmationEmail({
      to: booking.customerEmail,
      customerName: booking.customerName,
      bookingCode: booking.bookingCode,
      packageName: booking.package.name,
      studioName: booking.studio.name,
      date: booking.date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      startTime: booking.startTime,
      endTime: booking.endTime,
      price: Number(booking.finalPrice),
    })

    return NextResponse.json({ success: true, data: booking }, { status: 201 })
  } catch (error) {
    console.error("Failed to create booking:", error)
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((issue) => {
        const fieldMap: Record<string, string> = {
          customerName: "Nama lengkap",
          customerPhone: "Nomor telepon",
          customerEmail: "Email",
          businessName: "Nama bisnis",
          productCategory: "Kategori produk",
          packageId: "Paket",
          hostId: "Host",
          studioId: "Studio",
          studioSlotId: "Slot waktu",
          date: "Tanggal",
          startTime: "Waktu mulai",
          endTime: "Waktu selesai",
        }

        const fieldName = issue.path.join(".")
        const prettyFieldName = fieldMap[fieldName] || fieldName
        return `${prettyFieldName}: ${issue.message}`
      })

      return NextResponse.json(
        {
          success: false,
          error: "Validasi gagal. Mohon perbaiki kesalahan berikut:",
          details: errorMessages,
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { success: false, error: "Gagal membuat booking. Silakan coba lagi." },
      { status: 500 },
    )
  }
}
