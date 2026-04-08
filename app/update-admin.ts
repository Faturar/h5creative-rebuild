import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🔄 Updating admin user credentials...")

  const existingUser = await prisma.user.findFirst({
    where: { role: "ADMIN" }
  })

  if (existingUser) {
    await prisma.user.delete({
      where: { id: existingUser.id }
    })
    console.log("   Deleted existing admin user")
  }

  const adminPassword = await bcrypt.hash("admin123", 10)

  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      name: "H5 Admin",
      password: adminPassword,
      role: "ADMIN",
      isActive: true,
    },
  })

  console.log("✅ Admin user updated successfully!")
  console.log("   Email: admin@gmail.com")
  console.log("   Password: admin123")
}

main()
  .catch((e) => {
    console.error("❌ Error updating admin user:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
