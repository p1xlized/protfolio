"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Archive,
  Broadcast,
  CaretDoubleRight,
  Code,
  CornersOut,
  Envelope,
  GithubLogo,
  LinkedinLogo,
  UserFocus,
} from "@phosphor-icons/react"
import { useNavigate } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@portfolio/ui/components/ui/dialog"
import ProfileDialog from "./Profile/ProfileDialog"
import ActionButton from "./Profile/ActionButton"

// --- TYPES & DATA ---
const TITLES = ["FULL STACK", "BACKEND", "MOBILE", "GAMEDEV"]

const UI_DATA = {
  profile: {
    name: "Alexandru Paduret",
    image: "https://avatars.githubusercontent.com/u/72890769?v=4",
    about: "Full-stack architect building fast systems and reactive interfaces. A jack-of-all-trades who’s surprisingly good at all of them, blending creativity and code.",
  },
  socials: [
    { id: "git", icon: <GithubLogo size={20} />, link: "https://github.com/pixlized" },
    { id: "link", icon: <LinkedinLogo size={20} />, link: "https://linkedin.com/in/alexandru-paduret" },
    { id: "mail", icon: <Envelope size={20} />, link: "mailto:alex@pixlized.net" },
  ],
  education: [
    { org: "UEF - FI", degree: "B.Sc Computer Science", progress: 50, status: "ACTIVE" },
    { org: "Maisonneuve College - CA", degree: "DEC Software Dev", progress: 100, status: "COMPLETE" },
  ],
  stats: { records: 14, encryption: "BitLock_256" },
}

// --- SHARED DECORATIVE COMPONENTS ---

const CornerMarkers = () => (
  <>
    <div className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-primary/40" />
    <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-primary/40" />
    <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-primary/40" />
    <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-r border-b border-primary/40" />
  </>
)

const ScanningBackground = ({ density = "16px" }: { density?: string }) => (
  <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
    <motion.div
      animate={{ y: ["-10%", "110%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="h-[1px] w-full bg-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.3)]"
    />
    <div
      className="absolute inset-0 bg-[radial-gradient(theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px)]"
      style={{ backgroundSize: density }}
    />
  </div>
)

// --- SUB-COMPONENTS ---

const HeaderSection = ({ titleIndex }: { titleIndex: number }) => (
  <header className="relative mb-4 flex w-full flex-col overflow-hidden border-b border-primary/10 pb-4 md:flex-row md:items-center md:gap-6">
    {/* --- AVATAR WITH HUD DECO --- */}
    <Dialog>
      <DialogTrigger>
        <div className="group relative flex-none shrink-0 cursor-crosshair">
          {/* Animated Outer Ring */}

          <div className="relative size-16 overflow-hidden rounded-full border border-primary/40 bg-background sm:size-20 md:size-28">
            <img
              src={UI_DATA.profile.image}
              alt={UI_DATA.profile.name}
              className="size-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:rotate-1 group-hover:brightness-110"
            />

            {/* Scanline Overlay on Hover */}
            <div className="absolute inset-0 z-10 hidden bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] group-hover:block" />
          </div>

          {/* Status Pip with Pulse */}
          <div className="absolute right-1 bottom-1 z-20 size-3 rounded-full border-2 border-background bg-primary shadow-[0_0_10px_var(--primary)]" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-full border-none bg-transparent p-0 shadow-none">
        <ProfileDialog />
      </DialogContent>
    </Dialog>

    {/* --- IDENTITY SECTION --- */}
    <div className="flex min-w-0 flex-1 flex-col justify-center py-2 md:py-0">
      <div className="mb-1 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="h-1 w-1 bg-primary animate-pulse" />
          <span className="text-[7px] font-bold tracking-[0.4em] text-primary uppercase">
            Auth_Status: Verified
          </span>
        </div>
        <div className="h-[1px] flex-1 bg-primary/10" />
      </div>

      <motion.h1
        className="w-full truncate text-3xl leading-none font-title tracking-tighter text-foreground uppercase sm:text-4xl md:text-6xl"
        /* Pro-tip: Since font-display (JetBrains) is smoother,
           use font-black (900) to give it that "Heavy Industrial"
           contrast against the thinner Departure Mono UI elements.
        */
      >
        {UI_DATA.profile.name}
      </motion.h1>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex h-5 items-center border-l-2 border-primary bg-primary/10 px-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={TITLES[titleIndex]}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] font-bold tracking-[0.5em] text-foreground uppercase"
            >
              {TITLES[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-[6px] text-muted-foreground/40 font-mono">SYS_V.2.0.6</span>
      </div>
    </div>

    {/* --- SOCIAL UPLINKS --- */}
    <div className="flex flex-none shrink-0 items-center gap-3 border-t border-primary/10 pt-4 md:flex-col md:items-end md:justify-center md:border-t-0 md:border-l md:pt-0 md:pl-6">
      <div className="hidden flex-col items-end gap-0.5 md:flex">
        <span className="text-[6px] tracking-widest text-primary/40 uppercase font-mono">
          Packet_Stream
        </span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-1 w-2 bg-primary/10 group-hover:bg-primary/30 transition-colors" />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {UI_DATA.socials.map((social) => (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/icon relative flex size-10 items-center justify-center border border-primary/20 bg-background/40 text-foreground transition-all duration-150 hover:border-primary hover:bg-primary/20 hover:-translate-y-0.5"
          >
            {/* HUD Corner Brackets */}
            <div className="absolute top-0 left-0 size-1 border-t border-l border-primary opacity-0 transition-all group-hover/icon:opacity-100" />
            <div className="absolute right-0 bottom-0 size-1 border-r border-b border-primary opacity-0 transition-all group-hover/icon:opacity-100" />

            <div className="relative z-10 transition-transform group-hover/icon:scale-110">
              {React.cloneElement(social.icon as React.ReactElement, {
                size: 20,
                weight: "thin",
                className: "group-hover/icon:text-primary transition-colors"
              })}
            </div>

            {/* Label Tooltip (Optional visual fluff) */}
            <span className="absolute -bottom-5 scale-0 font-mono text-[5px] text-primary transition-all group-hover/icon:scale-100 uppercase">
              {social.id}
            </span>
          </a>
        ))}
      </div>
    </div>
  </header>
)

