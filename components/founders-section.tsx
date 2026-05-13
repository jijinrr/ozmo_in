"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Linkedin, Github, Twitter, Sparkles, Target, Rocket, Brain } from "lucide-react"
import { ScrollReveal, Parallax } from "./scroll-reveal"

const founders = [
  {
    id: 1,
    name: "Jijin Raj R",
    role: "Co-Founder & CEO",
    tagline: "Architect of Digital Vision",
    bio: "Visionary technologist and entrepreneur driving OZMO Innovations' mission to engineer digital excellence. With a relentless passion for building world-class products, Jijin transforms bold ideas into scalable digital realities — from cutting-edge web platforms to AI-powered enterprise systems.",
    philosophy: "\"Great products aren't built — they're engineered with intention, crafted with soul, and shipped with purpose.\"",
    skills: ["Product Strategy", "AI Vision", "Full-Stack", "Leadership", "UX Design"],
    achievements: [
      { icon: Rocket, label: "50+ Products Launched" },
      { icon: Target, label: "99% Client Retention" },
    ],
    image: "/founders/jijin.jpg",
    social: { linkedin: "#", github: "#", twitter: "#" },
    accent: "from-ozmo-cyan to-ozmo-teal",
    flip: false,
  },
  {
    id: 2,
    name: "Faisal",
    role: "Co-Founder & CTO",
    tagline: "Engineer of the Impossible",
    bio: "Strategic innovator and technical architect behind OZMO's most ambitious digital transformations. Faisal turns complex technical challenges into elegant, scalable solutions — building systems that perform flawlessly under pressure and grow gracefully at scale.",
    philosophy: "\"Technology should be invisible. When built right, it simply empowers people to do extraordinary things.\"",
    skills: ["System Architecture", "Cloud & DevOps", "AI/ML", "Security", "Performance"],
    achievements: [
      { icon: Brain, label: "20+ AI Systems Built" },
      { icon: Sparkles, label: "Zero Downtime Record" },
    ],
    image: "/founders/faisal.jpg",
    social: { linkedin: "#", github: "#", twitter: "#" },
    accent: "from-ozmo-teal to-ozmo-green",
    flip: true,
  },
]

function FounderBlock({ founder, index }: { founder: (typeof founders)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col ${founder.flip ? "lg:flex-row-reverse" : "lg:flex-row"} gap-0 rounded-3xl overflow-hidden glass border border-white/10 group hover:border-ozmo-cyan/20 transition-all duration-700`}
    >
      {/* Hover glow */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${founder.accent} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} />

      {/* Photo side — 45% width on desktop */}
      <div className="relative lg:w-[45%] w-full aspect-[4/5] lg:aspect-auto overflow-hidden flex-shrink-0">
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <Image
            src={founder.image}
            alt={founder.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </motion.div>

        {/* Color overlay tint */}
        <div className={`absolute inset-0 bg-gradient-to-t ${founder.accent} opacity-10`} />

        {/* Bottom fade on mobile / side fade on desktop */}
        <div className={`absolute inset-0 ${founder.flip ? "lg:bg-gradient-to-l" : "lg:bg-gradient-to-r"} bg-gradient-to-t from-background/60 via-transparent to-transparent`} />

        {/* Role badge */}
        <div className="absolute bottom-5 left-5 z-10">
          <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${founder.accent} text-background shadow-lg`}>
            {founder.role}
          </span>
        </div>

        {/* Index number watermark */}
        <div className="absolute top-5 right-5 z-10">
          <span className={`text-7xl font-black bg-gradient-to-br ${founder.accent} bg-clip-text text-transparent opacity-20 select-none`}>
            0{founder.id}
          </span>
        </div>
      </div>

      {/* Info side — 55% width on desktop */}
      <div className="relative lg:w-[55%] flex flex-col justify-center p-8 md:p-12">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(78,225,192,1) 1px, transparent 1px), linear-gradient(90deg, rgba(78,225,192,1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, x: founder.flip ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-sm font-semibold tracking-widest uppercase mb-3 bg-gradient-to-r ${founder.accent} bg-clip-text text-transparent`}
          >
            {founder.tagline}
          </motion.p>

          {/* Name */}
          <motion.h3
            initial={{ opacity: 0, x: founder.flip ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4 leading-tight"
          >
            {founder.name}
          </motion.h3>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`h-0.5 bg-gradient-to-r ${founder.accent} mb-6`}
          />

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-muted-foreground leading-relaxed text-base mb-6"
          >
            {founder.bio}
          </motion.p>

          {/* Philosophy quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
            className={`text-sm italic border-l-2 border-ozmo-cyan/50 pl-4 mb-8 text-foreground/60`}
          >
            {founder.philosophy}
          </motion.blockquote>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {founder.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium rounded-full bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Achievements row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex gap-4 mb-8"
          >
            {founder.achievements.map((ach) => (
              <div key={ach.label} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10">
                <ach.icon className="w-4 h-4 text-ozmo-cyan flex-shrink-0" />
                <span className="text-xs font-semibold text-foreground/80">{ach.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-3"
          >
            {Object.entries(founder.social).map(([platform, href]) => {
              const Icon = platform === "linkedin" ? Linkedin : platform === "github" ? Github : Twitter
              return (
                <motion.a
                  key={platform}
                  href={href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-ozmo-cyan/40 hover:bg-ozmo-cyan/10 transition-all group/icon"
                  aria-label={platform}
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover/icon:text-ozmo-cyan transition-colors" />
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function FoundersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="founders" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 liquid-bg opacity-30" />
      <Parallax speed={0.2} className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-ozmo-cyan/5 rounded-full blur-[160px]" children={undefined} />
      <Parallax speed={0.15} className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-ozmo-green/5 rounded-full blur-[140px]" children={undefined} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20 mb-6">
              Meet The Founders
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">The Minds Behind </span>
              <span className="gradient-text">OZMO</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Two visionaries united by a passion for innovation — building products that reshape industries and redefine what digital excellence means.
            </p>
          </ScrollReveal>
        </div>

        {/* Founder blocks — editorial split-screen layout */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {founders.map((founder, index) => (
            <FounderBlock key={founder.id} founder={founder} index={index} />
          ))}
        </div>

        {/* Bottom quote banner */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-ozmo-cyan/10 via-ozmo-teal/10 to-ozmo-green/10" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative z-10 px-8 py-12 md:px-16 text-center">
              <p className="text-xl md:text-2xl font-light text-foreground/80 italic leading-relaxed max-w-4xl mx-auto mb-6">
                &ldquo;We didn&apos;t just build a company — we built a movement to make digital excellence accessible to every business that dares to dream bigger.&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-ozmo-cyan" />
                <p className="text-sm font-semibold text-ozmo-cyan tracking-wide">
                  Jijin Raj R &amp; Faisal — Co-Founders, OZMO Innovations
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-ozmo-cyan" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
