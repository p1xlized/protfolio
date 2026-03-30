"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Quotes,
  CaretLeft,
  CaretRight,
  User,
  Target,
  Cpu,
  Fingerprint
} from "@phosphor-icons/react"

interface Testimonial {
  id: string | number
  content: string
  author: string
  role: string
  hash?: string
}

interface Props {
  data: Testimonial[]
}

const TRANSITION = { type: "spring", stiffness: 300, damping: 30 }

export default function UnifiedReviews({ data }: Props) {
  const [index, setIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const current = useMemo(() => data[index], [data, index])

  useEffect(() => {
    if (!isAutoPlay || data.length <= 1) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isAutoPlay, data.length])

  const navigate = useCallback((dir: number) => {
    setIndex((prev) => (prev + dir + data.length) % data.length)
    setIsAutoPlay(false)
  }, [data.length])

  if (!data?.length) return null

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 select-none">
      {/* MAIN CONTAINER: Fixed height to prevent layout shift */}
      <div className="relative border border-primary/20 bg-background/5 backdrop-blur-sm overflow-hidden flex flex-col h-[550px] md:h-[450px]">

        {/* 1. TOP UTILITY BAR */}
        <div className="flex items-center justify-between border-b border-primary/10 px-4 py-2 bg-primary/[0.03]">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-primary/40" />
            <span className="text-[9px] font-mono tracking-[0.3em] text-primary/50 uppercase">
              Core.Node // {current.hash || "0x7721"}
            </span>
          </div>
          <div className="flex gap-1.5">
            {data.map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-500 ${index === i ? "w-4 bg-primary" : "w-1 bg-primary/20"}`}
              />
            ))}
          </div>
        </div>

        {/* 2. MAIN CONTENT & NAVIGATION HUB */}
        <div className="relative flex-grow flex items-center justify-center px-6 md:px-20">

          {/* Navigation - Left */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-2 md:left-6 z-20 size-12 flex items-center justify-center border border-primary/10 bg-background/50 hover:bg-primary hover:text-background transition-all active:scale-90"
          >
            <CaretLeft size={20} weight="bold" />
          </button>

          {/* Center Quote */}
          <div className="w-full max-w-2xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                transition={TRANSITION}
              >
                <Quotes size={32} weight="fill" className="text-primary/10 mx-auto mb-6" />
                <p className="text-xl md:text-3xl font-bold tracking-tight text-foreground italic leading-snug">
                  "{current.content}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation - Right */}
          <button
            onClick={() => navigate(1)}
            className="absolute right-2 md:right-6 z-20 size-12 flex items-center justify-center border border-primary/10 bg-background/50 hover:bg-primary hover:text-background transition-all active:scale-90"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </div>

        {/* 3. UNIFIED BOTTOM STATUS BAR */}
        <div className="mt-auto border-t border-primary/10 bg-primary/[0.03] p-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Left: Identity */}
            <div className="flex items-center gap-4">
              <div className="size-10 md:size-12 border border-primary/20 bg-background flex items-center justify-center relative">
                <User size={20} weight="thin" className="text-primary/60" />
                <div className="absolute -top-1 -right-1 size-3 bg-primary flex items-center justify-center">
                  <Fingerprint size={8} className="text-background" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm md:text-lg font-black uppercase tracking-tighter text-foreground">
                  {current.author}
                </span>
                <span className="text-[8px] font-bold text-primary tracking-[0.2em] uppercase opacity-70">
                  {current.role}
                </span>
              </div>
            </div>

            {/* Right: Technical Metadata (Mobile Hidden) */}
            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-mono uppercase tracking-widest text-primary">Protocol_Secure</span>
                <Target size={12} className="text-primary" />
              </div>
              <div className="h-[1px] w-24 bg-primary/20" />
              <span className="text-[7px] font-mono text-primary/40 uppercase">Verified_Reference_Auth</span>
            </div>

          </div>
        </div>

        {/* Decorative SVG Overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] overflow-hidden">
           <svg width="100%" height="100%" className="absolute inset-0">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
      </div>
    </section>
  )
}
