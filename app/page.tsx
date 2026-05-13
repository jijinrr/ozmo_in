"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { FoundersSection } from "@/components/founders-section"
import { AISection } from "@/components/ai-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative overflow-hidden">
        {/* Subtle noise texture */}
        <div className="noise-overlay" />

        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Navigation */}
        <Navbar />

        {/* Page sections */}
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <FoundersSection />
        <AISection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  )
}
