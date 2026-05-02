"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, MessageCircle, Loader2, ArrowUpRight } from "lucide-react"
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
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
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
      className="relative py-32 overflow-hidden"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 liquid-bg opacity-30" />
      <Parallax speed={0.15} className="absolute top-0 right-0 w-[600px] h-[600px] bg-ozmo-cyan/10 rounded-full blur-[120px]" />
      <Parallax speed={0.2} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ozmo-green/10 rounded-full blur-[100px]" />

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
      <MagneticButton strength={0.4}>
        <motion.a
          href="https://wa.me/15551234567"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-shadow"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.a>
      </MagneticButton>
    </section>
  )
}
