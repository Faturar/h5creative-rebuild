# Live Streaming Host Booking System

A standalone Live Shopping / Live Streaming Host Booking system built with Next.js 16, MySQL, Prisma, and Midtrans payment integration.

## Features

- **Multi-step Booking Flow**: Package selection → Host selection → Studio selection → Time slot → Customer info → Payment
- **Real-time Availability**: Studio slots are managed in real-time
- **Secure Payment Integration**: Midtrans payment gateway with webhook support
- **Admin Dashboard**: View and manage all bookings
- **Responsive Design**: Mobile-friendly interface with smooth animations

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Payment**: Midtrans (Sandbox → Production)
- **UI Components**: Framer Motion (animations), Lucide React (icons), date-fns (date handling)

## Project Structure

```
app/
├── app/
│   ├── api/                    # API Routes
│   │   ├── bookings/          # Booking CRUD operations
│   │   ├── hosts/             # Host CRUD operations
│   │   ├── packages/          # Package CRUD operations
│   │   ├── payments/          # Payment integration
│   │   ├── slots/             # Studio slot management
│   │   └── studios/           # Studio CRUD operations
│   ├── booking/               # Booking flow pages
│   │   ├── page.tsx          # Main booking page
│   │   ├── success/          # Payment success page
│   │   ├── failed/           # Payment failed page
│   │   └── pending/          # Payment pending page
│   ├── admin/                 # Admin dashboard
│   │   └── page.tsx          # Admin interface
│   └── components/
│       └── booking/           # Booking flow components
├── lib/
│   └── prisma.ts             # Prisma client instance
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts              # Sample data seeder
├── types/
│   └── midtrans-client.d.ts  # Midtrans type definitions
└── .env                     # Environment variables
```

## Setup Instructions

### 1. Prerequisites

- Node.js 20+ (current: 20.18.0)
- MySQL database server
- Midtrans account (for payment processing)

### 2. Install Dependencies

```bash
cd app
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/live_streaming_booking"

# Midtrans (Sandbox)
MIDTRANS_SERVER_KEY="SB-Mid-server-xxxxx"
MIDTRANS_CLIENT_KEY="SB-Mid-client-xxxxx"
MIDTRANS_IS_PRODUCTION=false

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup

#### Option A: Using Local MySQL

1. Create a MySQL database:

```sql
CREATE DATABASE live_streaming_booking;
```

2. Update `DATABASE_URL` in `.env` with your MySQL credentials

3. Run migrations:

```bash
npm run prisma:migrate
```

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Seed the database with sample data:

```bash
npm run prisma:seed
```

#### Option B: Using PlanetScale (Recommended for Production)

1. Create a PlanetScale account and database
2. Get the connection string
3. Update `DATABASE_URL` in `.env`
4. Run the same migration and seed commands

### 5. Midtrans Setup

1. Create a Midtrans account at [midtrans.com](https://midtrans.com)
2. Get your Server Key and Client Key from the dashboard
3. Update the environment variables:
   - For sandbox/testing: Use SB-Mid keys
   - For production: Use production keys and set `MIDTRANS_IS_PRODUCTION=true`
4. Configure webhook URL in Midtrans dashboard:
   - `https://your-domain.com/api/payments/webhook`

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Create and run migrations
npm run prisma:studio   # Open Prisma Studio
npm run prisma:seed     # Seed database with sample data
npm run prisma:reset    # Reset database and reseed

# Linting
npm run lint            # Run ESLint
```

## API Endpoints

### Packages

- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create new package

### Hosts

- `GET /apihosts` - Get all hosts (filter by expertise or packageId)
- `POST /api/hosts` - Create new host

### Studios

- `GET /api/studios` - Get all studios
- `POST /api/studios` - Create new studio

### Slots

- `GET /api/slots` - Get available slots (filter by studioId and date)
- `POST /api/slots` - Create new slot

### Bookings

- `GET /api/bookings` - Get all bookings (filter by status or bookingCode)
- `POST /api/bookings` - Create new booking

### Payments

- `POST /api/payments/create` - Create payment transaction
- `POST /api/payments/webhook` - Midtrans webhook handler

## Pages

### Public Pages

- `/booking` - Main booking flow
- `/booking/success` - Payment success page
- `/booking/failed` - Payment failed page
- `/booking/pending` - Payment pending page

### Admin Pages

- `/admin` - Admin dashboard for managing bookings

## Database Schema

The system uses the following main entities:

- **Package**: Live streaming packages with pricing and features
- **Host**: Professional hosts with ratings and expertise
- **Studio**: Recording studios with equipment and amenities
- **StudioSlot**: Time slots for studio bookings
- **Booking**: Customer bookings with package, host, studio, and slot
- **Payment**: Payment transactions with status tracking

See `prisma/schema.prisma` for the complete schema.

## Payment Flow

1. Customer completes booking form
2. Booking is created with PENDING status
3. Payment transaction is created via Midtrans
4. Customer is redirected to Midtrans payment page
5. Midtrans sends webhook notification on payment status
6. Booking and payment status are updated accordingly
7. Customer is redirected to success/failed/pending page

## Development Notes

### Database Migrations

When modifying the schema:

1. Update `prisma/schema.prisma`
2. Run `npm run prisma:migrate` to create a new migration
3. Run `npm run prisma:generate` to regenerate the client

### Testing Payment

Use Midtrans Sandbox for testing:

- Card number: 4911 1111 1111 1113
- Expiry: Any future date
- CVV: Any 3 digits
- OTP: 123456

### Troubleshooting

**Database Connection Error**

- Ensure MySQL server is running
- Check DATABASE_URL in `.env`
- Verify database exists

**Migration Errors**

- Drop and recreate database: `DROP DATABASE live_streaming_booking; CREATE DATABASE live_streaming_booking;`
- Run `npm run prisma:reset`

**Payment Webhook Issues**

- Check Midtrans dashboard for webhook configuration
- Verify webhook URL is publicly accessible
- Check server logs for webhook errors

## Deployment

### Vercel (Frontend)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### PlanetScale (Database)

1. Create database in PlanetScale
2. Update DATABASE_URL in production
3. Run migrations in production

### Midtrans Production

1. Switch to production keys
2. Set `MIDTRANS_IS_PRODUCTION=true`
3. Update webhook URL to production domain
4. Test with real payments

## License

This project is part of H5 Creative.

## Support

For issues or questions, please contact the development team.
