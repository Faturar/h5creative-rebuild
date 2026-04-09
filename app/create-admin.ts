import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("👤 Creating admin user...")

  const existingUser = await prisma.user.findUnique({
    where: { email: "admin@h5creative.id" }
  })

  if (existingUser) {
    console.log("⚠️  Admin user already exists")
    return
  }

  const adminPassword = await bcrypt.hash("admin123", 10)

  await prisma.user.create({
    data: {
      email: "admin@h5creative.id",
      name: "H5 Admin",
      password: adminPassword,
      role: "ADMIN",
      isActive: true,
    },
  })

  console.log("✅ Admin user created successfully!")
  console.log("   Email: admin@h5creative.id")
  console.log("   Password: admin123")
}

main()
  .catch((e) => {
    console.error("❌ Error creating admin user:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
