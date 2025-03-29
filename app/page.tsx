import { Suspense } from "react"
import HeroSection from "@/components/home/hero-section"
import ServicesPreview from "@/components/home/services-preview"
import ProjectsShowcase from "@/components/home/projects-showcase"
import Testimonials from "@/components/home/testimonials"
import ContactSection from "@/components/home/contact-section"
import { fetchSanityData } from "@/lib/sanity"
import { getHomePageContentQuery } from "@/lib/queries"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const revalidate = 3600 // Revalidate the data at most every hour

export default async function Home() {
  const homeData: any = await fetchSanityData(getHomePageContentQuery)

  return (
    <div className="flex flex-col w-full">
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection heroData={homeData?.hero} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <ServicesPreview services={homeData?.featuredServices} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <ProjectsShowcase projects={homeData?.featuredProjects} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Testimonials testimonials={homeData?.featuredTestimonials} />
      </Suspense>

      <ContactSection />
    </div>
  )
}

