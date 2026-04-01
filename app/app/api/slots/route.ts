import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { addDays, format, startOfDay, endOfDay } from "date-fns"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studioId = searchParams.get("studioId")
  const date = searchParams.get("date")

  try {
    // If no date provided, return slots for today and next 7 days
    if (!date) {
      const today = startOfDay(new Date())
      const dates = []
      for (let i = 0; i < 7; i++) {
        dates.push(addDays(today, i))
      }

      const allSlots = await prisma.studioSlot.findMany({
        where: {
          studioId: studioId || undefined,
          date: {
            gte: dates[0],
            lte: dates[dates.length - 1],
          },
          isBooked: false,
        },
        orderBy: { date: "asc" },
      })

      return NextResponse.json({ success: true, data: allSlots })
    }

    // Parse the date and set time boundaries for proper comparison
    const selectedDate = new Date(date)
    const startDate = startOfDay(selectedDate)
    const endDate = endOfDay(selectedDate)

    const slots = await prisma.studioSlot.findMany({
      where: {
        studioId: studioId || undefined,
        date: {
          gte: startDate,
          lte: endDate,
        },
        isBooked: false,
      },
      orderBy: { startTime: "asc" },
    })

    return NextResponse.json({ success: true, data: slots })
  } catch (error) {
    console.error("Failed to fetch slots:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch slots" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { studioId, date, startTime, endTime } = body

    // Check if slot already exists
    const existingSlot = await prisma.studioSlot.findFirst({
      where: {
        studioId,
        date: new Date(date),
        startTime,
      },
    })

    if (existingSlot) {
      return NextResponse.json(
        { success: false, error: "Slot already exists" },
        { status: 400 },
      )
    }

    const newSlot = await prisma.studioSlot.create({
      data: {
        studioId,
        date: new Date(date),
        startTime,
        endTime,
      },
    })

    return NextResponse.json({ success: true, data: newSlot }, { status: 201 })
  } catch (error) {
    console.error("Failed to create slot:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create slot" },
      { status: 500 },
    )
  }
}
