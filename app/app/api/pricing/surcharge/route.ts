import { NextResponse } from "next/server"
import { getTimeSurcharges, calculateTimeSlotSurcharge } from "@/lib/pricing"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { startTime, endTime } = body

    // Validate required fields
    if (!startTime || !endTime) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: startTime, endTime",
        },
        { status: 400 },
      )
    }

    // Get time surcharges
    const surcharges = await getTimeSurcharges()

    // Calculate surcharge for the slot
    const surcharge = calculateTimeSlotSurcharge(startTime, endTime, surcharges)

    if (surcharge > 0) {
      // Find which surcharge applies
      const parseTime = (time: string): number => {
        const [hours, minutes] = time.split(":").map(Number)
        return hours * 60 + minutes
      }

      const startMinutes = parseTime(startTime)
      const applicableSurcharge = surcharges.find((s) => {
        const surchargeStart = parseTime(s.startTime)
        const surchargeEnd = parseTime(s.endTime)

        if (surchargeStart > surchargeEnd) {
          return startMinutes >= surchargeStart || startMinutes < surchargeEnd
        } else {
          return startMinutes >= surchargeStart && startMinutes < surchargeEnd
        }
      })

      return NextResponse.json({
        success: true,
        data: {
          hasSurcharge: true,
          amount: surcharge,
          description: applicableSurcharge?.description || "Surcharge",
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        hasSurcharge: false,
        amount: 0,
        description: "Normal operational hours",
      },
    })
  } catch (error) {
    console.error("Failed to get surcharge info:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get surcharge info" },
      { status: 500 },
    )
  }
}
