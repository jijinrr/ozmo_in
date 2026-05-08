"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion"

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (hover: none), (pointer: coarse)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return isMobile
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade"
  duration?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const getInitialState = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 80 }
      case "down": return { opacity: 0, y: -80 }
      case "left": return { opacity: 0, x: 80 }
      case "right": return { opacity: 0, x: -80 }
      case "scale": return { opacity: 0, scale: 0.8 }
      case "fade": return { opacity: 0 }
      default: return { opacity: 0, y: 80 }
    }
  }

  const getAnimateState = () => {
    switch (direction) {
      case "up": return { opacity: 1, y: 0 }
      case "down": return { opacity: 1, y: 0 }
      case "left": return { opacity: 1, x: 0 }
      case "right": return { opacity: 1, x: 0 }
      case "scale": return { opacity: 1, scale: 1 }
      case "fade": return { opacity: 1 }
      default: return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export function Parallax({
  children,
  className = "",
  speed = 0.5,
  direction = "up"
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const factor = direction === "up" ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * factor, -100 * speed * factor])

  if (isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ZoomScrollProps {
  children: React.ReactNode
  className?: string
  scaleRange?: [number, number]
}

export function ZoomScroll({
  children,
  className = "",
  scaleRange = [0.8, 1]
}: ZoomScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange)
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])

  if (isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const words = text.split(" ")

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

interface StickyScrollProps {
  children: React.ReactNode
  className?: string
  height?: string
}

export function StickyScroll({
  children,
  className = "",
  height = "200vh"
}: StickyScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={ref} style={{ height }} className="relative">
      <div className={`sticky top-0 h-screen flex items-center justify-center ${className}`}>
        {typeof children === "function"
          ? (children as (progress: MotionValue<number>) => React.ReactNode)(scrollYProgress)
          : children}
      </div>
    </div>
  )
}
