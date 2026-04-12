import { PrismaClient, Prisma } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import bcrypt from "bcryptjs"

// Use the shared Prisma client with logging
const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
})

// Helper function to handle Decimal conversion
function toDecimal(value: number): Decimal {
  return new Decimal(value)
}

// Helper function to check if data exists
async function dataExists() {
  const packageCount = await prisma.package.count()
  return packageCount > 0
}

// Helper function to clean existing data (optional)
async function cleanDatabase() {
  console.log("🧹 Cleaning existing data...")

  // Delete in correct order due to foreign key constraints
  await prisma.payment.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.studioSlot.deleteMany()
  await prisma.packageHost.deleteMany()
  await prisma.host.deleteMany()
  await prisma.studio.deleteMany()
  await prisma.package.deleteMany()

  console.log("✅ Database cleaned")
}

async function main() {
  console.log("🌱 Starting seed...")
  console.log(
    "📊 Database URL:",
    process.env.DATABASE_URL ? "✅ Set" : "❌ Not set",
  )

  try {
    const now = new Date()
    const promoEndDate = new Date('2026-04-12T23:59:59.000Z')
    const promoStartDate = new Date(now)
    promoStartDate.setHours(0, 0, 0, 0)

    // Use a transaction for atomic operations
    await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
      console.log("\n📦 Creating packages...")

      const packages = await Promise.all([
        tx.package.create({
          data: {
            name: "Paket Starter (iPhone)",
            packageType: "iPhone",
            description: "Paket basic minimal 5 hari untuk pemula. Termasuk host profesional dan studio lengkap.",
            price: toDecimal(1625000),
            promoPrice: toDecimal(1300000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(325000),
            totalHours: 10,
            numberOfDays: 5,
            durationPerSession: 2,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Jumat",
            hostCount: 1,
            twibbonDesignCount: 0,
            weeklyReport: false,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Starter (Camera+OBS)",
            packageType: "Camera+OBS",
            description: "Paket basic minimal 5 hari dengan kamera Sony dan OBS. Kualitas video premium.",
            price: toDecimal(3000000),
            promoPrice: toDecimal(2400000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(600000),
            totalHours: 10,
            numberOfDays: 5,
            durationPerSession: 2,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Jumat",
            hostCount: 1,
            twibbonDesignCount: 0,
            weeklyReport: false,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Standard (iPhone)",
            packageType: "iPhone",
            description: "Paket standar 10 hari untuk bisnis berkembang. Termasuk weekly report dan 1 twibbon design.",
            price: toDecimal(3250000),
            promoPrice: toDecimal(2600000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(650000),
            totalHours: 20,
            numberOfDays: 10,
            durationPerSession: 2,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Sabtu",
            hostCount: 1,
            twibbonDesignCount: 1,
            weeklyReport: true,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Standard (Camera+OBS)",
            packageType: "Camera+OBS",
            description: "Paket standar 10 hari dengan kamera Sony dan OBS. Termasuk weekly report dan 1 twibbon design.",
            price: toDecimal(6000000),
            promoPrice: toDecimal(4800000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(1200000),
            totalHours: 20,
            numberOfDays: 10,
            durationPerSession: 2,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Sabtu",
            hostCount: 1,
            twibbonDesignCount: 1,
            weeklyReport: true,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Business (iPhone)",
            packageType: "iPhone",
            description: "Paket business 15 hari untuk perusahaan. Termasuk weekly report dan 1 twibbon design.",
            price: toDecimal(4875000),
            promoPrice: toDecimal(3900000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(975000),
            totalHours: 30,
            numberOfDays: 15,
            durationPerSession: 2,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Sabtu",
            hostCount: 1,
            twibbonDesignCount: 1,
            weeklyReport: true,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Business (Camera+OBS)",
            packageType: "Camera+OBS",
            description: "Paket business 15 hari dengan kamera Sony dan OBS. Termasuk weekly report dan 1 twibbon design.",
            price: toDecimal(9000000),
            promoPrice: toDecimal(7200000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(1800000),
            totalHours: 30,
            numberOfDays: 15,
            durationPerSession: 2,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Sabtu",
            hostCount: 1,
            twibbonDesignCount: 1,
            weeklyReport: true,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Premium (iPhone)",
            packageType: "iPhone",
            description: "Paket premium 20 hari untuk hasil maksimal. Termasuk 2 twibbon design dan weekly report.",
            price: toDecimal(6500000),
            promoPrice: toDecimal(5200000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(1300000),
            totalHours: 40,
            numberOfDays: 20,
            durationPerSession: 2,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Sabtu",
            hostCount: 1,
            twibbonDesignCount: 2,
            weeklyReport: true,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Premium (Camera+OBS)",
            packageType: "Camera+OBS",
            description: "Paket premium 20 hari dengan kamera Sony dan OBS. Termasuk 2 twibbon design dan weekly report.",
            price: toDecimal(12000000),
            promoPrice: toDecimal(9600000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(2400000),
            totalHours: 40,
            numberOfDays: 20,
            durationPerSession: 2,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Sabtu",
            hostCount: 1,
            twibbonDesignCount: 2,
            weeklyReport: true,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Enterprise (iPhone)",
            packageType: "iPhone",
            description: "Paket flagship 26 hari dengan live setiap hari. Termasuk weekly report dan 2 twibbon design.",
            price: toDecimal(10900000),
            promoPrice: toDecimal(8720000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(2180000),
            totalHours: 104,
            numberOfDays: 26,
            durationPerSession: 4,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Minggu",
            hostCount: 1,
            twibbonDesignCount: 2,
            weeklyReport: true,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Enterprise (Camera+OBS)",
            packageType: "Camera+OBS",
            description: "Paket flagship 26 hari dengan live setiap hari dan 1-2 host. Kualitas video premium.",
            price: toDecimal(22000000),
            promoPrice: toDecimal(17600000),
            promoTitle: "Promo Launching",
            promoStartDate: promoStartDate,
            promoEndDate: promoEndDate,
            promoDiscountType: "fixed",
            promoDiscountValue: toDecimal(4400000),
            totalHours: 156,
            numberOfDays: 26,
            durationPerSession: 6,
            workTimeStart: "09:00",
            workTimeEnd: "20:00",
            workDays: "Senin - Minggu",
            hostCount: 2,
            twibbonDesignCount: 2,
            weeklyReport: true,
            accountReport: true,
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
      ])

      console.log(`✅ Created ${packages.length} packages`)

      console.log("\n💰 Creating pricing tiers...")

      // Create Pricing Tiers for iPhone
      await tx.pricingTier.createMany({
        data: [
          { deviceType: "iPhone", minHours: 0, maxHours: 50, pricePerHour: toDecimal(65000), isActive: true },
          { deviceType: "iPhone", minHours: 51, maxHours: 70, pricePerHour: toDecimal(60000), isActive: true },
          { deviceType: "iPhone", minHours: 71, maxHours: 120, pricePerHour: toDecimal(58000), isActive: true },
          { deviceType: "iPhone", minHours: 121, maxHours: 150, pricePerHour: toDecimal(55000), isActive: true },
          { deviceType: "iPhone", minHours: 151, maxHours: null, pricePerHour: toDecimal(50000), isActive: true },
        ],
      })

      // Create Pricing Tiers for Camera+OBS
      await tx.pricingTier.createMany({
        data: [
          { deviceType: "Camera+OBS", minHours: 0, maxHours: 70, pricePerHour: toDecimal(120000), isActive: true },
          { deviceType: "Camera+OBS", minHours: 71, maxHours: 140, pricePerHour: toDecimal(115000), isActive: true },
          { deviceType: "Camera+OBS", minHours: 141, maxHours: 200, pricePerHour: toDecimal(105000), isActive: true },
          { deviceType: "Camera+OBS", minHours: 201, maxHours: null, pricePerHour: toDecimal(95000), isActive: true },
        ],
      })

      console.log("✅ Created 9 pricing tiers")

      console.log("\n👥 Creating hosts...")

      // Create Hosts
      const hosts = await Promise.all([
        tx.host.create({
          data: {
            name: "Amanda Putri",
            bio: "Host live streaming profesional dengan 3+ tahun pengalaman. Spesialisasi di fashion dan beauty dengan conversion rate tinggi.",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be1c2998cad8?w=800&h=800&fit=crop",
            portfolioUrl: "https://example.com/amanda",
            expertise: "Fashion, Beauty",
            rating: toDecimal(4.8),
            totalStreams: 250,
            languages: "Indonesian, English",
            socialMediaLinks: JSON.stringify({
              instagram: "@amandaputri_h5",
              tiktok: "@amandalive_h5",
            }),
            isActive: true,
          },
        }),
        tx.host.create({
          data: {
            name: "Dimas Pratama",
            bio: "Host energik dengan pengalaman di F&B dan electronics. Sangat interaktif dengan audiens dan mampu meningkatkan engagement.",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a8a0fa6a65?w=800&h=800&fit=crop",
            portfolioUrl: "https://example.com/dimas",
            expertise: "Food & Beverage, Electronics",
            rating: toDecimal(4.7),
            totalStreams: 180,
            languages: "Indonesian",
            socialMediaLinks: JSON.stringify({
              instagram: "@dimaspratama_h5",
              tiktok: "@dimaslive_h5",
            }),
            isActive: true,
          },
        }),
        tx.host.create({
          data: {
            name: "Rina Kusuma",
            bio: "Host profesional dengan background di beauty dan skincare. Sangat detail dalam menjelaskan produk dan memberikan edukasi.",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop",
            portfolioUrl: "https://example.com/rina",
            expertise: "Beauty, Skincare",
            rating: toDecimal(4.9),
            totalStreams: 320,
            languages: "Indonesian, English",
            socialMediaLinks: JSON.stringify({
              instagram: "@rinakusuma_h5",
              tiktok: "@rinalive_h5",
            }),
            isActive: true,
          },
        }),
        tx.host.create({
          data: {
            name: "Aditya Wijaya",
            bio: "Host tech-savvy yang jago menjelaskan produk elektronik dan gadget. Sangat informatif dan mampu menjawab pertanyaan teknis.",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5a8a0fa6a65?w=800&h=800&fit=crop",
            portfolioUrl: "https://example.com/aditya",
            expertise: "Electronics, Tech",
            rating: toDecimal(4.6),
            totalStreams: 150,
            languages: "Indonesian, English",
            socialMediaLinks: JSON.stringify({
              instagram: "@adityawijaya_h5",
              tiktok: "@adityalive_h5",
            }),
            isActive: true,
          },
        }),
        tx.host.create({
          data: {
            name: "Maya Sari",
            bio: "Host versatile yang bisa handle berbagai kategori produk. Sangat adaptif dan profesional dengan berbagai jenis brand.",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8dfe?w=800&h=800&fit=crop",
            portfolioUrl: "https://example.com/maya",
            expertise: "Fashion, Lifestyle",
            rating: toDecimal(4.7),
            totalStreams: 200,
            languages: "Indonesian",
            socialMediaLinks: JSON.stringify({
              instagram: "@mayasari_h5",
              tiktok: "@mayalive_h5",
            }),
            isActive: true,
          },
        }),
      ])

      console.log(`✅ Created ${hosts.length} hosts`)

      console.log("\n🔗 Linking hosts to packages...")

      // Link Hosts to Packages
      const packageHostLinks: Array<ReturnType<typeof tx.packageHost.create>> =
        []
      for (const pkg of packages) {
        for (const host of hosts) {
          packageHostLinks.push(
            tx.packageHost.create({
              data: {
                packageId: pkg.id,
                hostId: host.id,
              },
            }),
          )
        }
      }
      await Promise.all(packageHostLinks)
      console.log(`✅ Created ${packageHostLinks.length} host-package links`)

      console.log("\n🏢 Creating studios...")

      // Create Studios
      const studios = await Promise.all([
        tx.studio.create({
          data: {
            name: "H5 Creative - Depok (Head Office)",
            location: "Depok, Jawa Barat",
            description: "Studio utama H5 Creative dengan fasilitas lengkap untuk live streaming profesional.",
            photoUrl: null,
            capacity: 6,
            equipment: JSON.stringify([
              "OBS Software",
              "Sony Camera",
              "Professional Lighting",
              "Wireless Microphone",
              "iPhone Device",
              "Tripod",
              "Product Display Property",
            ]),
            amenities: JSON.stringify([
              "Free WiFi",
              "AC",
              "Makeup Room",
              "Waiting Area",
              "Parking",
            ]),
            isActive: true,
          },
        }),
        tx.studio.create({
          data: {
            name: "H5 Creative - Yogyakarta",
            location: "Yogyakarta",
            description: "Studio cabang Yogyakarta dengan fasilitas live streaming standar profesional.",
            photoUrl: null,
            capacity: 4,
            equipment: JSON.stringify([
              "OBS Software",
              "Sony Camera",
              "Professional Lighting",
              "Wireless Microphone",
              "iPhone Device",
              "Tripod",
            ]),
            amenities: JSON.stringify([
              "Free WiFi",
              "AC",
              "Makeup Room",
              "Parking",
            ]),
            isActive: true,
          },
        }),
      ])

      console.log(`✅ Created ${studios.length} studios`)

      console.log("\n📅 Creating studio slots for the next 7 days...")

      // Create Studio Slots for the next 7 days
      const today = new Date()
      const timeSlots = [
        { start: "09:00", end: "11:00" },
        { start: "11:00", end: "13:00" },
        { start: "13:00", end: "15:00" },
        { start: "15:00", end: "17:00" },
        { start: "17:00", end: "19:00" },
        { start: "19:00", end: "21:00" },
      ]

      const slotPromises: Array<ReturnType<typeof tx.studioSlot.create>> = []
      for (const studio of studios) {
        for (let i = 0; i < 7; i++) {
          const date = new Date(today)
          date.setDate(date.getDate() + i)
          date.setHours(0, 0, 0, 0)

          for (const slot of timeSlots) {
            slotPromises.push(
              tx.studioSlot.create({
                data: {
                  studioId: studio.id,
                  date: date,
                  startTime: slot.start,
                  endTime: slot.end,
                  isBooked: false,
                },
              }),
            )
          }
        }
      }
      await Promise.all(slotPromises)
      console.log(`✅ Created ${slotPromises.length} studio slots`)

      console.log("\n👤 Creating admin user...")

      // Create Admin User
      const adminPassword = await bcrypt.hash('admin123', 10)
      await tx.user.create({
        data: {
          email: 'admin@gmail.com',
          name: 'H5 Admin',
          password: adminPassword,
          role: 'ADMIN',
          isActive: true,
        },
      })

      console.log(`✅ Created admin user`)
      console.log(`   Email: admin@gmail.com`)
      console.log(`   Password: admin123`)
    },
    {
      maxWait: 10000,
      timeout: 60000
    })

    // Verify data was created
    const packageCount = await prisma.package.count()
    const hostCount = await prisma.host.count()
    const studioCount = await prisma.studio.count()
    const slotCount = await prisma.studioSlot.count()
    const packageHostCount = await prisma.packageHost.count()
    const userCount = await prisma.user.count()

    console.log("\n📊 Seed Summary:")
    console.log(`   📦 Packages: ${packageCount}`)
    console.log(`   👥 Hosts: ${hostCount}`)
    console.log(`   🏢 Studios: ${studioCount}`)
    console.log(`   📅 Slots: ${slotCount}`)
    console.log(`   🔗 Host-Package Links: ${packageHostCount}`)
    console.log(`   👤 Users: ${userCount}`)

    console.log("\n🎉 Seed completed successfully!")
  } catch (error) {
    console.error("\n❌ Seed failed with error:")
    console.error(error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error("\n❌ Fatal error during seed:")
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log("\n🔌 Disconnected from database")
  })
