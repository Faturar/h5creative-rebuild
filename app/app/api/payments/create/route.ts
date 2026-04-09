import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import midtransClient from "midtrans-client"

const paymentSchema = z.object({
  bookingId: z.string().uuid(),
})

// Initialize Midtrans Snap
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { bookingId } = paymentSchema.parse(body)

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        package: true,
        host: true,
        studio: true,
      },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 },
      )
    }

    // Check if payment already exists
    const existingPayment = await prisma.payment.findFirst({
      where: {
        bookingId,
        status: { not: "FAILED" },
      },
    })

    if (existingPayment) {
      return NextResponse.json(
        { success: false, error: "Payment already initiated" },
        { status: 400 },
      )
    }

    // Create Midtrans transaction
    const transactionDetails = {
      transaction_details: {
        order_id: booking.bookingCode,
        gross_amount: Number(booking.price),
      },
      customer_details: {
        first_name: booking.customerName,
        email: booking.customerEmail,
        phone: booking.customerPhone,
      },
      item_details: [
        {
          id: booking.packageId,
          price: Number(booking.price),
          quantity: 1,
          name: `${booking.package.name} - ${booking.host.name}`,
        },
      ],
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?order_id=${booking.bookingCode}`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/booking/failed?order_id=${booking.bookingCode}`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/booking/pending?order_id=${booking.bookingCode}`,
      },
    }

    const transaction = await snap.createTransaction(transactionDetails)

    // Save payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        paymentGateway: "midtrans",
        transactionId: transaction.token,
        amount: booking.price,
        status: "PENDING",
        rawResponse: JSON.stringify(transaction),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        paymentId: payment.id,
        token: transaction.token,
        redirectUrl: transaction.redirect_url,
      },
    })
  } catch (error) {
    console.error("Failed to create payment:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { success: false, error: "Failed to create payment" },
      { status: 500 },
    )
  }
}
