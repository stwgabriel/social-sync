"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeContextType = {
  forceLightMode: boolean
  setForceLightMode: (force: boolean) => void
  previousTheme: string | undefined
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [forceLightMode, setForceLightMode] = useState(false)
  const [previousTheme, setPreviousTheme] = useState<string | undefined>(undefined)

  return (
    <ThemeContext.Provider
      value={{
        forceLightMode,
        setForceLightMode: (force) => {
          setForceLightMode(force)
        },
        previousTheme,
      }}
    >
      <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider")
  }
  return context
}

