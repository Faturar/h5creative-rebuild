import { NextResponse } from "next/server"
import { calculateTotalPrice, TimeSlot } from "@/lib/pricing"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { deviceType, totalHours, timeSlots } = body

    // Validate required fields
    if (!deviceType || !totalHours || !timeSlots) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: deviceType, totalHours, timeSlots",
        },
        { status: 400 },
      )
    }

    // Validate device type
    if (deviceType !== "iPhone" && deviceType !== "Camera+OBS") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid device type. Must be 'iPhone' or 'Camera+OBS'",
        },
        { status: 400 },
      )
    }

    // Validate total hours
    if (totalHours <= 0) {
      return NextResponse.json(
        { success: false, error: "Total hours must be greater than 0" },
        { status: 400 },
      )
    }

    // Validate time slots
    if (!Array.isArray(timeSlots) || timeSlots.length === 0) {
      return NextResponse.json(
        { success: false, error: "Time slots must be a non-empty array" },
        { status: 400 },
      )
    }

    // Validate each time slot
    for (const slot of timeSlots) {
      if (!slot.startTime || !slot.endTime || !slot.date) {
        return NextResponse.json(
          {
            success: false,
            error: "Each time slot must have startTime, endTime, and date",
          },
          { status: 400 },
        )
      }
    }

    // Calculate pricing
    const pricingBreakdown = await calculateTotalPrice(
      deviceType,
      totalHours,
      timeSlots,
    )

    return NextResponse.json({
      success: true,
      data: pricingBreakdown,
    })
  } catch (error) {
    console.error("Failed to calculate pricing:", error)
    return NextResponse.json(
      { success: false, error: "Failed to calculate pricing" },
      { status: 500 },
    )
  }
}
