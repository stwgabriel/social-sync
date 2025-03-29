"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Share2, LineChart, Code, Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { fetchSanityData } from "@/lib/sanity"
import { getAllServicesQuery } from "@/lib/queries"
import { urlFor } from "@/lib/sanity"
import { useThemeContext } from "@/components/theme-context"

type Service = {
  _id: string
  title: string
  slug: { current: string }
  description: string
  icon: string
  features: string[]
  image: any
}

export default function ServicesPage() {
  const { translations } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { forceLightMode, setForceLightMode } = useThemeContext()

  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Each section gets its own InView observer
  const { ref: socialRef, inView: socialVisible } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: trafficRef, inView: trafficVisible } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: webRef, inView: webVisible } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: photoRef, inView: photoVisible } = useInView({ triggerOnce: true, threshold: 0.1 })

  // Fetch services from Sanity
  useEffect(() => {
    async function fetchServices() {
      setIsLoading(true)
      try {
        const servicesData = await fetchSanityData<Service[]>(getAllServicesQuery)
        if (servicesData) {
          setServices(servicesData)
        }
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Use a different theme for the photography section
  // This will force light mode specifically for the photography section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Set to light mode when photography section is in view
          setForceLightMode(true)
          setTheme("light")
          document.getElementById("photography")?.classList.add("photography-section")
        } else {
          // Remove light mode when photography section is not in view
          setForceLightMode(false)
          document.getElementById("photography")?.classList.remove("photography-section")
        }
      },
      { threshold: 0.3 },
    )

    const target = document.getElementById("photography")
    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [setForceLightMode, setTheme])

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

  // Default services if none are loaded from CMS
  const defaultServices = [
    {
      _id: "social-media",
      title: translations.services.socialMedia.title,
      slug: { current: "social-media" },
      description: translations.services.socialMedia.description,
      icon: "share2",
      features: [
        "Estratégia de conteúdo personalizada",
        "Calendário editorial e planejamento",
        "Criação e produção de conteúdo",
        "Análise de métricas e resultados",
      ],
      image: null,
    },
    {
      _id: "paid-traffic",
      title: translations.services.paidTraffic.title,
      slug: { current: "paid-traffic" },
      description: translations.services.paidTraffic.description,
      icon: "lineChart",
      features: [
        "Google Ads e Meta Ads",
        "Remarketing e campanhas de conversão",
        "Otimização e análise de performance",
        "Relatórios de ROI e resultados",
      ],
      image: null,
    },
    {
      _id: "web-development",
      title: translations.services.webDevelopment.title,
      slug: { current: "web-development" },
      description: translations.services.webDevelopment.description,
      icon: "code",
      features: [
        "Sites institucionais e landing pages",
        "E-commerce e soluções de vendas online",
        "Aplicativos web e soluções personalizadas",
        "Manutenção e otimização de sites existentes",
      ],
      image: null,
    },
    {
      _id: "photography",
      title: translations.services.photography.title,
      slug: { current: "photography" },
      description: translations.services.photography.description,
      icon: "camera",
      features: [
        "Fotografia de produtos",
        "Fotografia institucional e corporativa",
        "Produção de imagens para redes sociais",
        "Direção de arte e produção visual",
      ],
      image: null,
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  // Find specific services by ID
  const findServiceById = (id: string) => {
    return displayServices.find((service) => service._id === id || service.slug.current === id)
  }

  const socialMediaService = findServiceById("social-media")
  const paidTrafficService = findServiceById("paid-traffic")
  const webDevelopmentService = findServiceById("web-development")
  const photographyService = findServiceById("photography")

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{translations.services.title}</h1>
          <div className="w-20 h-1 bg-[#DE5B80] mx-auto mb-8" />
          <p className="text-xl text-white/70 max-w-3xl mx-auto">{translations.services.title}</p>
        </div>
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Social Media */}
          {socialMediaService && (
            <section ref={socialRef} id="social-media" className="py-20 bg-background">
              <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={cn("opacity-0", socialVisible && "animate-fade-in")}>
                    <div className="inline-flex items-center justify-center rounded-full bg-[#DE5B80]/10 p-3 mb-6">
                      {renderIcon(socialMediaService.icon)}
                    </div>
                    <h2 className="text-3xl font-bold mb-6">{socialMediaService.title}</h2>
                    <p className="text-lg text-muted-foreground mb-8">{socialMediaService.description}</p>
                    <ul className="space-y-3 mb-8">
                      {socialMediaService.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="rounded-full bg-[#DE5B80]/10 p-1 mr-3 mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#DE5B80]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white">
                      <Link href="/contact">{translations.services.contactUs}</Link>
                    </Button>
                  </div>
                  <div
                    className={cn(
                      "relative h-[400px] rounded-xl overflow-hidden opacity-0",
                      socialVisible && "animate-slide-up animation-delay-200",
                    )}
                  >
                    <Image
                      src={
                        socialMediaService.image
                          ? urlFor(socialMediaService.image).width(800).height(800).url()
                          : "/placeholder.svg?height=800&width=800"
                      }
                      alt="Social Media Services"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Paid Traffic */}
          {paidTrafficService && (
            <section ref={trafficRef} id="paid-traffic" className="py-20 bg-muted">
              <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div
                    className={cn(
                      "relative h-[400px] rounded-xl overflow-hidden order-2 md:order-1 opacity-0",
                      trafficVisible && "animate-slide-up",
                    )}
                  >
                    <Image
                      src={
                        paidTrafficService.image
                          ? urlFor(paidTrafficService.image).width(800).height(800).url()
                          : "/placeholder.svg?height=800&width=800"
                      }
                      alt="Paid Traffic Services"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div
                    className={cn(
                      "order-1 md:order-2 opacity-0",
                      trafficVisible && "animate-fade-in animation-delay-200",
                    )}
                  >
                    <div className="inline-flex items-center justify-center rounded-full bg-[#DE5B80]/10 p-3 mb-6">
                      {renderIcon(paidTrafficService.icon)}
                    </div>
                    <h2 className="text-3xl font-bold mb-6">{paidTrafficService.title}</h2>
                    <p className="text-lg text-muted-foreground mb-8">{paidTrafficService.description}</p>
                    <ul className="space-y-3 mb-8">
                      {paidTrafficService.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="rounded-full bg-[#DE5B80]/10 p-1 mr-3 mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#DE5B80]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white">
                      <Link href="/contact">{translations.services.contactUs}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Web Development */}
          {webDevelopmentService && (
            <section ref={webRef} id="web-development" className="py-20 bg-background">
              <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={cn("opacity-0", webVisible && "animate-fade-in")}>
                    <div className="inline-flex items-center justify-center rounded-full bg-[#DE5B80]/10 p-3 mb-6">
                      {renderIcon(webDevelopmentService.icon)}
                    </div>
                    <h2 className="text-3xl font-bold mb-6">{webDevelopmentService.title}</h2>
                    <p className="text-lg text-muted-foreground mb-8">{webDevelopmentService.description}</p>
                    <ul className="space-y-3 mb-8">
                      {webDevelopmentService.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="rounded-full bg-[#DE5B80]/10 p-1 mr-3 mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#DE5B80]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white">
                      <Link href="/contact">{translations.services.contactUs}</Link>
                    </Button>
                  </div>
                  <div
                    className={cn(
                      "relative h-[400px] rounded-xl overflow-hidden opacity-0",
                      webVisible && "animate-slide-up animation-delay-200",
                    )}
                  >
                    <Image
                      src={
                        webDevelopmentService.image
                          ? urlFor(webDevelopmentService.image).width(800).height(800).url()
                          : "/placeholder.svg?height=800&width=800"
                      }
                      alt="Web Development Services"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Photography - Light Mode Section */}
          {photographyService && (
            <section ref={photoRef} id="photography" className="py-20">
              <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div
                    className={cn(
                      "relative h-[400px] rounded-xl overflow-hidden order-2 md:order-1 opacity-0",
                      photoVisible && "animate-slide-up",
                    )}
                  >
                    <Image
                      src={
                        photographyService.image
                          ? urlFor(photographyService.image).width(800).height(800).url()
                          : "/placeholder.svg?height=800&width=800"
                      }
                      alt="Photography Services"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div
                    className={cn(
                      "order-1 md:order-2 opacity-0",
                      photoVisible && "animate-fade-in animation-delay-200",
                    )}
                  >
                    <div className="inline-flex items-center justify-center rounded-full bg-[#DE5B80]/10 p-3 mb-6">
                      {renderIcon(photographyService.icon)}
                    </div>
                    <h2 className="text-3xl font-bold mb-6">{photographyService.title}</h2>
                    <p className="text-lg text-muted-foreground mb-8">{photographyService.description}</p>
                    <ul className="space-y-3 mb-8">
                      {photographyService.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="rounded-full bg-[#DE5B80]/10 p-1 mr-3 mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#DE5B80]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white">
                      <Link href="/contact">{translations.services.contactUs}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{translations.contact.title}</h2>
          <p className="text-lg text-white/70 mb-8">{translations.contact.subtitle}</p>
          <Button asChild size="lg" className="bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white">
            <Link href="/contact">{translations.services.contactUs}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

