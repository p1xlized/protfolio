"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Archive,
  ArrowRight,
  Broadcast,
  CaretDoubleRight,
  Code,
  CornersOut,
  Cpu,
  Envelope,
  Fingerprint,
  GithubLogo,
  Globe,
  LinkedinLogo,
  Terminal,
  UserFocus,
} from "@phosphor-icons/react"
import { useNavigate } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@portfolio/ui/components/ui/dialog"
import ProfileDialog from "./ProfileDialog"

// --- CONFIGURATION JSON ---
const UI_DATA = {
  profile: {
    name: "Alexandru Paduret",
    location: "p1xlized",
    image: "https://avatars.githubusercontent.com/u/72890769?v=4",
    tagline: "CORE_IDENTITY_VERIFIED",
    about:
      "Full-stack architect building fast systems and reactive interfaces. A jack-of-all-trades who’s surprisingly good at all of them, blending creativity and code.",
  },
  socials: [
    {
      id: "git",
      icon: <GithubLogo size={20} />,
      link: "https://github.com/pixlized",
    },
    {
      id: "link",
      icon: <LinkedinLogo size={20} />,
      link: "https://linkedin.com/in/alexandru-paduret",
    },
    {
      id: "mail",
      icon: <Envelope size={20} />,
      link: "mailto:alex@pixlized.net",
    },
  ],
  education: [
    {
      org: "UEF - FI",
      degree: "B.Sc Computer Science",
      progress: 50,
      status: "ACTIVE",
    },
    {
      org: "Maisonneuve College - CA",
      degree: "DEC Software Dev",
      progress: 100,
      status: "COMPLETE",
    },
  ],
  stats: {
    records: 14,
    encryption: "BitLock_256",
    uplink: "00.26.4",
  },
}
const titles: string[] = ["FULL STACK", "BACKEND", "MOBILE", "GAMEDEV"]
const CornerMarkers = () => (
  <>
    <div className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-primary/40" />
    <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-primary/40" />
    <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-primary/40" />
    <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-r border-b border-primary/40" />
  </>
)

