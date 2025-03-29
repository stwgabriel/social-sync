import { fetchSanityData } from "@/lib/sanity"
import { getProjectBySlugQuery } from "@/lib/queries"
import { notFound } from "next/navigation"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, Award } from "lucide-react"

export const revalidate = 3600 // Revalidate the data at most every hour

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await fetchSanityData(getProjectBySlugQuery, { slug: params.slug })

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Social Sync`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await fetchSanityData(getProjectBySlugQuery, { slug: params.slug })

  if (!project) {
    notFound()
  }

  const formattedDate = project.date ? new Date(project.date).toLocaleDateString() : null

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src={
              project.mainImage
                ? urlFor(project.mainImage).width(1920).height(1080).url()
                : "/placeholder.svg?height=1080&width=1920"
            }
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative h-full flex flex-col justify-end pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#DE5B80]/20 text-[#DE5B80] text-sm font-medium mb-4">
              {project.category?.name}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Project Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText value={project.content} />
              </div>

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((image: any, index: number) => (
                      <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(image).width(800).height(600).url() || "/placeholder.svg"}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {project.results && (
                <div className="mt-12 bg-muted p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Award className="mr-2 text-[#DE5B80]" />
                    Results
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={project.results} />
                  </div>
                </div>
              )}

              {/* Client Testimonial */}
              {project.testimonial && (
                <div className="mt-12 bg-secondary p-6 rounded-lg text-white">
                  <blockquote className="border-l-4 border-[#DE5B80] pl-4 italic">"{project.testimonial}"</blockquote>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Info */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-4">Project Information</h3>
                <div className="space-y-4">
                  {project.client && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                      <p>{project.client}</p>
                    </div>
                  )}

                  {formattedDate && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-[#DE5B80] mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                        <p>{formattedDate}</p>
                      </div>
                    </div>
                  )}

                  {project.category && (
                    <div className="flex items-start gap-2">
                      <Tag className="h-5 w-5 text-[#DE5B80] mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                        <p>{project.category.name}</p>
                      </div>
                    </div>
                  )}

                  {project.tags && project.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DE5B80]/10 text-[#DE5B80]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#DE5B80] p-6 rounded-lg text-white">
                <h3 className="text-xl font-bold mb-2">Interested in similar results?</h3>
                <p className="mb-4">Let's discuss how we can help your brand achieve its goals.</p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Button asChild variant="outline" className="flex items-center">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

