import { NextResponse } from "next/server"
import { getSession, requireAuth } from "@/lib/auth"

export async function proxy(request: Request) {
  const { pathname } = new URL(request.url)

  const publicPaths = [
    "/login",
    "/api/auth/login",
    "/api/bookings",
    "/api/packages",
    "/api/hosts",
    "/api/studios",
    "/api/slots",
    "/api/payments",
  ]
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  if (isPublicPath) {
    return NextResponse.next()
  }

  const isAdminPath = pathname.startsWith("/admin")

  if (isAdminPath) {
    try {
      const session = await requireAuth()

      if (session.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}
