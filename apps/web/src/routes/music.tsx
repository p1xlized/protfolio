"use client"

import React, { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  Folder,
  Clock,
  Fingerprint,
  Calendar,
  WifiHigh,
  Graph,
  ArrowUpRight,
  Database,
  MusicNotes,
  Disc,
  Scan,
  VinylRecord,
  GraphIcon,
  Aperture
} from "@phosphor-icons/react"
import MusicLoader from "@/components/MusicLoader"
import SystemInfoDialog from "@/components/MusicDialog"

// --- ROUTE DEFINITION ---
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

// --- DATA ---


// --- SUB-COMPONENTS ---

/**
 * Page-wide background animation
 */
 const PageBackground = () => (
   <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-background flex items-center justify-center">
     {/* 1. CENTRAL RADIAL GRADIENT MASK (Focuses the light in the center) */}
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT/0.07)_0%,transparent_70%)]" />

     {/* 2. THE GRID: Concentrated in the center using a mask */}
     <motion.div
       initial={{ x: 0, y: 0 }}
       animate={{
         x: [-20, 20, -20],
         y: [-20, 20, -20],
         rotate: [0, 1, 0]
       }}
       transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
       className="absolute inset-[-100px] opacity-[0.08] bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"
     />

     {/* 3. CENTRAL ORBITAL NODES (The "Core") */}
     <svg className="absolute size-[800px] opacity-20" viewBox="0 0 100 100">
       <defs>
         <filter id="glow">
           <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
           <feMerge>
             <feMergeNode in="coloredBlur" />
             <feMergeNode in="SourceGraphic" />
           </feMerge>
         </filter>
       </defs>

       {/* Orbital Rings */}
       {[30, 45].map((radius, i) => (
         <circle
           key={`ring-${i}`}
           cx="50" cy="50" r={radius}
           fill="none"
           stroke="currentColor"
           strokeWidth="0.1"
           className="text-primary/20"
           strokeDasharray={i === 0 ? "1 4" : "10 5"}
         />
       ))}

       {/* Pulsing Central Nodes */}
       {[...Array(12)].map((_, i) => {
         const angle = (i * 360) / 12;
         const x = 50 + 35 * Math.cos((angle * Math.PI) / 180);
         const y = 50 + 35 * Math.sin((angle * Math.PI) / 180);

         return (
           <motion.g key={i} className="text-primary/40" filter="url(#glow)">
             <motion.circle
               cx={x} cy={y} r="0.8"
               fill="currentColor"
               animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
               transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
             />
             {/* Connection line to center */}
             <line
               x1="50" y1="50" x2={x} y2={y}
               stroke="currentColor"
               strokeWidth="0.05"
               className="opacity-20"
             />
           </motion.g>
         );
       })}
     </svg>

     {/* 4. SCANLINE TEXTURE (Keeps it Brutalist) */}
     <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_3px] opacity-30 pointer-events-none" />

     {/* 5. VIGNETTE (Pushes focus to center) */}
     <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)] pointer-events-none" />
   </div>
 )
