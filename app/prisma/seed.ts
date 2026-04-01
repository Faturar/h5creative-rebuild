import { PrismaClient, Prisma } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

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
    // Check if data already exists
    const exists = await dataExists()
    if (exists) {
      console.log("⚠️  Database already contains data. Skipping seed.")
      console.log(
        "💡 To re-seed, run: bun run prisma:reset && bun run prisma:seed",
      )
      return
    }

    // Use a transaction for atomic operations
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      console.log("\n📦 Creating packages...")

      // Create Packages
      const packages = await Promise.all([
        tx.package.create({
          data: {
            name: "Paket Starter",
            description:
              "Paket cocok untuk pemula yang ingin mencoba live streaming. Termasuk host profesional, studio standar, dan peralatan dasar.",
            price: toDecimal(1500000),
            promoPrice: toDecimal(1200000),
            durationMinutes: 120,
            platform: "TikTok",
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Business",
            description:
              "Paket untuk bisnis yang serius dengan live streaming. Termasuk host berpengalaman, studio premium, dan peralatan lengkap.",
            price: toDecimal(3000000),
            promoPrice: toDecimal(2500000),
            durationMinutes: 180,
            platform: "TikTok",
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Enterprise",
            description:
              "Paket lengkap untuk brand besar. Termasuk host top-tier, studio flagship, dan peralatan profesional.",
            price: toDecimal(5000000),
            promoPrice: toDecimal(4500000),
            durationMinutes: 240,
            platform: "TikTok",
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Shopee Starter",
            description:
              "Paket live streaming khusus platform Shopee. Cocok untuk seller Shopee.",
            price: toDecimal(1800000),
            promoPrice: toDecimal(1500000),
            durationMinutes: 120,
            platform: "Shopee",
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
        tx.package.create({
          data: {
            name: "Paket Instagram Live",
            description:
              "Paket live streaming untuk Instagram. Cocok untuk influencer dan brand awareness.",
            price: toDecimal(2000000),
            promoPrice: toDecimal(1700000),
            durationMinutes: 120,
            platform: "Instagram",
            includesHost: true,
            includesStudio: true,
            includesDevice: true,
            isActive: true,
          },
        }),
      ])

      console.log(`✅ Created ${packages.length} packages`)

      console.log("\n👥 Creating hosts...")

      // Create Hosts
      const hosts = await Promise.all([
        tx.host.create({
          data: {
            name: "Sarah Wijaya",
            bio: "Host berpengalaman dengan 5+ tahun di industri live shopping. Spesialisasi di fashion dan beauty.",
            photoUrl: null,
            portfolioUrl: "https://example.com/sarah",
            expertise: "Fashion",
            rating: toDecimal(4.8),
            totalStreams: 250,
            languages: "Indonesian, English",
            socialMediaLinks: JSON.stringify({
              instagram: "@sarahwijaya",
              tiktok: "@sarahlive",
            }),
            isActive: true,
          },
        }),
        tx.host.create({
          data: {
            name: "Budi Santoso",
            bio: "Host energik dengan pengalaman di F&B dan electronics. Sangat interaktif dengan audiens.",
            photoUrl: null,
            portfolioUrl: "https://example.com/budi",
            expertise: "Food & Beverage",
            rating: toDecimal(4.7),
            totalStreams: 180,
            languages: "Indonesian",
            socialMediaLinks: JSON.stringify({
              instagram: "@budisantoso",
              tiktok: "@budilive",
            }),
            isActive: true,
          },
        }),
        tx.host.create({
          data: {
            name: "Dewi Lestari",
            bio: "Host profesional dengan background di beauty dan skincare. Sangat detail dalam menjelaskan produk.",
            photoUrl: null,
            portfolioUrl: "https://example.com/dewi",
            expertise: "Beauty",
            rating: toDecimal(4.9),
            totalStreams: 320,
            languages: "Indonesian, English",
            socialMediaLinks: JSON.stringify({
              instagram: "@dewilestari",
              tiktok: "@dewilive",
            }),
            isActive: true,
          },
        }),
        tx.host.create({
          data: {
            name: "Rizky Pratama",
            bio: "Host tech-savvy yang jago menjelaskan produk elektronik dan gadget. Sangat informatif.",
            photoUrl: null,
            portfolioUrl: "https://example.com/rizky",
            expertise: "Electronics",
            rating: toDecimal(4.6),
            totalStreams: 150,
            languages: "Indonesian, English",
            socialMediaLinks: JSON.stringify({
              instagram: "@rizkypratama",
              tiktok: "@rizkylive",
            }),
            isActive: true,
          },
        }),
        tx.host.create({
          data: {
            name: "Anita Sari",
            bio: "Host versatile yang bisa handle berbagai kategori produk. Sangat adaptif dan profesional.",
            photoUrl: null,
            portfolioUrl: "https://example.com/anita",
            expertise: "Fashion",
            rating: toDecimal(4.7),
            totalStreams: 200,
            languages: "Indonesian",
            socialMediaLinks: JSON.stringify({
              instagram: "@anitasari",
              tiktok: "@anitalive",
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
            name: "Studio Central Jakarta",
            location: "Jakarta Pusat",
            description:
              "Studio modern di pusat kota dengan fasilitas lengkap. Mudah diakses dari berbagai daerah.",
            photoUrl: null,
            capacity: 6,
            equipment: JSON.stringify([
              "Sony A7 III Camera",
              "Professional Lighting Setup",
              "Wireless Microphones",
              "Green Screen",
              "Teleprompter",
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
            name: "Studio South Jakarta",
            location: "Jakarta Selatan",
            description:
              "Studio premium di area bisnis dengan desain modern dan profesional.",
            photoUrl: null,
            capacity: 8,
            equipment: JSON.stringify([
              "Canon R5 Camera",
              "Professional Lighting Setup",
              "Wireless Microphones",
              "Green Screen",
              "Teleprompter",
              "Multi-camera Setup",
            ]),
            amenities: JSON.stringify([
              "Free WiFi",
              "AC",
              "Makeup Room",
              "Waiting Area",
              "Parking",
              "Catering Available",
            ]),
            isActive: true,
          },
        }),
        tx.studio.create({
          data: {
            name: "Studio West Jakarta",
            location: "Jakarta Barat",
            description:
              "Studio cozy dengan harga terjangkau namun tetap profesional.",
            photoUrl: null,
            capacity: 4,
            equipment: JSON.stringify([
              "Sony A6400 Camera",
              "Basic Lighting Setup",
              "Wireless Microphones",
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
    })

    // Verify data was created
    const packageCount = await prisma.package.count()
    const hostCount = await prisma.host.count()
    const studioCount = await prisma.studio.count()
    const slotCount = await prisma.studioSlot.count()
    const packageHostCount = await prisma.packageHost.count()

    console.log("\n📊 Seed Summary:")
    console.log(`   📦 Packages: ${packageCount}`)
    console.log(`   👥 Hosts: ${hostCount}`)
    console.log(`   🏢 Studios: ${studioCount}`)
    console.log(`   📅 Slots: ${slotCount}`)
    console.log(`   🔗 Host-Package Links: ${packageHostCount}`)

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
