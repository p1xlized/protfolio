"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  CircleHalfIcon,
  Cpu,
  GithubLogo,
  Globe,
  GraphIcon,
  Medal,
  Receipt,
  ShieldCheck,
  Target,
  Trophy,
} from "@phosphor-icons/react"

import { hideNavbar, showNavbar } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useBrowserTab } from "@/lib/BrowserTab"

// Loaders
import { DataUplink, SystemLoader } from "@/components/Loader"
// import { Button } from "@portfolio/ui/components/ui/button";

export const Route = createFileRoute("/projects")({
  loader: async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${API_URL}/projects`);
      if (!res.ok) return []; // Return empty array instead of crashing
      return res.json();
    } catch (e) {
      console.error("API is down:", e);
      return []; // Fallback so the route still "exists"
    }
  },
  component: ProjectsPage,
})

const ProjectCard = ({ project, index, onSelect }: any) => {
  const sysStatus = project.id % 2 === 0 ? "STABLE" : "SYNC"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 100 }}
      onClick={() => onSelect(project.id)}
      // Fixed height for consistency across the grid
      className="group relative flex h-40 cursor-pointer flex-row overflow-hidden border border-primary/20 bg-background shadow-lg transition-all duration-300 hover:border-primary/80 hover:bg-primary/[0.03] hover:shadow-primary/10 md:h-56"
    >
      {/* 1. LEFT DATA STRIP */}
      <div className="relative z-20 flex w-10 flex-col items-center justify-between border-r border-primary/20 bg-primary/5 py-4 md:w-14">
        <div className="flex flex-col gap-1 opacity-40">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-1 w-1 bg-primary" />
          ))}
        </div>
        <span className="rotate-180 text-[9px] tracking-[0.5em] text-primary/30 uppercase [writing-mode:vertical-lr]">
          PRJ_{project.id.toString().padStart(2, "0")}
        </span>
        <div className="animate-pulse text-[7px] text-primary uppercase">
          {sysStatus}
        </div>
      </div>

      {/* 2. MAIN INFO BLOCK - Flex-1 to take available space */}
      <div className="relative z-10 flex flex-1 flex-col justify-center overflow-hidden px-4 md:px-8">
        <div className="absolute top-2 left-2 h-2 w-2 border-t border-l border-primary/40 transition-colors group-hover:border-primary" />

        <div className="mb-1 flex items-center gap-2">
          <Target
            size={12}
            className="text-primary/60 transition-all group-hover:rotate-90 group-hover:text-primary"
          />
          <span className="truncate text-[8px] tracking-[0.2em] text-primary/40 uppercase">
            {project.role}
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl leading-tight tracking-tighter text-primary/90 uppercase transition-colors group-hover:text-foreground md:text-3xl">
          {project.title}
        </h3>

        {/* Tactical visual bit-bar */}
        <div className="mt-3 flex h-0.5 w-full overflow-hidden bg-primary/10">
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            className="h-full w-1/2 bg-primary/40"
          />
        </div>
      </div>

      {/* 3. IMAGE PREVIEW PANEL - Fixed width to keep grid symmetric */}
      <div className="relative w-32 shrink-0 overflow-hidden border-l border-primary/20 bg-black md:w-44 lg:w-56">
        {/* Overlay Layers */}
        <div className="absolute inset-0 z-10 bg-primary/5 transition-colors duration-500 group-hover:bg-transparent" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_30%,black_120%)]" />

        {/* The Scanline */}
        <motion.div
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 z-30 h-px bg-primary/40 shadow-[0_0_8px_var(--primary)]"
        />

        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        />

        {/* Corner Decal */}
        <div className="absolute right-1 bottom-1 z-30 text-[7px] text-primary/40">
          IMG_SRC.0{index + 1}
        </div>
      </div>
    </motion.div>
  )
}
// --- MAIN PAGE ---

export default function ProjectsPage() {
  const [isBooting, setIsBooting] = useState(true)
  const [isUplinking, setIsUplinking] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [loaderMode, setLoaderMode] = useState<"uplink" | "downlink">("uplink")
  const [filter, setFilter] = useState("ALL")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [time, setTime] = useState("")
  const pendingRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const projects = Route.useLoaderData();
  const activeTabSection = selectedId ? projects[selectedId]?.title : "PROJECTS"
  useBrowserTab({
    section: activeTabSection,
    appSuffix: "x_x",
    switchInterval: 2000,
    spinnerInterval: 150,
  })

  const filteredProjects = useMemo(
    () =>
      filter === "ALL" ? projects : projects.filter((p) => p.tag === filter),
    [filter]
  )

  const handleProjectSelect = (id: number | null) => {
    pendingRef.current = id
    setLoaderMode(id === null ? "downlink" : "uplink")
    setIsUplinking(true)
  }

  return (
    <div className="relative min-h-screen bg-background font-mono text-foreground selection:bg-primary/30">
      {/* ================= HUD ================= */}
      <div className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 md:p-16">
        {/* Top Bar */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            {selectedId ? (
              <button
                onClick={() => handleProjectSelect(null)}
                className="b pointer-events-auto flex items-center gap-4 rounded-md p-3 text-left hover:border-primary hover:bg-primary/[0.06] active:scale-[0.98] sm:p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-primary/30 bg-primary/10">
                  <CaretLeft size={20} weight="bold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black tracking-[0.2em] text-primary uppercase">
                    Return_to_Archive
                  </span>
                  <span className="text-[7px] text-primary/40 uppercase">
                    Orion Arm
                  </span>
                </div>
              </button>
            ) : (
              <div className="text-[10px] text-primary uppercase">
                SOL // ≈ 8.2 kpc | Orion Arm
              </div>
            )}
          </div>

          <div className="text-right text-[10px] text-primary italic">
            {selectedId ? "DATA_STREAM_ACTIVE" : "UPLINK_STABLE"} <br />
            <span className="text-[12px] tabular-nums">{time}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-auto flex items-end justify-between text-[10px] text-primary uppercase">
          <span>
            PIXLIZED_OS_v1.0.4 // {selectedId ? "EXPLORER" : "ARCHIVE"}
          </span>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} weight="bold" />
            <span className="opacity-60">Secure_Uplink</span>
          </div>
        </div>
      </div>

      {/* ================= LOADERS ================= */}
      <AnimatePresence>
        {isBooting && (
          <SystemLoader key="boot" onComplete={() => setIsBooting(false)} />
        )}
        {isUplinking && (
          <DataUplink
            key="uplink-transition"
            mode={loaderMode}
            onComplete={() => {
              setSelectedId(pendingRef.current)
              setIsUplinking(false)
              setCurrentIndex(0)
              containerRef.current?.scrollTo({ top: 0 })
            }}
          />
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT ================= */}
      {!isBooting && !isUplinking && (
        <div
          ref={containerRef}
          className="relative z-10 h-screen overflow-y-auto scroll-smooth px-4 pt-28 pb-24 sm:px-6 md:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              {!selectedId ? (
                <motion.div
                  key="archive-grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* HEADER + FILTER */}
                  <div className="flex flex-col gap-6 border-b border-primary/20 pb-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
                    <h1 className="mx-auto text-4xl tracking-tighter text-primary uppercase sm:text-5xl md:mx-0 md:text-6xl">
                      PROJECTS REPOSITORY
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                      {["ALL", "WEB", "GAME", "MOBILE"].map((label) => (
                        <button
                          key={label}
                          onClick={() => setFilter(label)}
                          className={cn(
                            "text-[10px] tracking-[0.3em] uppercase",
                            filter === label
                              ? "border-primary bg-primary text-background shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                              : "border-primary/20 bg-primary/5 text-primary/40 hover:border-primary/60 hover:text-primary"
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PROJECT GRID */}
                  <motion.div
                    className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 sm:gap-6"
                    variants={{
                      show: { transition: { staggerChildren: 0.05 } },
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredProjects.map((p, i) => (
                      <motion.div key={p.id} layout>
                        <ProjectCard
                          project={p}
                          index={i}
                          onSelect={handleProjectSelect}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                // DETAIL VIEW
                <motion.div
                  key={`detail-${selectedId}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ProjectDetailView
                    project={projects.find((p) => p.id === selectedId)!}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
const ProjectDetailView = ({ project, currentIndex, setCurrentIndex }: any) => {
  // --- INDEPENDENT NAVBAR CONTROL ---
  useEffect(() => {
    // Check if functions exist to avoid crashing if called outside the main layout
    const safeHide = () => typeof hideNavbar === "function" && hideNavbar()
    const safeShow = () => typeof showNavbar === "function" && showNavbar()

    safeHide()

    // The cleanup function is the most critical part for "going back"
    return () => {
      safeShow()
    }
  }, []) // Empty dependency array ensures this is tied strictly to the component lifecycle

  // --- SAFE NAVIGATION LOGIC ---
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev: number) => (prev + 1) % project.imgs.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(
      (prev: number) => (prev - 1 + project.imgs.length) % project.imgs.length
    )
  }

  const getEmbedUrl = (url: string) => {
    if (!url) return ""
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    const videoId = match && match[2].length === 11 ? match[2] : null

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`
      : url
  }

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 selection:bg-primary/30">
      {/* HEADER */}
      <header className="relative flex flex-col items-center justify-center space-y-6 pt-2 pb-0 text-center">
        <div className="absolute top-0 left-1/2 hidden -translate-x-1/2 gap-64 opacity-30 md:flex">
          <div className="h-6 w-6 border-t-2 border-l-2 border-primary" />
          <div className="h-6 w-6 border-t-2 border-r-2 border-primary" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 font-mono text-[10px] tracking-[0.6em] text-primary/60 uppercase"
        >
          <span>
            RECORDS_ARCHIVE_0x{project.id?.toString().padStart(2, "0")}
          </span>
        </motion.div>

        <h2 className="max-w-5xl text-2xl tracking-tight text-foreground uppercase sm:text-4xl lg:text-6xl">
          {project.title}
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {project.tech?.split(",").map((t: string, i: number) => (
            <span
              key={i}
              className="border border-primary/30 bg-primary/[0.03] px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-foreground uppercase hover:bg-primary/10"
            >
              {t.trim()}
            </span>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* VISUAL ENGINE */}
        <div className="space-y-12 lg:col-span-7">
          <div className="group relative overflow-hidden border border-primary/20 bg-primary/[0.02] shadow-2xl">
            {/* HUD Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 border-[8px] border-transparent p-4">
              <div className="flex h-full w-full flex-col justify-between border border-primary/10 p-2">
                <div className="flex justify-between text-[8px] font-bold text-primary/40">
                  <span>REC_00:0{currentIndex}</span>
                  <span>720P_60FPS</span>
                </div>
              </div>
            </div>

            {project.is_video && project.video_url ? (
              <div className="relative aspect-video w-full">
                <iframe
                  src={getEmbedUrl(project.video_url)}
                  title={project.title}
                  className="absolute inset-0 h-full w-full opacity-95"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video overflow-hidden bg-black">
                <button
                  onClick={prevImage}
                  className="absolute inset-y-0 left-0 z-30 px-6 text-primary/20 transition-all hover:bg-primary/5 hover:text-primary active:scale-95"
                >
                  <CaretLeft size={32} weight="bold" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute inset-y-0 right-0 z-30 px-6 text-primary/20 transition-all hover:bg-primary/5 hover:text-primary active:scale-95"
                >
                  <CaretRight size={32} weight="bold" />
                </button>

                {/* Independent Image Animation */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={project.imgs[currentIndex]}
                    className="h-full w-full object-cover"
                    alt="Project Metadata"
                  />
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-black tracking-widest text-primary/60 uppercase">
                Core_Logic_Modules
              </span>
              <div className="h-[1px] flex-1 bg-primary/20" />
            </div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.features?.map((feature: string, idx: number) => (
                <li
                  key={idx}
                  className="group relative flex items-center gap-4 border border-primary/10 bg-foreground/[0.02] p-5"
                >
                  <span className="font-mono text-xs font-bold text-primary">
                    {idx + 1}.
                  </span>
                  <span className="text-[13px] font-black tracking-wide text-foreground uppercase">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="space-y-12 lg:col-span-5">
          <section className="relative space-y-10 border-l-2 border-primary/30 py-4 pl-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Receipt size={18} className="text-primary/60" />
                <h3 className="font-mono text-xs font-black tracking-[0.5em] text-primary/60 uppercase">
                  Project_Manifesto
                </h3>
              </div>
              <p className="text-base leading-relaxed font-bold text-foreground/80">
                {project.description}
              </p>
            </div>

            <div className="space-y-6">
              {project.metrics?.map((metric: any, idx: number) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between font-mono text-[10px] font-black text-foreground/50 uppercase">
                    <span>{metric.label}</span>
                    <span className="text-primary">[{metric.value}%]</span>
                  </div>
                  <div className="relative h-2 w-full bg-primary/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }} // Using whileInView makes it independent of the page load
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
