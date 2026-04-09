import { ThemeProvider } from "@/contexts/ThemeContext"

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemeProvider>{children}</ThemeProvider>
}
