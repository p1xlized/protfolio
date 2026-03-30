"use client"

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  Pause,
  Play,
  SpeakerHigh,
  TerminalWindow,
  Disc,
  Record as RecordIcon,
  Graph as GraphIcon,
  Target,
  ShieldCheck,
  CaretRight,
  CaretLeft,
  Waveform,
  Cpu,
  Fingerprint,
  Broadcast
} from "@phosphor-icons/react"
import { useMusicTab } from "@/lib/BrowserTab"
import { useStore } from "@tanstack/react-store"
import { systemStore } from "@/lib/data.store"

// --- ROUTE & LOADER ---

export const Route = createFileRoute("/albums")({

  component: MusicPage,
})

// --- HYDRATION SAFE UTILS ---

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);
  return hasMounted;
}

// --- DECORATIVE SUB-COMPONENTS ---

const BackgroundDecoration = () => (
  <div className="pointer-events-none fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:100px_100px]" />
  </div>
)

// --- COMPONENTS ---

const MusicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => (prev < 100 ? prev + Math.floor(Math.random() * 15) : 100));
    }, 100);
    const timeout = setTimeout(onComplete, 2000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background font-mono text-primary">
      <div className="relative size-32 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 border-2 border-primary/20 border-dashed rounded-full"
        />
        <Fingerprint size={48} weight="thin" className="animate-pulse" />
      </div>
      <div className="mt-8 w-48 h-1 bg-primary/10 relative overflow-hidden">
        <motion.div className="absolute h-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <span className="mt-4 text-[10px] font-black tracking-[1em] uppercase">Decrypting_Node::{percent}%</span>
    </motion.div>
  );
};

const AlbumCard = ({ album, onSelect }: any) => (
  <button
    onClick={() => onSelect(album)}
    className="group relative w-full text-left font-mono"
  >
    <div className="relative overflow-hidden border border-primary/30 bg-background/80 backdrop-blur-md transition-all hover:border-primary">

      {/* HEADER (kept, slightly refined) */}
      <div className="flex justify-between items-center px-2 py-1 border-b border-primary/20 text-[8px] tracking-widest uppercase opacity-60">
        <span>SYS//ARCHIVE::{album.id}</span>
        <span className="group-hover:text-primary transition-colors">
          {album.genre || "UNKNOWN"}
        </span>
      </div>

      {/* IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {album.coverUrl ? (
          <img
            src={album.coverUrl}
            className="h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            alt=""
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/5">
            <Disc size={40} className="opacity-10" />
          </div>
        )}

        {/* SIGNAL SCAN (new hover effect) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent
                          group-hover:left-full transition-all duration-700 ease-in-out" />
        </div>

        {/* subtle dark overlay */}
        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
      </div>

      {/* INFO */}
      <div className="px-3 py-2 border-t border-primary/20 bg-background/90">

        {/* MAIN LINE */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[11px] font-bold tracking-widest uppercase text-foreground group-hover:text-primary transition-colors">
            {album.name || album.title}
          </h3>

          <Broadcast
            size={10}
            className="opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all"
          />
        </div>

        {/* SECONDARY (compressed info) */}
        <div className="mt-1 text-[8px] tracking-widest uppercase opacity-40 truncate">
          {album.title}
        </div>
      </div>

      {/* SIDE ACCENT */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/30 group-hover:bg-primary transition-all" />
    </div>
  </button>
)
const TrackList = ({ tracks, activeTrackId, onSelect }: any) => (
  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col border border-primary/20 bg-background/40 backdrop-blur-lg lg:flex-1">
    <div className="flex items-center justify-between border-b border-primary/20 p-4">
      <div className="flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase font-black text-primary/60">
        <Target size={14} /> // STREAM_BUFFER
      </div>
      <div className="size-2 bg-primary animate-pulse rounded-full shadow-[0_0_8px_var(--primary)]" />
    </div>
    <div className="max-h-[300px] overflow-y-auto lg:max-h-[500px] custom-scrollbar">
      {tracks?.map((track: any, i: number) => (
        <div
          key={track.id}
          onClick={() => onSelect(track)}
          className={`flex items-center justify-between p-4 cursor-pointer transition-all border-b border-primary/5 last:border-0
            ${activeTrackId === track.id ? "bg-primary text-background" : "hover:bg-primary/5"}`}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[8px] opacity-40">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-[10px] font-black tracking-widest uppercase line-clamp-1">{track.name}</span>
          </div>

        </div>
      ))}
    </div>
  </motion.section>
)

const AudioDecoder = ({ track, isPlaying, setIsPlaying, volume, setVolume, onBack, albumTitle }: any) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [displayTitle, setDisplayTitle] = useState("")

  // Typewriter effect for futuristic feel
  useEffect(() => {
    let i = 0;
    setDisplayTitle("");
    const fullTitle = track?.title || "Searching...";
    const interval = setInterval(() => {
      setDisplayTitle(fullTitle.slice(0, i));
      i++;
      if (i > fullTitle.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [track]);

  useEffect(() => {
    if (audioRef.current && track?.src) {
      isPlaying ? audioRef.current.play().catch(() => setIsPlaying(false)) : audioRef.current.pause()
    }
  }, [isPlaying, track])

  const handleTimeUpdate = () => {
    if (audioRef.current) setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
  }

  return (
    <motion.aside initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4 lg:w-[380px]">
      <audio ref={audioRef} src={track?.src} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />

      {/* COMPACT DATA-SHARD PLAYER */}
      <div className="border-2 border-primary/30 bg-background/80 p-5 shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),0.1)] relative">
        <button onClick={onBack} className="absolute -top-3 -left-3 size-8 bg-primary text-background flex items-center justify-center hover:scale-110 transition-transform">
          <ArrowLeft size={16} weight="bold" />
        </button>

        {/* SCREEN AREA */}
        <div className="bg-primary/5 border border-primary/10 p-4 mb-6 relative overflow-hidden min-h-[140px] flex flex-col justify-between">
           <div className="absolute top-0 right-0 p-2 opacity-20"><Cpu size={12} /></div>

           <div>
              <div className="text-[6px] font-black text-primary/40 uppercase mb-2 tracking-[0.3em]">Now_Decoding::</div>
              <h2 className="text-lg font-black text-primary uppercase tracking-tighter leading-[1.1] mb-1">
                {displayTitle}<span className="animate-pulse">_</span>
              </h2>
              <p className="text-[7px] tracking-[0.4em] uppercase opacity-40 font-bold">{albumTitle}</p>
           </div>

           {/* WAVEFORM DECO */}
           <div className="flex items-end gap-0.5 h-8 opacity-30">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: isPlaying ? [2, Math.random() * 20 + 5, 2] : 2 }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  className="flex-1 bg-primary"
                />
              ))}
           </div>
        </div>

        {/* CONTROLS AREA */}
        <div className="space-y-6">
           {/* PROGRESS */}
           <div className="relative h-1 w-full bg-primary/10">
              <motion.div className="absolute h-full bg-primary" style={{ width: `${progress}%` }} />
              <input
                type="range" min="0" max="100" step="0.1" value={progress}
                onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = (Number(e.target.value) / 100) * audioRef.current.duration; }}
                className="absolute inset-0 w-full cursor-pointer opacity-0 z-20"
              />
           </div>

           {/* MAIN INTERFACE BUTTONS */}
           <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 bg-primary h-14 flex items-center justify-center text-background hover:brightness-110 transition-all"
              >
                {isPlaying ? <Pause size={28} weight="fill" /> : <Play size={28} weight="fill" />}
              </button>
              <div className="flex flex-col gap-2 w-14">
                 <button className="flex-1 border border-primary/20 h-6 flex items-center justify-center hover:bg-primary/10"><CaretRight size={14} /></button>
                 <button className="flex-1 border border-primary/20 h-6 flex items-center justify-center hover:bg-primary/10"><CaretLeft size={14} /></button>
              </div>
           </div>

           {/* VOLUME HUD */}
           <div className="flex items-center gap-3 bg-primary/5 p-2 border border-primary/5">
              <SpeakerHigh size={12} className="text-primary/40" />
              <input
                type="range" min="0" max="100" value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="h-0.5 flex-1 cursor-pointer appearance-none bg-primary/20 accent-primary"
              />
           </div>
        </div>
      </div>
    </motion.aside>
  )
}

