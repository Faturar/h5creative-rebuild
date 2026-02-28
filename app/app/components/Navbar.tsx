"use client"

import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
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
  logoClassName?: string
  containerClassName?: string
  rightSectionClassName?: string
  textColorClassName?: string
  hoverColorClassName?: string
  ctaClassName?: string
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
    { label: "Services", href: "#" },
    { label: "Testimonials", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
  ],
  ctaLabel = "Contact Us",
  ctaHref = "#",
  logo = defaultLogo,
  logoAlt = "logo",
  logoClassName = "w-12",
  containerClassName = "container max-w-[1130px] mx-auto flex justify-between items-center pt-[30px] z-10",
  rightSectionClassName = "flex gap-[50px] items-center",
  textColorClassName = "text-white",
  hoverColorClassName = "hover:text-[#FFE7C2]",
  ctaClassName = "bg-[#CDF30E] font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]",
}: NavbarProps) {
  return (
    <nav className={containerClassName}>
      <Link href="/" className="w-[160px] flex shrink-0 h-fit">
        <Image src={logo} alt={logoAlt} className={logoClassName} />
      </Link>
      <div className={rightSectionClassName}>
        <ul className={`flex gap-[50px] items-center ${textColorClassName}`}>
          {items.map((item) => (
            <li key={`${item.label}-${item.href}`}>
              <NavLink
                href={item.href}
                className={`font-medium text-lg ${hoverColorClassName} transition-all duration-300`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink href={ctaHref} className={ctaClassName}>
          {ctaLabel}
        </NavLink>
      </div>
    </nav>
  )
}
