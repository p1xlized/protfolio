"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User, EnvelopeSimple, Briefcase,
  CurrencyDollar, ChatCircleDots, CircleNotch,
  PaperPlaneTilt, ShieldCheck, Cpu, ArrowsInLineVertical,
  TerminalWindow, GraphIcon, ChatCenteredText
} from "@phosphor-icons/react"
import { API_URL } from "@/lib/api"
import { ContactSchema, type contactBody } from "@portfolio/types"

const labelClasses = "flex items-center gap-2 text-[10px] uppercase text-card-foreground mb-1"
const boxInputClasses = "w-full bg-background/5 placeholder:text-primary/70 border border-primary/20 p-3 text-xs font-mono text-foreground focus:border-primary focus:outline-none focus:bg-background/20 transition-all"

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle")
  const [logId, setLogId] = useState("")
  const [errors, setErrors] = useState<Partial<Record<keyof contactBody, string>>>({})

  const [formData, setFormData] = useState<contactBody>({
    name: "",
    email: "",
    projectType: "Software Development",
    priority: "Standard",
    message: ""
  })

  useEffect(() => {
    if (status === "success") {
      setLogId(Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase())
    }
  }, [status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for a field when user starts typing again
    if (errors[name as keyof contactBody]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    // 🛡️ Client-side Zod Validation
    const validation = ContactSchema.safeParse(formData)

    if (!validation.success) {
      const formattedErrors: Partial<Record<keyof contactBody, string>> = {}
      validation.error.errors.forEach((err) => {
        const path = err.path[0] as keyof contactBody
        formattedErrors[path] = err.message
      })
      setErrors(formattedErrors)
      return
    }

    setStatus("sending")

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setFormData({ name: "", email: "", projectType: "Software Development", priority: "Standard", message: "" })
      } else {
        throw new Error(result.error?.message || "DISPATCH_FAILURE")
      }
    } catch (error) {
      console.error("Transmission Error:", error)
      alert("CRITICAL_FAILURE: Could not reach the server. Please try again.")
      setStatus("idle")
    }
  }

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden border-2 border-primary/20 bg-background/5 p-6 md:p-8 backdrop-blur-md"
      >
        {/* Euclidean Accents */}
        <div className="absolute top-0 left-0 size-3 bg-primary z-20" />
        <div className="absolute bottom-0 right-0 size-3 bg-primary z-20" />

        <AnimatePresence mode="wait">
          {status !== "success" ? (
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 space-y-6">

              <div className="flex flex-col gap-1 border-b-2 border-primary/10 pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <TerminalWindow size={20} className="text-primary" />
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground">
                      CONTACT_<span className="text-primary">ME</span>
                    </h2>
                  </div>
                  <GraphIcon size={14} className="text-primary opacity-30 animate-pulse hidden sm:block" />
                </div>
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest flex items-center gap-2">
                  <ChatCenteredText size={12} />
                  Ready to start a new project or just say hi?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClasses}><User size={10}/> Full Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Your name"
                      className={`${boxInputClasses} ${errors.name ? 'border-red-500/50 bg-red-500/5' : ''}`}
                    />
                    {errors.name && <p className="text-[8px] text-red-500 uppercase font-black tracking-tighter">! {errors.name}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses}><EnvelopeSimple size={10}/> Email Address</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="example@email.com"
                      className={`${boxInputClasses} ${errors.email ? 'border-red-500/50 bg-red-500/5' : ''}`}
                    />
                    {errors.email && <p className="text-[8px] text-red-500 uppercase font-black tracking-tighter">! {errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClasses}><Briefcase size={10}/> Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={boxInputClasses}
                    >
                      <option value="Software Development" className="bg-background">Software Development</option>
                      <option value="Design" className="bg-background">Design</option>
                      <option value="Consulting" className="bg-background">Consulting</option>
                      <option value="Other" className="bg-background">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses}><CurrencyDollar size={10}/> Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className={boxInputClasses}
                    >
                      <option value="Standard" className="bg-background">Standard</option>
                      <option value="High" className="bg-background">High</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                    <label className={labelClasses}><ChatCircleDots size={10}/> Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell me about your idea..."
                      className={`${boxInputClasses} resize-none ${errors.message ? 'border-red-500/50 bg-red-500/5' : ''}`}
                    />
                    {errors.message && <p className="text-[8px] text-red-500 uppercase font-black tracking-tighter">! {errors.message}</p>}
                </div>

                <div className="relative pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group/btn relative w-full h-12 bg-transparent border-2 border-primary/40 overflow-hidden transition-all hover:border-primary disabled:opacity-50"
                  >
                    <div className="absolute inset-0 z-0 h-full w-0 bg-primary transition-all duration-300 ease-out group-hover/btn:w-full" />
                    <div className="relative z-10 flex items-center justify-between px-6 h-full transition-colors duration-200 group-hover/btn:text-background font-black">
                       <div className="flex items-center gap-3">
                          <ArrowsInLineVertical size={18} className="group-hover/btn:rotate-180 transition-transform" />
                          <span className="text-[11px] uppercase tracking-[0.4em]">
                            {status === "sending" ? "Encrypting..." : "Send Message"}
                          </span>
                       </div>
                       <div className="flex items-center gap-2">
                          {status === "sending" ? (
                            <CircleNotch size={18} className="animate-spin" />
                          ) : (
                            <PaperPlaneTilt size={18} weight="bold" />
                          )}
                       </div>
                    </div>
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-12 space-y-5 text-center relative z-10">
              <div className="size-16 border-2 border-primary flex items-center justify-center bg-primary/5">
                 <ShieldCheck size={32} weight="bold" className="text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Message Sent!</h3>
                <p className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">Reference ID: 0x{logId}</p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="group relative border-2 border-primary px-10 py-2 font-black text-[9px] uppercase tracking-[0.5em] overflow-hidden bg-transparent"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-background transition-colors">Send Another</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="relative z-10 mt-6 pt-3 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <a href="mailto:contact-me@pixlized.net" className="group/mail flex items-center gap-3">
            <div className="size-8 border-2 border-primary/30 flex items-center justify-center transition-all group-hover/mail:bg-primary group-hover/mail:text-background">
               <EnvelopeSimple size={14} weight="bold" />
            </div>
            <span className="font-mono text-[9px] text-foreground/60 group-hover/mail:text-primary uppercase tracking-tighter">contact-me@pixlized.net</span>
          </a>
          <div className="flex items-center gap-2 opacity-30">
             <Cpu size={14} />
             <span className="text-[7px] font-black uppercase tracking-widest">KUOPIO_NODE_FI</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