// --- NEW: REUSABLE SCHEMATIC COMPONENT ---
const SchematicGrid = () => (
  <motion.svg
    viewBox="0 0 100 100"
    className="h-full w-full text-primary"
    animate={{ rotate: -360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
  >
    {/* Concentric Calibration Rings */}
    <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 2" />
    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="4 2" />
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.1" />

    {/* Rotating "Radar" Sector */}
    <motion.path
      d="M 50 50 L 50 5 a 45 45 0 0 1 31.8 13.2 z"
      fill="currentColor"
      className="opacity-20"
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />

    {/* Crosshair Axes */}
    <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.05" opacity="0.5" />
    <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.05" opacity="0.5" />

    {/* Data Bit Markers */}
    {[...Array(12)].map((_, i) => (
      <rect
        key={i}
        x="49"
        y="2"
        width="2"
        height="0.5"
        fill="currentColor"
        transform={`rotate(${i * 30} 50 50)`}
      />
    ))}
  </motion.svg>
)

const BioModule = () => (
  <div
    className="group relative flex-[1.4] overflow-hidden border border-primary/20 bg-card/40 p-5 transition-all duration-500 hover:border-primary hover:bg-primary/[0.04]"
  >
    {/* --- BACKGROUND SCHEMATIC (Shows on hover) --- */}
    <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-1000 group-hover:opacity-[0.12]">
      <SchematicGrid />
    </div>

    {/* --- TERMINAL HEADER --- */}
    <div className="relative z-10 mb-6 flex items-center justify-between border-b border-primary/10 pb-3">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="size-1.5 rounded-full bg-primary/20 group-hover:bg-primary/60 transition-colors" />
          <div className="size-1.5 rounded-full bg-primary/10 group-hover:bg-primary/40 transition-colors" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-primary/70">
          <UserFocus size={14} weight="fill" className="opacity-50" />
          <span>USR://ALEX_PADURET/BIO.LOG</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
         <span className="font-mono text-[7px] text-primary/30 uppercase tracking-widest animate-pulse">Scanning...</span>
         <span className="font-mono text-[7px] text-primary/30 uppercase tracking-widest">Read_Only</span>
      </div>
    </div>

    {/* --- BIO TEXT AREA --- */}
    <div className="relative z-10 mb-8 px-2">
      <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-primary/40 via-primary/5 to-transparent" />
      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/90">
        <span className="mr-2 text-primary animate-pulse inline-block">█</span>
        {UI_DATA.profile.about}
      </p>
    </div>

    {/* --- EDUCATION: DATA BLOCKS --- */}
    <div className="relative z-10 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[7px] font-black tracking-[0.4em] text-primary/40 uppercase">Academic_History</span>
        <div className="h-[1px] flex-1 bg-primary/5" />
      </div>

      {UI_DATA.education.map((e, i) => (
        <div key={i} className="group/node relative pl-4">
          <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-primary/10 group-hover/node:bg-primary/40 transition-colors" />

          <div className="mb-1.5 flex items-center justify-between">
            <h4 className="text-[10px] font-bold tracking-wider text-foreground uppercase group-hover/node:text-primary transition-colors">
              {e.degree}
            </h4>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[6px] text-primary/40 uppercase tracking-tighter">
                Status: {e.status}
              </span>
              <div className={cn(
                "size-1 rounded-full animate-pulse",
                e.status === "COMPLETE" ? "bg-primary" : "bg-yellow-500/50"
              )} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="shrink-0 font-mono text-[8px] text-muted-foreground/60 uppercase">
              {e.org}
            </span>

            <div className="flex flex-1 gap-1">
              {[...Array(10)].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0.1 }}
                  whileInView={{ opacity: (idx * 10) < e.progress ? 1 : 0.1 }}
                  transition={{ delay: (i * 0.1) + (idx * 0.05) }}
                  className={cn(
                    "h-1.5 flex-1 skew-x-[-20deg] transition-all duration-500",
                    (idx * 10) < e.progress
                      ? "bg-primary/60 group-hover/node:bg-primary group-hover/node:shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                      : "bg-primary/5"
                  )}
                />
              ))}
            </div>

            <span className="w-6 text-right font-mono text-[7px] text-primary/40">
              {e.progress}%
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* --- DECORATIVE FOOTER --- */}
    <div className="absolute bottom-2 right-3 opacity-10 group-hover:opacity-30 transition-opacity">
      <div className="flex flex-col items-end font-mono text-[5px] text-primary">
        <span>CHECKSUM: 0x882A</span>
        <span>ENCODING: UTF-8</span>
      </div>
    </div>
  </div>
)



