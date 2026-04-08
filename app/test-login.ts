import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🔍 Testing admin user login...")

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

  console.log("✅ User found:")
  console.log(`   Email: ${user.email}`)
  console.log(`   Name: ${user.name}`)
  console.log(`   Role: ${user.role}`)

  const isValid = await bcrypt.compare("admin123", user.password)
  console.log(`   Password valid: ${isValid}`)
}

main()
  .catch((e) => {
    console.error("❌ Error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
