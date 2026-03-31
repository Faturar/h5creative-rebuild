"use client"

import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import defaultLogo from "@/public/assets/images/logos/logo.png"

type NavItem = {
  label: string
  href: string
}

type NavbarProps = {
  items?: NavItem[]
  ctaLabel?: string
  ctaHref?: string
  logo?: StaticImageData
  logoAlt?: string
}

function NavLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export default function Navbar({
  items = [
    { label: "Home", href: "/" },
    { label: "About", href: "#" },
    { label: "Service", href: "#" },
    { label: "Testimonial", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  ctaLabel = "Free Consultation",
  ctaHref = "#",
  logo = defaultLogo,
  logoAlt = "Omoway",
}: NavbarProps) {
  const pathname = usePathname()

  return (
    <nav className="w-full py-6">
      <div className="mx-auto flex w-[min(1180px,calc(100%-40px))] items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-xl font-semibold">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Omoway
          </span>
        </Link>

        {/* MENU */}
        <ul className="hidden items-center gap-8 text-[14px] font-medium lg:flex">
          {items.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.label}>
                <NavLink
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white"
                      : "text-[#6f6c74] hover:text-[#1a1a21]"
                  }`}
                >
                  {item.label}

                  {/* Small white dot inside active */}
                  {isActive && (
                    <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white" />
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <NavLink
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-full border border-[#e8e3ef] bg-[#f3ece4] px-5 py-2 text-[13px] font-medium text-[#1a1a21] transition hover:border-[#5d31f4] hover:text-[#5d31f4]"
        >
          {ctaLabel}
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#dcd6ea] text-[10px]">
            →
          </span>
        </NavLink>
      </div>
    </nav>
  )
}
