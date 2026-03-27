"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  CircleHalfIcon,
  Cpu,
  Database,
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


export function PageBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, floaty spring physics
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Transform mouse movement into a subtle 3D tilt/shift
  const rotateX = useTransform(springY, [-25, 25], [2, -2]); // Vertical tilt
  const skewX = useTransform(springX, [-25, 25], [-1, 1]);    // Horizontal shift

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to a -25 to 25 range
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-50 bg-background overflow-hidden pointer-events-none">

      {/* 1. PERSPECTIVE GRID CONTAINER */}
      <motion.div
        style={{
          rotateX,
          skewX,
          perspective: "1000px",
        }}
        className="absolute inset-[-10%] flex items-center justify-center opacity-[0.08]"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Vertical Line Pattern */}
            <pattern id="grid-v" width="80" height="100%" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
            {/* Horizontal Line Pattern */}
            <pattern id="grid-h" width="100%" height="80" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="100%" height="100%" fill="url(#grid-v)" />
          <rect width="100%" height="100%" fill="url(#grid-h)" />
        </svg>
      </motion.div>

      {/* 2. TACTICAL CORNER ACCENTS (Non-moving) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         {/* Top Left Bracket */}
         <div className="absolute top-10 left-10 size-4 border-t border-l border-primary/40" />
         <div className="absolute top-11 left-11 text-[6px] text-primary/20 font-mono tracking-widest uppercase">
            Coord_Sync
         </div>

         {/* Bottom Right Data Bit */}
         <div className="absolute bottom-10 right-10 size-4 border-b border-r border-primary/40" />
         <div className="absolute bottom-11 right-11 text-[6px] text-primary/20 font-mono tracking-widest uppercase text-right">
            Node_Active
         </div>
      </div>

      {/* 3. LIGHT VIGNETTE (Just for depth, no heavy blur) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40" />

      {/* Subtle Scanline Texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}

export default function ProjectsPage() {
  const [isBooting, setIsBooting] = useState(true);
  const [isUplinking, setIsUplinking] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [filter, setFilter] = useState("ALL");
  const [workType, setWorkType] = useState<"ALL" | "PERSONAL" | "FREELANCE">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC"); // Default to newest
  const [time, setTime] = useState("");

  const projects = Route.useLoaderData();

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    const bootTimer = setTimeout(() => setIsBooting(false), 1200);
    return () => { clearInterval(interval); clearTimeout(bootTimer); }
  }, []);

  // --- REFINED FILTER & SORT LOGIC ---
  const filteredProjects = useMemo(() => {
    let result = projects.filter((p: any) => {
      const matchesTag = filter === "ALL" || p.tag === filter;
      const matchesType = workType === "ALL" || (workType === "PERSONAL" ? p.is_personal : !p.is_personal);
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.tech.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesType && matchesSearch;
    });

    return result.sort((a: any, b: any) => {
      return sortOrder === "ASC" ? a.id - b.id : b.id - a.id;
    });
  }, [filter, workType, searchQuery, sortOrder, projects]);

  const handleProjectSelect = (id: number | null) => {
    setIsUplinking(true);
    setTimeout(() => {
      setSelectedId(id);
      setCurrentIndex(0);
      setIsUplinking(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="relative min-h-screen font-mono text-foreground selection:bg-primary/20 overflow-x-hidden">
      <PageBackground />

      {/* ================= HUD ================= */}
      <div className="fixed inset-0 z-[60] pointer-events-none flex flex-col justify-between p-6 md:p-10">
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col gap-2 pointer-events-auto">
            <AnimatePresence mode="wait">
              {selectedId && (
                <motion.button
                  key="back-btn"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => handleProjectSelect(null)}
                  className="flex items-center gap-4 border border-primary/20 bg-background/80 p-3 hover:border-primary/60 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                  <CaretLeft size={16} className="text-primary" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary">Return_Archive</span>
                </motion.button>
              )}
            </AnimatePresence>
            {!selectedId && (
              <div className="text-[9px] uppercase tracking-[0.4em] text-primary/30 ml-2">
                Loc: Orion_Arm // Sol_8.2
              </div>
            )}
          </div>
          <div className="text-right flex flex-col items-end gap-1">
             <span className="text-[10px] uppercase tracking-widest text-primary/60">
                {selectedId ? "Data_Link_Active" : "Archive_Standby"}
             </span>
             <span className="text-xs tabular-nums text-primary/40">[{time}]</span>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between text-[9px] uppercase tracking-[0.3em] text-primary/30 w-full">
          <span>Sys_v1.0.4 // {selectedId ? "Explorer_Mode" : "Repository"}</span>
          <div className="flex items-center gap-3">
            <ShieldCheck size={14} className="text-primary/40" />
            <span>Secure_Uplink</span>
          </div>
        </div>
      </div>

      {/* ================= CONTENT AREA ================= */}
      {!isBooting && (
        <main className="relative z-10 mx-auto max-w-7xl pt-24 pb-32 px-6">
          <AnimatePresence mode="wait">
            {!selectedId ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {/* --- HEADER BLOCK --- */}
                <div className="flex flex-col gap-6 border-b border-primary/10 pb-12">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-primary/40" />
                        <span className="text-[10px] uppercase tracking-[0.8em] text-primary/40">Repository_Index</span>
                      </div>
                      {/* SORT TOGGLE */}
                   </div>

                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div className="space-y-2">
                        <h1 className="text-6xl md:text-8xl uppercase tracking-tighter text-foreground/90 leading-none">
                          Projects
                        </h1>
                        <p className="text-[9px] uppercase tracking-[0.5em] text-primary/30 italic">
                          Active_Nodes // Total_Modules: {projects.length}
                        </p>
                      </div>

                      <div className="flex gap-8 text-[8px] uppercase tracking-widest text-primary/20">
                         <div className="flex flex-col gap-1">
                            <span>Status</span>
                            <span className="text-primary/60 animate-pulse">Syncing...</span>
                         </div>
                         <div className="flex flex-col gap-1 text-right">
                            <span>Hash</span>
                            <span className="text-primary/60 italic font-mono">0x{filteredProjects.length.toString(16).toUpperCase()}</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                  {/* SIDEBAR FILTERS */}
                  <aside className="w-full lg:w-52 shrink-0">
                    <div className="sticky top-32 space-y-12">

                      {/* 1. SEARCH MODULE */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 opacity-30">
                          <Target size={10} />
                          <span className="text-[9px] uppercase tracking-[0.4em]">Query_Search</span>
                        </div>
                        <div className="relative group">
                          <input
                            type="text"
                            placeholder="ENTER_STRING..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-primary/[0.03] border border-primary/10 p-2.5 text-[10px] uppercase tracking-widest text-primary focus:outline-none focus:border-primary/40 focus:bg-primary/5 transition-all placeholder:opacity-20"
                          />
                          <div className="absolute top-0 right-0 size-1 border-t border-r border-primary/30 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      {/* 2. SORT ORDER TOGGLE */}
                      <div className="space-y-4">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-primary/30 block mb-2">Sequence_Order</span>
                        <div className="flex flex-col gap-1">
                          {[
                            { id: "DESC", label: "NEWEST_FIRST" },
                            { id: "ASC", label: "OLDEST_FIRST" }
                          ].map((s) => {
                            const isActive = sortOrder === s.id;
                            return (
                              <button
                                key={s.id}
                                onClick={() => setSortOrder(s.id as "ASC" | "DESC")}
                                className="group flex items-center justify-between py-1.5 transition-all outline-none"
                              >
                                <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-primary' : 'text-primary/40 group-hover:text-primary/60'}`}>
                                  {s.label}
                                </span>
                                {isActive && (
                                  <motion.div layoutId="sort-indicator" className="size-1 bg-primary shadow-[0_0_8px_var(--primary)]" />
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* 3. CLASSIFICATION (Work Type) */}
                      <div className="space-y-4 border-t border-primary/5 pt-8">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-primary/30 block mb-2">Classification</span>
                        <div className="flex flex-col gap-1">
                          {["ALL", "PERSONAL", "FREELANCE"].map((t) => {
                            const isActive = workType === t;
                            return (
                              <button
                                key={t}
                                onClick={() => setWorkType(t as any)}
                                className="group flex items-center justify-between py-1.5 transition-all outline-none"
                              >
                                <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-primary' : 'text-primary/40 group-hover:text-primary/60'}`}>
                                  {t}
                                </span>
                                {isActive && (
                                  <motion.div layoutId="type-indicator" className="size-1 bg-primary shadow-[0_0_8px_var(--primary)]" />
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* 4. CATEGORY INDEX */}
                      <div className="space-y-4 border-t border-primary/5 pt-8">
                        <div className="flex items-center gap-2 opacity-30">
                          <Database size={10} />
                          <span className="text-[9px] uppercase tracking-[0.4em]">Category_Index</span>
                        </div>
                        <nav className="flex lg:flex-col flex-wrap gap-1">
                          {["ALL", "WEB", "GAME", "MOBILE"].map((label) => {
                            const isActive = filter === label;
                            return (
                              <button
                                key={label}
                                onClick={() => setFilter(label)}
                                className={`relative flex items-center px-3 py-2 text-left text-[10px] uppercase tracking-[0.3em] transition-all border
                                  ${isActive
                                    ? "bg-primary/5 border-primary/30 text-primary"
                                    : "border-transparent text-primary/30 hover:text-primary/60 hover:translate-x-1"}`}
                              >
                                {isActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-primary" />
                                )}
                                <span className={isActive ? "pl-2" : "pl-0"}>{label}</span>
                              </button>
                            )
                          })}
                        </nav>
                      </div>
                    </div>
                  </aside>

                  {/* PROJECTS GRID */}
                  <div className="flex-1 space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredProjects.map((p) => (
                          <ProjectArchiveCard key={p.id} project={p} onClick={() => handleProjectSelect(p.id)} />
                        ))}
                     </div>

                     {/* BOTTOM DECORATION */}
                     <div className="pt-12 border-t border-primary/5 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-8 opacity-20">
                           <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-primary" />
                           <div className="flex gap-2">
                              {[...Array(4)].map((_, i) => <div key={i} className="size-1 bg-primary" />)}
                           </div>
                           <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-primary" />
                        </div>
                        <span className="text-[8px] uppercase tracking-[1em] text-primary/10">End_Of_Archive</span>
                     </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`detail-${selectedId}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ProjectDetailView
                  project={projects.find((p: any) => p.id === selectedId)!}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  onBack={() => handleProjectSelect(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}

/* --- PROJECT CARD COMPONENT --- */
function ProjectArchiveCard({ project, onClick }: any) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col border border-primary/10 bg-background/40 backdrop-blur-md cursor-crosshair overflow-hidden"
    >
      {/* Type Tag (Personal vs Freelance) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className={`px-2 py-0.5 text-[8px] uppercase tracking-widest border font-bold
          ${project.is_personal ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-muted/10 border-muted text-muted-foreground'}`}>
          {project.is_personal ? '[PERS]' : '[FREE]'}
        </div>
        <span className="text-[8px] uppercase tracking-widest text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity">
          ID_0x{project.id}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden border-b border-primary/10">
        <img
          src={project.cover}
          className="size-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          alt={project.title}
        />
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />

        {/* Hover Icon Over Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 backdrop-blur-[1px]">
          <Target size={32} className="text-primary animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 relative">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
             <h3 className="text-2xl uppercase tracking-tighter text-foreground/80 group-hover:text-primary transition-colors">
               {project.title}
             </h3>
             <p className="text-[9px] uppercase tracking-widest text-primary/40 italic">
               {project.tech}
             </p>
          </div>
          <div className="text-[10px] text-primary/20 group-hover:text-primary/60 transition-colors uppercase">
            {project.date}
          </div>
        </div>

        <p className="text-[11px] uppercase leading-relaxed text-muted-foreground/60 line-clamp-2 border-l border-primary/10 pl-4 py-1">
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-2">
           <div className="flex gap-2">
              <div className="size-1 bg-primary/40" />
              <div className="size-1 bg-primary/20" />
              <div className="size-1 bg-primary/10" />
           </div>
           <GraphIcon size={16} className="text-primary/20 group-hover:text-primary/60 group-hover:animate-pulse" />
        </div>
      </div>
    </motion.div>
  )
}
const ProjectDetailView = ({ project, currentIndex, setCurrentIndex, onBack }: any) => {
  // Navigation cleanup for Navbar
  useEffect(() => {
    hideNavbar?.();
    return () => showNavbar?.();
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev: number) => (prev + 1) % project.imgs.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev: number) => (prev - 1 + project.imgs.length) % project.imgs.length);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 font-mono selection:bg-primary/30">
      {/* --- 1. SYSTEM HEADER --- */}
      <header className="relative flex flex-col items-center justify-center space-y-8 pt-4 text-center">
        {/* Decorative HUD Brackets */}
        <div className="absolute top-0 left-1/2 hidden -translate-x-1/2 gap-64 opacity-20 md:flex">
          <div className="h-4 w-4 border-t border-l border-primary" />
          <div className="h-4 w-4 border-t border-r border-primary" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 text-[9px] tracking-[0.6em] text-primary/40 uppercase"
        >
          <span>DATA_STREAM // NODE_0x{project.id?.toString().padStart(2, "0")}</span>
        </motion.div>

        <h2 className="max-w-5xl text-4xl tracking-tighter text-foreground/90 uppercase md:text-6xl lg:text-7xl">
          {project.title}
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {project.tech?.split("/").map((t: string, i: number) => (
            <span
              key={i}
              className="border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] tracking-widest text-primary/60 uppercase hover:border-primary/30 transition-colors"
            >
              {t.trim()}
            </span>
          ))}
        </div>
      </header>

      {/* --- 2. MAIN ANALYSIS GRID --- */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

        {/* VISUAL ENGINE (Left Column) */}
        <div className="space-y-12 lg:col-span-7">
          <div className="group relative border border-primary/10 bg-background/40 backdrop-blur-md overflow-hidden">

            {/* HUD Viewfinder Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 p-4">
              <div className="flex h-full w-full flex-col justify-between border border-primary/5 p-2">
                <div className="flex justify-between text-[7px] tracking-widest text-primary/30 uppercase">
                  <span className="flex items-center gap-2"><Target size={10}/> VIEWPORT_0{currentIndex}</span>
                  <span>720P // 60_FPS</span>
                </div>
                <div className="flex justify-between text-[7px] tracking-widest text-primary/30 uppercase">
                  <span>SECURED_UPLINK</span>
                  <span>{new Date().getFullYear()}.ARCH</span>
                </div>
              </div>
            </div>

            {/* Media Display */}
            <div className="relative aspect-video overflow-hidden bg-black/20">
              <button
                onClick={prevImage}
                className="absolute inset-y-0 left-0 z-30 px-6 text-primary/10 transition-all hover:bg-primary/5 hover:text-primary/60"
              >
                <CaretLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute inset-y-0 right-0 z-30 px-6 text-primary/10 transition-all hover:bg-primary/5 hover:text-primary/60"
              >
                <CaretRight size={24} />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={project.imgs[currentIndex]}
                  className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Archive Metadata"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Module Logic List */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[9px] tracking-[0.4em] text-primary/40 uppercase">
                Core_Logic_Modules
              </span>
              <div className="h-[1px] flex-1 bg-primary/10" />
            </div>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {project.features?.map((feature: string, idx: number) => (
                <li
                  key={idx}
                  className="group relative flex items-center gap-4 border border-primary/5 bg-primary/[0.02] p-5 hover:border-primary/20 transition-colors"
                >
                  <div className="size-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                  <span className="text-[11px] tracking-wider text-foreground/70 uppercase">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ANALYTICS (Right Column) */}
        <div className="space-y-12 lg:col-span-5">
          <section className="relative space-y-12 border-l border-primary/10 py-4 pl-10">
            {/* Project Manifesto */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Receipt size={16} className="text-primary/40" />
                <h3 className="text-[9px] tracking-[0.5em] text-primary/40 uppercase">
                  Project_Manifesto
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-foreground/70 uppercase tracking-tight">
                {project.description}
              </p>
            </div>

            {/* Live Metrics */}
            <div className="space-y-8">
              {project.metrics?.map((metric: any, idx: number) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between text-[9px] tracking-[0.2em] text-primary/40 uppercase">
                    <span>{metric.label}</span>
                    <span className="text-primary/60 italic">[{metric.value}%]</span>
                  </div>
                  <div className="relative h-[2px] w-full bg-primary/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className="h-full bg-primary/40 shadow-[0_0_8px_var(--primary)]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Award Decors */}
            {project.awards && (
              <div className="pt-8 space-y-4">
                 <div className="flex items-center gap-2 text-primary/40">
                    <Trophy size={14} />
                    <span className="text-[8px] uppercase tracking-widest">Achieved_Nodes</span>
                 </div>
                 {project.awards.map((award: any, i: number) => (
                   <div key={i} className="text-[10px] uppercase text-primary tracking-tighter">
                     {award.title} // {award.organization}
                   </div>
                 ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
