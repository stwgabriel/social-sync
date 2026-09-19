"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useReveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"
import { CtaBeam } from "@/components/ui/cta-beam"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight, Calendar } from "lucide-react"
import { submitContactForm } from "@/lib/actions"
import { useLanguage } from "@/components/language-provider"
import { landingCopy } from "@/lib/landing-copy"

const inputClasses =
  "h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-[#8B5CF6]"

export default function ContactSection() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const copy = landingCopy[language].contact

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const { ref: sectionRef, inView: sectionIsVisible } = useReveal({
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.company,
        message: formData.message,
        language,
      })

      if (result.success) {
        toast({
          title: copy.success,
          duration: 5000,
        })

        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        })
      } else {
        toast({
          title: copy.error,
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: copy.error,
        variant: "destructive",
        duration: 5000,
      })
    }

    setIsSubmitting(false)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#DE5B80] via-[#D24F7C] to-[#B83F70] py-20 text-white md:py-28"
    >
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#F1EFE7]/25 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#3C215B]/35 blur-[140px]" aria-hidden="true" />
      <div className="relative w-full px-5 sm:px-8 lg:px-[clamp(3rem,7vw,9rem)]">
        <div className="grid w-full gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left column: eyebrow + headline */}
          <div className={cn("opacity-0 lg:col-span-4", sectionIsVisible && "animate-slide-up")}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1C122F]/65">{copy.eyebrow}</p>
            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#1C122F] md:text-5xl lg:text-6xl">
              {copy.title[0]}
              <br />
              {copy.title[1]}
              <br />
              {copy.title[2]}
            </h2>
          </div>

          {/* Center: form panel */}
          <div
            className={cn(
              "rounded-2xl border border-white/10 bg-[#221A31]/65 p-6 opacity-0 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-8 lg:col-span-5",
              sectionIsVisible && "animate-slide-up animation-delay-200",
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-white/70">
                    {copy.name}
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder={copy.namePlaceholder}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-white/70">
                    {copy.email}
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder={copy.emailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-company" className="text-sm font-medium text-white/70">
                  {copy.company}
                </label>
                <Input
                  id="contact-company"
                  name="company"
                  placeholder={copy.companyPlaceholder}
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-white/70">
                  {copy.message}
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder={copy.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[120px] rounded-lg border-white/10 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-[#8B5CF6]"
                />
              </div>
              <CtaBeam className="w-full rounded-lg" strength={0.8}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-lg bg-[#8B5CF6] text-base font-semibold text-white hover:bg-[#7C3AED]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {copy.sending}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                    {copy.send}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </CtaBeam>
            </form>
          </div>

          {/* Right column: handwritten note + call card */}
          <div
            className={cn(
              "flex flex-col gap-8 opacity-0 lg:col-span-3",
              sectionIsVisible && "animate-slide-up animation-delay-400",
            )}
          >
            <p className="font-hand -rotate-3 text-right text-2xl leading-tight text-[#1C122F] md:text-3xl">
              {copy.note[0]}
              <br />
              {copy.note[1]}
            </p>

            <div className="rounded-2xl border border-white/10 bg-[#221A31]/65 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{copy.callTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {copy.callDescription}
              </p>
              <CtaBeam className="mt-6 w-full rounded-lg" strength={0.55}>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-lg border-white/20 bg-[#221A31] text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="https://calendar.notion.so/meet/stwgabriel2/me" target="_blank" rel="noreferrer">
                    {copy.callCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CtaBeam>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
