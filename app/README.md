This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Docker Database Setup

### Using Docker for MySQL Database

This project includes a Docker Compose configuration for running MySQL database locally.

#### Start MySQL Database with Docker

```bash
# Start the database and phpMyAdmin
docker-compose up -d

# View logs
docker-compose logs -f db

# Stop the database
docker-compose down
```

#### Database Connection

- **MySQL Port:** 3307 (mapped from container 3306)
- **phpMyAdmin:** http://localhost:8080
- **Database Name:** live_booking
- **Root Password:** root
- **Database URL:** `mysql://root:root@localhost:3307/live_booking`

The `.env` file is already configured to use the Docker MySQL setup.

#### Reset Database

```bash
# Stop and remove containers and volumes
docker-compose down -v

# Start fresh
docker-compose up -d
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
