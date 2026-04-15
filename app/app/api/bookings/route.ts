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
  packageId: z.string().uuid().nullable().optional(),
  hostId: z.string().uuid(),
  studioId: z.string().uuid(),
  studioSlotId: z.string().uuid().nullable().optional(),
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
  totalHours: z.number().min(0).nullable().optional(),
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

    // Get package data only if packageId is provided
    let packageData = null
    if (validatedData.packageId) {
      packageData = await prisma.package.findUnique({
        where: { id: validatedData.packageId },
      })

      if (!packageData) {
        return NextResponse.json(
          { success: false, error: "Package not found" },
          { status: 404 },
        )
      }
    }

    // For custom bookings, deviceType and totalHours are required
    if (!packageData && (!validatedData.deviceType || !validatedData.totalHours)) {
      return NextResponse.json(
        {
          success: false,
          error: "Device type and total hours are required for custom bookings",
        },
        { status: 400 },
      )
    }

    // Validate minimum purchase requirements
    const bookingType = (packageData?.bookingType as "custom" | "package") || "custom"
    const numberOfDays = packageData?.numberOfDays || (validatedData.totalHours ? Math.ceil(validatedData.totalHours / 2) : 0)

    const validation = validateMinimumDays(bookingType, numberOfDays)
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validasi gagal",
          details: [validation.message || "Mohon cek kembali pilihan paket atau jumlah jam Anda."],
        },
        { status: 400 },
      )
    }

    // Calculate dynamic pricing if device type and total hours are provided
    let price = packageData ? Number(packageData.promoPrice || packageData.price) : 0
    let basePrice = price
    let surcharge = 0
    let finalPrice = price
    let pricingTierId: string | null = null
    let totalHours = validatedData.totalHours || packageData?.totalHours || 0

    // Calculate pricing for custom bookings or if device type and time slots are provided
    if (
      (!packageData || packageData === null) &&
      validatedData.deviceType &&
      validatedData.totalHours &&
      validatedData.timeSlots &&
      validatedData.timeSlots.length > 0
    ) {
      try {
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
      } catch (pricingError) {
        console.error("Failed to calculate pricing:", pricingError)
        // Use default values if pricing calculation fails
        basePrice = 0
        surcharge = 0
        finalPrice = 0
        totalHours = validatedData.totalHours || 0
      }
    }

    // Create booking
    const booking = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // Check if studio slot is already booked
        if (validatedData.studioSlotId) {
          const existingBooking = await tx.booking.findUnique({
            where: { studioSlotId: validatedData.studioSlotId },
          })

          if (existingBooking) {
            throw new Error("Slot waktu ini sudah dipesan. Silakan pilih slot lain.")
          }
        }

        // Update studio slot as booked only if it's a preset slot
        if (validatedData.studioSlotId) {
          await tx.studioSlot.update({
            where: { id: validatedData.studioSlotId },
            data: { isBooked: true },
          })
        }

        // Create booking
        const newBooking = await tx.booking.create({
          data: {
            bookingCode,
            ...(validatedData.packageId && { packageId: validatedData.packageId }),
            hostId: validatedData.hostId,
            studioId: validatedData.studioId,
            ...(validatedData.studioSlotId && { studioSlotId: validatedData.studioSlotId }),
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
            ...(validatedData.studioSlotId && { studioSlot: true }),
          },
        })

        return newBooking
      },
    )

    try {
      await sendBookingConfirmationEmail({
        to: booking.customerEmail,
        customerName: booking.customerName,
        bookingCode: booking.bookingCode,
        packageName: booking.package?.name || "Custom Jam",
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
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Continue even if email fails - booking was created successfully
    }

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

    // Handle Prisma unique constraint errors
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = (error.meta?.target as string[]) || []
      if (target.includes("studioSlotId")) {
        return NextResponse.json(
          {
            success: false,
            error: "Slot waktu ini sudah dipesan. Silakan pilih slot waktu yang lain.",
          },
          { status: 409 },
        )
      }
    }

    // Handle custom booking errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Gagal membuat booking. Silakan coba lagi.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
