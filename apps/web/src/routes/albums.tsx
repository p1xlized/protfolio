"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
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
} from "@phosphor-icons/react"
import { useMusicTab } from "@/lib/BrowserTab"

// --- ROUTE & LOADER ---

export const Route = createFileRoute("/albums")({
  loader: async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${API_URL}/music`);
      if (!res.ok) return [];
      return res.json();
    } catch (e) {
      console.error("API Error:", e);
      return [];
    }
  },
  component: MusicPage,
})

// --- HYDRATION SAFE UTILS ---

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);
  return hasMounted;
}

// --- DECORATIVE SUB-COMPONENTS ---

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 size-2 border-t border-l border-primary/40 group-hover:border-primary transition-colors" />
    <div className="absolute top-0 right-0 size-2 border-t border-r border-primary/40 group-hover:border-primary transition-colors" />
    <div className="absolute bottom-0 left-0 size-2 border-b border-l border-primary/40 group-hover:border-primary transition-colors" />
    <div className="absolute bottom-0 right-0 size-2 border-b border-r border-primary/40 group-hover:border-primary transition-colors" />
  </>
)

const BackgroundDecoration = () => (
  <div className="pointer-events-none fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_2px] opacity-10" />
  </div>
)

// --- COMPONENTS ---

const MusicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const mounted = useHasMounted();
  const [hex, setHex] = useState("000000");

  useEffect(() => {
    const interval = setInterval(() => {
      setHex(Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
    }, 150);

    // Safety timeout to ensure loader finishes
    const timeout = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background font-mono text-primary">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <RecordIcon size={48} weight="thin" />
      </motion.div>
      <span className="mt-4 text-xl font-black tracking-tighter uppercase">0x{hex.toUpperCase()}</span>
    </motion.div>
  );
}

const AlbumCard = ({ album, onSelect }: any) => (
  <button
    onClick={() => onSelect(album)}
    className="group relative aspect-[3/4] border-2 border-primary/20 bg-background/40 p-5 transition-all hover:border-primary/60 hover:bg-primary/[0.03] text-left overflow-hidden flex flex-col"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px)] bg-[size:15px_15px]" />

    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className="flex items-center gap-2">
        <div className="size-1.5 rotate-45 border border-primary/40 group-hover:bg-primary group-hover:animate-pulse transition-all" />
        <span className="text-[7px] font-black tracking-[0.4em] text-primary/40 group-hover:text-primary transition-colors uppercase">Node_Link</span>
      </div>
      <GraphIcon size={12} className="text-primary/20 group-hover:text-primary transition-colors" />
    </div>

    <div className="flex-1 flex items-center justify-center mb-6 relative z-10">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute size-36 border border-primary/10 rounded-full border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute size-28 border border-primary/5 rounded-lg rotate-45"
            />
        </div>
        <motion.div whileHover={{ scale: 1.1, rotate: 90 }} className="text-primary/20 group-hover:text-primary transition-colors z-10">
            <Disc size={80} weight="thin" />
        </motion.div>
    </div>

    <div className="mt-auto space-y-1 relative z-10">
      <h3 className="text-[11px] font-black tracking-[0.2em] text-foreground group-hover:text-primary truncate uppercase transition-colors">
        {album.title}
      </h3>
      <div className="flex justify-between items-center opacity-40 font-mono text-[7px]">
         <span>{album.year} // {album.format}</span>
         <span className="group-hover:text-primary transition-colors">0x{album.id}</span>
      </div>
    </div>

    <CornerBrackets />

    <motion.div
       initial={{ scaleX: 0 }}
       whileHover={{ scaleX: 1 }}
       className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left shadow-[0_0_10px_var(--primary)]"
    />
  </button>
)

const TrackList = ({ tracks, activeTrackId, onSelect }: any) => (
  <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col border border-primary/20 bg-background/60 shadow-2xl backdrop-blur-md lg:flex-1">
    <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-6 py-4">
      <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-black">
        <TerminalWindow size={18} /> /Audio_Archive
      </div>
      <ShieldCheck size={16} className="text-primary/40" />
    </div>
    <div className="max-h-[400px] overflow-y-auto p-2 lg:max-h-[500px]">
      <table className="w-full text-left text-xs md:text-sm">
        <thead>
          <tr className="opacity-30 uppercase text-[10px] tracking-widest">
            <th className="p-3">ID</th>
            <th className="p-3">Bitstream_Title</th>
            <th className="p-3 text-right">Size</th>
          </tr>
        </thead>
        <tbody>
          {tracks?.map((track: any, i: number) => (
            <tr key={track.id} onClick={() => onSelect(track)} className={`group cursor-pointer border-b border-primary/5 last:border-0 ${activeTrackId === track.id ? "bg-primary text-background" : "hover:bg-primary/10"}`}>
              <td className="p-4 font-mono">{activeTrackId === track.id ? ">>" : String(i + 1).padStart(2, '0')}</td>
              <td className="p-4 tracking-tight uppercase font-bold">{track.title}</td>
              <td className="p-4 text-right opacity-60 font-mono">{track.dur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.section>
)

const AudioDecoder = ({ track, isPlaying, setIsPlaying, volume, setVolume, onBack, albumTitle }: any) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("00:00")

  useEffect(() => {
    if (audioRef.current && track?.src) {
      isPlaying ? audioRef.current.play().catch(() => setIsPlaying(false)) : audioRef.current.pause()
    }
  }, [isPlaying, track])

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume / 100 }, [volume])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100 || 0);
      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      setCurrentTime(`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
    }
  }

  return (
    <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4 lg:w-[450px]">
      <audio ref={audioRef} src={track?.src} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />

      <button onClick={onBack} className="flex w-fit items-center gap-3 border border-primary/40 bg-primary/5 px-4 py-2 text-[10px] tracking-widest uppercase hover:bg-primary hover:text-background transition-all font-black">
        <ArrowLeft size={14} weight="bold" /> [ Exit_to_Archive ]
      </button>

      <div className="border border-primary/30 bg-background p-4 shadow-2xl relative overflow-hidden group">
        <div className="relative aspect-video w-full overflow-hidden border border-primary/20 brightness-75 group-hover:brightness-100 transition-all duration-700">
          {track?.cover ? (
             <motion.img key={track.cover} src={track.cover} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="h-full w-full object-cover mix-blend-screen" />
          ) : (
             <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                <Disc size={48} className="text-primary/20" />
             </div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-30" />
        </div>
        <div className="absolute bottom-6 left-6 text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.8)]">
            <Target size={24} weight="bold" className="animate-pulse" />
        </div>
      </div>

      <div className="border border-primary/20 bg-primary/[0.02] p-6 backdrop-blur-sm relative">
        <div className="mb-6 border-b border-primary/10 pb-4">
          <h2 className="truncate text-xl font-black text-primary uppercase">{track?.title || "No_Signal"}</h2>
          <p className="mt-1 text-[8px] tracking-[0.4em] uppercase opacity-40 italic">{albumTitle}</p>
        </div>
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-[10px] font-mono opacity-60 uppercase font-bold"><span>{currentTime}</span><span>{track?.dur || "--:--"}</span></div>
          <div className="relative h-1 w-full bg-primary/10">
            <motion.div className="absolute h-full bg-primary shadow-[0_0_10px_var(--primary)]" style={{ width: `${progress}%` }} />
            <input type="range" min="0" max="100" step="0.1" value={progress} onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = (Number(e.target.value) / 100) * audioRef.current.duration; }} className="absolute inset-0 w-full cursor-pointer opacity-0" />
          </div>
        </div>
        <button onClick={() => setIsPlaying(!isPlaying)} className={`flex w-full items-center justify-center gap-3 border-2 py-4 transition-all ${isPlaying ? "bg-primary text-background border-primary" : "border-primary/40 hover:bg-primary/10"}`}>
          {isPlaying ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
          <span className="text-[10px] font-black tracking-[0.3em] uppercase">{isPlaying ? "Halt" : "Execute"}</span>
        </button>
        <div className="mt-6 flex items-center gap-4 opacity-40 pt-4 border-t border-primary/5">
          <SpeakerHigh size={16} />
          <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="h-1 flex-1 cursor-pointer appearance-none bg-primary/10 accent-primary" />
        </div>
      </div>
    </motion.aside>
  )
}

