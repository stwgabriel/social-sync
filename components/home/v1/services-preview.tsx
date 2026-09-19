"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, LineChart, Code, Camera } from "lucide-react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

type Service = {
  _id: string
  title: string
  slug: { current: string }
  description: string
  icon: string
}

export default function ServicesPreview({ services }: { services?: Service[] }) {
  const { translations } = useLanguage()

  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // If no services are provided from CMS, use default services
  const defaultServices = [
    {
      _id: "social-media",
      icon: "share2",
      title: translations.services.socialMedia.title,
      description: translations.services.socialMedia.description,
      slug: { current: "social-media" },
    },
    {
      _id: "paid-traffic",
      icon: "lineChart",
      title: translations.services.paidTraffic.title,
      description: translations.services.paidTraffic.description,
      slug: { current: "paid-traffic" },
    },
    {
      _id: "web-development",
      icon: "code",
      title: translations.services.webDevelopment.title,
      description: translations.services.webDevelopment.description,
      slug: { current: "web-development" },
    },
    {
      _id: "photography",
      icon: "camera",
      title: translations.services.photography.title,
      description: translations.services.photography.description,
      slug: { current: "photography" },
    },
  ]

  const displayServices = services || defaultServices

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "share2":
        return <Share2 className="h-8 w-8 text-[#DE5B80]" />
      case "lineChart":
        return <LineChart className="h-8 w-8 text-[#DE5B80]" />
      case "code":
        return <Code className="h-8 w-8 text-[#DE5B80]" />
      case "camera":
        return <Camera className="h-8 w-8 text-[#DE5B80]" />
      default:
        return <Share2 className="h-8 w-8 text-[#DE5B80]" />
    }
  }

  return (
    <section ref={sectionRef} className="py-20 w-full bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className={cn("text-3xl md:text-4xl font-bold mb-4 opacity-0", sectionIsVisible && "animate-fade-in")}>
            {translations.services.title}
          </h2>
          <div className="w-20 h-1 bg-[#DE5B80] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {displayServices.map((service, index) => (
            <Card
              key={service._id}
              className={cn(
                "border-2 border-border hover:border-[#DE5B80]/50 transition-all duration-300 opacity-0",
                sectionIsVisible && `animate-slide-up animation-delay-${index * 200}`,
              )}
            >
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">{renderIcon(service.icon)}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link href={`/services#${service.slug.current}`}>{translations.services.viewAll}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className={cn(
              "bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white opacity-0",
              sectionIsVisible && "animate-fade-in animation-delay-600",
            )}
          >
            <Link href="/services">{translations.services.viewAll}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

