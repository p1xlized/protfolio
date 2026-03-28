"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Quotes,
  ShieldCheck,
  CaretLeft,
  CaretRight,
  Fingerprint,
  Broadcast,
  User,
  CornersOut
} from "@phosphor-icons/react"

const TESTIMONIALS = [
  {
    id: "U-01",
    author: "Marc-Antoine D.",
    role: "Senior Lead Dev",
    project: "Distributed Systems Architecture",
    date: "2026.02.14",
    content: "Exceptional mastery of distributed systems. The integration speed on the Golang backend was surgical. p1xlized is a force multiplier for any technical team requiring high-performance infrastructure.",
    hash: "0x88_SEC_ALPHA"
  },
  {
    id: "U-02",
    author: "Sarah L.",
    role: "Product Architect",
    project: "TUI Interface Framework",
    date: "2025.11.28",
    content: "The TUI-aesthetic portfolio components aren't just for show—the underlying React logic is some of the cleanest I've audited in years. Highly efficient and strictly typed codebase.",
    hash: "0x42_VAL_BETA"
  },
  {
    id: "U-03",
    author: "Jonas K.",
    role: "Full-Stack Dev",
    project: "Cloud Native Monorepo",
    date: "2026.01.05",
    content: "From TypeScript to low-level systems, the versatility is rare. Handled the monorepo deployment with zero downtime using ElysiaJS and Bun. A flawless execution under pressure.",
    hash: "0xFF_OPT_GAMMA"
  }
]

// --- BACKGROUND SVG: Geometric Cipher ---
const GeometricBackground = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
    <motion.svg
      width="800"
      height="800"
      viewBox="0 0 100 100"
      className="text-primary transition-opacity duration-1000 opacity-[0.03] group-hover:opacity-[0.15]"
    >
      <motion.circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.1" fill="none" strokeDasharray="4 2" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
      <motion.path d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z" stroke="currentColor" strokeWidth="0.15" fill="none" animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
      <path d="M50 30 L50 70 M30 50 L70 50" stroke="currentColor" strokeWidth="0.1" />
      {[...Array(6)].map((_, i) => (
        <motion.circle key={i} cx={50 + 35 * Math.cos(i * 60 * Math.PI / 180)} cy={50 + 35 * Math.sin(i * 60 * Math.PI / 180)} r="0.5" fill="currentColor" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }} />
      ))}
    </motion.svg>
  </div>
)

export default function ReviewsSection() {
  const [index, setIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isAutoPlay])

  const current = TESTIMONIALS[index]

  const handleNext = () => { setIndex((prev) => (prev + 1) % TESTIMONIALS.length); setIsAutoPlay(false); }
  const handlePrev = () => { setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); setIsAutoPlay(false); }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-24 relative flex flex-col gap-6">

      {/* --- TOP: HIGH-TRANSPARENCY FLOATING VIEWPORT --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        // Maximum transparency (bg-background/10) to let the space backdrop pop through
        className="group relative w-full border border-primary/30 bg-background/10 backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.2)] flex-1 min-h-[300px] lg:min-h-[400px] flex items-center justify-center p-6 md:p-12 overflow-hidden"
      >
        <GeometricBackground />
        <Fingerprint size={320} className="absolute text-primary opacity-[0.02] pointer-events-none" />

        {/* Tactical Viewport Frame */}
        <CornersOut size={40} className="absolute top-4 left-4 text-primary/30" />
        <CornersOut size={40} className="absolute bottom-4 right-4 text-primary/30 rotate-180" />

        {/* The Payload (Scaled down, highly readable text) */}
        <div className="w-full max-w-4xl relative z-10 px-4 md:px-12 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              <Quotes size={28} weight="fill" className="text-primary/20 mx-auto mb-4 md:mb-6" />
              {/* Scaled down to text-base md:text-2xl for better density */}
              <p className="text-base sm:text-lg md:text-2xl font-bold tracking-tight text-foreground leading-[1.6] md:leading-[1.5]">
                "{current.content}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* --- BOTTOM: THE DETACHED METADATA SHEET --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full border border-primary/20 bg-background/90 p-6 md:p-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">

          {/* Column 1: Identity Module */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`author-${current.id}`}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-5"
            >
              <div className="relative shrink-0">
                <div className="size-12 md:size-16 border-2 border-primary/30 bg-primary/5 flex items-center justify-center">
                   <User size={28} weight="thin" className="text-primary/60" />
                </div>
                <ShieldCheck size={18} weight="fill" className="absolute -bottom-1 -right-1 text-primary bg-background rounded-full shadow-[0_0_10px_var(--primary)]" />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="text-base md:text-xl font-black text-foreground uppercase tracking-widest truncate">{current.author}</span>
                <span className="text-[9px] md:text-[10px] font-black text-primary tracking-[0.3em] uppercase opacity-80 truncate">
                    // {current.role}
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                   <div className="size-1 bg-primary animate-pulse" />
                   <span className="text-[7px] font-mono text-primary/50 tracking-[0.4em] uppercase truncate">
                       PRJ:: {current.project}
                   </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Column 2: Re-Integrated Controls */}
          <div className="flex flex-col items-center justify-center gap-3 order-first md:order-none border-b border-primary/10 md:border-none pb-6 md:pb-0">
             <div className="flex items-center gap-6">
                <button onClick={handlePrev} className="size-10 border border-primary/30 hover:border-primary flex items-center justify-center hover:bg-primary hover:text-background transition-all group">
                  <CaretLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                </button>

                {/* Pagination Dots */}
                <div className="flex gap-2 items-center">
                  {TESTIMONIALS.map((_, i) => (
                    <div key={i} className={`h-[2px] transition-all duration-500 ${index === i ? "w-6 bg-primary shadow-[0_0_8px_var(--primary)]" : "w-2 bg-primary/20"}`} />
                  ))}
                </div>

                <button onClick={handleNext} className="size-10 border border-primary/30 hover:border-primary flex items-center justify-center hover:bg-primary hover:text-background transition-all group">
                  <CaretRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
             <span className="text-[7px] font-black tracking-[0.5em] text-primary/40 uppercase">Archive_Nav</span>
          </div>

          {/* Column 3: Telemetry Module */}
          <AnimatePresence mode="wait">
            <motion.div
               key={`meta-${current.id}`}
               initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
               className="flex flex-col items-start md:items-end justify-center gap-2 pt-2 md:pt-0"
            >
              <div className="flex items-center justify-between md:justify-end gap-4 w-full">
                 <span className="text-[8px] font-black text-primary/50 uppercase tracking-[0.4em]">Hash</span>
                 <span className="font-mono text-[10px] md:text-[11px] text-primary font-bold tracking-widest bg-primary/5 px-2 py-0.5 border border-primary/20">
                    {current.hash}
                 </span>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4 w-full">
                 <span className="text-[8px] font-black text-primary/50 uppercase tracking-[0.4em]">Date</span>
                 <span className="font-mono text-[10px] md:text-[11px] text-foreground font-bold tracking-widest">
                    {current.date}
                 </span>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4 w-full mt-1.5">
                 <div className="hidden md:block w-8 h-px bg-primary/20" />
                 <div className="flex items-center gap-2">
                    <Broadcast size={14} className="text-primary animate-pulse" />
                    <span className="text-[8px] font-black text-primary uppercase tracking-[0.5em]">Validated</span>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </motion.div>

    </section>
  )
}
