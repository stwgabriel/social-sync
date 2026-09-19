import HeroSection from "@/components/home/hero-section"
import ServicesPreview from "@/components/home/services-preview"
import ProjectsShowcase from "@/components/home/projects-showcase"
import VisionSection from "@/components/home/vision-section"
import ContactSection from "@/components/home/contact-section"

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <ServicesPreview />
      <ProjectsShowcase />
      <VisionSection />
      <ContactSection />
    </div>
  )
}
