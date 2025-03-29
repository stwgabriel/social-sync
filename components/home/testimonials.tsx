"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useInView } from "react-intersection-observer"
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

  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Default testimonials if none are provided from CMS
  const defaultTestimonials = [
    {
      _id: "1",
      name: "Ana Silva",
      position: "Marketing Director",
      company: "TechCorp",
      content:
        "A parceria com a Social Sync transformou nossa presença nas redes sociais. O engajamento aumentou significativamente e as conversões triplicaram em apenas três meses.",
      avatar: null,
    },
    {
      _id: "2",
      name: "Carlos Mendes",
      position: "CEO",
      company: "Fashion Brand",
      content:
        "As fotos produzidas pela equipe da Social Sync elevaram o padrão visual da nossa marca. A qualidade é excepcional e o retorno sobre o investimento foi imediato.",
      avatar: null,
    },
    {
      _id: "3",
      name: "Juliana Costa",
      position: "Owner",
      company: "Local Restaurant",
      content:
        "Nosso novo site desenvolvido pela Social Sync não só ficou lindo como também melhorou significativamente nossas vendas online. O processo foi simples e profissional.",
      avatar: null,
    },
  ]

  const displayTestimonials = testimonials || defaultTestimonials

  return (
    <section ref={sectionRef} className="py-20 w-full bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className={cn("text-3xl md:text-4xl font-bold mb-4 opacity-0", sectionIsVisible && "animate-fade-in")}>
            {translations.testimonials.title}
          </h2>
          <p
            className={cn(
              "text-lg text-muted-foreground max-w-2xl mx-auto opacity-0",
              sectionIsVisible && "animate-fade-in animation-delay-200",
            )}
          >
            {translations.testimonials.subtitle}
          </p>
          <div className="w-20 h-1 bg-[#DE5B80] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial, index) => (
            <Card
              key={testimonial._id}
              className={cn(
                "bg-muted/50 opacity-0",
                sectionIsVisible && `animate-slide-up animation-delay-${index * 200}`,
              )}
            >
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-[#DE5B80] mb-4 opacity-70" />
                <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 border-2 border-[#DE5B80]">
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
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.position}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

