"use client"

import Link from "next/link"
import { LiquidWave } from "@/components/ui/liquid-wave"
import Image from "next/image"
import { Instagram, Linkedin, Youtube } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useLocaleHref } from "@/lib/locale"
import { landingCopy } from "@/lib/landing-copy"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.047.88.139V9.4a6.33 6.33 0 0 0-1-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  )
}

const socials = [
  { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { name: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
  { name: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { name: "YouTube", href: "https://youtube.com", Icon: Youtube },
]

export default function Footer() {
  const localeHref = useLocaleHref()
  const { language } = useLanguage()
  const copy = landingCopy[language]
  const navLinks = [
    { name: copy.nav.services, href: "/services" },
    { name: copy.nav.work, href: "/projects" },
    { name: copy.nav.about, href: "#" },
    { name: copy.nav.insights, href: "#" },
    { name: copy.nav.contact, href: "/contact" },
  ]

  return (
    <footer className="-mt-px w-full bg-[#B83F70] text-white">
      {/* Bottom border of "Let's create together": looping two-tone liquid wave */}
      <LiquidWave
        fill="#1C122F"
        backFill="#3C215B"
        className="block h-24 w-full md:h-36"
      />

      <div className="w-full bg-[#1C122F] px-5 py-16 sm:px-8 md:py-20 lg:px-[clamp(3rem,5vw,6rem)]">
        <div className="relative mx-auto mb-14 aspect-[313/191] w-[min(66vw,630px)] md:mb-20">
          <Image
            src="/images/brand/social-logo-bg.png"
            alt="Social Sync MKT"
            fill
            sizes="(max-width: 768px) 66vw, 630px"
            className="object-contain"
          />
        </div>

        {/* Three-part row */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10 text-center md:text-left">
          {/* Left: taglines + copyright */}
          <div className="space-y-1">
            <p className="text-sm text-white/50">{copy.footer.lines[0]}</p>
            <p className="text-sm text-white/50">{copy.footer.lines[1]}</p>
            <p className="pt-4 text-xs text-white/40">© 2026 Social Sync. {copy.footer.rights}</p>
          </div>

          {/* Center: links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={localeHref(link.href)}
                className="text-sm text-white/90 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: socials + tagline */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-5">
              {socials.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-white/90 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{name}</span>
                </Link>
              ))}
            </div>
            <p className="text-sm text-white/50">{copy.footer.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
