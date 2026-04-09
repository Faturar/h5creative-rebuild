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
        include: {
          studio: {
            select: {
              name: true,
              location: true,
            },
          },
        },
      })

      const serializedSlots = allSlots.map((slot) => ({
        ...slot,
        date: slot.date.toISOString(),
        createdAt: slot.createdAt.toISOString(),
      }))

      return NextResponse.json({ success: true, data: serializedSlots })
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
        include: {
          studio: {
            select: {
              name: true,
              location: true,
            },
          },
        },
      })

    const serializedSlots = slots.map((slot) => ({
        ...slot,
        date: slot.date.toISOString(),
        createdAt: slot.createdAt.toISOString(),
      }))

      return NextResponse.json({ success: true, data: serializedSlots })
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

    if (!studioId || !date || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      )
    }

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
      include: {
        studio: {
          select: {
            name: true,
            location: true,
          },
        },
      },
    })

    const serializedSlot = {
      ...newSlot,
      date: newSlot.date.toISOString(),
      createdAt: newSlot.createdAt.toISOString(),
    }

    return NextResponse.json({ success: true, data: serializedSlot }, { status: 201 })
  } catch (error) {
    console.error("Failed to create slot:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create slot" },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Slot ID is required" },
        { status: 400 },
      )
    }

    const body = await request.json()
    const { studioId, date, startTime, endTime, isBooked } = body

    const existingSlot = await prisma.studioSlot.findUnique({
      where: { id },
    })

    if (!existingSlot) {
      return NextResponse.json(
        { success: false, error: "Slot not found" },
        { status: 404 },
      )
    }

    if (existingSlot.isBooked && (startTime || endTime || date)) {
      return NextResponse.json(
        { success: false, error: "Cannot modify booked slot time" },
        { status: 400 },
      )
    }

    const updatedSlot = await prisma.studioSlot.update({
      where: { id },
      data: {
        studioId: studioId ?? existingSlot.studioId,
        date: date ? new Date(date) : existingSlot.date,
        startTime: startTime ?? existingSlot.startTime,
        endTime: endTime ?? existingSlot.endTime,
        isBooked: isBooked ?? existingSlot.isBooked,
      },
      include: {
        studio: {
          select: {
            name: true,
            location: true,
          },
        },
      },
    })

    const serializedSlot = {
      ...updatedSlot,
      date: updatedSlot.date.toISOString(),
      createdAt: updatedSlot.createdAt.toISOString(),
    }

    return NextResponse.json({ success: true, data: serializedSlot })
  } catch (error) {
    console.error("Failed to update slot:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update slot" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Slot ID is required" },
        { status: 400 },
      )
    }

    const existingSlot = await prisma.studioSlot.findUnique({
      where: { id },
    })

    if (!existingSlot) {
      return NextResponse.json(
        { success: false, error: "Slot not found" },
        { status: 404 },
      )
    }

    if (existingSlot.isBooked) {
      return NextResponse.json(
        { success: false, error: "Cannot delete booked slot" },
        { status: 400 },
      )
    }

    await prisma.studioSlot.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: "Slot deleted successfully" })
  } catch (error) {
    console.error("Failed to delete slot:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete slot" },
      { status: 500 },
    )
  }
}
