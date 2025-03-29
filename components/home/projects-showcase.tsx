"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { urlFor } from "@/lib/sanity"

type Project = {
  _id: string
  title: string
  slug: { current: string }
  category: { name: string }
  description: string
  mainImage: any
}

export default function ProjectsShowcase({ projects }: { projects?: Project[] }) {
  const { translations } = useLanguage()

  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Default projects if none are provided from CMS
  const defaultProjects = [
    {
      _id: "project1",
      title: "BeautyBrand Social Campaign",
      category: { name: "Social Media" },
      description: "A complete social media campaign that increased engagement by 200%.",
      mainImage: null,
      slug: { current: "beautybrand-social-campaign" },
    },
    {
      _id: "project2",
      title: "TechCompany Website Redesign",
      category: { name: "Web Development" },
      description: "Complete redesign of the corporate website, focusing on user experience and conversion.",
      mainImage: null,
      slug: { current: "techcompany-website-redesign" },
    },
    {
      _id: "project3",
      title: "FoodBrand Product Photography",
      category: { name: "Photography" },
      description: "Product photo session for e-commerce, with art direction aligned with brand identity.",
      mainImage: null,
      slug: { current: "foodbrand-product-photography" },
    },
  ]

  const displayProjects = projects || defaultProjects

  return (
    <section ref={sectionRef} className="py-20 w-full bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4 text-white opacity-0",
              sectionIsVisible && "animate-fade-in",
            )}
          >
            {translations.projects.title}
          </h2>
          <p
            className={cn(
              "text-lg text-white/70 max-w-2xl mx-auto opacity-0",
              sectionIsVisible && "animate-fade-in animation-delay-200",
            )}
          >
            {translations.projects.subtitle}
          </p>
          <div className="w-20 h-1 bg-[#DE5B80] mx-auto mt-6" />
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 opacity-0",
            sectionIsVisible && "animate-fade-in animation-delay-400",
          )}
        >
          {displayProjects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group block relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={
                    project.mainImage
                      ? urlFor(project.mainImage).width(800).height(600).url()
                      : "/placeholder.svg?height=600&width=800"
                  }
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs text-[#DE5B80] font-medium mb-2">{project.category?.name}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#DE5B80] transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center text-white/70 text-sm group-hover:text-white transition-colors">
                  <span>{translations.projects.viewAll}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={cn("mt-12 text-center opacity-0", sectionIsVisible && "animate-fade-in animation-delay-600")}>
          <Button asChild size="lg" className="bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white">
            <Link href="/projects">{translations.projects.viewAll}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

