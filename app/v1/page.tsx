import { Suspense } from "react"
import HeroSection from "@/components/home/v1/hero-section"
import ServicesPreview from "@/components/home/v1/services-preview"
import ProjectsShowcase from "@/components/home/v1/projects-showcase"
import Testimonials from "@/components/home/v1/testimonials"
import ContactSection from "@/components/home/v1/contact-section"
import { fetchSanityData } from "@/lib/sanity"
import { getHomePageContentQuery } from "@/lib/queries"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const revalidate = 3600 // Revalidate the data at most every hour

// Archived landing page (v1). The live version is at "/".
export default async function HomeV1() {
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
