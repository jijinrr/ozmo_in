"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Loader2, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollReveal, Parallax } from "./scroll-reveal"
import { MagneticButton } from "./magnetic-button"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ozmoinnovations.com",
    href: "mailto:hello@ozmoinnovations.com",
  },
  {
    icon: Phone,
    label: "Phone (India)",
    value: "+91 8547570938",
    href: "tel:+918547570938",
  },
  {
    icon: Phone,
    label: "Phone (UAE)",
    value: "+971 585907388",
    href: "tel:+971585907388",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India & UAE",
    href: "#",
  },
]

const socialLinks = [
  { name: "Twitter", initial: "X" },
  { name: "LinkedIn", initial: "Li" },
  { name: "Instagram", initial: "Ig" },
  { name: "GitHub", initial: "Gh" },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
    alert("Thank you for your message! We will get back to you soon.")
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 liquid-bg opacity-30" />
      <Parallax speed={0.15} className="absolute top-0 right-0 w-[600px] h-[600px] bg-ozmo-cyan/10 rounded-full blur-[120px]" children={undefined} />
      <Parallax speed={0.2} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ozmo-green/10 rounded-full blur-[100px]" children={undefined} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-ozmo-cyan/10 text-ozmo-cyan border border-ozmo-cyan/20 mb-6">
              Contact Us
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">{"Let's Build "}</span>
              <span className="gradient-text">Something Great</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Ready to transform your digital presence? Get in touch and
              {" let's discuss how we can bring your vision to life."}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal direction="left">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Get in Touch
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {"We'd love to hear from you. Whether you have a question, want "}
                  to start a project, or simply want to connect, feel free to reach out.
                </p>
              </div>
            </ScrollReveal>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <ScrollReveal key={info.label} delay={0.1 + index * 0.1} direction="left">
                  <motion.a
                    href={info.href}
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-ozmo-cyan/30 transition-all group cursor-pointer"
                  >
                    <motion.div 
                      className="p-3.5 rounded-xl bg-gradient-to-br from-ozmo-cyan to-ozmo-green"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <info.icon className="w-5 h-5 text-background" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-semibold text-foreground group-hover:gradient-text transition-all">
                        {info.value}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-ozmo-cyan transition-colors" />
                  </motion.a>
                </ScrollReveal>
              ))}
            </div>

            {/* Social Links */}
            <ScrollReveal delay={0.4} direction="left">
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <MagneticButton key={social.name} strength={0.3}>
                      <motion.a
                        href="#"
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-xl glass border border-white/10 hover:border-ozmo-cyan/30 flex items-center justify-center transition-all group"
                      >
                        <span className="text-sm font-bold text-muted-foreground group-hover:text-ozmo-cyan transition-colors">
                          {social.initial}
                        </span>
                      </motion.a>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal delay={0.2} direction="right" className="lg:col-span-3">
            <motion.form
              onSubmit={handleSubmit}
              className="relative p-8 md:p-10 rounded-3xl glass border border-white/5 overflow-hidden"
            >
              {/* Form Background Effects */}
              <div className="absolute inset-0 opacity-50">
                <div className="absolute top-0 right-0 w-40 h-40 bg-ozmo-cyan/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-ozmo-green/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Your Name
                    </label>
                    <motion.div
                      animate={{
                        boxShadow: focusedField === "name" 
                          ? "0 0 0 2px rgba(78, 225, 192, 0.3), 0 0 20px rgba(78, 225, 192, 0.1)" 
                          : "none"
                      }}
                      className="rounded-xl"
                    >
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="bg-secondary/30 border-white/10 focus:border-ozmo-cyan focus:ring-0 rounded-xl py-6"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <motion.div
                      animate={{
                        boxShadow: focusedField === "email" 
                          ? "0 0 0 2px rgba(78, 225, 192, 0.3), 0 0 20px rgba(78, 225, 192, 0.1)" 
                          : "none"
                      }}
                      className="rounded-xl"
                    >
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="bg-secondary/30 border-white/10 focus:border-ozmo-cyan focus:ring-0 rounded-xl py-6"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <motion.div
                    animate={{
                      boxShadow: focusedField === "subject" 
                        ? "0 0 0 2px rgba(78, 225, 192, 0.3), 0 0 20px rgba(78, 225, 192, 0.1)" 
                        : "none"
                    }}
                    className="rounded-xl"
                  >
                    <Input
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="bg-secondary/30 border-white/10 focus:border-ozmo-cyan focus:ring-0 rounded-xl py-6"
                    />
                  </motion.div>
                </div>

                {/* Message Field */}
                <div className="space-y-2 mb-8">
                  <label className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <motion.div
                    animate={{
                      boxShadow: focusedField === "message" 
                        ? "0 0 0 2px rgba(78, 225, 192, 0.3), 0 0 20px rgba(78, 225, 192, 0.1)" 
                        : "none"
                    }}
                    className="rounded-xl"
                  >
                    <Textarea
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="bg-secondary/30 border-white/10 focus:border-ozmo-cyan focus:ring-0 rounded-xl resize-none"
                    />
                  </motion.div>
                </div>

                {/* Submit Button */}
                <MagneticButton strength={0.1} className="w-full">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full bg-gradient-to-r from-ozmo-cyan to-ozmo-green text-background font-semibold py-7 text-lg rounded-xl overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-ozmo-green to-ozmo-cyan"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </MagneticButton>
              </div>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/918547570938"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 transition-shadow"
      >
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        {/* WhatsApp SVG */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 relative z-10"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </section>
  )
}
