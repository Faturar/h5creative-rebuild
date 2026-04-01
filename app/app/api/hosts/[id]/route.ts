import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const host = await prisma.host.findUnique({
      where: { id: params.id },
      include: {
        packageHosts: {
          include: { package: true },
        },
      },
    })

    if (!host) {
      return NextResponse.json(
        { success: false, error: "Host not found" },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, data: host })
  } catch (error) {
    console.error("Failed to fetch host:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch host" },
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
      bio,
      photoUrl,
      portfolioUrl,
      expertise,
      rating,
      totalStreams,
      languages,
      socialMediaLinks,
      isActive,
    } = body

    const updatedHost = await prisma.host.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(bio && { bio }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(portfolioUrl !== undefined && { portfolioUrl }),
        ...(expertise && { expertise }),
        ...(rating && { rating }),
        ...(totalStreams !== undefined && { totalStreams }),
        ...(languages && { languages }),
        ...(socialMediaLinks !== undefined && { socialMediaLinks }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json({ success: true, data: updatedHost })
  } catch (error) {
    console.error("Failed to update host:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update host" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.host.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: "Host deleted successfully",
    })
  } catch (error) {
    console.error("Failed to delete host:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete host" },
      { status: 500 },
    )
  }
}
