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
  Target,
  Disc,
  ArrowUpRight,
  Waves,
  CaretUp,
  SkipForward,
  CaretDown,
  SkipBack,
  Play,
  ArrowLeft,
  SpeakerHigh
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
    <motion.div
      className="relative group cursor-crosshair"
      onMouseEnter={() => onHover(album)}
      whileHover="hover"
      initial="initial"
    >
      <div className={`
        relative aspect-[3/4] border transition-all duration-500 flex flex-col p-4 overflow-hidden
        ${isHovered
          ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)]'
          : 'border-primary/10 bg-background/40'}
      `}>

        {/* --- UNIT IDENTIFIER --- */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className={`size-1 rotate-45 ${isHovered ? 'bg-primary shadow-[0_0_8px_var(--primary)]' : 'bg-primary/20'}`} />
            <span className="text-[7px] font-black tracking-[0.3em] text-primary/60 uppercase">
              Unit_{album.id?.toString().padStart(3, '0')}
            </span>
          </div>
          <GraphIcon size={10} className={isHovered ? "text-primary animate-pulse" : "text-primary/20"} />
        </div>

        {/* --- MEDIA CORE --- */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 relative">
          <motion.div
            variants={{
              initial: { scale: 1, rotate: 0 },
              hover: { scale: 1.1, rotate: 90 }
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`${isHovered ? 'text-primary' : 'text-primary/10'}`}
          >
            <Disc size={56} weight={isHovered ? "duotone" : "thin"} />
          </motion.div>

          <div className="text-center space-y-1">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
              {album.title}
            </h3>
            <span className="text-[6px] text-primary/30 uppercase tracking-[0.4em]">Metadata_Locked</span>
          </div>
        </div>

        {/* --- SPECS FOOTER --- */}
        <div className="mt-auto pt-2 border-t border-primary/10 flex items-center justify-between text-[7px] font-mono text-primary/40 uppercase">
          <span>{album.year} // {album.format}</span>
          <div className="flex gap-0.5">
             {[...Array(3)].map((_, i) => (
               <div key={i} className={`w-2 h-0.5 ${isHovered ? 'bg-primary' : 'bg-primary/10'}`} />
             ))}
          </div>
        </div>

        {/* Scanning Line */}
        <motion.div
          variants={{ initial: { scaleX: 0 }, hover: { scaleX: 1 } }}
          className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left"
        />
      </div>
    </motion.div>
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


export default function MusicPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredAlbum, setHoveredAlbum] = useState<any | null>(null);
  const [time, setTime] = useState("");
  const albums = Route.useLoaderData();

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <div className="relative min-h-screen w-full font-mono flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-background/10">
      <PageBackground />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-7xl h-[85vh] md:h-[820px] flex border border-primary/10 bg-background shadow-2xl overflow-hidden"
          >
            {/* --- HARDWARE DECOR: CORNER PINS --- */}
            <div className="absolute top-2 left-2 size-1 bg-primary/40 rounded-full" />
            <div className="absolute top-2 right-2 size-1 bg-primary/40 rounded-full" />
            <div className="absolute bottom-2 left-2 size-1 bg-primary/40 rounded-full" />
            <div className="absolute bottom-2 right-2 size-1 bg-primary/40 rounded-full" />

            {/* --- 1. UTILITY SIDEBAR (Left) --- */}
            <aside className="w-14 md:w-16 border-r border-primary/10 flex flex-col items-center py-10 gap-12 bg-primary/[0.02]">
               <div className="flex flex-col gap-1 opacity-20">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-4 h-[1px] bg-primary" />
                  ))}
               </div>

               <div className="[writing-mode:vertical-lr] text-[9px] uppercase tracking-[0.6em] text-primary/40 font-black">
                 Audio_Master_Console
               </div>

               <div className="mt-auto space-y-6 pb-4">
                  <SpeakerHigh size={18} className="text-primary/20" />
                  <div className="flex flex-col gap-1 items-center">
                    <div className="size-1.5 bg-primary/60 rounded-full animate-pulse" />
                    <div className="size-1 bg-primary/20 rounded-full" />
                  </div>
               </div>
            </aside>

            {/* --- 2. THE MAIN GRID AREA --- */}
            <main className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar relative">
               {/* Background Watermark */}
               <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                  <Waves size={500} />
               </div>

               <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 relative z-10">
                  {albums.map((album: any) => (
                    <AlbumFolder
                      key={album.id}
                      album={album}
                      isHovered={hoveredAlbum?.id === album.id}
                      onHover={setHoveredAlbum}
                    />
                  ))}
               </div>
            </main>

            {/* --- 3. THE INSPECTOR PANEL (Right) --- */}
            <aside className="hidden lg:flex flex-col w-[360px] border-l border-primary/10 bg-primary/[0.01] p-8 space-y-10">
               {/* Digital Clock / Status */}
               <div className="flex justify-between items-center border-b border-primary/10 pb-6">
                  <div className="flex items-center gap-2">
                     <Cpu size={14} className="text-primary/60" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">Node_01</span>
                  </div>
                  <span className="text-[10px] font-mono text-primary">{time}</span>
               </div>

               {/* Inspector Content */}
               <div className="flex-1 space-y-8">
                  <MetadataInspector album={hoveredAlbum} />

                  {/* Decorative Logic Display */}
                  <div className="p-4 border border-primary/10 bg-black/20 space-y-4">
                     <div className="flex justify-between text-[8px] text-primary/40 uppercase tracking-widest">
                        <span>Frequency_Analysis</span>
                        <span>Level: 0.4db</span>
                     </div>
                     <div className="flex items-end gap-1 h-12">
                        {[...Array(20)].map((_, i) => (
                           <motion.div
                             key={i}
                             animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }}
                             transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                             className="flex-1 bg-primary/40"
                           />
                        ))}
                     </div>
                  </div>
               </div>

               {/* Hardware Manufacturer Branding */}
               <div className="pt-6 border-t border-primary/10 flex justify-between items-center opacity-40">
                  <div className="flex flex-col">
                    <span className="text-[7px] uppercase tracking-tighter">System_Spec</span>
                    <span className="text-[9px] font-bold">CORE_ARCHIVE_X</span>
                  </div>
                  <HardDrive size={20} weight="thin" />
               </div>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 z-20">
        <MusicDialog />
      </div>
    </div>
  );
}
