import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production"

export interface SessionUser {
  id: string
  email: string
  name: string
  role: string
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")

    if (!token?.value) {
      return null
    }

    const decoded = jwt.verify(token.value, JWT_SECRET) as SessionUser
    return decoded
  } catch (error) {
    return null
  }
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<SessionUser | null> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      isActive: true,
    },
  })

  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return null
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  })

  const sessionUser: SessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }

  return sessionUser
}

export function createToken(user: SessionUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" })
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession()

  if (!session) {
    throw new Error("Unauthorized")
  }

  return session
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireAuth()

  if (session.role !== "ADMIN") {
    throw new Error("Forbidden - Admin access required")
  }

  return session
}
