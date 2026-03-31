# Podcast Booking System - Implementation Plan

## Project Overview

A standalone podcast booking system built with Next.js 16, MySQL, Prisma, and Midtrans payment integration. The system allows users to book podcast recording sessions by selecting packages, hosts, studios, and time slots without requiring user authentication.

## Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes / Server Actions
- **Database**: MySQL with Prisma ORM
- **Payment**: Midtrans (Sandbox → Production)
- **Deployment**: Vercel (Frontend) + PlanetScale/VPS MySQL (Database)
- **UI Components**: Framer Motion (animations), Lucide React (icons), Swiper (carousels)

---

## System Architecture

### User Flow Diagram

```mermaid
flowchart TD
    A[Landing Page] --> B[Pilih Paket]
    B --> C[Pilih Host]
    C --> D[Pilih Studio]
    D --> E[Pilih Jam]
    E --> F[Checkout]
    F --> G[Payment]
    G --> H{Payment Status}
    H -->|Success| I[Booking Confirmed]
    H -->|Failed| J[Payment Failed]
    I --> K[Admin Dashboard]
```

### Database Schema

```mermaid
erDiagram
    packages ||--o{ package_hosts : "has many"
    packages ||--o{ bookings : "has many"
    hosts ||--o{ package_hosts : "belongs to"
    hosts ||--o{ bookings : "has many"
    studios ||--o{ studio_slots : "has many"
    studios ||--o{ bookings : "has many"
    studio_slots ||--o| bookings : "booked by"
    bookings ||--o{ payments : "has many"

    packages {
        uuid id PK
        string name
        string description
        decimal price
        decimal promo_price
        int duration_minutes
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    hosts {
        uuid id PK
        string name
        text bio
        string photo_url
        string portfolio_url
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    package_hosts {
        uuid id PK
        uuid package_id FK
        uuid host_id FK
    }

    studios {
        uuid id PK
        string name
        string location
        text description
        string photo_url
        int capacity
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    studio_slots {
        uuid id PK
        uuid studio_id FK
        date date
        time start_time
        time end_time
        boolean is_booked
        datetime created_at
    }

    bookings {
        uuid id PK
        string booking_code
        uuid package_id FK
        uuid host_id FK
        uuid studio_id FK
        uuid studio_slot_id FK
        date date
        time start_time
        time end_time
        string customer_name
        string customer_phone
        string customer_email
        decimal price
        enum status
        datetime created_at
        datetime updated_at
    }

    payments {
        uuid id PK
        uuid booking_id FK
        string payment_gateway
        string transaction_id
        decimal amount
        enum status
        datetime paid_at
        datetime created_at
    }
```

---

## Phase 1: Database & Backend Setup

### 1.1 Install Dependencies

```bash
# Install Prisma and MySQL driver
npm install prisma @prisma/client
npm install -D prisma

# Install Midtrans SDK
npm install midtrans-client

# Install additional utilities
npm install date-fns zod react-hook-form @hookform/resolvers
```

### 1.2 Prisma Schema Configuration

