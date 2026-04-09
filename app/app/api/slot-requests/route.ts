import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const where = status ? { status: status as "PENDING" | "APPROVED" | "REJECTED" } : {}

    const requests = await prisma.customSlotRequest.findMany({
      where,
      include: {
        studio: {
          select: {
            name: true,
            location: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    const serializedRequests = requests.map((req) => ({
      ...req,
      date: req.date.toISOString(),
      createdAt: req.createdAt.toISOString(),
    }))

    return NextResponse.json({ success: true, data: serializedRequests })
  } catch (error) {
    console.error("Failed to fetch custom slot requests:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch custom slot requests" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { studioId, date, startTime, endTime, customerName, customerPhone, customerEmail, notes } = body

    if (!studioId || !date || !startTime || !endTime || !customerName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      )
    }

    const customSlotRequest = await prisma.customSlotRequest.create({
      data: {
        studioId,
        date: new Date(date),
        startTime,
        endTime,
        customerName,
        customerPhone,
        customerEmail,
        notes,
        status: "PENDING",
      },
    })

    const serializedRequest = {
      ...customSlotRequest,
      date: customSlotRequest.date.toISOString(),
      createdAt: customSlotRequest.createdAt.toISOString(),
    }

    return NextResponse.json({ success: true, data: serializedRequest }, { status: 201 })
  } catch (error) {
    console.error("Failed to create custom slot request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create custom slot request" },
      { status: 500 },
    )
  }
}
