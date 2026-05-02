"use client"

import { useRef, useMemo, Suspense, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, useProgress } from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"

/* ─────────────────────────────────────────────────────────────────
   Procedural human body: particle cloud
   ───────────────────────────────────────────────────────────────── */
function buildHumanCloud(total: number) {
  const pos: number[] = []

  function sphere(cx: number, cy: number, cz: number, r: number, n: number) {
    for (let i = 0; i < n; i++) {
      const u = Math.random(), v = Math.random()
      const θ = 2 * Math.PI * u
      const φ = Math.acos(2 * v - 1)
      const f = 0.88 + Math.random() * 0.24
      pos.push(
        cx + r * f * Math.sin(φ) * Math.cos(θ),
        cy + r * f * Math.sin(φ) * Math.sin(θ),
        cz + r * f * Math.cos(φ),
      )
    }
  }
  function cylinder(cx: number, cy: number, cz: number, r: number, h: number, n: number, tx = 0) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const rad = r * (0.7 + Math.random() * 0.6)
      const t = Math.random()
      pos.push(cx + rad * Math.cos(a) + t * tx, cy - h / 2 + t * h, cz + rad * Math.sin(a))
    }
  }
  function ellipsoid(cx: number, cy: number, cz: number, rx: number, ry: number, rz: number, n: number) {
    for (let i = 0; i < n; i++) {
      const u = Math.random(), v = Math.random()
      const θ = 2 * Math.PI * u
      const φ = Math.acos(2 * v - 1)
      const f = 0.85 + Math.random() * 0.3
      pos.push(
        cx + rx * f * Math.sin(φ) * Math.cos(θ),
        cy + ry * f * Math.sin(φ) * Math.sin(θ),
        cz + rz * f * Math.cos(φ),
      )
    }
  }

  const k = 0.88

  sphere(0, 3.3 * k, 0, 0.72 * k, Math.floor(total * 0.13))
  cylinder(0, 2.62 * k, 0, 0.16 * k, 0.44 * k, Math.floor(total * 0.025))
  ellipsoid(0, 1.78 * k, 0, 0.62 * k, 0.85 * k, 0.34 * k, Math.floor(total * 0.15))
  ellipsoid(0, 0.82 * k, 0, 0.50 * k, 0.68 * k, 0.30 * k, Math.floor(total * 0.09))
  sphere(-0.88 * k, 2.24 * k, 0, 0.22 * k, Math.floor(total * 0.025))
  sphere(0.88 * k, 2.24 * k, 0, 0.22 * k, Math.floor(total * 0.025))
  cylinder(-1.06 * k, 1.64 * k, 0, 0.18 * k, 0.84 * k, Math.floor(total * 0.055), -0.08 * k)
  cylinder(1.06 * k, 1.64 * k, 0, 0.18 * k, 0.84 * k, Math.floor(total * 0.055), 0.08 * k)
  sphere(-1.12 * k, 1.02 * k, 0, 0.16 * k, Math.floor(total * 0.015))
  sphere(1.12 * k, 1.02 * k, 0, 0.16 * k, Math.floor(total * 0.015))
  cylinder(-1.15 * k, 0.55 * k, 0, 0.14 * k, 0.74 * k, Math.floor(total * 0.045))
  cylinder(1.15 * k, 0.55 * k, 0, 0.14 * k, 0.74 * k, Math.floor(total * 0.045))
  ellipsoid(-1.2 * k, 0.08 * k, 0, 0.17 * k, 0.12 * k, 0.1 * k, Math.floor(total * 0.025))
  ellipsoid(1.2 * k, 0.08 * k, 0, 0.17 * k, 0.12 * k, 0.1 * k, Math.floor(total * 0.025))
  ellipsoid(0, 0.0 * k, 0, 0.53 * k, 0.32 * k, 0.30 * k, Math.floor(total * 0.065))
  sphere(-0.38 * k, -0.32 * k, 0, 0.20 * k, Math.floor(total * 0.02))
  sphere(0.38 * k, -0.32 * k, 0, 0.20 * k, Math.floor(total * 0.02))
  cylinder(-0.38 * k, -1.12 * k, 0, 0.22 * k, 1.1 * k, Math.floor(total * 0.07))
  cylinder(0.38 * k, -1.12 * k, 0, 0.22 * k, 1.1 * k, Math.floor(total * 0.07))
  sphere(-0.38 * k, -1.84 * k, 0, 0.20 * k, Math.floor(total * 0.02))
  sphere(0.38 * k, -1.84 * k, 0, 0.20 * k, Math.floor(total * 0.02))
  cylinder(-0.38 * k, -2.52 * k, 0, 0.16 * k, 0.94 * k, Math.floor(total * 0.06))
  cylinder(0.38 * k, -2.52 * k, 0, 0.16 * k, 0.94 * k, Math.floor(total * 0.06))
  ellipsoid(-0.36 * k, -3.10 * k, 0.10 * k, 0.22 * k, 0.10 * k, 0.34 * k, Math.floor(total * 0.025))
  ellipsoid(0.36 * k, -3.10 * k, 0.10 * k, 0.22 * k, 0.10 * k, 0.34 * k, Math.floor(total * 0.025))

  while (pos.length < total * 3) pos.push(0, 0, 0)
  const positions = new Float32Array(pos.slice(0, total * 3))

  // Vivid colors for dark background
  const colors = new Float32Array(total * 3)
  const minY = -3.3 * k, maxY = 4.1 * k
  for (let i = 0; i < total; i++) {
    const y = positions[i * 3 + 1]
    const t = Math.max(0, Math.min(1, (y - minY) / (maxY - minY)))
    let r: number, g: number, b: number
    if (t > 0.82) {
      // Head: bright ice-white → electric cyan
      const h = (t - 0.82) / 0.18
      r = 0.60 + h * 0.40; g = 0.95 + h * 0.05; b = 1.0
    } else if (t > 0.45) {
      // Torso/arms: vivid cyan (#22d3ee) → electric blue (#60a5fa)
      const m = (t - 0.45) / 0.37
      r = 0.12 + m * 0.26; g = 0.70 + m * 0.15; b = 0.94
    } else {
      // Legs: teal (#14b8a6) → deep cyan (#0891b2)
      r = 0.05 + t * 0.15; g = 0.60 + t * 0.30; b = 0.70 + t * 0.30
    }
    const j = 0.06
    colors[i * 3]     = Math.max(0, Math.min(1, r + (Math.random() - 0.5) * j))
    colors[i * 3 + 1] = Math.max(0, Math.min(1, g + (Math.random() - 0.5) * j))
    colors[i * 3 + 2] = Math.max(0, Math.min(1, b + (Math.random() - 0.5) * j))
  }

  return { positions, colors }
}