Create `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Package {
  id            String        @id @default(uuid())
  name          String
  description   String        @db.Text
  price         Decimal       @db.Decimal(10, 2)
  promoPrice    Decimal?      @db.Decimal(10, 2)
  durationMinutes Int         @default(60)
  isActive      Boolean       @default(true)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  packageHosts  PackageHost[]
  bookings      Booking[]

  @@map("packages")
}

model Host {
  id            String        @id @default(uuid())
  name          String
  bio           String        @db.Text
  photoUrl      String?
  portfolioUrl  String?
  isActive      Boolean       @default(true)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  packageHosts  PackageHost[]
  bookings      Booking[]

  @@map("hosts")
}

model PackageHost {
  id        String   @id @default(uuid())
  packageId String
  hostId    String
  package   Package  @relation(fields: [packageId], references: [id], onDelete: Cascade)
  host      Host     @relation(fields: [hostId], references: [id], onDelete: Cascade)

  @@unique([packageId, hostId])
  @@map("package_hosts")
}

model Studio {
  id            String        @id @default(uuid())
  name          String
  location      String
  description   String        @db.Text
  photoUrl      String?
  capacity      Int           @default(4)
  isActive      Boolean       @default(true)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  studioSlots   StudioSlot[]
  bookings      Booking[]

  @@map("studios")
}

model StudioSlot {
  id        String   @id @default(uuid())
  studioId  String
  date      DateTime
  startTime String
  endTime   String
  isBooked  Boolean  @default(false)
  createdAt DateTime @default(now())
  studio    Studio   @relation(fields: [studioId], references: [id], onDelete: Cascade)
  booking   Booking?

  @@unique([studioId, date, startTime])
  @@index([studioId, date, isBooked])
  @@map("studio_slots")
}

model Booking {
  id             String      @id @default(uuid())
  bookingCode    String      @unique
  packageId      String
  hostId         String
  studioId       String
  studioSlotId   String      @unique
  date           DateTime
  startTime      String
  endTime        String
  customerName   String
  customerPhone  String
  customerEmail  String
  price          Decimal     @db.Decimal(10, 2)
  status         BookingStatus @default(PENDING)
  notes          String?     @db.Text
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
  package        Package     @relation(fields: [packageId], references: [id])
  host           Host        @relation(fields: [hostId], references: [id])
  studio         Studio      @relation(fields: [studioId], references: [id])
  studioSlot     StudioSlot  @relation(fields: [studioSlotId], references: [id])
  payments       Payment[]

  @@index([status, date])
  @@map("bookings")
}

model Payment {
  id             String       @id @default(uuid())
  bookingId      String
  paymentGateway String       @default("midtrans")
  transactionId  String       @unique
  amount         Decimal      @db.Decimal(10, 2)
  status         PaymentStatus @default(PENDING)
  paidAt         DateTime?
  rawResponse    String?      @db.Text
  createdAt      DateTime     @default(now())
  booking        Booking      @relation(fields: [bookingId], references: [id], onDelete: Cascade)

  @@index([bookingId, status])
  @@map("payments")
}

enum BookingStatus {
  PENDING
  PAID
  CANCELLED
  COMPLETED
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  EXPIRED
}
```

### 1.3 Environment Variables

Create `.env` file:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/podcast_booking"

# Midtrans (Sandbox)
MIDTRANS_SERVER_KEY="SB-Mid-server-xxxxx"
MIDTRANS_CLIENT_KEY="SB-Mid-client-xxxxx"
MIDTRANS_IS_PRODUCTION=false

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 1.4 Database Setup Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create database migration
npx prisma migrate dev --name init

# Open Prisma Studio (optional)
npx prisma studio
```

---

## Phase 2: Backend API Development

### 2.1 API Structure

```
app/api/
├── packages/
│   ├── route.ts           # GET all packages
│   └── [id]/route.ts      # GET single package
├── hosts/
│   ├── route.ts           # GET, POST hosts
│   └── [id]/route.ts      # GET, PUT, DELETE host
├── studios/
│   ├── route.ts           # GET, POST studios
│   └── [id]/route.ts      # GET, PUT, DELETE studio
├── slots/
│   └── route.ts           # GET available slots
├── bookings/
│   ├── route.ts           # GET, POST bookings
│   └── [id]/route.ts      # GET, PUT booking
└── payments/
    ├── create/route.ts    # POST create payment
    └── webhook/route.ts    # POST webhook handler
```

### 2.2 Key API Endpoints

#### Packages API (`app/api/packages/route.ts`)

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      include: {
        hosts: {
          include: { host: true },
        },
      },
    })

    return NextResponse.json({ success: true, data: packages })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch packages" },
      { status: 500 },
    )
  }
}
```

