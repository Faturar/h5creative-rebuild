import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const studio = await prisma.studio.findUnique({
      where: { id: params.id },
      include: {
        studioSlots: {
          where: {
            date: {
              gte: new Date(),
            },
          },
          orderBy: {
            date: "asc",
          },
          take: 50,
        },
      },
    })

    if (!studio) {
      return NextResponse.json(
        { success: false, error: "Studio not found" },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, data: studio })
  } catch (error) {
    console.error("Failed to fetch studio:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch studio" },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
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
      isActive,
    } = body

    const updatedStudio = await prisma.studio.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(location && { location }),
        ...(description && { description }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(capacity !== undefined && { capacity }),
        ...(equipment !== undefined && { equipment }),
        ...(amenities !== undefined && { amenities }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json({ success: true, data: updatedStudio })
  } catch (error) {
    console.error("Failed to update studio:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update studio" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.studio.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: "Studio deleted successfully",
    })
  } catch (error) {
    console.error("Failed to delete studio:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete studio" },
      { status: 500 },
    )
  }
}
