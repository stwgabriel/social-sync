import type React from "react"
import { headers } from "next/headers"
import { Plus_Jakarta_Sans, Caveat } from "next/font/google"
import "@/app/globals.css"
import { ThemeContextProvider } from "@/components/theme-context"
import LanguageProvider from "@/components/language-provider"
import { DEFAULT_LOCALE, type Locale } from "@/middleware"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-hand" })

export const metadata = {
  title: {
    default: "Social Sync",
    template: "%s | Social Sync",
  },
  description: "Abrindo as portas da sua marca para o mundo",
  icons: {
    icon: "/favicon.ico",
  },
  generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The middleware puts the locale on the request, so the very first byte of
  // HTML is already in the right language. Nothing is corrected afterwards.
  const requestHeaders = await headers()
  const header = requestHeaders.get("x-locale")
  const language: Locale = header === "en" || header === "pt" ? header : DEFAULT_LOCALE

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={`${jakarta.className} ${caveat.variable}`}>
        <ThemeContextProvider>
          <LanguageProvider language={language}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}



import './globals.css'