#### Slots API (`app/api/slots/route.ts`)

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studioId = searchParams.get("studioId")
  const date = searchParams.get("date")

  try {
    const slots = await prisma.studioSlot.findMany({
      where: {
        studioId: studioId || undefined,
        date: date ? new Date(date) : undefined,
        isBooked: false,
      },
      orderBy: { startTime: "asc" },
    })

    return NextResponse.json({ success: true, data: slots })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch slots" },
      { status: 500 },
    )
  }
}
```

#### Bookings API (`app/api/bookings/route.ts`)

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const bookingSchema = z.object({
  packageId: z.string().uuid(),
  hostId: z.string().uuid(),
  studioId: z.string().uuid(),
  studioSlotId: z.string().uuid(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(10),
  customerEmail: z.string().email(),
  notes: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // Get package and slot details
    const [packageData, slotData] = await Promise.all([
      prisma.package.findUnique({ where: { id: validatedData.packageId } }),
      prisma.studioSlot.findUnique({
        where: { id: validatedData.studioSlotId },
        include: { studio: true },
      }),
    ])

    if (!packageData || !slotData) {
      return NextResponse.json(
        { success: false, error: "Package or slot not found" },
        { status: 404 },
      )
    }

    if (slotData.isBooked) {
      return NextResponse.json(
        { success: false, error: "Slot already booked" },
        { status: 400 },
      )
    }

    // Generate booking code
    const bookingCode = `BKG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingCode,
        packageId: validatedData.packageId,
        hostId: validatedData.hostId,
        studioId: validatedData.studioId,
        studioSlotId: validatedData.studioSlotId,
        date: slotData.date,
        startTime: slotData.startTime,
        endTime: slotData.endTime,
        customerName: validatedData.customerName,
        customerPhone: validatedData.customerPhone,
        customerEmail: validatedData.customerEmail,
        price: packageData.promoPrice || packageData.price,
        notes: validatedData.notes,
      },
      include: {
        package: true,
        host: true,
        studio: true,
      },
    })

    return NextResponse.json({ success: true, data: booking })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 },
    )
  }
}
```

---

## Phase 3: Midtrans Integration

### 3.1 Midtrans Configuration

Create `lib/midtrans.ts`:

```typescript
import midtransClient from "midtrans-client"

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true"

export const snap = new midtransClient.Snap({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
})

export const createPaymentTransaction = async (booking: any) => {
  const orderId = booking.bookingCode
  const grossAmount = Number(booking.price)

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    customer_details: {
      first_name: booking.customerName.split(" ")[0],
      last_name: booking.customerName.split(" ").slice(1).join(" ") || "",
      email: booking.customerEmail,
      phone: booking.customerPhone,
    },
    item_details: [
      {
        id: booking.packageId,
        price: grossAmount,
        quantity: 1,
        name: booking.package.name,
      },
    ],
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_APP_URL}/podcast/payment-success?order_id=${orderId}`,
      error: `${process.env.NEXT_PUBLIC_APP_URL}/podcast/payment-failed?order_id=${orderId}`,
      pending: `${process.env.NEXT_PUBLIC_APP_URL}/podcast/payment-pending?order_id=${orderId}`,
    },
  }

  const transaction = await snap.createTransaction(parameter)
  return transaction
}
```

