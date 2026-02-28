import type { Metadata } from "next"
import "./globals.css"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
    <html lang="en">
      <body className={`${poppins.className} text-portto-black font-poppins`}>
        {children}
      </body>
    </html>
  )
}
