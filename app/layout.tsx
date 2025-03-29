import type React from "react"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeContextProvider } from "@/components/theme-context"
import LanguageProvider from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeContextProvider>
          <LanguageProvider>
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