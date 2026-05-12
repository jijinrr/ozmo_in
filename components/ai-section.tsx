"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Brain, Network, Sparkles, Workflow, ArrowRight, Cpu, Database, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, Parallax } from "./scroll-reveal"
import { MagneticButton } from "./magnetic-button"

const aiFeatures = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Custom ML models tailored to your business needs",
    color: "from-ozmo-cyan to-ozmo-teal",
  },
  {
    icon: Network,
    title: "Neural Networks",
    description: "Deep learning solutions for complex problems",
    color: "from-ozmo-teal to-ozmo-green",
  },
  {
    icon: Sparkles,
    title: "Natural Language",
    description: "Advanced NLP for intelligent conversations",
    color: "from-ozmo-green to-ozmo-cyan",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "AI-powered workflow optimization",
    color: "from-ozmo-purple to-ozmo-cyan",
  },
]

const capabilities = [
  { icon: Cpu, label: "Edge AI" },
  { icon: Database, label: "Big Data" },
  { icon: LineChart, label: "Predictive Analytics" },
  { icon: Brain, label: "Computer Vision" },
]

function NeuralNetworkAnimation() {
  const nodes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: (i % 5) * 80 + 40,
    y: Math.floor(i / 5) * 100 + 40,
  }))

  const connections = [
    [0, 5], [0, 6], [1, 5], [1, 6], [1, 7], [2, 6], [2, 7], [2, 8], [3, 7], [3, 8], [4, 8], [4, 9],
    [5, 10], [5, 11], [6, 10], [6, 11], [6, 12], [7, 11], [7, 12], [7, 13], [8, 12], [8, 13], [9, 13], [9, 14],
  ]

  return (
    <svg
      viewBox="0 0 400 340"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 30px rgba(78, 225, 192, 0.3))" }}
    >
      {/* Connections */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={`line-${i}`}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="url(#neuralGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: i * 0.03 }}
        />
      ))}

      {/* Animated Pulses */}
      {connections.slice(0, 12).map(([from, to], i) => (
        <motion.circle
          key={`pulse-${i}`}
          r="4"
          fill="#4ee1c0"
          filter="url(#glow)"
          initial={{
            cx: nodes[from].x,
            cy: nodes[from].y,
            opacity: 0,
          }}
          animate={{
            cx: [nodes[from].x, nodes[to].x],
            cy: [nodes[from].y, nodes[to].y],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={node.id}>
          {/* Outer Ring */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="20"
            fill="none"
            stroke="url(#nodeStroke)"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 4,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
          {/* Inner Circle */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="12"
            fill="url(#nodeGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
          />
          {/* Core */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="5"
            fill="#4ee1c0"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              duration: 2,
              delay: i * 0.15,
              repeat: Infinity,
            }}
          />
        </motion.g>
      ))}

      {/* Gradients & Filters */}
      <defs>
        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ee1c0" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        <linearGradient id="nodeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ee1c0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#86efac" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="nodeGradient">
          <stop offset="0%" stopColor="#4ee1c0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.8" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

export function AISection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const rotateY = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 liquid-bg opacity-40" />
        <Parallax speed={0.2} className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-ozmo-cyan/10 rounded-full blur-[100px]" />
        <Parallax speed={0.3} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-ozmo-purple/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20 mb-6">
                AI Innovation
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-foreground">Powered by </span>
                <br />
                <span className="gradient-text-animated">Artificial Intelligence</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                We leverage cutting-edge artificial intelligence to build smarter
                digital experiences. Our AI solutions transform how businesses
                operate, making processes more efficient and decisions more informed.
              </p>
            </ScrollReveal>

            {/* AI Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {aiFeatures.map((feature, index) => (
                <ScrollReveal key={feature.title} delay={0.3 + index * 0.1}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group p-5 rounded-xl glass border border-white/5 hover:border-ozmo-cyan/30 transition-all cursor-pointer"
                  >
                    <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${feature.color} mb-3`}>
                      <feature.icon className="w-5 h-5 text-background" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 group-hover:gradient-text transition-all">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Capabilities */}
            <ScrollReveal delay={0.5}>
              <div className="grid grid-cols-2 gap-2 mb-10">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-subtle border border-white/10 text-sm"
                  >
                    <cap.icon className="w-4 h-4 text-ozmo-cyan shrink-0" />
                    <span className="text-foreground">{cap.label}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.6}>
              <MagneticButton strength={0.15}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="relative bg-gradient-to-r from-ozmo-cyan to-ozmo-green text-background font-semibold px-8 py-6 rounded-full overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center">
                      Explore AI Solutions
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </MagneticButton>
            </ScrollReveal>
          </div>

          {/* Neural Network Animation */}
          <ScrollReveal delay={0.2} direction="right">
            <motion.div
              style={{ rotateY, scale }}
              className="relative perspective-1000"
            >
              {/* Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-ozmo-cyan/20 via-transparent to-ozmo-green/20 rounded-3xl blur-2xl" />
              
              {/* Card */}
              <div className="relative p-8 rounded-3xl glass border border-white/10 overflow-hidden">
                {/* Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(78, 225, 192, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(78, 225, 192, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px"
                  }}
                />
                
                {/* Animation */}
                <div className="relative aspect-square">
                  <NeuralNetworkAnimation />
                </div>

                {/* Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between p-4 rounded-xl glass-subtle">
                    <div>
                      <p className="text-xs text-muted-foreground">Neural Network</p>
                      <p className="text-sm font-semibold text-foreground">Deep Learning Model</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-ozmo-green animate-pulse" />
                      <span className="text-xs text-ozmo-green">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
