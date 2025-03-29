"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { fetchSanityData } from "@/lib/sanity"
import { getAllProjectsQuery, getProjectCategoriesQuery } from "@/lib/queries"
import { urlFor } from "@/lib/sanity"
import { useThemeContext } from "@/components/theme-context"
import { useTheme } from "next-themes"

type Project = {
  _id: string
  title: string
  slug: { current: string }
  category: { _id: string; name: string; slug: { current: string } }
  description: string
  mainImage: any
}

type Category = {
  _id: string
  name: string
  slug: { current: string }
}

export default function ProjectsPage() {
  const { translations } = useLanguage()
  const { forceLightMode, setForceLightMode } = useThemeContext()
  const { theme, setTheme } = useTheme()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch projects and categories from Sanity
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [projectsData, categoriesData] = await Promise.all([
          fetchSanityData<Project[]>(getAllProjectsQuery),
          fetchSanityData<Category[]>(getProjectCategoriesQuery),
        ])

        setProjects(projectsData || [])
        setCategories(categoriesData || [])
      } catch (error) {
        console.error("Error fetching projects data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle theme switching for photography category
  useEffect(() => {
    if (selectedCategory === "photography") {
      // Store current theme before switching to light
      setForceLightMode(true)
      setTheme("light")
    } else {
      // Restore previous theme when leaving photography
      setForceLightMode(false)
    }
  }, [selectedCategory, setForceLightMode, setTheme])

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
  }

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category?._id === selectedCategory)
    : projects

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{translations.projects.title}</h1>
          <div className="w-20 h-1 bg-[#DE5B80] mx-auto mb-8" />
          <p className="text-xl text-white/70 max-w-3xl mx-auto">{translations.projects.subtitle}</p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => handleCategoryChange(null)}
              className={selectedCategory === null ? "bg-[#DE5B80] hover:bg-[#DE5B80]/90" : ""}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category._id}
                variant={selectedCategory === category._id ? "default" : "outline"}
                onClick={() => handleCategoryChange(category._id)}
                className={selectedCategory === category._id ? "bg-[#DE5B80] hover:bg-[#DE5B80]/90" : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="group overflow-hidden rounded-lg border hover:shadow-lg transition-shadow duration-300"
                >
                  <Link href={`/projects/${project.slug.current}`} className="block relative">
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
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3 bg-[#DE5B80]/10 text-[#DE5B80] hover:bg-[#DE5B80]/20">
                        {project.category?.name}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#DE5B80] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex items-center text-[#DE5B80] text-sm font-medium">
                        <span>View details</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{translations.contact.title}</h2>
          <p className="text-lg text-white/70 mb-8">Want to create an amazing project with our team?</p>
          <Button asChild size="lg" className="bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white">
            <Link href="/contact">{translations.services.contactUs}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

