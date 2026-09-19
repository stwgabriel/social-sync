"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { CtaBeam } from "@/components/ui/cta-beam"
import { useLanguage } from "@/components/language-provider"
import { landingCopy } from "@/lib/landing-copy"

const values = [
  {
    shape: <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#C4B5FD] to-[#8B5CF6]" />,
  },
  {
    shape: <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#F87171] to-[#F9A8D4]" />,
  },
  {
    shape: (
      <div
        className="h-14 w-14 bg-gradient-to-b from-[#A78BFA] to-[#F472B6]"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />
    ),
  },
  {
    shape: (
      <div className="relative h-14 w-14">
        <span className="absolute left-0 top-0 h-8 w-8 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6]" />
        <span className="absolute right-0 top-0 h-8 w-8 rounded-full bg-gradient-to-bl from-[#C4B5FD] to-[#A78BFA]" />
        <span className="absolute bottom-0 left-0 h-8 w-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#A78BFA]" />
        <span className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-gradient-to-tl from-[#F472B6] to-[#A78BFA]" />
        <span
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-[#F4F1EA]"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
      </div>
    ),
  },
]

const pins = [
  { left: "49%", top: "50%", line: "h-24 md:h-32" },
  { left: "60%", top: "32%", line: "h-32 md:h-40" },
  { left: "73%", top: "17%", line: "h-40 md:h-52" },
  { left: "84%", top: "5%", line: "h-32 md:h-40" },
]

export default function VisionSection() {
  const { ref: visionRef, inView: visionInView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { language } = useLanguage()
  const copy = landingCopy[language].vision

  return (
    <section>
      {/* Part 1 — cream section with gradient hills */}
      <div ref={visionRef} className="relative overflow-hidden bg-[#F4F1EA]">
        {/* Layered wavy hills */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] md:h-[80%]" aria-hidden="true">
          <svg className="h-full w-full" viewBox="0 0 1440 620" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="vision-hill-back" x1="720" y1="40" x2="1100" y2="620" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C4B5FD" />
                <stop offset="0.55" stopColor="#A78BFA" stopOpacity="0.9" />
                <stop offset="1" stopColor="#7C3AED" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="vision-hill-mid" x1="900" y1="180" x2="1200" y2="620" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDBA8C" />
                <stop offset="0.35" stopColor="#F472B6" stopOpacity="0.95" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="vision-hill-front" x1="720" y1="300" x2="900" y2="620" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6D28D9" />
                <stop offset="0.6" stopColor="#3B2A5A" />
                <stop offset="1" stopColor="#17121F" />
              </linearGradient>
            </defs>
            <path
              d="M420,620 C560,540 680,420 840,330 C1020,230 1160,120 1440,60 L1440,620 Z"
              fill="url(#vision-hill-back)"
            />
            <path
              d="M540,620 C700,560 860,470 1020,380 C1180,290 1320,260 1440,220 L1440,620 Z"
              fill="url(#vision-hill-mid)"
              opacity="0.9"
            />
            <path
              d="M0,620 C240,600 480,560 720,490 C980,415 1220,400 1440,320 L1440,620 L0,620 Z"
              fill="url(#vision-hill-front)"
            />
          </svg>
        </div>

        {/* Milestone pins */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          {pins.map((pin, index) => (
            <div key={copy.pins[index]} className="absolute" style={{ left: pin.left, top: pin.top }}>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#17121F]">{copy.pins[index]}</span>
              </div>
              <div className="ml-[4px]">
                <span className={cn("block w-px bg-gradient-to-b from-[#8B5CF6]/70 to-[#8B5CF6]/10", pin.line)} />
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-5 pb-48 pt-24 sm:px-8 md:pb-72 md:pt-32 lg:px-[clamp(3rem,7vw,9rem)] lg:pb-80">
          <div>
            <h2
              className={cn(
                "text-4xl font-bold leading-[1.05] tracking-tight text-[#17121F] opacity-0 md:text-6xl lg:text-7xl",
                visionInView && "animate-slide-up",
              )}
            >
              {copy.title[0]}
              <br />
              <span className="text-gradient-brand">{copy.title[1]}</span>
            </h2>

            <div
              className={cn(
                "mt-14 grid grid-cols-2 gap-x-8 gap-y-10 opacity-0 sm:flex sm:flex-wrap sm:gap-x-14",
                visionInView && "animate-fade-in animation-delay-200",
              )}
            >
              {values.map((value, index) => (
                <div key={copy.values[index].join(" ")} className="flex flex-col gap-5">
                  {value.shape}
                  <p className="text-sm font-semibold leading-snug text-[#17121F]">
                    {copy.values[index][0]}
                    <br />
                    {copy.values[index][1]}
                  </p>
                </div>
              ))}
            </div>

            <div className={cn("mt-14 opacity-0", visionInView && "animate-fade-in animation-delay-400")}>
              <CtaBeam>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#17121F] px-8 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {copy.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </CtaBeam>
            </div>
          </div>
        </div>

        {/* Organic wavy transition into the dark band */}
        <svg
          className="absolute inset-x-0 bottom-0 block h-16 w-full md:h-24"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,55 C220,90 460,5 740,25 C1000,44 1220,85 1440,35 L1440,90 L0,90 Z" fill="#17121F" />
        </svg>
      </div>

      {/* Part 2 — dark band */}
      <div ref={teamRef} className="relative overflow-hidden bg-[#17121F] text-white">
        <div className="relative z-10 w-full px-5 pb-32 pt-10 sm:px-8 md:pb-40 md:pt-14 lg:px-[clamp(3rem,7vw,9rem)]">
          <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
            <h2
              className={cn(
                "text-4xl font-bold leading-[1.05] tracking-tight opacity-0 md:text-6xl lg:text-7xl",
                teamInView && "animate-slide-up",
              )}
            >
              {copy.team[0]}
              <br />
              <span className="text-gradient-brand">{copy.team[1]}</span>
            </h2>

            <div
              className={cn(
                "flex items-center gap-6 opacity-0",
                teamInView && "animate-fade-in animation-delay-200",
              )}
            >
              <div className="relative h-24 w-24 shrink-0" aria-hidden="true">
                <span className="absolute inset-0 rounded-full border border-white/20" />
                <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F472B6]" />
                <span className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6]" />
              </div>
              <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.25em] text-white/70">
                {copy.connected[0]}
                <br />
                {copy.connected[1]}
                <br />
                {copy.connected[2]}
              </p>
            </div>
          </div>
        </div>

        <svg
          className="absolute inset-x-0 bottom-0 h-28 w-full md:h-36"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,74 C210,15 420,112 690,60 C940,12 1180,102 1440,38 L1440,140 L0,140 Z"
            fill="#3C215B"
          />
          <path
            d="M0,98 C240,42 455,132 730,82 C1010,32 1215,119 1440,66 L1440,140 L0,140 Z"
            fill="#DE5B80"
          />
        </svg>
      </div>
    </section>
  )
}