### 3.2 Payment Creation API (`app/api/payments/create/route.ts`)

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createPaymentTransaction } from "@/lib/midtrans"

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json()

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { package: true },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 },
      )
    }

    // Create Midtrans transaction
    const transaction = await createPaymentTransaction(booking)

    // Save payment record
    await prisma.payment.create({
      data: {
        bookingId,
        transactionId: transaction.token,
        amount: booking.price,
        status: "PENDING",
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        token: transaction.token,
        redirectUrl: transaction.redirect_url,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create payment" },
      { status: 500 },
    )
  }
}
```

### 3.3 Webhook Handler (`app/api/payments/webhook/route.ts`)

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const signature = request.headers.get("x-signature")

    // Verify signature
    const hash = crypto
      .createHash("sha512")
      .update(
        `${body.order_id}${body.status_code}${body.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`,
      )
      .digest("hex")

    if (signature !== hash) {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 },
      )
    }

    // Find booking
    const booking = await prisma.booking.findUnique({
      where: { bookingCode: body.order_id },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 },
      )
    }

    // Update payment status
    if (
      body.transaction_status === "settlement" ||
      body.transaction_status === "capture"
    ) {
      await prisma.$transaction([
        prisma.booking.update({
          where: { id: booking.id },
          data: { status: "PAID" },
        }),
        prisma.studioSlot.update({
          where: { id: booking.studioSlotId },
          data: { isBooked: true },
        }),
        prisma.payment.updateMany({
          where: { bookingId: booking.id },
          data: {
            status: "SUCCESS",
            paidAt: new Date(),
          },
        }),
      ])
    } else if (body.transaction_status === "pending") {
      await prisma.payment.updateMany({
        where: { bookingId: booking.id },
        data: { status: "PENDING" },
      })
    } else if (
      body.transaction_status === "deny" ||
      body.transaction_status === "cancel" ||
      body.transaction_status === "expire"
    ) {
      await prisma.$transaction([
        prisma.booking.update({
          where: { id: booking.id },
          data: { status: "CANCELLED" },
        }),
        prisma.payment.updateMany({
          where: { bookingId: booking.id },
          data: { status: "FAILED" },
        }),
      ])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Webhook processing failed" },
      { status: 500 },
    )
  }
}
```

---

## Phase 4-7: Frontend Implementation

### 4.1 Folder Structure

```
app/podcast/
├── page.tsx                          # Landing page
├── packages/
│   ├── page.tsx                      # Packages listing
│   └── [id]/
│       └── page.tsx                  # Package detail
├── hosts/
│   ├── page.tsx                      # Hosts listing
│   └── [id]/
│       └── page.tsx                  # Host detail
├── studios/
│   ├── page.tsx                      # Studios listing
│   └── [id]/
│       └── page.tsx                  # Studio detail
├── booking/
│   └── page.tsx                      # Booking wizard
├── checkout/
│   └── page.tsx                      # Checkout page
├── payment-success/
│   └── page.tsx                      # Success page
├── payment-failed/
│   └── page.tsx                      # Failed page
└── components/
    ├── HeroSection.tsx
    ├── PackageCard.tsx
    ├── HostCard.tsx
    ├── StudioCard.tsx
    ├── BookingWizard.tsx
    ├── SlotSelector.tsx
    └── CheckoutSummary.tsx
```

### 4.2 Landing Page Components

#### Hero Section

```typescript
// app/podcast/components/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Professional Podcast
          <span className="block text-purple-400">Recording Studio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Book professional podcast sessions with expert hosts and state-of-the-art studios
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/podcast/booking">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
              Book Now
            </Button>
          </Link>
          <Link href="/podcast/packages">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-6 text-lg">
              View Packages
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

#### Package Card

```typescript
// app/podcast/components/PackageCard.tsx
'use client';

import { Package } from '@prisma/client';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PackageCardProps {
  package: Package & {
    hosts: Array<{ host: { id: string; name: string } }>;
  };
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  const price = pkg.promoPrice || pkg.price;
  const isPromo = pkg.promoPrice !== null;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
    >
      {isPromo && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 font-semibold">
          PROMO PRICE
        </div>
      )}

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
        <p className="text-gray-600 mb-4">{pkg.description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-purple-600">
              Rp {price.toLocaleString('id-ID')}
            </span>
            {isPromo && (
              <span className="text-lg text-gray-400 line-through">
                Rp {pkg.price.toLocaleString('id-ID')}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {pkg.durationMinutes} minutes session
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-5 h-5 text-green-500" />
            <span>{pkg.hosts.length} Professional Hosts Available</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-5 h-5 text-green-500" />
            <span>High-Quality Recording Equipment</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-5 h-5 text-green-500" />
            <span>Professional Studio Environment</span>
          </div>
        </div>

        <Link href={`/podcast/booking?packageId=${pkg.id}`}>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Select Package
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
```

### 4.3 Booking Wizard

```typescript
// app/podcast/components/BookingWizard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Step = 'package' | 'host' | 'studio' | 'datetime' | 'customer' | 'review';

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('package');
  const [bookingData, setBookingData] = useState({});

  const steps: Step[] = ['package', 'host', 'studio', 'datetime', 'customer', 'review'];
  const currentStepIndex = steps.indexOf(currentStep);

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  index <= currentStepIndex
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index < currentStepIndex ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-24 h-1 mx-2 ${
                    index < currentStepIndex ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Render step content based on currentStep */}
          {currentStep === 'package' && <PackageStep onSelect={nextStep} />}
          {currentStep === 'host' && <HostStep onSelect={nextStep} onBack={prevStep} />}
          {currentStep === 'studio' && <StudioStep onSelect={nextStep} onBack={prevStep} />}
          {currentStep === 'datetime' && <DateTimeStep onSelect={nextStep} onBack={prevStep} />}
          {currentStep === 'customer' && <CustomerStep onSelect={nextStep} onBack={prevStep} />}
          {currentStep === 'review' && <ReviewStep onSubmit={handleSubmit} onBack={prevStep} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

### 4.4 Slot Selector with Calendar

```typescript
// app/podcast/components/SlotSelector.tsx
'use client';

import { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlotSelectorProps {
  studioId: string;
  onSlotSelect: (slotId: string) => void;
}

export function SlotSelector({ studioId, onSlotSelect }: SlotSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Date</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 w-20 py-3 rounded-lg text-center transition-all ${
                isSameDay(selectedDate, date)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-xs uppercase">{format(date, 'EEE')}</div>
              <div className="text-xl font-bold">{format(date, 'd')}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Time</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => {
                setSelectedSlot(time);
                onSlotSelect(time);
              }}
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                selectedSlot === time
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 8-9: Admin Panel

### 8.1 Admin Folder Structure

```
app/admin/
├── layout.tsx                        # Admin layout with sidebar
├── page.tsx                          # Dashboard
├── bookings/
│   └── page.tsx                      # Bookings management
├── hosts/
│   └── page.tsx                      # Hosts CRUD
├── packages/
│   └── page.tsx                      # Packages CRUD
└── studios/
    └── page.tsx                      # Studios CRUD
```

### 8.2 Admin Dashboard

```typescript
// app/admin/page.tsx
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalBookings, todayBookings, totalRevenue, activeHosts] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({
      where: {
        date: {
          gte: today
        }
      }
    }),
    prisma.booking.aggregate({
      where: { status: 'PAID' },
      _sum: { price: true }
    }),
    prisma.host.count({ where: { isActive: true } })
  ]);

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      package: true,
      host: true,
      studio: true
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {(totalRevenue._sum.price || 0).toLocaleString('id-ID')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Hosts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeHosts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-semibold">{booking.customerName}</div>
                  <div className="text-sm text-gray-500">{booking.package.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Rp {booking.price.toLocaleString('id-ID')}</div>
                  <div className={`text-sm ${
                    booking.status === 'PAID' ? 'text-green-600' :
                    booking.status === 'PENDING' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Phase 10: Testing Checklist

### 10.1 Booking Flow Testing

- [ ] User can view packages on landing page
- [ ] User can select a package and proceed to booking
- [ ] User can view and select available hosts
- [ ] User can view and select studios
- [ ] User can select date and time slots
- [ ] User can fill customer information form
- [ ] User can review booking details before payment
- [ ] Payment redirect to Midtrans works correctly
- [ ] Payment success page displays correctly
- [ ] Payment failure page displays correctly
- [ ] Booking appears in admin dashboard after payment

### 10.2 Admin Panel Testing

- [ ] Admin can view dashboard statistics
- [ ] Admin can view all bookings
- [ ] Admin can filter bookings by status
- [ ] Admin can create new hosts
- [ ] Admin can edit host information
- [ ] Admin can delete hosts
- [ ] Admin can create new packages
- [ ] Admin can edit package information
- [ ] Admin can delete packages
- [ ] Admin can create new studios
- [ ] Admin can edit studio information
- [ ] Admin can delete studios

### 10.3 Payment Testing (Sandbox)

- [ ] Test successful payment with various payment methods
- [ ] Test failed payment scenarios
- [ ] Test expired payment
- [ ] Test webhook notifications
- [ ] Verify booking status updates correctly
- [ ] Verify slot is marked as booked after payment

---

## Phase 11: Deployment

### 11.1 Environment Variables for Production

```env
# Database (PlanetScale)
DATABASE_URL="mysql://xxx:pscale_pw_xxx@aws.connect.psdb.cloud/podcast_booking?sslaccept=strict"

# Midtrans (Production)
MIDTRANS_SERVER_KEY="Mid-server-xxxxx"
MIDTRANS_CLIENT_KEY="Mid-client-xxxxx"
MIDTRANS_IS_PRODUCTION=true

# App
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### 11.2 Deployment Steps

1. **Database Setup**

   ```bash
   # Create PlanetScale database
   # Get connection string
   # Update .env.production
   ```

2. **Run Migrations**

   ```bash
   npx prisma migrate deploy
   ```

3. **Deploy to Vercel**

   ```bash
   # Connect GitHub repository to Vercel
   # Configure environment variables
   # Deploy
   ```

4. **Configure Midtrans**
   - Switch to production mode
   - Update webhook URL: `https://your-domain.com/api/payments/webhook`
   - Add allowed origins

### 11.3 Post-Deployment Checklist

- [ ] Verify database connection
- [ ] Test booking flow in production
- [ ] Test payment with small amount
- [ ] Verify webhook is receiving notifications
- [ ] Test admin panel functionality
- [ ] Set up monitoring and error tracking
- [ ] Configure backup strategy

---

## Future Improvements (Phase 2)

### Phase 2 Features

1. **User Authentication**
   - User registration and login
   - User profile management
   - Booking history

2. **Advanced Calendar**
   - Visual calendar view
   - Recurring bookings
   - Bulk booking

3. **Host Schedule Management**
   - Host availability calendar
   - Host-specific time slots
   - Host rating system

4. **Coupon System**
   - Create and manage discount codes
   - Apply coupons during checkout
   - Coupon analytics

5. **Real-time Features**
   - WebSocket for live slot availability
   - Real-time booking updates
   - Push notifications

6. **Analytics Dashboard**
   - Revenue analytics
   - Booking trends
   - Host performance metrics
   - Customer insights

7. **Email Notifications**
   - Booking confirmation emails
   - Payment reminders
   - Booking reminders
   - Promotional emails

8. **Mobile App**
   - React Native or Flutter mobile app
   - Push notifications
   - Offline booking capability

---

## Security Considerations

1. **API Security**
   - Rate limiting on API endpoints
   - Input validation and sanitization
   - SQL injection prevention (Prisma handles this)
   - XSS prevention

2. **Payment Security**
   - Webhook signature verification
   - HTTPS enforcement
   - Sensitive data encryption

3. **Data Protection**
   - Customer data encryption at rest
   - GDPR compliance
   - Data retention policies

---

## Performance Optimization

1. **Database**
   - Add indexes for frequently queried fields
   - Implement connection pooling
   - Use database caching

2. **Frontend**
   - Image optimization with Next.js Image
   - Code splitting and lazy loading
   - Implement caching strategies

3. **API**
   - Implement API response caching
   - Use pagination for large datasets
   - Optimize Prisma queries

---

## Documentation

### API Documentation

Create OpenAPI/Swagger documentation for all API endpoints.

### User Documentation

- User guide for booking process
- FAQ section
- Contact information

### Admin Documentation

- Admin panel user guide
- Host management guide
- Package and studio management

---

## Conclusion

This implementation plan provides a comprehensive roadmap for building a podcast booking system with the following key features:

✅ **MVP Features** (Phase 1)

- Landing page with package listings
- Host and studio selection
- Date/time slot booking
- Midtrans payment integration
- Admin panel with CRUD operations

✅ **Future Enhancements** (Phase 2)

- User authentication
- Advanced calendar
- Host scheduling
- Coupon system
- Analytics dashboard

The system is designed to be:

- **Scalable**: Can handle growth with proper database optimization
- **Maintainable**: Clean code structure with separation of concerns
- **User-friendly**: Intuitive booking flow with clear feedback
- **Secure**: Proper authentication, validation, and payment security

Estimated development timeline: **10-14 days for MVP completion**