// --- MAIN PAGE ---

export default function MusicPage() {
  const albums = Route.useLoaderData()
  const [booting, setBooting] = useState(true)
  const [activeAlbum, setActiveAlbum] = useState<any | null>(null)
  const [activeTrack, setActiveTrack] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)

  const mounted = useHasMounted()

  useMusicTab({
    isPlaying,
    songTitle: activeTrack?.title || "Archive",
    appSuffix: "x_x",
    visualizerInterval: 200
  })

  // Safe handler to prevent dependency loop in MusicLoader
  const handleBootComplete = useCallback(() => setBooting(false), [])

  // Hydration safety check
  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    // FIX 1: Removed `overflow-hidden`, `items-center`, `justify-center` from the main container.
    // This allows the page to scroll normally if the grid gets too large.
    <div className="relative min-h-screen w-full font-mono flex flex-col p-4 md:p-12 overflow-x-hidden bg-background uppercase text-primary">
      <BackgroundDecoration />

      <AnimatePresence>
        {booting && <MusicLoader onComplete={handleBootComplete} />}
      </AnimatePresence>

      {!booting && (
        <div className="relative z-10 w-full max-w-7xl mx-auto mt-12 md:mt-20">
          <AnimatePresence mode="wait">
            {!activeAlbum ? (
              <motion.div key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                <header className="border-b-2 border-primary pb-8 flex justify-between items-end bg-background/50 backdrop-blur-md p-6 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    <div className="space-y-2 relative z-10">
                       <span className="text-[10px] tracking-[0.8em] opacity-40 font-black">Audio_Registry_V.2</span>
                       <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">ALBUMS</h1>
                    </div>
                    <div className="text-right hidden sm:block opacity-20 relative z-10">
                       <span className="text-[8px] tracking-[0.4em] block font-bold">Sector::Active</span>
                       <span className="text-[8px] tracking-[0.4em] block font-bold">Uplinks::{albums?.length || 0}</span>
                    </div>
                </header>

                {/* FIX 2: Handle Empty States so it doesn't show a blank void if API fails */}
                {!albums || albums.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 border border-primary/20 bg-primary/5">
                        <TerminalWindow size={48} className="text-primary/40 mb-4" />
                        <span className="text-sm tracking-widest uppercase font-black opacity-50">NO_ARCHIVES_FOUND</span>
                        <span className="text-[10px] tracking-widest uppercase opacity-30 mt-2">API_CONNECTION_REFUSED</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {albums.map((album: any) => (
                        <AlbumCard
                            key={album.id}
                            album={album}
                            onSelect={(a: any) => {
                            setActiveAlbum(a);
                            if (a.tracks_data?.length > 0) setActiveTrack(a.tracks_data[0]);
                            }}
                        />
                    ))}
                    </div>
                )}
              </motion.div>
            ) : (
              <motion.div key="details" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center mt-12">
                <TrackList
                  tracks={activeAlbum.tracks_data}
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
