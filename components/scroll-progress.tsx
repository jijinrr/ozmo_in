"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const [enabled, setEnabled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)")
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{
          scaleX,
          background: "linear-gradient(90deg, var(--ozmo-cyan), var(--ozmo-green), var(--ozmo-teal))"
        }}
      />
      {/* Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[59] blur-[3px]"
        style={{
          scaleX,
          background: "linear-gradient(90deg, var(--ozmo-cyan), var(--ozmo-green))",
          opacity: 0.6
        }}
      />
    </>
  )
}
