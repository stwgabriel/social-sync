"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, Facebook, Instagram, Linkedin, Sparkles, Youtube } from "lucide-react"
import { urlFor } from "@/lib/sanity"

type HeroData = {
  title?: string
  subtitle?: string
  image?: any
}

export default function HeroSection({ heroData }: { heroData?: HeroData }) {
  const { translations } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Use CMS data if available, otherwise fall back to translations
  const title = heroData?.title || translations.hero.title
  const subtitle = heroData?.subtitle || translations.hero.tagline
  const backgroundImage = heroData?.image
    ? urlFor(heroData.image).width(1920).height(1080).url()
    : "/placeholder.svg?height=1080&width=1920"

  return (
    <section className="relative isolate min-h-[min(780px,92vh)] w-full overflow-hidden bg-secondary py-28 text-white md:py-36 lg:py-44">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_32%,rgba(222,91,128,0.28),transparent_26%),radial-gradient(circle_at_24%_94%,rgba(113,78,154,0.42),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/70" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-screen"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="hero-grid absolute inset-0 opacity-40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.75fr)] lg:gap-10">
          <div className="max-w-3xl">
          <h1
            className={cn(
              "max-w-4xl text-5xl font-bold tracking-[-0.04em] opacity-0 md:text-6xl lg:text-8xl",
              isVisible && "animate-fade-in",
            )}
          >
            <span className="text-gradient-pulse">Social Sync</span>
            <span className="mt-4 block text-balance">{title}</span>
          </h1>

          <p
            className={cn(
              "mt-7 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl opacity-0",
              isVisible && "animate-fade-in animation-delay-200",
            )}
          >
            {subtitle}
          </p>

          <div
            className={cn("mt-9 flex flex-wrap gap-4 opacity-0", isVisible && "animate-fade-in animation-delay-400")}
          >
            <Button asChild size="lg" className="group bg-[#DE5B80] px-6 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_18px_45px_rgba(222,91,128,0.24)] transition-transform duration-300 hover:-translate-y-1 hover:bg-[#DE5B80]/90">
              <Link href="/services">
                {translations.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="border-white/20 bg-white/5 text-white backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10 hover:text-white">
              <Link href="/projects">{translations.navigation.projects}</Link>
            </Button>
          </div>
          </div>

          <div className="hero-signal relative mx-auto aspect-square w-full max-w-[520px]" aria-label="Social Sync network preview">
            <div className="hero-signal-glow absolute inset-[18%] rounded-full bg-[#DE5B80]/20 blur-3xl" />
            <div className="hero-signal-ring absolute inset-[9%] rounded-full border border-white/15" />
            <div className="hero-signal-ring hero-signal-ring-delayed absolute inset-[24%] rounded-full border border-[#DE5B80]/40" />
            <div className="absolute inset-0 animate-signal-drift">
              <span className="hero-signal-node left-[8%] top-[33%]"><Instagram className="h-5 w-5" /></span>
              <span className="hero-signal-node right-[7%] top-[23%]"><Linkedin className="h-5 w-5" /></span>
              <span className="hero-signal-node bottom-[18%] left-[23%]"><Facebook className="h-5 w-5" /></span>
              <span className="hero-signal-node bottom-[12%] right-[21%]"><Youtube className="h-5 w-5" /></span>
            </div>
            <div className="absolute left-1/2 top-1/2 w-[min(74%,330px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/20 bg-[#281943]/90 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-7">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                <span>Signal board</span>
                <Sparkles className="h-4 w-4 text-[#DE5B80]" />
              </div>
              <div className="mt-7 flex items-end gap-2">
                {[38, 58, 44, 72, 64, 88, 76, 96].map((height, index) => (
                  <span key={index} className="hero-signal-bar" style={{ height: `${height}%`, animationDelay: `${index * 90}ms` }} />
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm text-white/60">Content in motion</span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff9bb2]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#DE5B80]" />Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
