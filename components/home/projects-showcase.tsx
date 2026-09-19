"use client"

import Link from "next/link"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { LiquidWave } from "@/components/ui/liquid-wave"
import { useLanguage } from "@/components/language-provider"
import { landingCopy } from "@/lib/landing-copy"

const stats = [
  { value: "50+" },
  { value: "3x" },
  { value: "96%" },
]

const cards = [
  {
    image: "/images/projects/community.jpg",
    className: "md:translate-y-8 md:rotate-[-4deg] z-10",
    overlay: "from-[#DE5B80]/45 via-[#3C215B]/20 to-transparent",
  },
  {
    image: "/images/projects/identity.jpg",
    className: "md:-ml-8 md:-translate-y-2 z-20",
    overlay: "from-[#3C215B]/55 via-transparent to-[#DE5B80]/25",
  },
  {
    image: "/images/projects/stories.jpg",
    className: "md:-ml-6 md:translate-y-10 md:rotate-[4deg] z-0",
    overlay: "from-[#DE5B80]/35 via-transparent to-[#3C215B]/55",
  },
]

export default function ProjectsShowcase() {
  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { language } = useLanguage()
  const copy = landingCopy[language].projects

  return (
    <div className="bg-[#F1EFE7]">
      {/* Top edge: looping liquid wave out of the cream section */}
      <LiquidWave
        fill="#1C122F"
        shadow="0 -10px 14px rgba(28, 18, 47, 0.28)"
        className="relative block h-[48px] w-full sm:h-[66px] lg:h-[90px]"
      />

      <section
        ref={sectionRef}
        className="w-full bg-[#1C122F] py-16 text-white md:py-24 lg:py-28"
      >
        <div className="grid w-full items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(340px,0.72fr)_minmax(620px,1.28fr)] lg:gap-[clamp(2rem,5vw,7rem)] lg:px-[clamp(3rem,8vw,10rem)]">
          {/* Left column: heading, stats, link */}
          <div>
            <h2
              className={cn(
                "text-4xl font-bold leading-[1.1] tracking-tight opacity-0 md:text-5xl lg:text-6xl",
                sectionIsVisible && "animate-slide-up",
              )}
            >
              <span className="block text-white">{copy.title[0]}</span>
              <span className="block bg-gradient-to-r from-[#9D63FF] via-[#C95ADB] to-[#FF6F9B] bg-clip-text text-transparent">
                {copy.title[1]}
              </span>
            </h2>

            <div
              className={cn(
                "mt-12 flex flex-wrap divide-x divide-white/15 opacity-0 md:mt-16",
                sectionIsVisible && "animate-fade-in animation-delay-200",
              )}
            >
              {stats.map((stat, index) => (
                <div key={stat.value} className="pr-8 pl-8 first:pl-0 md:pr-12">
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-white/80">{copy.stats[index]}</div>
                </div>
              ))}
            </div>

            <div
              className={cn(
                "mt-12 opacity-0 md:mt-16",
                sectionIsVisible && "animate-fade-in animation-delay-400",
              )}
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-base font-semibold text-white underline decoration-white/40 underline-offset-8 transition-colors hover:decoration-white"
              >
                {copy.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right column: fanned photo cards */}
          <div className="relative min-w-0">
            <div
              className={cn(
                "flex w-full max-w-full gap-5 overflow-x-auto pb-6 opacity-0 md:justify-center md:gap-0 md:overflow-visible md:pb-12",
                sectionIsVisible && "animate-slide-up animation-delay-200",
              )}
            >
              {cards.map((card, index) => (
                <Link
                  key={card.image}
                  href="/projects"
                  className={cn(
                    "group relative block aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/30 transition-transform duration-300 hover:scale-[1.03] hover:!z-30 md:w-[clamp(12rem,15vw,18rem)]",
                    card.className,
                  )}
                >
                  <Image
                    src={card.image}
                    alt={copy.cards[index].join(" ")}
                    fill
                    sizes="(max-width: 768px) 224px, 240px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Moody violet/pink grade */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-tr",
                      card.overlay,
                    )}
                    aria-hidden="true"
                  />
                  {/* Legibility gradient + label */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#1C122F] via-[#1C122F]/25 to-black/5"
                    aria-hidden="true"
                  />
                  <p className="absolute bottom-5 left-5 text-xl font-bold leading-snug text-white">
                    {copy.cards[index][0]}
                    <br />
                    {copy.cards[index][1]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wavy bottom edge */}
      <svg
        className="block w-full"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1440,0 L1440,25 C1180,82 940,12 700,48 C460,84 220,18 0,60 Z"
          fill="#1C122F"
        />
      </svg>
    </div>
  )
}
