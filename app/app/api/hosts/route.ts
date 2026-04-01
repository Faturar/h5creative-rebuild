import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const expertise = searchParams.get("expertise")
    const packageId = searchParams.get("packageId")

    const hosts = await prisma.host.findMany({
      where: {
        isActive: true,
        ...(expertise && { expertise }),
        ...(packageId && {
          packageHosts: {
            some: { packageId },
          },
        }),
      },
      orderBy: { rating: "desc" },
    })

    return NextResponse.json({ success: true, data: hosts })
  } catch (error) {
    console.error("Failed to fetch hosts:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch hosts" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
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
    } = body

    const newHost = await prisma.host.create({
      data: {
        name,
        bio,
        photoUrl,
        portfolioUrl,
        expertise,
        rating,
        totalStreams,
        languages,
        socialMediaLinks,
      },
    })

    return NextResponse.json({ success: true, data: newHost }, { status: 201 })
  } catch (error) {
    console.error("Failed to create host:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create host" },
      { status: 500 },
    )
  }
}
