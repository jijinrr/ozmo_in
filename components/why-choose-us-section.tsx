"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Award, Zap, Layers, Cpu, CheckCircle2 } from "lucide-react"
import { ScrollReveal, Parallax, ZoomScroll } from "./scroll-reveal"

const stats = [
  { value: 150, suffix: "+", label: "Projects Completed", description: "Successfully delivered" },
  { value: 50, suffix: "+", label: "Happy Clients", description: "Worldwide partners" },
  { value: 99, suffix: "%", label: "Success Rate", description: "Client satisfaction" },
  { value: 5, suffix: "+", label: "Years Experience", description: "Industry expertise" },
]

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Every project is crafted with meticulous attention to detail, ensuring pixel-perfect designs and flawless functionality.",
    highlights: ["Pixel Perfect", "Award Winning", "Best Practices"],
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Agile development methodology ensures rapid delivery without compromising on quality or performance standards.",
    highlights: ["Agile Process", "Quick Turnaround", "On-Time Delivery"],
  },
  {
    icon: Layers,
    title: "Scalable Solutions",
    description: "Built for growth with modern architecture that scales seamlessly as your business expands.",
    highlights: ["Cloud Native", "Microservices", "Future Proof"],
  },
  {
    icon: Cpu,
    title: "Latest Technology",
    description: "Leveraging cutting-edge tools and frameworks to deliver future-proof digital solutions.",
    highlights: ["AI Powered", "Modern Stack", "Innovative"],
  },
]

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number
  suffix: string
  isInView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    const stepTime = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span className="gradient-text-animated">
      {count}
      {suffix}
    </span>
  )
}

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Cinematic Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 liquid-bg opacity-30" />
        <Parallax speed={0.15} className="absolute top-0 right-0 w-[600px] h-[600px] bg-ozmo-cyan/5 rounded-full blur-[120px]" />
        <Parallax speed={0.25} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ozmo-green/5 rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-ozmo-green/10 text-ozmo-green border border-ozmo-green/20 mb-6">
              Why Choose Us
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Built for </span>
              <span className="gradient-text">Excellence</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              We combine innovation, expertise, and dedication to deliver exceptional results for every project.
            </p>
          </ScrollReveal>
        </div>

        {/* Stats with Cinematic Effect */}
        <ZoomScroll scaleRange={[0.9, 1]}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-ozmo-cyan/20 to-ozmo-green/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-center p-8 rounded-2xl glass border border-white/5 group-hover:border-ozmo-cyan/30 transition-all duration-300">
                  <div className="text-5xl md:text-6xl font-bold mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      isInView={isInView}
                    />
                  </div>
                  <p className="text-base font-semibold text-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ZoomScroll>

        {/* Features Grid with 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal 
              key={feature.title} 
              delay={index * 0.1}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-ozmo-cyan/10 to-ozmo-green/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex gap-6 p-8 rounded-2xl glass border border-white/5 group-hover:border-ozmo-cyan/30 transition-all duration-300 overflow-hidden">
                  {/* Background Shimmer */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(45deg, transparent 30%, rgba(78, 225, 192, 0.03) 50%, transparent 70%)",
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-ozmo-cyan to-ozmo-green"
                    >
                      <feature.icon className="w-7 h-7 text-background" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:gradient-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((highlight, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-ozmo-cyan/10 text-ozmo-cyan"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
