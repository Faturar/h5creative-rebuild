import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const surcharges = await prisma.timeSurcharge.findMany({
      orderBy: { startTime: "asc" },
    })

    return NextResponse.json({ success: true, data: surcharges })
  } catch (error) {
    console.error("Failed to fetch time surcharges:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch time surcharges" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { startTime, endTime, surcharge, description, isActive } = body

    if (!startTime || !endTime || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      )
    }

    const newSurcharge = await prisma.timeSurcharge.create({
      data: {
        startTime,
        endTime,
        surcharge,
        description,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(
      { success: true, data: newSurcharge },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to create time surcharge:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create time surcharge" },
      { status: 500 },
    )
  }
}
