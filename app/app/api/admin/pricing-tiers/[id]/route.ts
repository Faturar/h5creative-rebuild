import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { deviceType, minHours, maxHours, pricePerHour, isActive } = body

    const updatedTier = await prisma.pricingTier.update({
      where: { id },
      data: {
        deviceType,
        minHours,
        maxHours,
        pricePerHour,
        isActive,
      },
    })

    return NextResponse.json({ success: true, data: updatedTier })
  } catch (error) {
    console.error("Failed to update pricing tier:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update pricing tier" },
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
    await prisma.pricingTier.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Pricing tier deleted successfully",
    })
  } catch (error) {
    console.error("Failed to delete pricing tier:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete pricing tier" },
      { status: 500 },
    )
  }
}
