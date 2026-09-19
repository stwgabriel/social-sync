"use client"

import { useLanguage } from "@/components/language-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useReveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"
import { urlFor } from "@/lib/sanity"

type Testimonial = {
  _id: string
  name: string
  position: string
  company: string
  content: string
  avatar: any
}

export default function Testimonials({ testimonials }: { testimonials?: Testimonial[] }) {
  const { translations } = useLanguage()

  const { ref: sectionRef, inView: sectionIsVisible } = useReveal({
    threshold: 0.1,
  })

  if (!testimonials?.length) {
    return null
  }

  return (
    <section ref={sectionRef} className="w-full bg-background py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            className={cn(
              "max-w-xl text-4xl font-bold tracking-tight opacity-0 md:text-5xl",
              sectionIsVisible && "animate-slide-up",
            )}
          >
            {translations.testimonials.title}
          </h2>
          <p
            className={cn(
              "text-lg text-muted-foreground opacity-0",
              sectionIsVisible && "animate-fade-in animation-delay-200",
            )}
          >
            {translations.testimonials.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial._id}
              className={cn(
                "flex flex-col justify-between rounded-3xl border border-foreground/10 bg-card p-8 opacity-0",
                index === 1 && "md:-translate-y-6",
                sectionIsVisible && `animate-slide-up animation-delay-${Math.min(index * 200, 600)}`,
              )}
            >
              <blockquote>
                <Quote className="h-7 w-7 text-[#DE5B80]" />
                <p className="mt-5 text-lg leading-relaxed text-foreground/80">"{testimonial.content}"</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center border-t border-foreground/10 pt-6">
                <Avatar className="h-11 w-11">
                  <AvatarImage
                    src={
                      testimonial.avatar
                        ? urlFor(testimonial.avatar).width(100).height(100).url()
                        : "/placeholder.svg?height=100&width=100"
                    }
                    alt={testimonial.name}
                  />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
