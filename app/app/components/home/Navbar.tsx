"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, Easing, AnimatePresence } from "framer-motion"

import logo from "@/public/assets/images/logos/logo.png"

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
}

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
}

const mobileItemVariants = {
  closed: {
    opacity: 0,
    x: 50,
  },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  }),
}

interface NavbarProps {
  transparent?: boolean
  scrollTransparent?: boolean
}

export default function Navbar({
  transparent = false,
  scrollTransparent = false,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll detection for automatic transparency
  useEffect(() => {
    if (!scrollTransparent) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollTransparent])

  // Determine if navbar should be transparent
  const isTransparent = scrollTransparent ? !isScrolled : transparent

  const navItems = ["Home", "Services", "Booking", "Pricing", "About"]

  const getNavLink = (item: string) => {
    switch (item) {
      case "Services":
        return "/service"
      case "About":
        return "/about"
      case "Booking":
        return "/booking"
      default:
        return "#"
    }
  }

  return (
    <motion.nav
      className={`container max-w-7xl mx-auto flex justify-between items-center py-8 px-8 lg:px-16 z-90 top-0 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-[#0B0B1B]"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.a
        href="/"
        className={`flex shrink-0 ${isMenuOpen ? "z-[100] relative" : ""}`}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Image src={logo} alt="logo" className="w-16 h-16 object-contain" />
      </motion.a>

      {/* Desktop Navigation */}
      <motion.div
        className="hidden lg:flex gap-[50px] items-center"
        variants={containerVariants}
      >
        <motion.ul
          className="flex gap-[50px] items-center text-white"
          variants={containerVariants}
        >
          {navItems.map((item) => (
            <motion.li key={item} variants={itemVariants}>
              <motion.a
                href={getNavLink(item)}
                className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
        <motion.button
          className="inline-flex items-center gap-4 rounded-lg 
          bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] 
          px-6 py-2.5 font-semibold text-white 
          shadow-[0_8px_25px_rgba(46,43,255,0.35)] 
          transition-all duration-300 
          hover:scale-[1.03] 
          hover:shadow-[0_12px_35px_rgba(46,43,255,0.5)]"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Konsultasi Sekarang
        </motion.button>
      </motion.div>

      {/* Mobile Burger Button */}
      <motion.button
        className={`lg:hidden flex flex-col gap-1.5 ${isMenuOpen ? "z-100 relative" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <motion.span
          className="w-6 h-0.5 bg-white block"
          animate={{
            rotate: isMenuOpen ? 45 : 0,
            y: isMenuOpen ? 6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-white block"
          animate={{
            opacity: isMenuOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-white block"
          animate={{
            rotate: isMenuOpen ? -45 : 0,
            y: isMenuOpen ? -6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Content */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full bg-linear-to-b from-[#1a1a2e] to-[#16213e] z-60 lg:hidden flex flex-col justify-center items-center gap-8 shadow-2xl"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.ul className="flex flex-col gap-6 items-start w-full px-4 mt-16">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item}
                    className="w-full"
                    custom={index}
                    variants={mobileItemVariants}
                  >
                    <motion.a
                      href={getNavLink(item)}
                      className="font-medium text-xl text-white hover:bg-[#2E2BFF] transition-all duration-300 block py-3 px-4 w-full"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button
                className="inline-flex items-center justify-center gap-4 
                bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] 
                px-4 py-4 font-semibold text-white 
                w-full
                transition-all duration-300 
                hover:from-[#1C1AFF] hover:to-[#2E2BFF]"
                custom={navItems.length}
                variants={mobileItemVariants}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMenuOpen(false)}
              >
                Konsultasi Sekarang
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
