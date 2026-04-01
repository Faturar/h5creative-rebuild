import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import midtransClient from "midtrans-client"

type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED"
type BookingStatus =
  | "PENDING"
  | "PAID"
  | "CANCELLED"
  | "COMPLETED"
  | "IN_PROGRESS"
  | "FINISHED"

// Initialize Midtrans Core API for signature verification
const coreApi = new midtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      order_id,
      transaction_status,
      fraud_status,
      gross_amount,
      payment_type,
    } = body

    // Verify signature
    const signatureKey = crypto
      .createHash("sha512")
      .update(`${order_id}${gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
      .digest("hex")

    if (body.signature_key !== signatureKey) {
      console.error("Invalid signature")
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 },
      )
    }

    // Find booking by booking code
    const booking = await prisma.booking.findUnique({
      where: { bookingCode: order_id },
      include: { payments: true },
    })

    if (!booking) {
      console.error("Booking not found:", order_id)
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 },
      )
    }

    // Find payment record
    const payment = await prisma.payment.findFirst({
      where: { bookingId: booking.id },
    })

    if (!payment) {
      console.error("Payment not found for booking:", booking.id)
      return NextResponse.json(
        { success: false, error: "Payment not found" },
        { status: 404 },
      )
    }

    // Update payment and booking status based on transaction status
    let paymentStatus = "PENDING"
    let bookingStatus = "PENDING"

    if (transaction_status === "capture") {
      if (fraud_status === "challenge") {
        paymentStatus = "PENDING"
      } else if (fraud_status === "accept") {
        paymentStatus = "SUCCESS"
        bookingStatus = "PAID"
      }
    } else if (transaction_status === "settlement") {
      paymentStatus = "SUCCESS"
      bookingStatus = "PAID"
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      paymentStatus = transaction_status === "expire" ? "EXPIRED" : "FAILED"
      bookingStatus = "CANCELLED"

      // Release the studio slot
      await prisma.studioSlot.update({
        where: { id: booking.studioSlotId },
        data: { isBooked: false },
      })
    } else if (transaction_status === "pending") {
      paymentStatus = "PENDING"
      bookingStatus = "PENDING"
    }

    // Update payment
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: paymentStatus as PaymentStatus,
        paidAt: paymentStatus === "SUCCESS" ? new Date() : null,
        rawResponse: JSON.stringify(body),
      },
    })

    // Update booking
    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: bookingStatus as BookingStatus },
    })

    console.log(`Payment ${payment.id} updated to ${paymentStatus}`)
    console.log(`Booking ${booking.id} updated to ${bookingStatus}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { success: false, error: "Webhook processing failed" },
      { status: 500 },
    )
  }
}
