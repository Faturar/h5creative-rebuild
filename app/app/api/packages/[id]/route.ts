import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const pkg = await prisma.package.findUnique({
      where: { id },
      include: {
        packageHosts: {
          include: { host: true },
        },
      },
    })

    if (!pkg) {
      return NextResponse.json(
        { success: false, error: "Package not found" },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, data: pkg })
  } catch (error) {
    console.error("Failed to fetch package:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch package" },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      name,
      description,
      price,
      promoPrice,
      durationMinutes,
      platform,
      includesHost,
      includesStudio,
      includesDevice,
      isActive,
    } = body

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price }),
        ...(promoPrice !== undefined && { promoPrice }),
        ...(durationMinutes && { durationMinutes }),
        ...(platform && { platform }),
        ...(includesHost !== undefined && { includesHost }),
        ...(includesStudio !== undefined && { includesStudio }),
        ...(includesDevice !== undefined && { includesDevice }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json({ success: true, data: updatedPackage })
  } catch (error) {
    console.error("Failed to update package:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update package" },
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
    await prisma.package.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully",
    })
  } catch (error) {
    console.error("Failed to delete package:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete package" },
      { status: 500 },
    )
  }
}
