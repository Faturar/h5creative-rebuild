import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyCredentials, createToken } from "@/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("=== LOGIN ATTEMPT ===")
    console.log("Email:", body.email)

    const validatedData = loginSchema.parse(body)
    console.log("Validation passed")

    const user = await verifyCredentials(validatedData.email, validatedData.password)
    console.log("User verification:", user ? "found" : "not found")

    if (!user) {
      console.log("Returning 401 - Invalid credentials")
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      )
    }

    console.log("User ID:", user.id)

    const token = createToken(user)
    console.log("Token generated")

    const cookieStore = await cookies()
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    console.log("Cookie set")

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    })
  } catch (error: any) {
    console.error("=== LOGIN ERROR ===")
    console.error("Error type:", error.constructor.name)
    console.error("Error message:", error.message)
    console.error("Full error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: "Login failed", details: error.message },
      { status: 500 }
    )
  }
}
