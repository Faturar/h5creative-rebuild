import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🔍 Testing login flow end-to-end...")

  const user = await prisma.user.findFirst({
    where: {
      email: "admin@gmail.com",
      isActive: true,
    },
  })

  if (!user) {
    console.log("❌ User not found")
    process.exit(1)
  }

  console.log("✅ User found:", user.email)
  console.log("   Password hash (first 50 chars):", user.password.substring(0, 50))

  const isValid = await bcrypt.compare("admin123", user.password)
  console.log("   Password match:", isValid)

  if (!isValid) {
    console.log("❌ Password does not match")
    process.exit(1)
  }

  console.log("✅ Login successful!")
}

main()
  .catch((e) => {
    console.error("❌ Error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
