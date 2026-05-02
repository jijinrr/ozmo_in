"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUp, Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { Parallax } from "./scroll-reveal"

const footerLinks = {
  services: [
    { label: "Website Development", href: "#services" },
    { label: "App Development", href: "#services" },
    { label: "Digital Marketing", href: "#services" },
    { label: "AI Solutions", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Careers", href: "#" },
  ],
  support: [
    { label: "Contact Us", href: "#contact" },
    { label: "FAQs", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 liquid-bg opacity-20" />
      <Parallax speed={0.1} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-ozmo-cyan/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <MagneticButton strength={0.1}>
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTop()
                }}
                className="inline-block mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-08%20at%206.06.06%E2%80%AFPM-IOTLasZowGMZLarEdb7O8z7GgiX2F5.jpeg"
                  alt="OZMO Innovations"
                  width={160}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </motion.a>
            </MagneticButton>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Engineering digital excellence through innovative web solutions,
              cutting-edge applications, and AI-powered experiences that
              transform businesses.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <MagneticButton key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-ozmo-cyan/30 transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-ozmo-cyan transition-colors" />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-muted-foreground hover:text-ozmo-cyan transition-colors text-sm inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-muted-foreground hover:text-ozmo-cyan transition-colors text-sm inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-muted-foreground hover:text-ozmo-cyan transition-colors text-sm inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-ozmo-cyan/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} OZMO Innovations. All rights reserved.
          </p>

          {/* Back to Top */}
          <MagneticButton strength={0.2}>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-ozmo-cyan transition-colors group"
            >
              Back to top
              <span className="p-2 rounded-xl glass border border-white/10 group-hover:border-ozmo-cyan/30 group-hover:bg-ozmo-cyan/10 transition-all">
                <ArrowUp className="w-4 h-4" />
              </span>
            </motion.button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
