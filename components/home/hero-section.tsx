"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Crown, Globe, Instagram, Linkedin, Play, Youtube } from "lucide-react"
import { CtaBeam } from "@/components/ui/cta-beam"
import { HandwrittenWords } from "@/components/ui/handwritten-words"
import { LiquidWave } from "@/components/ui/liquid-wave"
import { useReveal } from "@/lib/reveal"
import { useLanguage } from "@/components/language-provider"
import { useLocaleHref } from "@/lib/locale"
import { landingCopy } from "@/lib/landing-copy"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.047.88.14V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  )
}

function HandArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 6 C 14 26, 26 40, 46 48"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M36 50 L 47 48.5 L 42 38"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HeroSection() {
  const localeHref = useLocaleHref()
  const { language } = useLanguage()
  const copy = landingCopy[language].hero

  // The hero's entrance animations are plain CSS that runs on mount, so the
  // only reliable way to replay them is to remount the content. Bumping this
  // key on re-entry gives every reveal a fresh node and a fresh animation.
  // initialInView keeps the first paint from counting as a re-entry.
  const { ref: heroRef, inView: heroInView } = useReveal({ threshold: 0.25, initialInView: true })
  const [heroCycle, setHeroCycle] = useState(0)
  const hasLeftHero = useRef(false)

  useEffect(() => {
    if (!heroInView) {
      hasLeftHero.current = true
      return
    }
    if (hasLeftHero.current) {
      hasLeftHero.current = false
      setHeroCycle((cycle) => cycle + 1)
    }
  }, [heroInView])

  return (
    <section ref={heroRef} className="relative min-h-[100svh] w-full overflow-hidden bg-[#1C122F]">
      {/* Background photo: the wrapper moves and the blurred image inside it
          stays put, so the blur is rasterised once (see globals.css) */}
      <div className="hero-background-motion absolute inset-0">
        <Image
          src="/images/herobg.png"
          alt="A group of smiling people outdoors"
          fill
          priority
          sizes="100vw"
          className="hero-background-still object-cover object-center blur-[1.5px]"
        />
      </div>
      {/* Legibility overlays: darker at top (navbar) and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C122F]/70 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#1C122F] via-[#1C122F]/70 to-transparent" aria-hidden="true" />
      <div className="hero-glow hero-glow-left" aria-hidden="true" />
      <div className="hero-glow hero-glow-right" aria-hidden="true" />

      <div
        key={heroCycle}
        className="relative flex min-h-[100svh] w-full flex-col px-5 pb-28 pt-28 sm:px-8 md:pt-32 lg:px-[clamp(3rem,5vw,6rem)]"
      >
        {/* Top-left handwritten annotation */}
        <div className="hero-note hero-note-left absolute left-[clamp(3rem,7vw,9rem)] top-[18%] hidden -rotate-6 lg:block">
          <HandwrittenWords
            words={copy.note}
            play
            color="#FFFFFF"
            fontSize={30}
            className="flex flex-col items-start"
          />
          <HandArrow className="ml-6 mt-1 h-10 w-10 text-white" />
        </div>

        {/* Top-right handwritten annotation + globe */}
        <div className="hero-note hero-note-right absolute right-[clamp(3rem,7vw,9rem)] top-[17%] hidden rotate-3 text-right lg:block">
          <HandwrittenWords
            words={copy.actions}
            play
            color="#FFFFFF"
            fontSize={30}
            className="flex flex-col items-end"
          />
          <span className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-white/80">
            <Globe className="h-5 w-5 text-white" strokeWidth={1.5} />
          </span>
        </div>

        {/* Polaroid card */}
        <div className="hero-polaroid-float absolute left-[clamp(3rem,6vw,8rem)] top-[51%] hidden w-[clamp(12rem,14vw,15rem)] -translate-y-1/2 -rotate-[8deg] rounded-md bg-white p-3 pb-4 shadow-2xl lg:block">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/hero-polaroid.jpg"
              alt={`${copy.polaroid[0]} — ${copy.polaroid[1]}`}
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
          <div className="mt-2 -rotate-2">
            <HandwrittenWords
              words={copy.polaroid}
              play
              color="#EC4899"
              colorAt={(index) => (index === 1 ? "#1C122F" : undefined)}
              fontSize={20}
              className="flex flex-col items-center"
            />
            <span className="block text-center text-xl leading-tight text-[#1C122F]" aria-hidden="true">
              &hearts;
            </span>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="hero-phone-float absolute right-[clamp(8rem,13vw,17rem)] top-[35%] hidden w-[clamp(10.5rem,12vw,13rem)] rotate-6 lg:block">
          <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-[#1C122F] bg-[#1C122F] shadow-2xl">
            <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2rem]">
              <Image src="/images/herobg.png" alt="" fill sizes="192px" className="object-cover object-right" />
              <div className="absolute inset-0 bg-[#1C122F]/40" aria-hidden="true" />
              {/* Notch */}
              <div className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-[#1C122F]" aria-hidden="true" />
              <div className="absolute inset-0 flex -rotate-3 flex-col items-center justify-center">
                <HandwrittenWords
                  words={copy.phone}
                  play
                  color="#FFFFFF"
                  fontSize={30}
                  className="flex flex-col items-center"
                />
                <span className="font-hand text-3xl leading-tight text-white" aria-hidden="true">
                  &hearts;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right-edge service list */}
        <ul className="absolute right-[clamp(2.5rem,5vw,6rem)] top-[43%] hidden space-y-1.5 text-right text-xs uppercase tracking-wide text-white/80 lg:block">
          {copy.services.map((service, index) => (
            <li
              key={service}
              className="hero-service-reveal"
              style={{ animationDelay: `${1.25 + index * 0.1}s` }}
            >
              {service}
            </li>
          ))}
        </ul>

        {/* Center content */}
        <div className="absolute left-1/2 top-[47%] z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-5 text-center">
          <div className="hero-title-reveal">
            <Crown className="hero-crown-float mx-auto h-7 w-7 text-white/70" strokeWidth={1.5} aria-hidden="true" />
            <h1 className="mt-3 text-[clamp(3.25rem,6.4vw,7rem)] font-extrabold leading-[0.86] tracking-[-0.06em] text-white">
              <span className="hero-title-line block">{copy.title[0]}</span>
              <span className="hero-title-line hero-title-line-accent block">
                <span className="font-hand inline-block bg-gradient-to-r from-[#8B4DFF] via-[#C747E8] to-[#DE5B80] bg-clip-text px-2 text-[1.12em] font-bold italic tracking-[-0.035em] text-transparent">
                  {copy.title[1]}
                </span>
              </span>
              <span className="hero-title-line hero-title-line-last block">{copy.title[2]}</span>
            </h1>
          </div>
        </div>

        <div className="hero-controls-reveal absolute inset-x-5 bottom-[clamp(6.5rem,12vh,9rem)] z-10 flex flex-col items-center justify-center gap-7 sm:inset-x-8 lg:inset-x-[clamp(3rem,5vw,6rem)]">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <CtaBeam theme="light" variant="ocean" strength={0.8}>
              <Link
                href={localeHref("/contact")}
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-[#1C122F] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {copy.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </CtaBeam>
            <button type="button" className="group flex items-center gap-3 text-white">
              <span className="hero-play-pulse flex h-14 w-14 items-center justify-center rounded-full bg-black/60 transition-transform duration-300 group-hover:scale-105">
                <Play className="ml-0.5 h-5 w-5 fill-white text-white" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">{copy.story}</span>
            </button>
          </div>

          <div className="hero-socials-reveal flex items-center gap-5 text-white lg:absolute lg:right-0">
            <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-70">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="TikTok" className="transition-opacity hover:opacity-70">
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition-opacity hover:opacity-70">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="transition-opacity hover:opacity-70">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom border: looping liquid wave into the cream section */}
      <LiquidWave
        fill="#F1EFE7"
        backFill="#DE5B80"
        backOpacity={0.55}
        shadow="0 -14px 22px rgba(60, 33, 91, 0.65)"
        className="absolute -bottom-px left-0 h-[56px] w-full sm:h-[76px] lg:h-[110px]"
      />
    </section>
  )
}