const ProjectsModule = ({ onClick }: { onClick: () => void }) => (
  <motion.button
            onClick={onClick}
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
)

// --- MAIN VIEWS ---

const DesktopView = () => {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % TITLES.length), 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative mt-4 flex h-full w-full max-w-5xl flex-col gap-3 border border-primary/20 bg-background/60 p-8 shadow-xs">
      <HeaderSection titleIndex={index} />
      <div className="mt-4 grid h-[520px] grid-cols-12 gap-3">
        <div className="col-span-12 flex flex-col gap-3 md:col-span-5">
          <BioModule />
          <div className="flex flex-1 gap-4">
            <ActionButton label="Blog" icon={Archive} sublabel="Index_Status: 0x00" onClick={() => console.log("clicked")} variant="blog" />
            <ActionButton label="Music" icon={Broadcast} sublabel="Stereo_Uplink" onClick={() => navigate({ to: "/music" })} variant="music" />
          </div>
        </div>
        <ProjectsModule onClick={() => navigate({ to: "/projects" })} />
      </div>
    </div>
  )
}

const MobileView = () => {
  const navigate = useNavigate()
  return (
    <div className="flex w-full flex-col gap-3 p-4 font-mono">
      <div className="flex items-center gap-3 border border-primary/20 bg-card/40 p-4">
        <img src={UI_DATA.profile.image} className="size-14 border border-primary/40 grayscale" alt="Profile" />
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter text-primary uppercase">{UI_DATA.profile.name}</h1>
          <span className="text-[8px] font-bold tracking-[0.2em] text-primary/40 uppercase">Session_Active</span>
        </div>
      </div>
      <div className="border border-primary/20 bg-card/30 p-5 italic text-xs text-primary/80">"{UI_DATA.profile.about}"</div>
      <button onClick={() => navigate({ to: "/projects" })} className="flex h-48 flex-col items-center justify-center border border-primary/30 bg-primary/10 active:bg-primary active:text-background">
        <Code size={40} className="text-primary" />
        <span className="mt-4 text-sm font-black tracking-[0.6em] text-primary uppercase">PROJECTS</span>
      </button>
    </div>
  )
}

export default function Profile() {
  const [screen, setScreen] = useState<"desktop" | "mobile">("desktop")

  useEffect(() => {
    const update = () => setScreen(window.innerWidth >= 1024 ? "desktop" : "mobile")
    update(); window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-foreground selection:bg-primary selection:text-background">
      {screen === "desktop" ? <DesktopView /> : <MobileView />}
    </div>
  )
}
