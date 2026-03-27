"use client"

import React, { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clock,
  Calendar,
  WifiHigh,
  MusicNotes,
  FileArrowDown,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  GraphIcon,
  Cpu,
  Database,
  TerminalWindow,
  Globe,
  HardDrive,
  CaretDoubleRight,
  CodeBlock,
  ChartBar,
  Waveform,
  Scan,
  Eye,
  Timer,
  FileCode,
  Target
} from "@phosphor-icons/react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@portfolio/ui/components/ui/dialog"
import MusicDialog from "@/components/MusicDialog"
import { createFileRoute } from "@tanstack/react-router"
import { CassetteTapeIcon } from "@phosphor-icons/react/dist/ssr"

export const Route = createFileRoute("/music")({
  loader: async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${API_URL}/music`);
      if (!res.ok) return []; // Return empty array instead of crashing
      return res.json();
    } catch (e) {
      console.error("API is down:", e);
      return []; // Fallback so the route still "exists"
    }
  },
  component: MusicPage,
})


export function PageBackground() {
  // Generate some static random values for initial positioning to avoid hydration mismatch
  const dataFragments = [
    { label: "0x88A4F", top: "15%", left: "10%" },
    { label: "1011001", top: "45%", left: "85%" },
    { label: "SYS_ERR_V4", top: "75%", left: "20%" },
    { label: "CORE_DUMP", top: "30%", left: "60%" },
    { label: "ARCH_6.12", top: "85%", left: "55%" },
    { label: "00:FF:2A", top: "10%", left: "80%" },
  ];

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background">
      {/* 1. Chaotic Glow Orbs (Keep for depth) */}
      <motion.div
        animate={{ x: [0, 100, -50, 0], y: [0, -50, 50, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 size-[500px] rounded-full bg-primary/5 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -80, 40, 0], y: [0, 100, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 size-[600px] rounded-full bg-primary/10 blur-[150px]"
      />

      {/* 2. RYTHMIC DATA RAIN (Vertical Binary Streams) */}
      <div className="absolute inset-0 opacity-[0.05] flex justify-around pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="text-[6px] font-mono text-primary flex flex-col gap-2"
          >
            {[...Array(20)].map((_, j) => (
              <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* 3. CHAOTIC FRAGMENTS (Flickering technical strings) */}
      <div className="absolute inset-0 opacity-[0.08] hidden md:block pointer-events-none font-mono text-[7px] text-primary">
        {dataFragments.map((frag, i) => (
          <motion.div
            key={`frag-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0.2, 1, 0],
              x: [0, Math.random() > 0.5 ? 5 : -5, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            className="absolute p-1 border border-primary/10 bg-primary/5"
            style={{ top: frag.top, left: frag.left }}
          >
            {frag.label}
          </motion.div>
        ))}
      </div>

      {/* 4. RANDOM BIT BLIPS (Chaotic pops) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`blip-${i}`}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: Math.random() * 15
            }}
            className="absolute size-4 border border-primary/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* 5. Subtle Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
    </div>
  )
}

export function AlbumFolder({ album, isHovered, onHover }: any) {
  return (
    <div
      className="relative group cursor-crosshair"
      onMouseEnter={() => onHover(album)}
      onClick={() => onHover(album)}
    >
      <div className={`
        relative aspect-square border transition-all duration-700 p-6 flex flex-col items-center justify-center gap-4 overflow-hidden
        ${isHovered ? 'border-primary/40 bg-primary/[0.04]' : 'border-primary/5 bg-transparent'}
      `}>

        {/* --- 1. SVG ORBITAL BACKGROUND ANIMATION (Hover Triggered) --- */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center p-4 opacity-[0.05]"
            >
              <motion.svg
                viewBox="0 0 100 100"
                className="size-full text-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {/* Fixed Wireframe Sphere */}
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 2" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.3" />

                {/* Rotating Latitude/Longitude Lines */}
                {[...Array(4)].map((_, i) => (
                  <ellipse
                    key={i}
                    cx="50" cy="50"
                    rx="45" ry={10 + i * 10}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.1"
                  />
                ))}

                {/* "Data Packets" Orbiting the sphere */}
                {[...Array(3)].map((_, i) => (
                  <motion.circle
                    key={`packet-${i}`}
                    cx="50"
                    cy="50"
                    r="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.2"
                    animate={{ rx: [40, 55, 40], ry: [15, 25, 15], rotate: [0, 360] }}
                    transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- 2. DYNAMIC CORNER LABELS (Only on Hover) --- */}

        {/* Top-Left: Track Counter */}
        <div className={`absolute top-2 left-2 transition-all duration-500 flex items-center gap-1.5 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
           <ChartBar size={10} className="text-primary/40" />
           <span className="text-[7px] text-primary/60 uppercase tracking-tighter">TRK_{album.tracks || '12'}</span>
        </div>

        {/* Top-Right: Status Activity */}
        <div className="absolute top-2 right-2 flex items-center gap-1">
           <span className={`text-[6px] uppercase text-primary/20 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>Node_Access</span>
           <CassetteTapeIcon size={10} className={`transition-colors ${isHovered ? 'text-primary animate-pulse' : 'text-primary/10'}`} />
        </div>

        {/* Bottom-Left: Hex ID */}
        <div className={`absolute bottom-2 left-2 transition-all duration-500 ${isHovered ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="text-[7px] text-primary tracking-[0.2em]">0x{album.id.toString(16).toUpperCase()}</span>
        </div>

        {/* Bottom-Right: Bitrate Metadata */}
        <div className={`absolute bottom-2 right-2 transition-all duration-700 flex items-center gap-1 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
           <Cpu size={10} className="text-primary/30" />
           <span className="text-[7px] text-primary/40 uppercase tracking-tighter">320kbps_vbr</span>
        </div>

        {/* --- 3. MAIN CONTENT --- */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="relative">
            {/* The icon is now static, but scales slightly on hover */}
            <MusicNotes
              size={32}
              weight={isHovered ? "fill" : "thin"}
              className={`transition-all duration-500 ${isHovered ? 'text-primary/70 scale-110' : 'text-primary/10'}`}
            />

            {/* Soft bloom behind icon */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.4, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10"
                />
              )}
            </AnimatePresence>
          </div>

          <span className="text-[9px] uppercase tracking-[0.3em] text-center opacity-30 group-hover:opacity-100 transition-all duration-500 leading-tight">
            {album.title}
          </span>
        </div>

        {/* --- 4. MOBILE TOOLTIP --- */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="lg:hidden absolute -bottom-1 left-0 right-0 z-50 bg-background/95 border-t border-primary/20 p-2 text-[7px] uppercase tracking-tighter backdrop-blur-md"
            >
              <div className="flex justify-between items-center">
                <p className="text-primary truncate">{album.title}</p>
                <p className="opacity-40">{album.year}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MetadataInspector({ album }: any) {
  // Logic for static technical readouts
  const trackCount = album?.tracks || 12;
  const duration = album?.duration || "42:15";

  return (
    <AnimatePresence mode="wait">
      {album ? (
        <motion.div
          key={album.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="p-6 space-y-8 font-mono h-full flex flex-col"
        >
          {/* --- 1. COMPACT IMAGE HEADER --- */}
          <div className="relative group/cover flex gap-4 border-b border-primary/5 pb-6">
            <div className="relative size-32 shrink-0 border border-primary/20 bg-background overflow-hidden">
              <img
                src={album.cover_url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300"}
                className="size-full object-cover grayscale opacity-40 transition-all duration-700 group-hover/cover:grayscale-0 group-hover/cover:opacity-80"
                alt="Analysis"
              />
              <div className="absolute top-1 left-1 size-2 border-t border-l border-primary/40" />
              <div className="absolute bottom-1 right-1 size-2 border-b border-r border-primary/40" />
            </div>

            <div className="flex flex-col justify-center space-y-2">
              <div className="flex items-center gap-2">
                <Target size={12} className="text-primary/40" />
                <span className="text-[7px] uppercase tracking-[0.5em] text-primary/30">Node_Selected</span>
              </div>
              <h3 className="text-xl uppercase tracking-tighter text-foreground/80 leading-none">{album.title}</h3>
              <p className="text-[8px] text-primary/60 uppercase tracking-[0.2em]">{album.artist}</p>
            </div>
          </div>

          {/* --- 2. MULTI-SECTOR DATA GRID --- */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {/* Row 1 */}
            <div className="border border-primary/5 bg-primary/[0.01] p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between opacity-30">
                <span className="text-[6px] uppercase tracking-widest">Storage</span>
                <FileCode size={10} />
              </div>
              <span className="uppercase text-foreground/60 tracking-widest">{album.size}</span>
            </div>
            <div className="border border-primary/5 bg-primary/[0.01] p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between opacity-30">
                <span className="text-[6px] uppercase tracking-widest">Released</span>
                <Clock size={10} />
              </div>
              <span className="uppercase text-foreground/60 tracking-widest">{album.year}</span>
            </div>

            {/* Row 2: Stats */}
            <div className="border border-primary/5 bg-primary/[0.01] p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between opacity-30">
                <span className="text-[6px] uppercase tracking-widest">Tracks</span>
                <ChartBar size={10} />
              </div>
              <span className="uppercase text-foreground/60 tracking-widest">{trackCount} UNITS</span>
            </div>
            <div className="border border-primary/5 bg-primary/[0.01] p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between opacity-30">
                <span className="text-[6px] uppercase tracking-widest">Duration</span>
                <Timer size={10} />
              </div>
              <span className="uppercase text-foreground/60 tracking-widest">{duration}</span>
            </div>
          </div>

          {/* --- 3. SPECTRUM ANALYSIS (Visual Decoration) --- */}
          <div className="space-y-3">
             <div className="flex items-center justify-between text-[7px] uppercase tracking-[0.3em] text-primary/20">
               <span>Freq_Response</span>
               <span>24-bit / 48khz</span>
             </div>
             <div className="h-10 flex items-end gap-[2px] opacity-20 border-b border-primary/10">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [ "10%", `${Math.random() * 80 + 20}%`, "10%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
                    className="flex-1 bg-primary"
                  />
                ))}
             </div>
          </div>

          {/* --- 4. SYSTEM LOG (Description) --- */}
          <div className="flex-1 space-y-3 overflow-hidden">
            <div className="flex items-center gap-2 text-primary/30">
              <GraphIcon size={12} />
              <span className="text-[8px] uppercase tracking-widest">Manifest_Summary</span>
            </div>
            <div className="text-[9px] uppercase leading-relaxed text-muted-foreground/40 border-l border-primary/10 pl-4 h-full overflow-y-auto custom-scrollbar">
              {album.description || "No metadata found. Node integrity validated."}
            </div>
          </div>

          {/* --- 5. COMPACT FOOTER --- */}
          <div className="pt-4 flex justify-between items-center border-t border-primary/5">
            <div className="flex flex-col">
              <span className="text-[6px] text-primary/20 uppercase">Index_Ref</span>
              <span className="text-[9px] tracking-widest text-primary/60">{album.id_ref}</span>
            </div>
            <CaretDoubleRight size={18} className="text-primary/30" />
          </div>
        </motion.div>
      ) : (
        <div className="size-full flex flex-col items-center justify-center p-12 text-center opacity-10">

          <p className="text-[8px] uppercase tracking-[0.6em] text-primary">Awaiting_Data_Input</p>
        </div>
      )}
    </AnimatePresence>
  )
}
/* --- 3. MAIN PAGE COMPONENT --- */
export default function MusicPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredAlbum, setHoveredAlbum] = useState<any | null>(null)
  const [time, setTime] = useState("")
  const issueDate = "2024.03.15"

  const albums = Route.useLoaderData();

  const ALBUMS = useMemo(() => albums.map(item => ({
    ...item,
    id_ref: `REF-${item.id.toString().padStart(2, '0')}`,
    title: item.name.toUpperCase(),
    artist: item.profileId.replace('_', '.').toUpperCase(),
    year: new Date(item.releaseDate).getFullYear().toString(),
    size: `${(Math.random() * 150 + 50).toFixed(0)}MB`,
    // Mocking durations and tracks for the metadata inspector
    tracks: Math.floor(Math.random() * 8) + 10,
    duration: `${Math.floor(Math.random() * 20) + 30}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`
  })), [albums]);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <div className="relative min-h-screen w-full font-mono flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
      <PageBackground />

      <AnimatePresence>
        {!isLoading && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative z-10 w-full max-w-6xl h-[85vh] md:h-[750px] border border-primary/10 bg-background/40 backdrop-blur-md shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            >
              {/* EXTERNAL FRAME DECORATIONS */}
              <div className="absolute top-2 left-2 size-1 bg-primary/20" />
              <div className="absolute top-2 right-2 size-1 bg-primary/20" />
              <div className="absolute bottom-2 left-2 size-1 bg-primary/20" />
              <div className="absolute bottom-2 right-2 size-1 bg-primary/20" />

              {/* HEADER - 60% Opacity */}
              <div className="h-10 border-b border-primary/10 bg-background/60 px-6 flex items-center justify-between shrink-0 text-[10px] uppercase tracking-[0.3em]">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]" />
                    <span className="text-foreground/90 font-medium">Media_Archive</span>
                  </div>
                  <div className="hidden md:flex items-center gap-3 opacity-40">
                    <Cpu size={14} />
                    <span className="text-[8px]">Node_Active: 0xCF2</span>
                  </div>
                </div>
                <div className="hidden xs:flex items-center gap-4 text-primary/40 tracking-widest">
                  <span className="flex items-center gap-2"><Target size={14} /> Tracking_Link</span>
                  <div className="h-3 w-[1px] bg-primary/10" />
                  <span className="flex items-center gap-2"><Clock size={14}/> {time}</span>
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="flex-1 flex overflow-hidden relative">

                {/* 1. LEFT DATA GUTTER (Vertical Hex Stream) */}
                <div className="hidden md:flex flex-col w-8 border-r border-primary/5 bg-background/20 py-4 items-center gap-4 overflow-hidden select-none pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <span key={i} className="text-[6px] text-primary/20 [writing-mode:vertical-lr] uppercase tracking-widest font-mono">
                      0x{((i + 1) * 255).toString(16).toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* 2. MAIN GRID AREA */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-background/40 relative">
                  {/* Internal Grid Corner Brackets */}
                  <div className="absolute top-4 left-4 size-3 border-t border-l border-primary/10" />
                  <div className="absolute bottom-4 right-4 size-3 border-b border-r border-primary/10" />

                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                    {ALBUMS.map((album) => (
                      <AlbumFolder
                        key={album.id}
                        album={album}
                        isHovered={hoveredAlbum?.id === album.id}
                        onHover={setHoveredAlbum}
                      />
                    ))}
                  </div>
                </div>

                {/* 3. METADATA SIDEBAR WITH FRAME DECOR */}
                <div className="hidden lg:block w-[380px] border-l border-primary/10 bg-background/60 backdrop-blur-sm relative">
                  {/* Sidebar Analysis HUD Decor */}
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

                  {/* Sidebar Top Status */}
                  <div className="absolute top-2 right-4 flex items-center gap-2 opacity-20">
                    <span className="text-[6px] uppercase tracking-[0.2em] text-primary">Inspector_Active</span>
                    <div className="size-1 rounded-full bg-primary" />
                  </div>

                  <MetadataInspector album={hoveredAlbum} />

                  {/* Sidebar Bottom Coordinates */}
                  <div className="absolute bottom-2 left-4 text-[6px] text-primary/20 uppercase tracking-[0.4em]">
                    LOC_42.88 // SEC_B
                  </div>
                </div>
              </div>

              {/* FOOTER - 60% Opacity */}
              <div className="h-10 border-t border-primary/10 bg-background/60 px-6 flex items-center justify-between shrink-0 text-[8px] uppercase tracking-[0.3em] text-primary/30">
                <div className="flex gap-10">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="opacity-40"/> Cycle: {issueDate}
                  </span>
                  <span className="hidden sm:flex items-center gap-2 italic">
                    <GraphIcon size={14} className="opacity-40"/> Status: Established
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[7px] tracking-[0.5em] opacity-40">Uplink_Progress</span>
                  <div className="h-[1px] w-24 md:w-48 bg-primary/10 overflow-hidden relative">
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="h-full bg-primary/40 shadow-[0_0_8px_var(--primary)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* EXTERNAL SYSTEM SPECS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 z-20"
            >
              <MusicDialog />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
