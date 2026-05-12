"use client"

import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { 
  Globe, 
  Smartphone, 
  TrendingUp, 
  Brain,
  ArrowUpRight,
  Layers,
  Zap,
  Shield
} from "lucide-react"
import { ScrollReveal, Parallax } from "./scroll-reveal"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Stunning, high-performance websites built with cutting-edge technologies that captivate visitors and drive conversions.",
    features: ["Custom Design", "SEO Optimized", "Lightning Fast"],
    gradient: "from-ozmo-cyan to-ozmo-teal",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences across all devices.",
    features: ["iOS & Android", "Cross-Platform", "Cloud Integration"],
    gradient: "from-ozmo-teal to-ozmo-green",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that amplify your brand presence and generate measurable results.",
    features: ["SEO & SEM", "Social Media", "Analytics"],
    gradient: "from-ozmo-green to-ozmo-cyan",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Intelligent automation and machine learning solutions that transform your business operations.",
    features: ["Machine Learning", "Automation", "Predictive AI"],
    gradient: "from-ozmo-purple to-ozmo-cyan",
  },
]

function ServiceCard({ 
  service, 
  index 
}: { 
  service: typeof services[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const Icon = service.icon

  return (
    <ScrollReveal delay={index * 0.12} direction="up">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full"
      >
        <motion.div
          className="relative h-full p-8 rounded-2xl glass border border-white/5 overflow-hidden group cursor-pointer"
          animate={{
            boxShadow: isHovered 
              ? "0 25px 50px -12px rgba(78, 225, 192, 0.15), 0 0 0 1px rgba(78, 225, 192, 0.1)"
              : "0 10px 30px -10px rgba(0, 0, 0, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient Overlay on Hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          />

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(45deg, transparent 30%, rgba(78, 225, 192, 0.05) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
            }}
            animate={isHovered ? {
              backgroundPosition: ["0% 0%", "100% 100%"],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Icon */}
          <motion.div
            className={`relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}
            style={{ transform: "translateZ(30px)" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
              <Icon className="w-7 h-7 text-foreground" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="relative z-10 text-2xl font-semibold mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-ozmo-cyan group-hover:to-ozmo-green transition-all duration-300"
            style={{ transform: "translateZ(20px)" }}
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="relative z-10 text-muted-foreground mb-6 leading-relaxed"
            style={{ transform: "translateZ(15px)" }}
          >
            {service.description}
          </motion.p>

          {/* Features */}
          <motion.div
            className="relative z-10 flex flex-wrap gap-2 mb-6"
            style={{ transform: "translateZ(10px)" }}
          >
            {service.features.map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20"
              >
                {feature}
              </span>
            ))}
          </motion.div>

          {/* Learn More */}
          <motion.div
            className="relative z-10 flex items-center gap-2 text-sm font-medium text-ozmo-cyan opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
            style={{ transform: "translateZ(25px)" }}
          >
            Learn More
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>

          {/* Corner Glow */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-ozmo-cyan/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </motion.div>
      </motion.div>
    </ScrollReveal>
  )
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 liquid-bg opacity-50" />
      
      <Parallax speed={0.2} className="absolute top-20 left-10 w-72 h-72 bg-ozmo-cyan/5 rounded-full blur-3xl" />
      <Parallax speed={0.3} className="absolute bottom-20 right-10 w-96 h-96 bg-ozmo-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <motion.span 
              className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20 mb-6"
            >
              Our Services
            </motion.span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Solutions That</span>
              <br />
              <span className="gradient-text">Drive Innovation</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              We deliver comprehensive digital solutions tailored to transform your vision into reality with precision and excellence.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <ScrollReveal delay={0.4}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Layers, value: "150+", label: "Projects Delivered" },
              { icon: Zap, value: "99%", label: "Client Satisfaction" },
              { icon: Shield, value: "50+", label: "Happy Clients" },
              { icon: Brain, value: "24/7", label: "Support Available" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-6 rounded-xl glass-subtle border border-white/5"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-ozmo-cyan" />
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