const DesktopView = () => {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)

  // Reliable timer for the cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="relative mt-4 flex h-full w-full max-w-5xl flex-col gap-3 border border-primary/20 bg-background/60 p-8 shadow-xs">
      {/* HEADER */}
      <header className="relative mb-4 flex w-full flex-col overflow-hidden border-b border-primary/10 pb-4 md:flex-row md:items-center md:gap-6">
        {/* --- 1. SLIM WAVY GRID & AMBIENT PLANET --- */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <svg className="absolute size-0">
            <filter id="wave-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.02"
                numOctaves="2"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.01 0.02; 0.015 0.025; 0.01 0.02"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
            </filter>
          </svg>

          {/* The Wavy Grid */}
          <motion.div
            style={{ filter: "url(#wave-filter)" }}
            animate={{ y: [0, -32], x: [0, 16] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="h-[200%] w-[200%] bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] bg-[size:32px_32px] opacity-[0.03]"
          />

          {/* --- NEW ELEMENT: AMBIENT WIREFRAME PLANET ARC --- */}
        </div>

        <Dialog>
          <DialogTrigger>
        {/* --- 2. BIOMETRIC CORE (SLIM CIRCLE) --- */}
        <div className="group relative flex-none shrink-0">
          <div className="relative size-16 overflow-hidden rounded-full border border-primary/20 bg-background sm:size-20 md:size-28">
                <img
                src={UI_DATA.profile.image}
                alt={UI_DATA.profile.name}
                className="size-full object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"/>


          </div>
          {/* Minimalist Status Bit */}
          <div className="absolute right-1 bottom-1 z-20 size-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
        </div>
          </DialogTrigger>
          <DialogContent className="max-w-5xl w-full  border-none bg-transparent p-0 shadow-none">
            <div className="w-full max-w-5xl items-center justify-center">

            <ProfileDialog />
            </div>
          </DialogContent>
        </Dialog>
        {/* --- 3. IDENTITY (HIGH-CONTRAST / LOW-WEIGHT) --- */}
        <div className="flex min-w-0 flex-1 flex-col justify-center py-2 md:py-0">
          <div className="mb-0.5 flex items-center gap-2 text-[6px] font-medium tracking-[0.5em] text-primary/40 uppercase">
            <div className="h-[1px] w-3 bg-primary/40" /> NODE_UPLINK // ACTIVE
          </div>

          <motion.h1 className="w-full truncate text-3xl leading-none font-light tracking-tighter text-foreground uppercase sm:text-4xl md:text-6xl">
            {UI_DATA.profile.name}
          </motion.h1>

          {/* SNAPPY TITLE CYCLE (FOREGROUND TEXT) */}
          <div className="mt-1.5 flex h-5 w-fit items-center border-l border-primary/60 bg-primary/5 p-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={titles[index]}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className="text-[9px] font-medium tracking-[0.4em] whitespace-nowrap text-foreground uppercase"
              >
                {titles[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* --- 4. SOCIAL UPLINKS (SLIM RECTANGLES) --- */}
        <div className="flex flex-none shrink-0 items-center gap-2 border-t border-primary/10 pt-4 md:flex-col md:items-end md:justify-center md:border-t-0 md:border-l md:pt-0 md:pl-6">
          <div className="flex items-center gap-2">
            {UI_DATA.socials.map((social) => (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/icon relative flex size-9 items-center justify-center border border-primary/20 bg-transparent text-foreground transition-all duration-75 hover:border-primary hover:bg-primary/10 md:size-10"
              >
                {/* Ultra-thin corner markers */}
                <div className="absolute top-0 left-0 size-1 border-t border-l border-primary opacity-0 transition-opacity group-hover/icon:opacity-100" />
                <div className="absolute right-0 bottom-0 size-1 border-r border-b border-primary opacity-0 transition-opacity group-hover/icon:opacity-100" />

                <div className="relative z-10 scale-90 transition-transform group-hover/icon:scale-110">
                  {React.cloneElement(social.icon, {
                    size: 18,
                    weight: "thin",
                  })}
                </div>
              </a>
            ))}
          </div>

          <div className="hidden flex-col items-end gap-0.5 opacity-20 md:flex">
            <div className="h-[1px] w-6 bg-primary" />
            <span className="text-[5px] font-bold tracking-[0.4em] text-foreground uppercase">
              Uplinks
            </span>
          </div>
        </div>
      </header>
      {/* MAIN BENTO GRID */}
      <div className="mt-4 grid h-[520px] grid-cols-12 gap-3">
        {/* LEFT COLUMN */}
        <div className="col-span-12 flex flex-col gap-3 md:col-span-5">
          <motion.div
            whileHover={{ y: -2 }}
            className="group relative flex-[1.2] overflow-hidden border border-border bg-card/40 p-5 transition-all duration-500 hover:border-primary/50 hover:bg-primary/[0.02]"
          >
            {/* --- 1. HUD BORDERS (Matching Buttons) --- */}
            <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-border transition-colors group-hover:border-primary/60" />
            <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-border transition-colors group-hover:border-primary/60" />

            {/* --- 2. BACKGROUND: SCANNING ANIMATION --- */}
            <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {/* Surgical Laser Scan */}
              <motion.div
                animate={{ y: ["-10%", "110%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="h-[1px] w-full bg-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.3)]"
              />
              {/* Micro Dot Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>

            {/* --- 3. HEADER: MODULE IDENTIFIER --- */}
            <div className="relative z-10 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserFocus
                  size={18}
                  weight="thin"
                  className="text-muted-foreground transition-colors group-hover:text-primary"
                />
                <span className="text-[10px] tracking-[0.3em] text-foreground uppercase">
                  System_Bio
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="h-1 w-1 rounded-full bg-primary/40"
                  />
                ))}
              </div>
            </div>

            {/* --- 4. BIO: TELEMETRY DATA --- */}
            <div className="relative z-10 mb-6">
              <p className="text-[12px] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/90">
                <span className="mr-1 text-primary/40 group-hover:text-primary">
                  {">"}
                </span>
                {UI_DATA.profile.about}
              </p>
            </div>

            {/* --- 5. EDUCATION: COMPACT NODES --- */}
            <div className="relative z-10 space-y-4">
              {UI_DATA.education.map((e, i) => (
                <div key={i} className="group/node relative">
                  <div className="mb-1 flex items-end justify-between">
                    <span className="text-[8px] tracking-widest text-muted-foreground/60 uppercase group-hover/node:text-primary/70">
                      {e.org}
                    </span>
                    <span className="font-mono text-[7px] text-primary/40">
                      {e.status}
                    </span>
                  </div>

                  <div className="mb-2 text-[11px] tracking-tight text-foreground/80 transition-colors group-hover/node:text-primary">
                    {e.degree}
                  </div>

                  {/* --- 1PX DATA TRACE --- */}
                  <div className="relative h-[1px] w-full overflow-hidden bg-border/30">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${e.progress}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="h-full bg-primary/50"
                    />
                    {/* Active pulse on hover */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover/node:opacity-100"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* --- 6. FOOTER DECO --- */}
            <div className="absolute bottom-2 left-3 text-[6px] tracking-[0.5em] text-muted-foreground/20 uppercase group-hover:text-primary/20">
              Subsystem_Active // 0xFA4
            </div>
          </motion.div>
          <div className="grid flex-1 grid-cols-2 gap-4">
            {/* BLOG BUTTON - SCANNING MODULE */}
            <button
              onClick={() => navigate({ to: "/blog" })}
              className="group relative flex flex-col items-center justify-center overflow-hidden border border-border bg-card/40 py-12 transition-all hover:border-primary/50"
            >
              {/* --- DECOR: CORNER BRACKETS --- */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-border transition-colors group-hover:border-primary/60" />
              <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-border transition-colors group-hover:border-primary/60" />

              {/* --- BACKGROUND: SCANNING LINE --- */}
              <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {/* Moving laser scan line */}
                <motion.div
                  animate={{ y: ["-10%", "110%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="h-[2px] w-full bg-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.4)]"
                />
                {/* Faint Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT/0.03)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT/0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>

              {/* --- DATA LABELS --- */}
              <div className="absolute top-2 left-3 flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-1 w-1 rounded-full bg-primary"
                />
                <span className="text-[7px] tracking-[0.3em] text-muted-foreground uppercase">
                  Read_Archive_V.04
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <Archive
                  size={26}
                  weight="thin"
                  className="text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-primary"
                />
                <h3 className="mt-4 text-3xl tracking-tighter text-foreground transition-all duration-300 group-hover:text-primary">
                  Blog
                </h3>
                {/* Micro Status */}
                <span className="mt-1 text-[6px] tracking-[0.5em] text-muted-foreground/40 uppercase group-hover:text-primary/40">
                  Index_Status: 0x00
                </span>
              </div>

              {/* Right Edge Deco */}
              <div className="absolute top-1/2 right-0 h-1/2 w-[1px] -translate-y-1/2 bg-border transition-colors group-hover:bg-primary" />
            </button>

            <button
              onClick={() => navigate({ to: "/music" })}
              className="group relative flex flex-col items-center justify-center overflow-hidden border border-border bg-card/40 py-12 transition-all duration-500 hover:border-primary/50 hover:bg-primary/[0.02]"
            >
              {/* --- 1. BACKGROUND: SIGNAL INTERFERENCE (ONLY ON HOVER) --- */}
              <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {/* Horizontal Signal "Noise" Line */}
                <motion.div
                  animate={{
                    y: ["0%", "100%", "0%"],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="h-[1px] w-full bg-primary shadow-[0_0_10px_var(--primary)]"
                />

                {/* Vertical Spectral Bars (Bottom Anchored) */}
                <div className="absolute bottom-0 left-0 flex h-16 w-full items-end justify-around px-2">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[2px] bg-primary/20"
                      animate={{ height: ["10%", "80%", "30%", "100%", "20%"] }}
                      transition={{
                        duration: 0.6 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* --- 2. HUD DECORATIONS: CROSSHAIRS --- */}
              <div className="absolute top-3 left-3 flex h-4 w-4 items-center justify-center opacity-30 transition-opacity group-hover:opacity-100">
                <div className="absolute h-full w-[1px] bg-primary/40 group-hover:bg-primary" />
                <div className="absolute h-[1px] w-full bg-primary/40 group-hover:bg-primary" />
              </div>

              <div className="absolute right-3 bottom-3 font-mono text-[7px] tracking-[0.3em] text-primary/30 group-hover:text-primary">
                FREQ_HZ // 44.1K
              </div>

              {/* --- 3. MAIN CONTENT --- */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Animated Speaker/Broadcast Icon */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Broadcast
                    size={28}
                    weight="thin"
                    className="text-muted-foreground transition-all duration-500 group-hover:text-primary"
                  />
                </motion.div>

                <h3 className="mt-4 text-3xl tracking-tighter text-foreground transition-all duration-300 group-hover:text-primary">
                  Music
                </h3>

                {/* Bitrate / Channel Micro-Label */}
                <div className="mt-2 flex translate-y-2 transform items-center gap-2 overflow-hidden border border-primary/10 bg-primary/5 px-2 py-0.5 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="animate-pulse font-mono text-[6px] text-primary">
                    ● LIVE
                  </span>
                  <span className="font-mono text-[6px] tracking-widest text-primary/60 uppercase">
                    Stereo_Uplink
                  </span>
                </div>
              </div>

              {/* Left Edge Deco - Signal Strength Pips */}
              <div className="absolute top-1/2 left-0 flex -translate-y-1/2 flex-col gap-1 pl-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-1 transition-colors duration-300 ${i < 3 ? "bg-primary/20 group-hover:bg-primary" : "bg-muted/20"}`}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: PROJECTS */}
        <motion.button
          onClick={() => navigate({ to: "/projects" })}
          whileHover={{ scale: 0.995 }}
          className="group relative col-span-12 flex min-h-[500px] flex-col justify-between overflow-hidden border-2 border-primary/20 bg-card/40 p-12 text-left transition-all hover:border-primary lg:col-span-7"
        >
          {/* --- 1. BACKGROUND ANIMATIONS (Planet & Grid) --- */}

          {/* High-Density Wireframe Planet */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] transition-opacity duration-700 group-hover:opacity-20">
            <motion.svg
              viewBox="0 0 100 100"
              className="h-full w-full text-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              {/* Outer Sphere Boundary */}
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
                strokeDasharray="1 1"
              />
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />

              {/* Dense Latitude Lines */}
              {[...Array(8)].map((_, i) => (
                <ellipse
                  key={`lat-${i}`}
                  cx="50"
                  cy="50"
                  rx="47"
                  ry={6 + i * 6}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.15"
                />
              ))}

              {/* Dense Longitude Lines */}
              {[...Array(8)].map((_, i) => (
                <ellipse
                  key={`lng-${i}`}
                  cx="50"
                  cy="50"
                  rx={6 + i * 6}
                  ry="47"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.15"
                />
              ))}

              {/* Atmospheric / Orbital Rings (Inclined) */}
              <motion.ellipse
                cx="50"
                cy="50"
                rx="55"
                ry="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                strokeDasharray="4 4"
                animate={{ rotate: [15, 20, 15] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.ellipse
                cx="50"
                cy="50"
                rx="58"
                ry="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
                animate={{ rotate: [-15, -10, -15] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.svg>
          </div>

          {/* Background Matrix Grid Overlay */}
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* --- 2. DECORATIONS --- */}

          {/* Data Bits Sidebar */}
          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 flex-col gap-1">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="h-[2px] w-[2px] bg-primary/20"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
              />
            ))}
          </div>

          {/* --- 3. CONTENT --- */}

          <div className="relative z-20 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-[0.6em] text-primary uppercase">
                    System_Link
                  </span>
                  <span className="border border-primary/20 px-1 text-[7px] text-primary/40">
                    ESTABLISHED
                  </span>
                </div>
                <div className="font-mono text-[9px] tracking-widest text-primary/30 uppercase">
                  Node_Deployment: ASSPS_SEC_04
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <CornersOut
                size={28}
                className="text-primary/20 transition-all group-hover:scale-125 group-hover:rotate-90 group-hover:text-primary"
              />
              <span className="text-[6px] tracking-[0.3em] text-primary/20 uppercase">
                Direct_Access
              </span>
            </div>
          </div>

          <div className="relative z-20">
            <div className="mb-2 flex items-center gap-4">
              <span className="text-[10px] text-primary/30">01</span>
              <div className="h-[1px] w-8 bg-primary/20" />
            </div>
            <motion.h2
              className="mb-2 text-4xl tracking-tighter uppercase transition-all group-hover:text-primary sm:text-6xl"
              whileHover={{ skewX: -2 }}
            >
              Projects
            </motion.h2>
            <div className="flex items-center gap-6">
              <div className="h-0.5 w-32 bg-primary/20 transition-all group-hover:w-48 group-hover:bg-primary" />
              <span className="text-xs tracking-[0.8em] text-primary/40 uppercase group-hover:text-primary">
                Repository
              </span>
            </div>
          </div>

          <div className="relative z-20 flex items-center justify-between border-t border-primary/10 pt-8">
            <div className="flex gap-12">
              <div className="group/stat flex flex-col">
                <span className="text-[8px] tracking-tighter text-primary/30 uppercase">
                  Total_Compiled
                </span>
                <span className="origin-left text-xl text-primary transition-transform group-hover:scale-110">
                  {UI_DATA.stats.records}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] tracking-tighter text-primary/30 uppercase">
                  Security_Level
                </span>
                <span className="text-xl text-primary uppercase">
                  {UI_DATA.stats.encryption.split("_")[0]}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <CaretDoubleRight
                size={24}
                className="mb-1 animate-pulse text-primary"
              />
              <div className="h-1 w-24 overflow-hidden bg-primary/5">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>

          <CornerMarkers />
        </motion.button>
      </div>
    </div>
  )
}

const MobileView = () => {
  const navigate = useNavigate()
  return (
    <div className="flex w-full flex-col gap-3 p-4 font-mono">
      <div className="flex items-center gap-3 border border-primary/20 bg-card/40 p-4">
        <img
          src={UI_DATA.profile.image}
          className="size-14 border border-primary/40 grayscale"
          alt="Profile"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter text-primary uppercase">
            {UI_DATA.profile.name}
          </h1>
          <span className="text-[8px] font-bold tracking-[0.2em] text-primary/40 uppercase">
            Session_Active
          </span>
        </div>
      </div>

      <div className="border border-primary/20 bg-card/30 p-5">
        <p className="text-xs leading-relaxed text-primary/80 italic">
          "{UI_DATA.profile.about}"
        </p>
      </div>

      <button
        onClick={() => {
          return navigate({ to: "/projects" })
        }}
        className="flex h-48 flex-col items-center justify-center border border-primary/30 bg-primary/10 transition-colors active:bg-primary active:text-background"
      >
        <Code size={40} className="text-primary" />
        <span className="mt-4 text-sm font-black tracking-[0.6em] text-primary uppercase">
          PROJECTS
        </span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            return navigate({ to: "/projects" })
          }}
          className="border border-primary/20 bg-card/40 py-4 text-[10px] font-bold tracking-widest"
        >
          LOGS
        </button>
        <button
          onClick={() => {
            return navigate({ to: "/projects" })
          }}
          className="border border-primary/20 bg-card/40 py-4 text-[10px] font-bold tracking-widest"
        >
          CORE
        </button>
      </div>
    </div>
  )
}

export default function Profile() {
  const [screen, setScreen] = useState<"desktop" | "mobile">("desktop")

  useEffect(() => {
    const update = () =>
      setScreen(window.innerWidth >= 1024 ? "desktop" : "mobile")
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-foreground selection:bg-primary selection:text-background">
      {screen === "desktop" ? <DesktopView /> : <MobileView />}
    </div>
  )
}
