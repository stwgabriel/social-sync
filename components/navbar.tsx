"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { ArrowRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CtaBeam } from "@/components/ui/cta-beam"
import { landingCopy } from "@/lib/landing-copy"

export default function Navbar() {
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const copy = landingCopy[language].nav
  const navLinks = [
    { name: copy.services, href: "/services" },
    { name: copy.work, href: "/projects" },
    { name: copy.about, href: "#" },
    { name: copy.insights, href: "#" },
    { name: copy.contact, href: "/contact" },
  ]

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-[#1C122F]/80 backdrop-blur-md border-b border-white/10" : "bg-transparent",
      )}
    >
      <div className="flex h-24 w-full items-center justify-between px-5 sm:px-8 lg:px-[clamp(3rem,5vw,6rem)]">
        <Link href="/" aria-label="Social Sync — Home" className="relative block h-12 w-36 sm:w-40">
          <Image
            src="/images/brand/social-logo.png"
            alt="Social Sync MKT"
            fill
            priority
            sizes="160px"
            className="object-contain object-left"
          />
        </Link>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm text-white/90 transition-colors hover:text-white",
                pathname === link.href && "text-white font-medium",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <CtaBeam className="hidden sm:block" strength={0.55}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
            >
              {copy.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CtaBeam>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className="text-sm rounded-full w-8 h-8 text-white hover:bg-white/10 hover:text-white"
            aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
          >
            {language === "pt" ? "EN" : "PT"}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white md:hidden"
                aria-label={copy.openMenu}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">{copy.openMenu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#1C122F] border-l border-white/10 text-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="relative h-10 w-32">
                    <Image
                      src="/images/brand/social-logo.png"
                      alt="Social Sync MKT"
                      fill
                      sizes="128px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-lg text-white/80 transition-colors hover:text-white py-2",
                        pathname === link.href && "text-white font-medium",
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/70 px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
                  >
                    {copy.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
