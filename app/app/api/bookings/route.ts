import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { Prisma } from "@prisma/client"

type BookingStatus =
  | "PENDING"
  | "PAID"
  | "CANCELLED"
  | "COMPLETED"
  | "IN_PROGRESS"
  | "FINISHED"

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
  customerEmail: z.string().email(),
  businessName: z.string().min(2),
  productCategory: z.string().min(2),
  notes: z.string().optional(),
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

    // Get package price
    const packageData = await prisma.package.findUnique({
      where: { id: validatedData.packageId },
    })

    if (!packageData) {
      return NextResponse.json(
        { success: false, error: "Package not found" },
        { status: 404 },
      )
    }

    const price = packageData.promoPrice || packageData.price

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
            price,
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

    return NextResponse.json({ success: true, data: booking }, { status: 201 })
  } catch (error) {
    console.error("Failed to create booking:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 },
    )
  }
}