/**
 * Individual Album Folder Card
 */

 interface AlbumFolderProps {
   album: {
     id: string
     title: string
     artist: string
   }
   isHovered: boolean
   onMouseEnter: () => void
 }

 export const AlbumFolder = ({ album, isHovered, onMouseEnter }: AlbumFolderProps) => {
   return (
     <motion.div
       onMouseEnter={onMouseEnter}
       className="flex flex-col items-center gap-4 group cursor-pointer relative p-4 transition-all"
     >
       {/* --- MAIN ICON CONTAINER --- */}
       <div className="relative aspect-square w-full border border-border bg-muted/5 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.05)]">

         {/* HOVER EFFECT: BIT-MASK TEXTURE */}
         <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none select-none overflow-hidden ${isHovered ? 'opacity-100' : ''}`}>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT/0.1)_0%,transparent_80%)]" />

           {/* Animated Hex/Binary Stream */}
           <motion.div
             animate={{ y: ["0%", "-50%"] }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="text-[6px] leading-[8px] font-black text-primary/10 break-all p-1 uppercase"
           >
             {Array(20).fill("01 AF 88 4F 2D 9X ").join("")}
             {Array(20).fill("SYST_DATA_STREAM_").join("")}
             {Array(20).fill("FF 00 FF 00 11 00 ").join("")}
           </motion.div>
         </div>

         {/* BRUTALIST CORNER BRACKETS */}
         <div className={`absolute inset-0 transition-all duration-500 p-2 ${isHovered ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
            <div className="absolute top-0 left-0 size-3 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute top-0 right-0 size-3 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-primary/60" />
         </div>

         {/* THE FOLDER ICON (Deep Background) */}
         <Folder
           size={56}
           weight="fill"
           className="text-muted-foreground/[0.03] transition-colors group-hover:text-primary/5"
         />

         {/* THE CORE (Floating Vinyl) */}
         <div className="absolute inset-0 flex items-center justify-center">
           <motion.div
             animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
             transition={{ duration: 0.8, ease: "circOut" }}
             className="relative flex items-center justify-center"
           >
             <VinylRecord
               size={42}
               weight="thin"
               className={`transition-colors duration-500 ${isHovered ? 'text-primary' : 'text-muted-foreground/30'}`}
             />
             {/* Inner "Aperture" light */}
             <Aperture
               size={14}
               className={`absolute animate-pulse transition-opacity ${isHovered ? 'opacity-100 text-primary' : 'opacity-0'}`}
             />
           </motion.div>
         </div>

         {/* TOP ID BADGE */}
         <div className="absolute top-0 right-0 p-2">
           <div className={`text-[7px] font-black px-1.5 py-0.5 tracking-widest border transition-all uppercase
             ${isHovered ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]' : 'bg-muted/50 text-muted-foreground/40 border-border'}
           `}>
             REF_{album.id}
           </div>
         </div>

         {/* BOTTOM METRIC: BITRATE PULSE */}
         <div className={`absolute bottom-2 right-2 flex items-center gap-1.5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <GraphIcon size={10} className="text-primary animate-pulse" />
            <span className="text-[6px] font-black text-primarys uppercase tracking-tighter">320kbps</span>
         </div>

         {/* SCANNING LINE (Subtle Glitch) */}

       </div>

       {/* --- LABEL AREA --- */}
       <div className="text-center w-full space-y-1">
         <p className={`text-[11px] font-black uppercase tracking-[0.15em] truncate px-2 transition-all duration-300
           ${isHovered ? 'text-primary translate-y-[-2px]' : 'text-foreground'}
         `}>
           {album.title}
         </p>
         <div className="flex items-center justify-center gap-2">
           <div className={`h-[1px] transition-all duration-500 bg-primary/20 ${isHovered ? 'w-4' : 'w-2'}`} />
           <span className="text-[8px] opacity-30 font-bold uppercase tracking-widest group-hover:text-primary/60 transition-colors">
             {album.artist}
           </span>
           <div className={`h-[1px] transition-all duration-500 bg-primary/20 ${isHovered ? 'w-4' : 'w-2'}`} />
         </div>
       </div>
     </motion.div>
   )
 }

/**
 * Detail Stats component for Inspector
 */

/**
 * Right-side Metadata Inspector
 * Adapted for: name, description, genre, and profileId
 */
 /**
  * Right-side Metadata Inspector
  * Re-arranged to include: Cover Art, Title/Genre, Description, and Stats
  */
 const MetadataInspector = ({ album }: { album: any | null }) => (
   <div className="lg:col-span-4 flex flex-col p-8 bg-background relative overflow-hidden h-full border-l border-border/50">
     {/* Decorative background logo */}
     <div className="absolute -top-12 -right-12 opacity-[0.03] pointer-events-none">
       <Disc size={300} weight="thin" className="animate-spin-slow" />
     </div>

     <div className="h-full flex flex-col relative z-10">
       {/* 1. Header Navigation/Status */}
       <div className="flex items-center gap-3 shrink-0 mb-6">
         <Scan size={18} className="text-primary/60 animate-pulse" />
         <div className="h-[1px] flex-1 bg-border/50" />
         <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.4em]">
           Data_Visual_Capture
         </span>
       </div>

       <div className="flex-1 overflow-y-auto no-scrollbar relative">
         <AnimatePresence mode="wait">
           {album ? (
             <motion.div
               key={album.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex flex-col h-full space-y-6"
             >
               {/* 2. Visual Layer: The Cover Art */}
               {/* 2. Visual Layer: The Cover Art */}
               <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />

                 {/* The Container controls the tint color */}
                 <div className="relative aspect-square border-2 border-primary/20 overflow-hidden bg-background">
                   <img
                     src={album.coverUrl || "https://picsum.photos/400/400"}
                     alt={album.title}

                     className="size-full object-cover transition-all duration-500 [mix-blend-mode:luminosity] opacity-60 group-hover:opacity-100 group-hover:[mix-blend-mode:normal]"
                   />

                   {/* CRT Scanline Overlay (remains) */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

                   {/* Corner Markers (remain) */}
                   <div className="absolute top-2 left-2 size-4 border-t-2 border-l-2 border-primary/60" />
                   <div className="absolute bottom-2 right-2 size-4 border-b-2 border-r-2 border-primary/60" />
                 </div>
               </div>

               {/* 3. Identity Layer */}
               <div>
                 <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground leading-none mb-1">
                   {album.title}
                 </h2>
                 <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                   <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">
                     {album.genre}
                   </span>
                   <div className="size-1 rounded-full bg-border" />
                   <span className="text-[10px] text-muted-foreground/60 font-mono uppercase">
                     USER::{album.artist}
                   </span>
                 </div>
               </div>

               {/* 4. Log Layer: Description */}
               <div className="bg-muted/10 p-3 border border-border/50 relative">
                 <div className="absolute top-0 right-0 px-2 py-0.5 bg-border text-[7px] font-black text-muted-foreground uppercase">
                   Log_Summary
                 </div>
                 <p className="text-[11px] leading-relaxed text-muted-foreground/80 font-mono uppercase">
                   {album.description}
                 </p>
               </div>

               {/* 5. Metrics Grid */}
               <div className="grid grid-cols-2 gap-2">
                 <div className="bg-muted/5 border border-border/30 p-2">
                   <span className="text-[7px] text-muted-foreground uppercase font-black block mb-1">Frequency</span>
                   <span className="text-xs font-bold font-mono text-primary">{album.bpm} BPM</span>
                 </div>
                 <div className="bg-muted/5 border border-border/30 p-2">
                   <span className="text-[7px] text-muted-foreground uppercase font-black block mb-1">File_Size</span>
                   <span className="text-xs font-bold font-mono">{album.size}</span>
                 </div>
               </div>

               {/* 6. Interaction Trigger */}
               <button className="w-full group relative flex items-center justify-center gap-3 border-2 border-primary/50 bg-primary/5 py-4 transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.97]">
                 <Aperture size={20} className="animate-spin-slow group-hover:animate-none" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Initialize_Link</span>
                 <ArrowUpRight size={16} />
               </button>
             </motion.div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-10">
               <Fingerprint size={60} weight="thin" className="mb-4 animate-pulse" />
               <span className="text-[9px] uppercase font-black tracking-[0.5em]">Awaiting_Input</span>
             </div>
           )}
         </AnimatePresence>
       </div>
     </div>
   </div>
 )

// --- MAIN PAGE ---

function MusicPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredAlbum, setHoveredAlbum] = useState<any | null>(null)
  const [time, setTime] = useState("")
  const issueDate = "2024.03.15"
  const albums = Route.useLoaderData();
  console.log("Loaded albums:", albums);

  const ALBUMS = albums.map(item => ({
    id: `REF-${item.id.toString().padStart(2, '0')}`,
    title: item.name.toUpperCase(),
    artist: item.profileId.replace('_', '.').toUpperCase(),
    year: new Date(item.releaseDate).getFullYear().toString(),
    description: item.description,
    genre: item.genre,
    // Randomizing technical stats for that "hacker" feel
    tracks: Math.floor(Math.random() * 6) + 8,
    size: `${(Math.random() * 150 + 50).toFixed(0)}MB`,
    bpm: item.genre.includes("Lo-Fi") ? 88 : 120
  }));

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit" }))
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen w-full font-mono selection:bg-primary selection:text-primary-foreground flex items-center justify-center p-4 overflow-hidden">
      <PageBackground />

      <AnimatePresence>
        {isLoading && <MusicLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-6xl h-[750px] border border-border bg-background/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
        >
          {/* HEADER */}
          <div className="h-10 border-b border-border bg-muted/50 px-6 flex items-center justify-between shrink-0 font-black uppercase text-[10px]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)] animate-pulse" />
                <span className="tracking-widest">Media_Archive::Node_Explorer</span>
              </div>
              <span className="text-[9px] opacity-40 italic tracking-widest hidden md:block">Index_Ref: {ALBUMS.length}_Modules</span>
            </div>
            <div className="flex items-center gap-4">
              <Clock size={16}/> {time}
            </div>
          </div>

          {/* BENTO CONTENT AREA */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* GRID DIRECTORY */}
            <div className="lg:col-span-8 p-8 border-r border-border bg-muted/5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {ALBUMS.map((album) => (
                  <AlbumFolder
                    key={album.id}
                    album={album}
                    isHovered={hoveredAlbum?.id === album.id}
                    onMouseEnter={() => setHoveredAlbum(album)}
                  />
                ))}
              </div>
            </div>

            {/* METADATA INSPECTOR */}
            <MetadataInspector album={hoveredAlbum} />
          </div>

          {/* FOOTER */}
          <div className="h-10 border-t border-border bg-background px-6 flex items-center justify-between shrink-0 font-black uppercase text-[9px] tracking-widest text-muted-foreground">
            <div className="flex gap-10">
              <div className="flex items-center gap-2 border-r border-border pr-10">
                <Calendar size={14} className="opacity-40"/> Cycle: {issueDate}
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <WifiHigh size={16} className="text-primary/40"/> Uplink: Established
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <MusicNotes size={12} className="text-primary/40" />
                <span className="opacity-30">Buffer_Optimized</span>
              </div>
              <div className="h-1 w-32 bg-muted border border-border overflow-hidden">
                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="h-full bg-primary/60" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <SystemInfoDialog />
    </div>
  )
}

export default MusicPage