/* ─── Neural connection lines ─── */
function buildNeuralLines(positions: Float32Array, maxLines = 320, maxDist = 0.52) {
  const n = positions.length / 3
  const step = Math.max(1, Math.floor(n / 420))
  const sampled: number[] = []
  for (let i = 0; i < n; i += step) sampled.push(i)

  const linePos: number[] = []
  outer: for (let a = 0; a < sampled.length; a++) {
    const ia = sampled[a]
    for (let b = a + 1; b < Math.min(a + 10, sampled.length); b++) {
      const ib = sampled[b]
      const dx = positions[ia * 3] - positions[ib * 3]
      const dy = positions[ia * 3 + 1] - positions[ib * 3 + 1]
      const dz = positions[ia * 3 + 2] - positions[ib * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
        linePos.push(
          positions[ia * 3], positions[ia * 3 + 1], positions[ia * 3 + 2],
          positions[ib * 3], positions[ib * 3 + 1], positions[ib * 3 + 2],
        )
        if (linePos.length / 6 >= maxLines) break outer
      }
    }
  }
  return new Float32Array(linePos)
}

/* ─── Radial glow texture ─── */
function makeGlowTexture() {
  const size = 64
  const c = document.createElement("canvas")
  c.width = c.height = size
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0,    "rgba(255,255,255,1)")
  g.addColorStop(0.2,  "rgba(150,240,255,0.95)")
  g.addColorStop(0.55, "rgba(34,211,238,0.50)")
  g.addColorStop(1,    "rgba(0,0,0,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

/* ─────────────────────────────────────────────────────────────────
   HumanBody — particle system + neural web
   ───────────────────────────────────────────────────────────────── */
function HumanBody() {
  const lineRef   = useRef<THREE.LineSegments>(null)
  const groupRef  = useRef<THREE.Group>(null)
  const mouse     = useRef({ x: 0, y: 0 })
  const scrollY   = useRef(0)

  const { mat, geometry, lineGeometry } = useMemo(() => {
    const TOTAL = 8000
    const { positions, colors } = buildHumanCloud(TOTAL)
    const linePositions = buildNeuralLines(positions, 340, 0.50)

    const glowTex = makeGlowTexture()

    const sizes = new Float32Array(TOTAL)
    for (let i = 0; i < TOTAL; i++) sizes[i] = 0.024 + Math.random() * 0.042

    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, map: { value: glowTex } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        void main() {
          vColor = color;
          float hash = fract(sin(dot(position.xy, vec2(12.9898,78.233))) * 43758.5453);
          float pulse = 0.82 + 0.18 * sin(time * 1.6 + hash * 6.28318);
          vAlpha = pulse;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * pulse * (340.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 tex = texture2D(map, gl_PointCoord);
          if (tex.a < 0.015) discard;
          gl_FragColor = vec4(vColor, tex.a * vAlpha * 0.92);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,  // additive = bright on dark bg
    })

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3))
    geo.setAttribute("size",     new THREE.BufferAttribute(sizes,     1))

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))

    return { mat, geometry: geo, lineGeometry: lineGeo }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    mat.uniforms.time.value = t

    if (groupRef.current) {
      const targetY = mouse.current.x * 0.28 + t * 0.05
      const targetX = mouse.current.y * 0.08
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04

      const breath = 1 + Math.sin(t * 0.55) * 0.014
      groupRef.current.scale.setScalar(breath)

      const sy = Math.min(scrollY.current / 900, 1)
      groupRef.current.position.y = -sy * 1.2
    }

    if (lineRef.current) {
      ;(lineRef.current.material as THREE.LineBasicMaterial).opacity =
        0.20 + Math.sin(t * 0.6) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={mat} />
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

/* ─── Orbiting ring ─── */
function OrbitRing({ radius, tube, rotX, speed, color, opacity }: {
  radius: number; tube: number; rotX: number; speed: number; color: string; opacity: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * speed
      ref.current.rotation.y = s.clock.elapsedTime * speed * 0.38
    }
  })
  return (
    <mesh ref={ref} rotation={[rotX, 0, 0]}>
      <torusGeometry args={[radius, tube, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

/* ─── Holographic scan beam ─── */
function ScanBeam() {
  const beam  = useRef<THREE.Mesh>(null)
  const trail = useRef<THREE.Mesh>(null)
  const k = 0.88

  useFrame((s) => {
    const t = s.clock.elapsedTime
    const c = (t % 5.5) / 5.5
    const e = c < 0.5 ? 2 * c * c : -1 + (4 - 2 * c) * c
    const y = -3.3 * k + e * (3.9 * k + 3.3 * k)
    if (beam.current)  beam.current.position.y  = y
    if (trail.current) trail.current.position.y = y - 0.14
  })

  return (
    <group>
      <mesh ref={beam}>
        <planeGeometry args={[4.2, 0.006]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.65} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={trail}>
        <planeGeometry args={[4.2, 0.26]} />
        <meshBasicMaterial color="#0891b2" transparent opacity={0.08} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

/* ─── Ambient energy particles ─── */
function EnergyField() {
  const ref = useRef<THREE.Points>(null)
  const N = 140

  const { basePos, phases } = useMemo(() => {
    const basePos = new Float32Array(N * 3)
    const phases  = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 1.8 + Math.random() * 1.4
      basePos[i * 3]     = r * Math.cos(a)
      basePos[i * 3 + 1] = -3.5 + Math.random() * 8.5
      basePos[i * 3 + 2] = r * Math.sin(a)
      phases[i] = Math.random() * Math.PI * 2
    }
    return { basePos, phases }
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(basePos.slice(), 3))
    return g
  }, [basePos])

  useFrame((s) => {
    if (!ref.current) return
    const t = s.clock.elapsedTime
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < N; i++) {
      const a = phases[i] + t * 0.16
      const r = 1.8 + 0.5 * Math.sin(t * 0.35 + phases[i])
      attr.setXYZ(
        i,
        r * Math.cos(a),
        basePos[i * 3 + 1] + Math.sin(t * 0.45 + phases[i]) * 0.16,
        r * Math.sin(a),
      )
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#a5f3fc"
        size={0.045}
        transparent
        opacity={0.50}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

/* ─── Canvas loader overlay ─── */
function CanvasLoader() {
  const { progress, active } = useProgress()
  return (
    <Html center style={{ pointerEvents: "none" }}>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div style={{
              width: 48, height: 48,
              border: "2.5px solid transparent",
              borderTopColor: "#22d3ee",
              borderRightColor: "#14b8a6",
              borderRadius: "50%",
              animation: "spin 0.85s linear infinite",
            }} />
            <p style={{ marginTop: 10, color: "#67e8f9", fontWeight: 700, letterSpacing: 4, fontSize: 11 }}>
              {progress.toFixed(0)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  )
}

/* ─── Full scene ─── */
function HumanAIScene() {
  return (
    <>
      <ambientLight intensity={0.15} color="#0f172a" />
      <pointLight position={[3, 5, 4]}   intensity={2.4} color="#22d3ee"  distance={22} />
      <pointLight position={[-4, 2, 3]}  intensity={1.4} color="#818cf8"  distance={18} />
      <pointLight position={[0, -5, 3]}  intensity={0.9} color="#0e7490"  distance={14} />
      <pointLight position={[0, 6, 2]}   intensity={1.0} color="#e0f2fe"  distance={20} />

      <HumanBody />
      <ScanBeam />
      <EnergyField />

      <OrbitRing radius={2.9} tube={0.013} rotX={Math.PI / 2.3} speed={0.17}  color="#22d3ee" opacity={0.40} />
      <OrbitRing radius={3.5} tube={0.009} rotX={Math.PI / 3.7} speed={-0.11} color="#818cf8" opacity={0.28} />
      <OrbitRing radius={2.3} tube={0.018} rotX={Math.PI / 1.7} speed={0.23}  color="#67e8f9" opacity={0.25} />
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Public exports
   ───────────────────────────────────────────────────────────────── */

/** Standalone canvas — place inside any positioned container */
export function HumanAICanvas({ className = "" }: { className?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 9.8], fov: 44 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <HumanAIScene />
      </Suspense>
    </Canvas>
  )
}

/** Legacy full-page fixed background (no longer used on hero but kept for other sections) */
export function Scene3D() {
  return null
}
