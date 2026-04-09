import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action, notes } = body

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 },
      )
    }

    const existingRequest = await prisma.customSlotRequest.findUnique({
      where: { id },
    })

    if (!existingRequest) {
      return NextResponse.json(
        { success: false, error: "Custom slot request not found" },
        { status: 404 },
      )
    }

    if (existingRequest.status !== "PENDING") {
      return NextResponse.json(
        { success: false, error: "Request already processed" },
        { status: 400 },
      )
    }

    if (action === "reject") {
      const updatedRequest = await prisma.customSlotRequest.update({
        where: { id },
        data: {
          status: "REJECTED",
          adminNotes: notes,
        },
      })

      const serializedRequest = {
        ...updatedRequest,
        date: updatedRequest.date.toISOString(),
        createdAt: updatedRequest.createdAt.toISOString(),
      }

      return NextResponse.json({ success: true, data: serializedRequest })
    }

    if (action === "approve") {
      const existingSlot = await prisma.studioSlot.findFirst({
        where: {
          studioId: existingRequest.studioId,
          date: existingRequest.date,
          startTime: existingRequest.startTime,
        },
      })

      if (existingSlot) {
        return NextResponse.json(
          { success: false, error: "Slot already exists for this time" },
          { status: 400 },
        )
      }

      const newSlot = await prisma.studioSlot.create({
        data: {
          studioId: existingRequest.studioId,
          date: existingRequest.date,
          startTime: existingRequest.startTime,
          endTime: existingRequest.endTime,
        },
        include: {
          studio: {
            select: {
              name: true,
              location: true,
            },
          },
        },
      })

      const updatedRequest = await prisma.customSlotRequest.update({
        where: { id },
        data: {
          status: "APPROVED",
          adminNotes: notes,
          studioSlotId: newSlot.id,
        },
      })

      const serializedRequest = {
        ...updatedRequest,
        date: updatedRequest.date.toISOString(),
        createdAt: updatedRequest.createdAt.toISOString(),
      }

      const serializedSlot = {
        ...newSlot,
        date: newSlot.date.toISOString(),
        createdAt: newSlot.createdAt.toISOString(),
      }

      return NextResponse.json({
        success: true,
        data: { request: serializedRequest, slot: serializedSlot },
      })
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 },
    )
  } catch (error) {
    console.error("Failed to process custom slot request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process custom slot request" },
      { status: 500 },
    )
  }
}
