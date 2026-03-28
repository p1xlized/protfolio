"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  ChartBar,
  CircleHalfIcon,
  Code,
  Cpu,
  Database,
  FadersHorizontal,
  GithubLogo,
  Globe,
  GraphIcon,
  HardDrive,
  Medal,
  Receipt,
  ShieldCheck,
  SortAscending,
  SortDescending,
  Target,
  Trophy,
  User,
} from "@phosphor-icons/react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@portfolio/ui/components/ui/collapsible"

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
    <div className="fixed inset-0 -z-50 bg-background/20 overflow-hidden pointer-events-none">

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
interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortOrder: "ASC" | "DESC";
  setSortOrder: (val: "ASC" | "DESC") => void;
  workType: "ALL" | "PERSONAL" | "FREELANCE";
  setWorkType: (val: "ALL" | "PERSONAL" | "FREELANCE") => void;
  filter: string;
  setFilter: (val: string) => void;
}


export function ProjectFilters({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  workType,
  setWorkType,
  filter,
  setFilter,
}: ProjectFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Reusable Section Label for that HUD look
  const SectionLabel = ({ label, icon: Icon }: { label: string; icon?: any }) => (
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon size={12} className="text-primary animate-pulse" />}
      <span className="text-[10px] uppercase tracking-[0.4em] text-primary/80 font-bold">
        {label}
      </span>
    </div>
  );

  const FilterContent = (
    <div className="space-y-10 pt-4 lg:pt-0">
      {/* 1. SEARCH MODULE WITH DECORATION */}
      <div className="space-y-3">
        <SectionLabel label="Search_Query" icon={Target} />
        <div className="relative group">
          {/* Decorative Brackets */}
          <div className="absolute -top-1 -left-1 size-2 border-t border-l border-primary/40 group-focus-within:border-primary transition-colors" />
          <div className="absolute -bottom-1 -right-1 size-2 border-b border-r border-primary/40 group-focus-within:border-primary transition-colors" />

          <input
            type="text"
            placeholder="INPUT_STRING..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-primary/[0.05] border border-primary/20 p-3 text-[11px] uppercase tracking-widest text-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-primary/20"
          />
        </div>
      </div>

      {/* 2. SEQUENCE ORDER (ICON TOGGLE) */}
      <div className="space-y-3">
        <SectionLabel label="Sequence" />
        <div className="flex gap-2">
          {[
            { id: "DESC", icon: SortDescending, label: "New" },
            { id: "ASC", icon: SortAscending, label: "Old" }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSortOrder(s.id as "ASC" | "DESC")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 border transition-all ${
                sortOrder === s.id
                ? "bg-primary border-primary text-background shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)]"
                : "border-primary/20 text-primary hover:border-primary/60"
              }`}
            >
              <s.icon size={14} weight={sortOrder === s.id ? "bold" : "regular"} />
              <span className="text-[9px] uppercase tracking-tighter">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. CLASSIFICATION */}
      <div className="space-y-3">
        <SectionLabel label="Classification" />
        <div className="flex flex-col gap-1.5">
          {(["ALL", "PERSONAL", "FREELANCE"] as const).map((t) => {
            const isActive = workType === t;
            return (
              <button
                key={t}
                onClick={() => setWorkType(t)}
                className="group relative flex items-center justify-between px-3 py-2 overflow-hidden transition-all outline-none border border-transparent hover:border-primary/10"
              >
                <span className={`text-[11px] uppercase tracking-[0.2em] z-10 transition-colors ${isActive ? 'text-primary' : 'text-foreground/50'}`}>
                  {t}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="type-bg"
                    className="absolute inset-0 bg-primary/[0.08] border-l-2 border-primary"
                    initial={{ x: -10 }} animate={{ x: 0 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CATEGORY INDEX */}
      <div className="space-y-3">
        <SectionLabel label="Category" icon={Database} />
        <nav className="flex flex-col gap-1">
          {["ALL", "WEB", "GAME", "MOBILE"].map((label) => {
            const isActive = filter === label;
            return (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`group flex items-center gap-3 px-3 py-2 text-left text-[11px] uppercase tracking-[0.2em] transition-all
                  ${isActive ? "text-primary font-bold" : "text-foreground/40 hover:text-primary hover:translate-x-1"}`}
              >
                <div className={`size-1.5 rotate-45 border border-primary transition-all ${isActive ? "bg-primary shadow-[0_0_8px_var(--primary)]" : "opacity-20"}`} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <aside className="w-full lg:w-52 shrink-0">
      {/* MOBILE COLLAPSIBLE */}
      <div className="lg:hidden mb-8">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-primary/20 bg-background/50 backdrop-blur-md">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 group">
            <div className="flex items-center gap-3">
              <FadersHorizontal size={18} className="text-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">System_Filters</span>
            </div>
            <CaretDown
              size={16}
              className={`text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-6">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-6" />
            {FilterContent}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block sticky top-32">
        {FilterContent}
      </div>
    </aside>
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
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [time, setTime] = useState("");

  const projects = Route.useLoaderData();

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    // Boot sequence is now controlled by the SystemLoader's onComplete
    return () => { clearInterval(interval); }
  }, []);

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

  // --- TRANSITION LOGIC ---
  const handleProjectSelect = (id: number | null) => {
    setIsUplinking(true);
    // The DataUplink loader will call the completion logic which swaps the view
    // We store the pending ID to switch after the animation
    const pendingId = id;

    // Artificial delay to let the Uplink animation breathe
    setTimeout(() => {
      setSelectedId(pendingId);
      setCurrentIndex(0);
      setIsUplinking(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  return (
    <div className="relative min-h-screen font-mono text-foreground selection:bg-primary/20 overflow-x-hidden">
      <PageBackground />

      {/* 1. INITIAL SYSTEM BOOT */}
      <AnimatePresence>
        {isBooting && (
          <SystemLoader
            key="sys-boot"
            onComplete={() => setIsBooting(false)}
            duration={2.5}
          />
        )}
      </AnimatePresence>

      {/* 2. DATA UPLINK TRANSITION */}
      <AnimatePresence>
        {isUplinking && (
          <DataUplink
            key="data-uplink"
            statusText={selectedId ? "DECRYPTING_ARCHIVE" : "ESTABLISHING_LINK"}
          />
        )}
      </AnimatePresence>

      {/* ================= HUD ================= */}
      {!isBooting && (
        <div className="fixed inset-0 z-[60] pointer-events-none hidden md:flex flex-col justify-between p-6 md:p-10">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col gap-2 pointer-events-auto">
                      <div className="text-[9px] uppercase tracking-[0.4em] text-primary/30 ml-2">
                        Loc: Orion_Arm // Sol_8.2
                      </div>
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
      )}

      {/* ================= CONTENT AREA ================= */}
      {!isBooting && (
        <main className="relative z-10 mx-auto max-w-7xl pt-24 pb-32 px-6">
          <AnimatePresence mode="wait">
            {!selectedId ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isUplinking ? 0 : 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* --- HEADER BLOCK --- */}
                <div className="flex flex-col gap-6 border-b border-primary/10 pb-6">
                   <div className="flex items-center gap-4">
                     <div className="h-[1px] w-12 bg-primary/40" />
                     <span className="text-[10px] uppercase tracking-[0.8em] text-primary/40">Repository_Index</span>
                   </div>

                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl uppercase tracking-tighter text-foreground/90 leading-none">
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
                  <ProjectFilters
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      sortOrder={sortOrder}
                      setSortOrder={setSortOrder}
                      workType={workType}
                      setWorkType={setWorkType}
                      filter={filter}
                      setFilter={setFilter}
                    />

                  <div className="flex-1 space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredProjects.map((p: any) => (
                          <ProjectArchiveCard key={p.id} project={p} onClick={() => handleProjectSelect(p.id)} />
                        ))}
                     </div>

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
                animate={{ opacity: isUplinking ? 0 : 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
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

export function ProjectArchiveCard({ project, onClick }: any) {
  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      initial="initial"
      className="group relative flex flex-col border border-primary/20 bg-background/40 backdrop-blur-md cursor-pointer overflow-hidden transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)]"
    >
      {/* 1. ULTRA-MINIMAL HEADER */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-primary/10 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="size-1.5 bg-primary animate-pulse rounded-full" />
          <span className="text-[8px] font-bold tracking-[0.3em] text-primary/70 uppercase">
            Node_{project.id.toString().padStart(3, '0')}
          </span>
        </div>
        <span className="text-[8px] font-mono text-primary/40 group-hover:text-primary transition-colors">
          {project.date}
        </span>
      </div>

      {/* 2. IMAGE CONTAINER (Vivid & Fluid) */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={project.cover}
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="size-full object-cover"
          alt={project.title}
        />

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border backdrop-blur-md ${
            project.is_personal
              ? 'border-blue-500/50 text-blue-400 bg-blue-500/10'
              : 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
          }`}>
            {project.is_personal ? 'Personal' : 'Freelance'}
          </div>
        </div>

        {/* Fluid Action Button */}
        <motion.div
          variants={{
            initial: { opacity: 0, x: 10, y: 10 },
            hover: { opacity: 1, x: 0, y: 0 }
          }}
          className="absolute bottom-3 right-3 p-2 bg-primary text-background"
        >
          <ArrowUpRight size={14} weight="bold" />
        </motion.div>
      </div>

      {/* 3. COMPACT CONTENT */}
      <div className="p-4 space-y-3">
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: -2 }
          }}
          className="space-y-2"
        >
          <h3 className="text-xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          {/* Tech Stack - Pill Style */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.split(',').map((t: string, i: number) => (
              <motion.span
                key={t}
                variants={{
                  initial: { opacity: 0.6, y: 0 },
                  hover: { opacity: 1, y: -1 }
                }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-1 text-[9px] font-bold border border-primary/10 bg-primary/5 px-2 py-0.5 text-primary/80 uppercase tracking-tighter"
              >
                <Code size={8} />
                {t.trim()}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 4. INTERACTIVE FOOTER */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { scaleY: 1, opacity: 0.2 },
                  hover: { scaleY: [1, 2, 1], opacity: 1 }
                }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                className="w-[2px] h-2 bg-primary"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
            <Cpu size={12} className="text-primary" />
            <span className="text-[8px] font-mono tracking-widest text-primary">V_2.0</span>
          </div>
        </div>
      </div>

      {/* Bottom Scanning Line Accent */}
      <motion.div
        variants={{
          initial: { scaleX: 0 },
          hover: { scaleX: 1 }
        }}
        className="absolute bottom-0 left-0 h-[3px] w-full bg-primary origin-left shadow-[0_0_15px_var(--primary)]"
      />
    </motion.div>
  );
}


export const ProjectDetailView = ({ project, currentIndex, setCurrentIndex, onBack }: any) => {
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev: number) => (prev + 1) % project.imgs.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev: number) => (prev - 1 + project.imgs.length) % project.imgs.length);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20 font-mono">
      {/* --- 1. NAVIGATION & SYSTEM HEADER --- */}
      <nav className="flex items-center justify-between border-b border-primary/10 pb-6">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary/60 hover:text-primary transition-colors"
        >
          <div className="p-2 border border-primary/20 group-hover:border-primary/60 transition-all">
            <ArrowLeft size={14} />
          </div>
          <span>Return_to_Archive</span>
        </button>
        <div className="text-right">
          <div className="text-[10px] font-bold text-primary tracking-widest uppercase">{project.date}</div>
          <div className="text-[8px] text-primary/40 uppercase tracking-tighter">Status: Fully_Synced</div>
        </div>
      </nav>

      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12 bg-primary/40" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-primary/40">Node_Project_Analysis</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase leading-none">
            {project.title}
          </h2>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" className="p-3 border border-primary/20 text-primary hover:bg-primary hover:text-background transition-all">
                <GithubLogo size={20} weight="fill" />
              </a>
            )}
            {project.projectUrl && (
              <a href={project.projectUrl} target="_blank" className="p-3 border border-primary/20 text-primary hover:bg-primary hover:text-background transition-all">
                <Globe size={20} weight="fill" />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack?.map((s: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest">
              {s}
            </span>
          ))}
        </div>
      </header>

      {/* --- 2. CORE INTERFACE GRID --- */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

        {/* LEFT COLUMN: Visual Intelligence */}
        <div className="lg:col-span-8 space-y-8">
          <div className="relative aspect-video overflow-hidden border border-primary/20 bg-background/40 backdrop-blur-xl group shadow-2xl">
            {/* Viewfinder Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4">
               <div className="flex justify-between items-start opacity-40">
                  <div className="size-4 border-t border-l border-primary" />
                  <div className="size-4 border-t border-r border-primary" />
               </div>
               <div className="flex justify-between items-end opacity-40">
                  <div className="size-4 border-b border-l border-primary" />
                  <div className="size-4 border-b border-r border-primary" />
               </div>
            </div>

            {/* Carousel Controls */}
            {project.imgs.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-background/80 border border-primary/20 text-primary hover:scale-110 transition-all backdrop-blur-md">
                  <CaretLeft size={20} weight="bold" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-background/80 border border-primary/20 text-primary hover:scale-110 transition-all backdrop-blur-md">
                  <CaretRight size={20} weight="bold" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src={project.imgs[currentIndex]}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {project.imgs.map((_: any, i: number) => (
                <div key={i} className={`h-1 transition-all duration-300 ${i === currentIndex ? 'w-8 bg-primary shadow-[0_0_8px_var(--primary)]' : 'w-2 bg-primary/20'}`} />
              ))}
            </div>
          </div>

          {/* Key Features / Logic Modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.features?.map((f: string, i: number) => (
              <div key={i} className="p-4 border border-primary/10 bg-primary/[0.03] hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu size={14} className="text-primary group-hover:rotate-90 transition-transform duration-500" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary/40">Feature_Ref_{i}</span>
                </div>
                <div className="text-[11px] font-bold text-foreground uppercase tracking-wider">{f}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Data & Metrics */}
        <div className="lg:col-span-4 space-y-10">
          {/* Role & Role Detail */}
          <div className="p-6 border border-primary/10 bg-primary/[0.02] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10"><User size={40} /></div>
             <div className="text-[10px] uppercase tracking-widest text-primary/40 mb-2">Assigned_Role</div>
             <div className="text-xl font-bold text-primary uppercase">{project.role}</div>
          </div>

          {/* Analysis Paragraph */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary/40">
              <Target size={14} />
              <span className="text-[10px] uppercase tracking-[0.4em]">Project_Scope</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80 font-sans ">
              {project.description}
            </p>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary/40">
              <ChartBar size={14} />
              <span className="text-[10px] uppercase tracking-[0.4em]">Efficiency_Metrics</span>
            </div>
            <div className="space-y-5">
              {project.metrics?.map((m: any, i: number) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-tighter">
                    <span className="text-foreground/60">{m.label}</span>
                    <span className="text-primary font-bold">{m.value}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-primary/10 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.value}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute h-full bg-primary shadow-[0_0_10px_var(--primary)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards / Achievements */}
          {project.awards && (
            <div className="pt-6 border-t border-primary/10 space-y-4">
              <div className="flex items-center gap-2 text-primary/40">
                <Trophy size={14} />
                <span className="text-[10px] uppercase tracking-[0.4em]">Achieved_Nodes</span>
              </div>
              <div className="space-y-3">
                {project.awards.map((award: any, i: number) => (
                  <div key={i} className="flex flex-col p-3 bg-emerald-500/5 border border-emerald-500/20">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">{award.title}</span>
                    <span className="text-[8px] text-emerald-400/60 uppercase">{award.organization}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
