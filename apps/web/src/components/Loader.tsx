"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SystemLoaderProps {
  onComplete?: () => void
  duration?: number // Time in seconds
}

function SystemLoader({ onComplete, duration = 1.5 }: SystemLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background font-mono"
    >
      {/* BACKGROUND: MICROMESH GRID */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(theme(colors.primary.DEFAULT/0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

      {/* --- DECORATED WIREFRAME MODULE --- */}
      <div className="relative mb-16 flex size-48 items-center justify-center">
        {/* EXTERNAL CORNER BRACKETS */}
        <div className="absolute inset-0 scale-110">
          <div className="absolute top-0 left-0 size-4 border-t border-l border-primary/30" />
          <div className="absolute top-0 right-0 size-4 border-t border-r border-primary/30" />
          <div className="absolute bottom-0 left-0 size-4 border-b border-l border-primary/30" />
          <div className="absolute right-0 bottom-0 size-4 border-r border-b border-primary/30" />
        </div>

        {/* ROTATING PLANET (HIGH DENSITY) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative size-32 rounded-full border border-primary/5"
        >
          {/* Increased Density: Latitude (6 lines) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`lat-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="absolute inset-0 rounded-full border border-primary/20"
              style={{ transform: `rotateX(${30 + i * 25}deg)` }}
            />
          ))}
          {/* Increased Density: Longitude (6 lines) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`lng-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="absolute inset-0 rounded-full border border-primary/20"
              style={{ transform: `rotateY(${30 + i * 25}deg)` }}
            />
          ))}

          {/* Equatorial Ring (Heavy) */}
          <div className="absolute inset-0 scale-105 rounded-full border-y border-primary/40" />
        </motion.div>

        {/* HUD DECO: DATA PIPS */}
        <div className="absolute -left-8 flex flex-col gap-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="h-1 w-3 bg-primary/40"
            />
          ))}
        </div>

        <div className="absolute -right-12 rotate-90 text-[6px] tracking-[0.5em] text-primary/20 uppercase">
          Geometry_Buffer // Static
        </div>

        {/* Core Focal Point */}
        <div className="absolute size-1.5 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
      </div>

      {/* --- PROGRESS MODULE --- */}
      <div className="relative w-72 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-1 animate-pulse bg-primary" />
            <span className="text-[7px] font-bold tracking-[0.5em] text-primary uppercase">
              Uplink_Seq
            </span>
          </div>
          <span className="font-mono text-[7px] text-primary/40">
            0x004_SYSTEM_INIT
          </span>
        </div>

        <div className="relative h-[2px] w-full bg-primary/5">
          {/* Progress Trace */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration, ease: [0.45, 0.05, 0.55, 0.95] }}
            onAnimationComplete={onComplete}
            className="h-full w-full origin-left bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)]"
          />
          {/* Scanning light "glitch" */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>

        <div className="flex justify-between text-[6px] tracking-widest text-primary/30 uppercase">
          <span>Mem_Alloc: OK</span>
          <span>Kernel: Phosphor_V4</span>
        </div>
      </div>
    </motion.div>
  )
}

function DataUplink({
  onComplete,
  mode,
}: {
  onComplete: () => void
  mode: "uplink" | "downlink"
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background/90 font-mono backdrop-blur-md"
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Minimal Central Node */}
        <div className="relative flex size-12 items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute size-full rounded-full border border-primary"
          />
          <div className="size-1 bg-primary shadow-[0_0_8px_var(--primary)]" />
        </div>

        {/* Data Stream Identity */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[6px] font-bold tracking-[0.8em] text-primary/40 uppercase">
            {mode === "uplink" ? "Initiating_Sync" : "Closing_Channel"}
          </span>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-l from-primary/50 to-transparent" />
            <span className="text-[10px] font-light tracking-widest text-primary uppercase">
              {mode === "uplink" ? "Uplink_Active" : "Returning"}
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
        </div>

        {/* Ultra-Slim Progress Trace */}
        <div className="relative h-px w-48 overflow-hidden bg-primary/5">
          <motion.div
            initial={{ x: mode === "uplink" ? "-100%" : "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.6, ease: "circOut" }}
            onAnimationComplete={onComplete}
            className="h-full w-full bg-primary"
          />
        </div>

        {/* Moving Binary bits (Faint) */}
        <div className="absolute -bottom-12 flex gap-6 opacity-10">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -20], opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              className="text-[7px] text-primary"
            >
              0x{Math.floor(Math.random() * 255).toString(16)}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export { DataUplink, SystemLoader }
