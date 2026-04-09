import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { startTime, endTime, surcharge, description, isActive } = body

    const updatedSurcharge = await prisma.timeSurcharge.update({
      where: { id },
      data: {
        startTime,
        endTime,
        surcharge,
        description,
        isActive,
      },
    })

    return NextResponse.json({ success: true, data: updatedSurcharge })
  } catch (error) {
    console.error("Failed to update time surcharge:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update time surcharge" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    await prisma.timeSurcharge.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Time surcharge deleted successfully",
    })
  } catch (error) {
    console.error("Failed to delete time surcharge:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete time surcharge" },
      { status: 500 },
    )
  }
}
