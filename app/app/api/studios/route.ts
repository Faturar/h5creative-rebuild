import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const studios = await prisma.studio.findMany({
      where: {
        isActive: true,
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json({ success: true, data: studios })
  } catch (error) {
    console.error("Failed to fetch studios:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch studios" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      location,
      description,
      photoUrl,
      capacity,
      equipment,
      amenities,
    } = body

    const newStudio = await prisma.studio.create({
      data: {
        name,
        location,
        description,
        photoUrl,
        capacity,
        equipment,
        amenities,
      },
    })

    return NextResponse.json(
      { success: true, data: newStudio },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to create studio:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create studio" },
      { status: 500 },
    )
  }
}
