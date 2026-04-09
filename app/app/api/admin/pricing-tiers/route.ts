import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const tiers = await prisma.pricingTier.findMany({
      orderBy: [{ deviceType: "asc" }, { minHours: "asc" }],
    })

    return NextResponse.json({ success: true, data: tiers })
  } catch (error) {
    console.error("Failed to fetch pricing tiers:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch pricing tiers" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { deviceType, minHours, maxHours, pricePerHour, isActive } = body

    if (!deviceType || minHours === undefined || !pricePerHour) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      )
    }

    const newTier = await prisma.pricingTier.create({
      data: {
        deviceType,
        minHours,
        maxHours,
        pricePerHour,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json({ success: true, data: newTier }, { status: 201 })
  } catch (error) {
    console.error("Failed to create pricing tier:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create pricing tier" },
      { status: 500 },
    )
  }
}
