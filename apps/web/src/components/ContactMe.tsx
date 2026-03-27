"use client"

import React from "react"
import { useForm, ValidationError } from "@formspree/react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  EnvelopeSimple,
  CircleNotch,
  TerminalWindow,
} from "@phosphor-icons/react"

const UI_DATA = {
  categories: [
    { value: "fullstack", label: "Full-Stack Development" },
    { value: "backend", label: "Backend / Systems" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "other", label: "Other Inquiry" },
  ],
  contact: {
    email: "contact-me@pixlized.net",
  },
}

export default function ContactForm() {
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID")

  // Common input styles for consistency
  const inputClasses = "w-full border-b-2 border-border bg-muted/20 px-4 py-3 font-mono text-sm transition-all outline-none placeholder:opacity-30 hover:bg-muted/30 focus:border-primary focus:bg-primary/10"

  return (
    <div className="group relative w-full max-w-2xl overflow-hidden border border-border bg-background/60 p-6 transition-all md:p-12 lg:p-16">

      {/* --- 1. BACKGROUND SVG ANIMATION --- */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-[0.2] md:block">
        <motion.svg
          viewBox="0 0 100 100"
          className="h-full w-full text-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          {[...Array(6)].map((_, i) => (
            <ellipse key={`lat-${i}`} cx="50" cy="50" rx="47" ry={8 + i * 8} fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1 3" />
          ))}
        </motion.svg>
      </div>

      {/* --- 2. CORNER BRACKETS --- */}
      <div className="pointer-events-none absolute inset-0 hidden p-4 md:block">
        <div className="absolute top-4 left-4 h-4 w-4 border-t border-l border-primary/20 transition-all group-hover:border-primary/60" />
        <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-primary/20 transition-all group-hover:border-primary/60" />
        <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-primary/20 transition-all group-hover:border-primary/60" />
        <div className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-primary/20 transition-all group-hover:border-primary/60" />
      </div>

      {/* --- 3. HEADER --- */}
      <div className="relative z-20 mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-primary uppercase">
            <TerminalWindow size={14} />
            <span>Communication_Channel</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase md:text-4xl">
            Get in touch
          </h2>
        </div>
        <div className="hidden text-right font-mono text-[9px] text-muted-foreground uppercase md:block">
          Loc: Orion Arm
        </div>
      </div>

      {/* --- 4. FORM --- */}
      <form onSubmit={handleSubmit} className="relative z-20 space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Email Input */}
          <div className="group/input space-y-2">
            <label htmlFor="email" className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase transition-colors group-focus-within/input:text-primary">
              // 01. Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="IDENTITY@NODE.COM"
              className={inputClasses}
            />
             <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 block font-mono text-[10px] text-destructive" />
          </div>

          {/* Project Type Select */}
          <div className="group/input space-y-2">
            <label htmlFor="type" className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase transition-colors group-focus-within/input:text-primary">
              // 02. Project_Type
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                className={`${inputClasses} appearance-none cursor-pointer`}
              >
                {UI_DATA.categories.map((c) => (
                  <option key={c.value} value={c.value} className="bg-background text-foreground">
                    {c.label.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* Message Textarea */}
        <div className="group/input space-y-2">
          <label htmlFor="message" className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase transition-colors group-focus-within/input:text-primary">
            // 03. Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Type your message here..."
            className={`${inputClasses} resize-none`}
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 block font-mono text-[10px] text-destructive" />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={state.submitting}
          whileHover={{ x: 5 }}
          className="flex w-full items-center justify-between border border-primary/20 bg-primary/5 px-8 py-4 transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50 md:w-max md:min-w-[240px]"
        >
          <span className="font-mono text-sm tracking-[0.2em] uppercase">
            {state.submitting ? "Sending..." : "Send Message"}
          </span>
          {state.submitting ? (
            <CircleNotch size={18} className="animate-spin" />
          ) : (
            <ArrowRight size={18} />
          )}
        </motion.button>
      </form>

      {/* --- 5. FOOTER --- */}
      <div className="relative z-20 mt-12 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
        <div className="text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Or contact me directly at:
          </p>
          <a
            href={`mailto:${UI_DATA.contact.email}`}
            className="mt-1 flex items-center gap-2 font-mono text-xs text-primary transition-all hover:translate-x-1"
          >
            <EnvelopeSimple size={14} />
            {UI_DATA.contact.email}
          </a>
        </div>

        <div className="flex items-center gap-4">
           <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
           <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
             System_Ready
           </span>
        </div>
      </div>
    </div>
  )
}
