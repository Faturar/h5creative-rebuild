"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react"

export type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  const savedTheme = localStorage.getItem("admin-theme") as Theme | null
  return savedTheme || "dark"
}

function getResolvedTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  return theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const actualTheme = useMemo(() => getResolvedTheme(theme), [theme])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(actualTheme)

    // Save to localStorage
    localStorage.setItem("admin-theme", theme)
  }, [theme, actualTheme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
