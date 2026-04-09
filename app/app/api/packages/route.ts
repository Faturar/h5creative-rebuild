import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const packageType = searchParams.get("packageType")

    const packages = await prisma.package.findMany({
      where: {
        isActive: true,
        ...(packageType && { packageType }),
      },
      include: {
        packageHosts: {
          include: { host: true },
        },
      },
      orderBy: { price: "asc" },
    })

    return NextResponse.json({ success: true, data: packages })
  } catch (error) {
    console.error("Failed to fetch packages:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch packages" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      packageType,
      description,
      price,
      promoPrice,
      totalHours,
      numberOfDays,
      durationPerSession,
      workTimeStart,
      workTimeEnd,
      workDays,
      hostCount,
      twibbonDesignCount,
      weeklyReport,
      accountReport,
      includesHost,
      includesStudio,
      includesDevice,
    } = body

    const newPackage = await prisma.package.create({
      data: {
        name,
        packageType,
        description,
        price,
        promoPrice,
        totalHours,
        numberOfDays,
        durationPerSession,
        workTimeStart,
        workTimeEnd,
        workDays,
        hostCount,
        twibbonDesignCount,
        weeklyReport,
        accountReport,
        includesHost,
        includesStudio,
        includesDevice,
      },
    })

    return NextResponse.json(
      { success: true, data: newPackage },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to create package:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create package" },
      { status: 500 },
    )
  }
}
