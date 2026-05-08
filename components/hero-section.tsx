"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "./magnetic-button"

const EASE = [0.16, 1, 0.3, 1] as const

/* ─────────────────────────────────────────────────────────────────
   Background: three blurred orbs + subtle dot grid
   ───────────────────────────────────────────────────────────────── */
function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb 1 — cyan, top-left of center */}
      <div
        className="absolute"
        style={{
          width: 640,
          height: 640,
          top: -140,
          left: "calc(50% - 560px)",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Orb 2 — teal, top-right of center */}
      <div
        className="absolute"
        style={{
          width: 520,
          height: 520,
          top: 40,
          right: "calc(50% - 580px)",
          background: "radial-gradient(ellipse, rgba(20,184,166,0.15) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      {/* Orb 3 — emerald, bottom center (very subtle) */}
      <div
        className="absolute"
        style={{
          width: 720,
          height: 420,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(52,211,153,0.10) 0%, transparent 65%)",
          filter: "blur(64px)",
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(8,145,178,0.38) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.032,
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Headline block — per-line overflow-hidden clip reveal
   ───────────────────────────────────────────────────────────────── */
const HEADLINE_LINES: { text: string; gradient: boolean }[] = [
  { text: "Elevating Brands Through", gradient: false },
  { text: "Premium Web", gradient: false },
  { text: "Experiences.", gradient: true },
]

function HeadlineBlock() {
  return (
    <div className="flex flex-col items-center gap-0">
      {HEADLINE_LINES.map((line, i) => (
        <div
          key={line.text}
          style={{ overflow: "hidden", paddingBottom: "0.06em" }}
        >
          <motion.span
            className={`block font-black tracking-tight ${
              line.gradient ? "gradient-text-animated glow-text" : "text-foreground"
            }`}
            style={{
              fontSize: "clamp(2.8rem, 6vw, 6rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.78, delay: 0.10 + i * 0.08, ease: EASE }}
          >
            {line.text}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Subheading
   ───────────────────────────────────────────────────────────────── */
function Subheading() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
      className="text-[1.08rem] leading-relaxed text-muted-foreground max-w-[540px] mx-auto"
    >
      We build elegant, high-performance websites with modern aesthetics,
      seamless responsiveness, and luxury-level user experience.
    </motion.p>
  )
}

/* ─────────────────────────────────────────────────────────────────
   CTA group
   ───────────────────────────────────────────────────────────────── */
interface CTAGroupProps {
  onPrimary: () => void
  onSecondary: () => void
}

function CTAGroup({ onPrimary, onSecondary }: CTAGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.52, ease: EASE }}
      className="flex flex-col sm:flex-row items-center justify-center gap-3"
    >
      {/* Primary */}
      <MagneticButton strength={0.18}>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={onPrimary}
            className="bg-gradient-to-r from-cyan-500 to-teal-500
              hover:from-cyan-400 hover:to-teal-400
              text-white font-semibold px-8 py-[22px] rounded-2xl
              shadow-lg shadow-cyan-500/20 dark:shadow-cyan-400/20
              transition-all duration-300 group text-[0.95rem]"
          >
            Start a Project
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </motion.div>
      </MagneticButton>

      {/* Secondary */}
      <MagneticButton strength={0.18}>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={onSecondary}
            variant="outline"
            className="px-8 py-[22px] rounded-2xl border-border
              text-foreground hover:border-cyan-300 dark:hover:border-cyan-700
              hover:text-cyan-500 dark:hover:text-cyan-400
              hover:bg-cyan-50/30 dark:hover:bg-cyan-950/20
              transition-all duration-300 text-[0.95rem]"
          >
            View Our Work
          </Button>
        </motion.div>
      </MagneticButton>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Trust indicators — three stat pills
   ───────────────────────────────────────────────────────────────── */
const TRUST_STATS = ["200+ projects", "99% uptime", "48h delivery"]

function TrustIndicators() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.68, ease: EASE }}
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {TRUST_STATS.map((stat, i) => (
        <span key={stat} className="flex items-center gap-2">
          <span
            className="glass-subtle rounded-full px-3.5 py-1.5
              text-[0.8rem] font-medium text-muted-foreground
              border border-border hover:border-cyan-300 dark:hover:border-cyan-700
              hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 cursor-default"
          >
            {stat}
          </span>
          {i < TRUST_STATS.length - 1 && (
            <span className="text-muted-foreground/40 text-[0.7rem] select-none">·</span>
          )}
        </span>
      ))}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Scroll indicator — bottom-center animated line
   ───────────────────────────────────────────────────────────────── */
function ScrollIndicator({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
        flex flex-col items-center gap-2 group cursor-pointer
        border-none bg-transparent outline-none"
      aria-label="Scroll to next section"
    >
      <span
        className="text-[9px] font-bold text-muted-foreground tracking-[0.25em] uppercase
          group-hover:text-cyan-500 transition-colors duration-200"
      >
        Scroll
      </span>
      <div className="w-px h-12 bg-border overflow-hidden rounded-full">
        <motion.div
          className="w-full rounded-full bg-gradient-to-b from-cyan-400 to-teal-400"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ height: "50%" }}
        />
      </div>
    </motion.button>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HeroSection — main export
   ───────────────────────────────────────────────────────────────── */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const contentY       = useTransform(scrollYProgress, [0, 1],   [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const contentScale   = useTransform(scrollYProgress, [0, 0.4], [1, 0.97])

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-background"
    >
      {/* Decorative background layers */}
      <HeroBackground />

      {/* Top vignette — blends hero into fixed navbar */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 120,
          background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Content column with scroll parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 flex flex-col justify-center items-center
                   min-h-[100svh] pt-20 md:pt-24 pb-20 px-6"
      >
        <div className="w-full max-w-[760px] mx-auto flex flex-col items-center text-center gap-8">
          <HeadlineBlock />
          <Subheading />
          <CTAGroup
            onPrimary={() => scrollTo("#contact")}
            onSecondary={() => scrollTo("#portfolio")}
          />
          <TrustIndicators />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <ScrollIndicator onClick={() => scrollTo("#services")} />
    </section>
  )
}
