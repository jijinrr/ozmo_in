"use client"

import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, Parallax } from "./scroll-reveal"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A full-featured e-commerce solution with AI-powered recommendations, seamless checkout, and real-time inventory management.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Next.js", "AI", "Stripe"],
    color: "from-ozmo-cyan to-ozmo-teal",
  },
  {
    id: 2,
    title: "Health & Fitness App",
    category: "Mobile Development",
    description: "Cross-platform mobile application for personalized workout plans, nutrition tracking, and health monitoring.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop",
    tags: ["React Native", "Firebase", "AI"],
    color: "from-ozmo-teal to-ozmo-green",
  },
  {
    id: 3,
    title: "Marketing Dashboard",
    category: "Digital Marketing",
    description: "Comprehensive analytics dashboard for tracking campaigns, ROI metrics, and customer engagement across channels.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Analytics", "React", "D3.js"],
    color: "from-ozmo-green to-ozmo-cyan",
  },
  {
    id: 4,
    title: "AI Chatbot Platform",
    category: "AI Solutions",
    description: "Intelligent customer service chatbot with natural language processing and seamless CRM integration.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["NLP", "Python", "TensorFlow"],
    color: "from-ozmo-purple to-ozmo-cyan",
  },
  {
    id: 5,
    title: "FinTech Mobile App",
    category: "Mobile Development",
    description: "Secure banking application with biometric authentication, real-time transactions, and investment tracking.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tags: ["Flutter", "Blockchain", "Security"],
    color: "from-ozmo-cyan to-ozmo-purple",
  },
  {
    id: 6,
    title: "Smart Home Dashboard",
    category: "Web Development",
    description: "IoT control center for managing smart home devices with voice commands and automated routines.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
    tags: ["IoT", "WebSockets", "Vue.js"],
    color: "from-ozmo-green to-ozmo-teal",
  },
]

const categories = ["All", "Web Development", "Mobile Development", "Digital Marketing", "AI Solutions"]

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[0]
  index: number
  onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group cursor-pointer relative rounded-2xl overflow-hidden perspective-1000"
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        />

        <motion.div
          className="relative rounded-2xl overflow-hidden"
          animate={{
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(78, 225, 192, 0.15)"
              : "0 10px 30px -10px rgba(0, 0, 0, 0.3)"
          }}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            
            {/* Color Overlay */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
            />

            {/* Grid Overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(78, 225, 192, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(78, 225, 192, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px"
              }}
            />
          </div>

          {/* Content */}
          <div 
            className="absolute inset-0 flex flex-col justify-end p-6"
            style={{ transform: "translateZ(30px)" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="text-xs font-medium text-ozmo-cyan mb-2"
            >
              {project.category}
            </motion.span>
            
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
              {project.title}
            </h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ delay: 0.05 }}
              className="text-sm text-muted-foreground line-clamp-2 mb-4"
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* View Icon */}
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            >
              <div className="p-3 rounded-full glass border border-white/10">
                <ArrowUpRight className="w-5 h-5 text-ozmo-cyan" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </ScrollReveal>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0]
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-3xl glass border border-white/10"
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full glass border border-white/10 hover:border-ozmo-cyan/30 transition-colors"
        >
          <X className="w-6 h-6 text-foreground" />
        </motion.button>

        {/* Image */}
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-8 -mt-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20 mb-4">
            {project.category}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {project.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-medium rounded-full glass border border-white/10 text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="bg-gradient-to-r from-ozmo-cyan to-ozmo-green text-background font-semibold px-8 py-6 rounded-xl"
            >
              View Project
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 liquid-bg opacity-30" />
      <Parallax speed={0.15} className="absolute top-20 left-0 w-[500px] h-[500px] bg-ozmo-cyan/5 rounded-full blur-[100px]" />
      <Parallax speed={0.2} className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-ozmo-green/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20 mb-6">
              Our Work
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Featured </span>
              <span className="gradient-text">Projects</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Explore our portfolio of successful projects that showcase our expertise and creativity.
            </p>
          </ScrollReveal>
        </div>

        {/* Category Filter */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-ozmo-cyan to-ozmo-green text-background shadow-lg shadow-ozmo-cyan/20"
                    : "glass border border-white/10 text-foreground hover:border-ozmo-cyan/30"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