// --- MAIN PAGE ---

export default function MusicPage() {
  const [booting, setBooting] = useState(true)
  const [activeAlbum, setActiveAlbum] = useState<any | null>(null)
  const [activeTrack, setActiveTrack] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)

  const mounted = useHasMounted()

  const albums = useStore(systemStore, (state) => state.albums)

  useMusicTab({
    isPlaying,
    songTitle: activeTrack?.title || "Archive",
    appSuffix: "x_x",
    visualizerInterval: 200
  })
console.log(albums)
  const handleBootComplete = useCallback(() => setBooting(false), [])

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="relative min-h-screen w-full font-mono flex flex-col p-6 md:p-12 overflow-x-hidden bg-background uppercase text-primary">
      <BackgroundDecoration />

      <AnimatePresence>
        {booting && <MusicLoader onComplete={handleBootComplete} />}
      </AnimatePresence>

      {!booting && (
        <div className="relative z-10 w-full max-w-6xl mx-auto mt-12">
          <AnimatePresence mode="wait">
            {!activeAlbum ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                <header className="border-l-4 border-primary pl-6 py-2">
                   <span className="text-[8px] tracking-[0.8em] text-primary/40 font-black block mb-2">Network_Audio_Source</span>
                   <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none flex items-center gap-4">
                     VOID <span className="size-4 bg-primary animate-ping rounded-full" />
                   </h1>
                </header>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {albums.map((album: any) => (
                    <AlbumCard key={album.id} album={album} onSelect={(a: any) => {
                      setActiveAlbum(a);
                      if (a.tracks_data?.length > 0) setActiveTrack(a.tracks_data[0]);
                    }} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 lg:flex-row lg:items-start justify-center mt-8">
                <TrackList
                  tracks={activeAlbum.tracks}
                  activeTrackId={activeTrack?.id}
                  onSelect={(t: any) => { setActiveTrack(t); setIsPlaying(true); }}
                />
                <AudioDecoder
                  track={activeTrack || {}}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  volume={volume}
                  setVolume={setVolume}
                  albumTitle={activeAlbum.title}
                  onBack={() => { setActiveAlbum(null); setIsPlaying(false); }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
