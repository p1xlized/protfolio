import { useEffect, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  MusicNotes,
  Pause,
  Play,
  SpeakerHigh,
  TerminalWindow,
} from "@phosphor-icons/react"
import MusicLoader from "@/components/MusicLoader"
import { TRACKS } from "@/data/music"
import { useMusicTab } from "@/lib/BrowserTab"

/**
 * Animated Background Decoration
 * Hidden on mobile to prioritize performance and clarity.
 */
const BackgroundDecoration = () => (
  <div className="pointer-events-none fixed inset-0 z-0 hidden lg:block">
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    {/* Pulsing Glow */}
    <motion.div
      animate={{ opacity: [0.05, 0.15, 0.05] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="bg-radial-gradient absolute inset-0 from-primary/10 via-transparent to-transparent"
    />
    {/* CRT Scanline Effect */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_2px] opacity-10" />
  </div>
)

const TrackList = ({ activeId, onSelect, currentView }: any) => (
  <motion.section
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`flex flex-col border border-primary/20 bg-background/60 shadow-2xl backdrop-blur-md lg:flex-1 ${currentView === "details" ? "hidden lg:flex" : "flex"}`}
  >
    <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-6 py-4">
      <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase">
        <TerminalWindow size={18} /> Directory: /audio
      </div>
      <span className="text-[10px] uppercase opacity-40">System_Active</span>
    </div>

    <div className="max-h-[500px] overflow-y-auto p-2 lg:max-h-none">
      <table className="w-full text-left text-xs md:text-sm">
        <thead>
          <tr className="tracking-tighter uppercase opacity-30">
            <th className="p-3">Idx</th>
            <th className="p-3">File_Name</th>
            <th className="p-3 text-right">Dur</th>
          </tr>
        </thead>
        <tbody>
          {TRACKS.map((track) => (
            <tr
              key={track.id}
              onClick={() => onSelect(track)}
              className={`group cursor-pointer border-b border-primary/5 transition-colors last:border-0 ${
                activeId === track.id
                  ? "bg-primary text-background"
                  : "hover:bg-primary/10"
              }`}
            >
              <td className="p-4">{activeId === track.id ? ">>" : track.id}</td>
              <td className="p-4 tracking-tight">{track.title}</td>
              <td className="p-4 text-right opacity-60">{track.dur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.section>
)

const AudioDecoder = ({
  track,
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
  setView,
  currentView,
}: any) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("00:00")

  // Handle Play/Pause
  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause()
    }
  }, [isPlaying, track])

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100
  }, [volume])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const duration = audioRef.current.duration
      setProgress((current / duration) * 100)

      const mins = Math.floor(current / 60)
      const secs = Math.floor(current % 60)
      setCurrentTime(
        `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      )
    }
  }

  const handleSeek = (val: number) => {
    if (audioRef.current) {
      const seekTime = (val / 100) * audioRef.current.duration
      audioRef.current.currentTime = seekTime
      setProgress(val)
    }
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex flex-col gap-4 lg:w-[400px] ${currentView === "list" ? "hidden lg:flex" : "flex"}`}
    >
      {/* HIDDEN AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Mobile Back Button */}
      <button
        onClick={() => setView("list")}
        className="flex w-fit items-center gap-3 border border-primary/40 bg-primary/5 px-4 py-2 text-[10px] tracking-widest uppercase hover:bg-primary hover:text-background lg:hidden"
      >
        <ArrowLeft size={14} weight="bold" /> [ RETURN_TO_LIST ]
      </button>

      {/* 1. VISUALIZER PANEL */}
      <div className="border border-primary/30 bg-background p-4 shadow-2xl">
        <div className="relative aspect-video w-full overflow-hidden border border-primary/20 brightness-90 grayscale">
          <AnimatePresence mode="wait">
            <motion.img
              key={track.cover}
              src={track.cover}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="h-full w-full object-cover mix-blend-screen"
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-30" />
        </div>
      </div>

      {/* 2. PLAYER CONTROLS PANEL */}
      <div className="border border-primary/20 bg-primary/[0.02] p-6 backdrop-blur-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="truncate text-xl tracking-tighter text-primary uppercase">
              {track.title.split(".")[0]}
            </h2>
            <span className="text-[10px] opacity-40">
              {track.id} // {track.bpm} BPM
            </span>
          </div>
          <p className="mt-1 text-[10px] tracking-[0.2em] uppercase opacity-30">
            Status: {isPlaying ? "Decoding_Stream..." : "Standby"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-[10px] tracking-widest opacity-60">
            <span>{currentTime}</span>
            <span className="text-primary underline">{track.dur}</span>
          </div>
          <div className="relative h-1 w-full bg-primary/10">
            <motion.div
              className="absolute h-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="absolute inset-0 w-full cursor-pointer opacity-0"
            />
          </div>
        </div>

        {/* Execute Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex w-full items-center justify-center gap-3 border py-4 transition-all ${
            isPlaying
              ? "border-primary bg-primary text-background"
              : "border-primary/40 hover:border-primary hover:bg-primary/10"
          }`}
        >
          {isPlaying ? (
            <Pause size={20} weight="fill" />
          ) : (
            <Play size={20} weight="fill" />
          )}
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
            {isPlaying ? "HALT_PROCESS" : "EXECUTE_STREAM"}
          </span>
        </button>

        {/* Volume Slider */}
        <div className="mt-6 flex items-center gap-4 border-t border-primary/10 pt-6">
          <SpeakerHigh size={16} className="opacity-40" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer appearance-none bg-primary/10 accent-primary"
          />
          <span className="min-w-[3ch] text-[10px] opacity-40">{volume}%</span>
        </div>
      </div>
    </motion.aside>
  )
}

// --- MAIN PAGE ---
export const Route = createFileRoute("/oldmusic")({
  component: MusicPage,
})

function MusicPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTrack, setActiveTrack] = useState(TRACKS[0])
  const [volume, setVolume] = useState(80)
  const [view, setView] = useState<"list" | "details">("list")

  useMusicTab({
    isPlaying,
    songTitle: activeTrack.title,
    appSuffix: "x_x",
    visualizerInterval: 200,
  })

  const handleTrackSelect = (track: (typeof TRACKS)[0]) => {
    setActiveTrack(track)
    if (window.innerWidth < 1024) setView("details")
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <MusicLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-4 text-primary md:p-8">
        <BackgroundDecoration />

        <AnimatePresence>
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 flex h-full w-full max-w-6xl flex-col items-center justify-center pt-20 pb-10 md:pt-24 lg:pt-0"
            >
              <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-center">
                <TrackList
                  activeId={activeTrack.id}
                  onSelect={handleTrackSelect}
                  currentView={view}
                />
                <AudioDecoder
                  track={activeTrack}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  volume={volume}
                  setVolume={setVolume}
                  setView={setView}
                  currentView={view}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}

export default MusicPage
