import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      )
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
        },
        { status: 400 },
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 5MB limit" },
        { status: 400 },
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "studios")
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = path.extname(file.name)
    const filename = `studio-${timestamp}-${randomString}${extension}`

    // Write file to disk
    const filepath = path.join(uploadsDir, filename)
    await writeFile(filepath, buffer)

    // Return the URL path
    const imageUrl = `/uploads/studios/${filename}`

    return NextResponse.json({
      success: true,
      data: { imageUrl },
    })
  } catch (error) {
    console.error("Failed to upload file:", error)
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 },
    )
  }
}
