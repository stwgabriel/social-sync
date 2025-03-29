"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Instagram, Linkedin, Mail, Facebook, MapPin } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Footer() {
  const { translations }: any = useLanguage()

  const currentYear = new Date().getFullYear()

  const pathname = usePathname()

  const navLinks = [
    { name: translations.navigation.home, href: "/" },
    { name: translations.navigation.services, href: "/services" },
    { name: translations.navigation.projects, href: "/projects" },
    { name: translations.navigation.contact, href: "/contact" },
  ]

  return (
    <footer className="w-full bg-background border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-center md:text-start">Social Sync</h3>
            <p className="text-sm text-muted-foreground text-center md:text-start">{translations.footer.tagline}</p>
            <div className="flex space-x-4 pt-2 justify-center md:justify-start">
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-[#DE5B80]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-[#DE5B80]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground hover:text-[#DE5B80]">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:contact@socialsync.com" className="text-muted-foreground hover:text-[#DE5B80]">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-center md:text-start">{translations.footer.quickLinks}</h3>

            <nav className="flex flex-col gap-4 items-center md:items-start">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#DE5B80]",
                    pathname === link.href ? "text-[#DE5B80]" : "text-foreground/80",
                  )}
                >
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-center md:text-start">{translations.services.title}</h3>

            <ul className="space-y-2 flex flex-col items-center md:items-start">
              <li>
                <Link href="/services#social-media" className="text-sm text-muted-foreground hover:text-[#DE5B80]">
                  {translations.services.socialMedia.title}
                </Link>
              </li>
              <li>
                <Link href="/services#paid-traffic" className="text-sm text-muted-foreground hover:text-[#DE5B80]">
                  {translations.services.paidTraffic.title}
                </Link>
              </li>
              <li>
                <Link href="/services#web-development" className="text-sm text-muted-foreground hover:text-[#DE5B80]">
                  {translations.services.webDevelopment.title}
                </Link>
              </li>
              <li>
                <Link href="/services#photography" className="text-sm text-muted-foreground hover:text-[#DE5B80]">
                  {translations.services.photography.title}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-center md:text-start">{translations.contact.title}</h3>
            <div className="flex justify-center md:justify-start">
              {/* <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-[#DE5B80] mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Rua Exemplo, 123
                  <br />
                  São Paulo, SP
                  <br />
                  Brasil
                </span>
              </div> */}
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#DE5B80]" />
                <Link
                  href="mailto:contact@socialsyncmkt.com"
                  className="text-sm text-muted-foreground hover:text-[#DE5B80]"
                >
                  contact@socialsyncmkt.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Social Sync. {translations.footer.allRightsReserved}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-[#DE5B80]">
              {translations.footer.privacyPolicy}
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-[#DE5B80]">
              {translations.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

