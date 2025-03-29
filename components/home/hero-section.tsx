"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
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
    <section className="relative w-full py-24 md:py-32 lg:py-40">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-background/90" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <h1
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight opacity-0",
              isVisible && "animate-fade-in",
            )}
          >
            <span className="text-[#DE5B80]">Social Sync</span>
            <span className="block mt-2">{title}</span>
          </h1>

          <p
            className={cn(
              "mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0",
              isVisible && "animate-fade-in animation-delay-200",
            )}
          >
            {subtitle}
          </p>

          <div
            className={cn("mt-8 flex flex-wrap gap-4 opacity-0", isVisible && "animate-fade-in animation-delay-400")}
          >
            <Button asChild size="lg" className="bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white">
              <Link href="/services">
                {translations.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/projects">{translations.navigation.projects}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

