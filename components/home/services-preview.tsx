"use client"

import Link from "next/link"
import { ArrowRight, Heart, Layers, Star, Users, Video } from "lucide-react"
import { useReveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"
import { CtaBeam } from "@/components/ui/cta-beam"
import { HandwrittenWords } from "@/components/ui/handwritten-words"
import { useLanguage } from "@/components/language-provider"
import { useLocaleHref } from "@/lib/locale"
import { landingCopy } from "@/lib/landing-copy"

// One organic silhouette and one size for all four, so the cluster reads as a
// set. Each blob is only rotated differently, which keeps the hand-drawn feel
// without making them four unrelated shapes.
const BLOB_SHAPE = "rounded-[47%_53%_56%_44%/49%_51%_49%_51%]"
const BLOB_SIZE = "h-[44%] w-[44%]"

const services = [
  {
    id: "social-community",
    icon: Users,
    position: "left-[3%] top-[4%] -rotate-[7deg]",
    color: "from-[#f2a4bb] via-[#de5b80] to-[#b96a9d]",
    contentRotation: "rotate-[7deg]",
    delay: "",
  },
  {
    id: "branding-creative",
    icon: Star,
    position: "right-[7%] top-[1%] rotate-[5deg]",
    color: "from-[#3c215b] via-[#7b3f76] to-[#de5b80]",
    contentRotation: "-rotate-[5deg]",
    delay: "animation-delay-200",
  },
  {
    id: "photo-video",
    icon: Video,
    position: "bottom-[3%] left-[8%] rotate-[3deg]",
    color: "from-[#3c215b] via-[#251534] to-[#1c122f]",
    contentRotation: "-rotate-[3deg]",
    delay: "animation-delay-400",
  },
  {
    id: "web-technology",
    icon: Layers,
    position: "bottom-[5%] right-[4%] -rotate-[4deg]",
    color: "from-[#b7a4cf] via-[#8463a5] to-[#3c215b]",
    contentRotation: "rotate-[4deg]",
    delay: "animation-delay-600",
  },
]

export default function ServicesPreview() {
  const localeHref = useLocaleHref()
  const { ref, inView } = useReveal({ threshold: 0.08 })
  const { language } = useLanguage()
  const copy = landingCopy[language].services

  return (
    <section ref={ref} className="w-full overflow-hidden bg-[#F1EFE7] py-20 md:py-24 lg:min-h-[680px] lg:py-20">
      <div className="grid w-full items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(360px,0.72fr)_minmax(620px,1.28fr)] lg:gap-[clamp(2rem,4vw,6rem)] lg:px-[clamp(3rem,7vw,9rem)]">
        <div className={cn("relative z-10 opacity-0", inView && "animate-slide-up")}>
          <h2 className="text-[clamp(2.75rem,5vw,4.5rem)] font-bold leading-[0.99] tracking-[-0.055em] text-[#1C122F]">
            {copy.title[0]}
            <br />
            {copy.title[1]}
            <br />
            <span className="text-gradient-brand">{copy.title[2]}</span>
          </h2>
          <CtaBeam className="mt-10 md:mt-12">
            <Link
              href={localeHref("/services")}
              className="group inline-flex min-h-14 items-center gap-4 rounded-full bg-[#1C122F] px-7 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {copy.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </CtaBeam>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[500px] sm:max-w-[680px] lg:h-[520px] lg:max-w-[760px]">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <div
                key={service.id}
                className={cn(
                  "absolute flex flex-col items-center justify-center bg-gradient-to-br text-center text-white opacity-0 shadow-[inset_16px_18px_50px_rgba(255,255,255,0.12),inset_-22px_-24px_60px_rgba(28,18,47,0.18)]",
                  BLOB_SIZE,
                  BLOB_SHAPE,
                  service.position,
                  service.color,
                  inView && "animate-scale-in",
                  inView && service.delay,
                )}
              >
                <div className={service.contentRotation}>
                  <Icon className="mx-auto mb-3 h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                  <p className="text-base font-semibold leading-[1.12] tracking-[-0.02em] sm:text-lg lg:text-xl">
                    {copy.items[index][0]}
                    <br />
                    {copy.items[index][1]}
                  </p>
                </div>
              </div>
            )
          })}

          <div className="absolute top-[36%] z-10 hidden text-[#DE5B80] lg:-right-16 lg:block">
            {/* Each word inks itself in, left to right, in the same Caveat
                the rest of the site uses. */}
            <HandwrittenWords
              words={copy.notes}
              play={inView}
              color="#DE5B80"
              fontSize={34}
              className="flex flex-col items-start"
              wordClassName="leading-[0.9]"
              wordStyle={(index) => ({
                transform: `rotate(${-8 + index * 3}deg) translateX(${index * 7}px)`,
              })}
            />
            <Heart
              className={cn("ml-9 mt-3 h-6 w-6 -rotate-12 opacity-0", inView && "animate-fade-in")}
              style={{ animationDelay: "3.05s" }}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
