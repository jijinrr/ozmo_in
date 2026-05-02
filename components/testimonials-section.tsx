"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, Parallax } from "./scroll-reveal"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "OZMO Innovations transformed our digital presence completely. Their attention to detail and innovative approach exceeded all our expectations. The team delivered a world-class website that has significantly increased our conversion rates.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, GrowthLabs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content: "Working with OZMO was an incredible experience. Their AI solutions have automated 60% of our customer service operations, saving us countless hours and improving customer satisfaction scores dramatically.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director, Nexus Corp",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content: "The digital marketing strategies implemented by OZMO delivered results beyond our wildest dreams. Our organic traffic increased by 300% within six months, and the ROI on their campaigns has been exceptional.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO, InnovateTech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    content: "OZMO built our mobile app from the ground up, and the quality is outstanding. The app has a 4.9-star rating on both app stores, and our user engagement metrics have skyrocketed since launch.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Operations Manager, ScaleUp",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    content: "The team at OZMO Innovations is simply phenomenal. Their professionalism, technical expertise, and commitment to excellence made our complex project feel effortless. Highly recommended!",
    rating: 5,
  },
]

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-ozmo-cyan/20 to-ozmo-green/20 rounded-3xl blur-xl opacity-50" />
      
      <div className="relative p-8 md:p-10 rounded-3xl glass border border-white/10 overflow-hidden">
        {/* Quote Icon */}
        <div className="absolute -top-3 -left-3 p-4 rounded-2xl bg-gradient-to-br from-ozmo-cyan to-ozmo-green">
          <Quote className="w-6 h-6 text-background" />
        </div>

        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(78, 225, 192, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(78, 225, 192, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px"
          }}
        />

        {/* Stars */}
        <div className="flex gap-1 mb-6 pt-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <Star className="w-5 h-5 fill-ozmo-cyan text-ozmo-cyan" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <p className="relative z-10 text-lg md:text-xl text-foreground leading-relaxed mb-8">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="relative z-10 flex items-center gap-4">
          <motion.div 
            className="relative w-16 h-16 rounded-full overflow-hidden"
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ozmo-cyan to-ozmo-green p-0.5 rounded-full">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
          <div>
            <h4 className="font-bold text-lg text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-ozmo-cyan">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 liquid-bg opacity-30" />
      <Parallax speed={0.2} className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-ozmo-cyan/5 rounded-full blur-[120px]" />
      <Parallax speed={0.15} className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-ozmo-green/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20 mb-6">
              Testimonials
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">What Our </span>
              <span className="gradient-text">Clients Say</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              {"Don't just take our word for it. Here's what our clients have to say about working with OZMO Innovations."}
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal delay={0.3}>
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={testimonials[activeIndex].id}
                testimonial={testimonials[activeIndex]}
              />
            </AnimatePresence>
          </ScrollReveal>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-10"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="w-12 h-12 rounded-full glass border border-white/10 hover:border-ozmo-cyan/50 hover:bg-ozmo-cyan/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setActiveIndex(index)
                  }}
                  whileHover={{ scale: 1.2 }}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-10 bg-gradient-to-r from-ozmo-cyan to-ozmo-green"
                      : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="w-12 h-12 rounded-full glass border border-white/10 hover:border-ozmo-cyan/50 hover:bg-ozmo-cyan/10 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
