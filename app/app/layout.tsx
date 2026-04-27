import type { Metadata } from "next"
import "./globals.css"
import { Manrope } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "H5 Creative Studio",
  description: "Professional Designer & Developer Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${manrope.className} bg-[#e8e4eb] font-sans text-[#101011]`}
      >
        {children}
      </body>
    </html>
  )
}
