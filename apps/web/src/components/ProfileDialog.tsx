"use client"

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Clock,
  GraduationCap,
  FileArrowDown,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  GraphIcon
} from "@phosphor-icons/react";

/* --- SUBTLE TACTICAL CORNERS --- */
const TacticalCorners = () => (
  <>
    <div className="absolute top-0 left-0 size-5 border-t-[2px] border-l-[2px] border-primary/30" />
    <div className="absolute top-0 right-0 size-5 border-t-[2px] border-r-[2px] border-primary/30" />
    <div className="absolute bottom-0 left-0 size-5 border-b-[2px] border-l-[2px] border-primary/30" />
    <div className="absolute bottom-0 right-0 size-5 border-b-[2px] border-r-[2px] border-primary/30" />
  </>
);

export default function ProfileBento() {
  const [time, setTime] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 0.999 }}
      className="group relative col-span-12 flex min-h-[700px] flex-col overflow-hidden border border-primary/10 bg-background font-mono transition-all hover:border-primary/30 lg:col-span-12"
    >
      {/* --- CLEAN BACKGROUND (No Grid) --- */}
      <div className="absolute inset-0 -z-20 bg-background" />

      {/* Very faint scanline grain instead of grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />

      {/* --- TOP HEADER --- */}
      <div className="flex h-7 items-center justify-between border-b border-primary/5 bg-primary/[0.02] px-4">
        <div className="flex items-center gap-3">
          <GraphIcon size={12} className="text-primary/40 animate-pulse" />
          <span className="text-[8px] uppercase tracking-[0.5em] text-primary/40">Core_Link: Secured</span>
        </div>
        <div className="text-[8px] text-primary/30 tracking-widest">
          [{time}]
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-12">

        {/* LEFT COLUMN: IDENTITY & RECORDS */}
        <div className="md:col-span-5 border-r border-primary/5 p-10 flex flex-col gap-12 bg-primary/[0.01]">

          {/* IMAGE BLOCK */}
          <div className="relative w-full aspect-square max-w-[300px] border border-primary/10 bg-background overflow-hidden group-hover:border-primary/20 transition-colors">
            <img
              src="https://avatars.githubusercontent.com/u/72890769?v=4"
              className="size-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700"
              alt="Subject"
            />

            {/* HUD Overlay on Image */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-primary/[0.03] backdrop-blur-[1px]"
                >
                  <ShieldCheck size={32} className="text-primary/60 mb-2" />
                  <span className="text-[8px] text-primary/80 uppercase tracking-[0.4em]">
                    Identity_Confirmed
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle Scan Pulse */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-20 w-full"
              animate={{ top: ["-20%", "120%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* NAME & BIO */}
          <div className="space-y-2">
            <h2 className="text-4xl uppercase tracking-tighter text-foreground/80 leading-none">Alexandru P.</h2>
            <p className="text-[9px] uppercase tracking-[0.6em] text-primary/30 italic">Terminal_Architect</p>
          </div>

          {/* RECORDS */}
          <div className="space-y-10 border-t border-primary/5 pt-10">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-primary/20">
                <Briefcase size={12} />
                <span className="text-[8px] uppercase tracking-[0.3em]">Work_History</span>
              </div>
              <div className="space-y-5 text-[10px] uppercase tracking-tight">
                <div className="border-l border-primary/20 pl-5">
                  <p className="text-foreground/60">Staff SWE // Phonia</p>
                  <p className="text-[7px] text-primary/20 mt-1.5">2024 — 2025</p>
                </div>
                <div className="border-l border-primary/10 pl-5">
                  <p className="text-foreground/60">Freelance Engineer</p>
                  <p className="text-[7px] text-primary/20 mt-1.5">2025 — Present</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-2 text-primary/20">
                <GraduationCap size={12} />
                <span className="text-[8px] uppercase tracking-[0.3em]">Education_Nodes</span>
              </div>
              <div className="border-l border-primary/10 pl-5 text-[10px] uppercase tracking-tight">
                <p className="text-foreground/60">B.Sc Computer Science</p>
                <p className="text-[7px] text-primary/20 mt-1.5">UEF - Finland</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LARGE QR & ACTION */}
        <div className="md:col-span-7 flex flex-col">

          {/* QR SECTION */}
          <div className="flex-1 flex flex-col items-center justify-center p-16 bg-primary/[0.01] relative">
            <div className="relative p-10 border border-primary/5 bg-background transition-colors group-hover:border-primary/10">
              <QrCode size={280} weight="thin" className="text-primary/20 group-hover:text-primary/40 transition-colors duration-1000" />
              <div className="absolute top-0 left-0 size-6 border-t border-l border-primary/10" />
              <div className="absolute bottom-0 right-0 size-6 border-b border-r border-primary/10" />

              {/* Ultra-faint noise pattern inside QR box */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
            </div>
            <span className="mt-10 text-[8px] uppercase tracking-[2em] text-primary/10">Encrypted_Datalink</span>
          </div>

          {/* CV ACTION */}
          <motion.a
                href="/cv.pdf"
                download
                initial="initial"
                whileHover="hover"
                // Smooth background transition without scanlines
                transition={{ duration: 0.4, ease: "circOut" }}
                className="group/cv relative flex h-24 items-center justify-between border-t border-primary/5 bg-background/40 px-12 font-mono transition-colors hover:bg-primary/[0.03]"
              >
                {/* --- 1. STATIC DECORATION (Not Animated) --- */}
                {/* Faint bit-pattern in the background that only shows on hover */}
                <div className="absolute inset-0 -z-10 opacity-[0.02] transition-opacity group-hover/cv:opacity-[0.05] pointer-events-none"
                     style={{ backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`, backgroundSize: '16px 16px' }}
                />

                <div className="flex items-center gap-8 relative z-10">

                  {/* --- 2. ICON SECTION --- */}
                  <div className="relative">
                    <FileArrowDown
                      size={32}
                      className="text-primary/20 transition-all duration-500 group-hover/cv:text-primary group-hover/cv:scale-110"
                    />
                    {/* Static "Lens" effect behind icon on hover */}
                    <div className="absolute inset-0 -z-10 bg-primary/20 blur-xl opacity-0 group-hover/cv:opacity-40 transition-opacity" />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="text-base uppercase tracking-[0.4em] text-foreground/90 transition-colors group-hover/cv:text-foreground">
                        Curriculum_Vitae_v1
                      </span>
                      {/* Small static status tag */}
                      <span className="border border-primary/40 px-1.5 py-0.5 text-[7px] text-primary/80 uppercase tracking-widest">
                        Available
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-4 text-xs uppercase tracking-widest text-primary/60 transition-colors group-hover/cv:text-primary/80">
                       <span>Format: PDF</span>
                       <span className="h-1 w-1 rounded-full bg-primary/20" />
                       <span>Size: 1.2MB</span>
                       <span className="h-1 w-1 rounded-full bg-primary/20" />
                       <span>Uplink: Stable</span>
                    </div>
                  </div>
                </div>

                {/* --- 3. THE CARET --- */}
                <div className="flex items-center gap-4">

                  <motion.div
                    variants={{
                      initial: { x: 0, opacity: 0.2 },
                      hover: { x: 5, opacity: 1 }
                    }}
                    className="text-primary"
                  >
                    <ArrowRight size={20} weight="bold" />
                  </motion.div>
                </div>

                {/* Ultra-thin bottom accent line that grows on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-primary/30"
                  variants={{
                    initial: { width: "0%" },
                    hover: { width: "100%" }
                  }}
                  transition={{ duration: 0.6, ease: "expOut" }}
                />
              </motion.a>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="flex h-5 items-center justify-between border-t border-primary/5 bg-background px-4 text-[6px] uppercase tracking-[0.3em] text-primary/20">
        <div className="flex gap-10">
          <span>Subject_Verified: 88041_A</span>
          <span className="hidden sm:inline">Status: Static_Link</span>
        </div>
        <span>2026.03.27 // Kuopio_Node</span>
      </div>

      <TacticalCorners />
    </motion.div>
  );
}
