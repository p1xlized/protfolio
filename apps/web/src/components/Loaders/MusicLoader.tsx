"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MusicNotes,
  Record,
  Waveform,
  SpeakerHigh,
  VinylRecord
} from "@phosphor-icons/react"

interface MusicLoaderProps {
  onComplete?: () => void
  duration?: number
  audioStream?: MediaStream // Optional: pass a live stream to react to real mic/audio
}

export default function MusicLoader({ onComplete, duration = 2.0, audioStream }: MusicLoaderProps) {
  const [percent, setPercent] = useState(0)
  const [frequencies, setFrequencies] = useState<number[]>(new Array(8).fill(0))
  const animationRef = useRef<number>()

  // 1. Audio Analysis Logic
  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;

    if (audioStream) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(audioStream)
      source.connect(analyser)
      analyser.fftSize = 32
      dataArray = new Uint8Array(analyser.frequencyBinCount)
    }

    const animate = () => {
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray)
        // Map raw data to a normalized 0-1 range for 8 pips
        const normalized = Array.from(dataArray.slice(0, 8)).map(v => v / 255)
        setFrequencies(normalized)
      } else {
        // Fallback: Synthetic frequency jitter if no live audio
        setFrequencies(prev => prev.map(() => Math.random() * Math.sin(Date.now() / 200) * 0.5 + 0.5))
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (audioContext) audioContext.close()
    }
  }, [audioStream])

  // 2. Progress Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100))
    }, (duration * 1000) / 100)
    return () => clearInterval(interval)
  }, [duration])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background font-mono selection:bg-primary selection:text-primary-foreground"
    >
      {/* BACKGROUND: LOWER OPACITY GRID */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(theme(colors.primary.DEFAULT/0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

      {/* --- DECORATED WIREFRAME MODULE --- */}
      <div className="relative mb-12 flex size-44 sm:size-64 items-center justify-center">
        {/* EXTERNAL CORNER BRACKETS */}
        <div className="absolute inset-0 scale-110 opacity-30">
          <div className="absolute top-0 left-0 size-4 border-t border-l border-primary" />
          <div className="absolute top-0 right-0 size-4 border-t border-r border-primary" />
          <div className="absolute bottom-0 left-0 size-4 border-b border-l border-primary" />
          <div className="absolute right-0 bottom-0 size-4 border-r border-b border-primary" />
        </div>

        {/* ROTATING AUDIO CORE (LINEAR TRANSITION) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative size-32 sm:size-48 rounded-full border border-primary/5 flex items-center justify-center"
        >
          {/* Latitude/Longitude Lines with Lower Opacity */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`lat-${i}`}
              className="absolute inset-0 rounded-full border border-primary/10"
              style={{ transform: `rotateX(${30 + i * 30}deg)` }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <div
              key={`lng-${i}`}
              className="absolute inset-0 rounded-full border border-primary/10"
              style={{ transform: `rotateY(${30 + i * 30}deg)` }}
            />
          ))}

          {/* Internal Vinyl (Reactive rotation speed based on frequency) */}
          <motion.div
             animate={{ rotate: -720 }}
             transition={{ duration: 10 / (frequencies[0] + 0.5), repeat: Infinity, ease: "linear" }}
             className="relative size-20 sm:size-28 rounded-full border border-primary/20 flex items-center justify-center"
          >
             <VinylRecord size={32} weight="thin" className="text-primary/40" />
             <div className="absolute inset-0 rounded-full border-t border-primary/40" />
          </motion.div>
        </motion.div>

        {/* REACTIVE HUD FREQUENCY PIPS */}
        <div className="absolute -left-8 sm:-left-12 flex items-end gap-1 h-20">
          {frequencies.map((freq, i) => (
            <motion.div
              key={i}
              animate={{
                height: `${10 + freq * 40}%`,
                opacity: 0.2 + freq * 0.8
              }}
              transition={{ type: "tween", ease: "linear", duration: 0.1 }}
              className="w-1 bg-primary/60"
            />
          ))}
        </div>

        <div className="absolute -right-16 rotate-90 text-[7px] tracking-[0.6em] text-primary/20 uppercase font-black">
          Freq_Spectrum // Analyser_Active
        </div>

        {/* Core Focal Point */}
        <div className="absolute size-1.5 rounded-full bg-primary shadow-[0_0_15px_var(--primary)] opacity-80" />
      </div>

      {/* --- PROGRESS HUD --- */}
      <div className="relative w-full max-w-[300px] sm:max-w-md space-y-4 px-6">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="size-1 bg-primary animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.4em] text-primary uppercase">
                Parsing_Audio_Nodes
              </span>
            </div>
            <span className="text-[7px] font-bold text-primary/30 pl-3 uppercase tracking-widest">
              Sub_Sector::Decipher_Bitrate
            </span>
          </div>
          <span className="text-[14px] font-black text-primary tabular-nums opacity-80">
            {percent}%
          </span>
        </div>

        {/* Progress Bar (Linear Ease) */}
        <div className="relative h-1 w-full bg-primary/5 border border-primary/10 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration, ease: "linear" }}
            onAnimationComplete={onComplete}
            className="h-full w-full origin-left bg-primary"
          />
          {/* Scanning light glitch */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          />
        </div>

        {/* Telemetry Footer */}
        <div className="flex justify-between text-[7px] font-black tracking-[0.2em] text-primary/20 uppercase">
          <span className="flex items-center gap-1"><Waveform size={10}/> Spectrum: OK</span>
          <span className="flex items-center gap-1"><Record size={10}/> Hash: {Math.random().toString(16).slice(2, 8)}</span>
          <span className="flex items-center gap-1 opacity-40">Stream: Encrypted</span>
        </div>
      </div>
    </motion.div>
  )
}
