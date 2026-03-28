"use client"

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  FileArrowDown,
  ArrowRight,
  ShieldCheck,
  GraphIcon,
  Cpu,
  Globe,
  Code,
  Lightning,
  Database,
  TerminalWindow
} from "@phosphor-icons/react";

// --- TYPES ---

interface ToolNode {
  name: string;
  icon: React.ElementType;
  version: string;
}

export const CVDownloadAction: React.FC = () => {
  return (
    <motion.a
      href="/cv.pdf"
      download
      whileHover="hover"
      initial="initial"
      className="group/cv relative flex h-24 items-center justify-between border-t border-primary/10 bg-primary/[0.02] px-10 transition-all hover:bg-primary/[0.05]"
    >
      <div className="flex items-center gap-8 relative z-10">

        {/* --- DECORATED ICON PORT --- */}
        <div className="relative flex size-14 items-center justify-center">
          {/* Rotating Outer HUD Brackets */}
          <motion.div
            variants={{ hover: { rotate: 90, scale: 1.1 } }}
            className="absolute inset-0 border border-primary/10 opacity-40 transition-colors group-hover/cv:border-primary/40"
          />
          <div className="absolute -top-1 -left-1 size-2 border-t border-l border-primary/60" />
          <div className="absolute -bottom-1 -right-1 size-2 border-b border-r border-primary/60" />

          {/* Icon with Signal Glow */}
          <div className="relative">
            <FileArrowDown
              size={32}
              weight="thin"
              className="text-primary/20 transition-all duration-500 group-hover/cv:text-primary group-hover/cv:scale-110"
            />
            <div className="absolute inset-0 bg-primary/30 blur-xl opacity-0 transition-opacity group-hover/cv:opacity-40" />
          </div>

          {/* Animated "Data Flow" Bits */}
          <div className="absolute -right-2 top-0 flex flex-col gap-1 opacity-0 group-hover/cv:opacity-100 transition-opacity">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 4, 0], opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                className="h-[1px] w-1 bg-primary"
              />
            ))}
          </div>
        </div>

        {/* --- TEXT CONTENT --- */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black uppercase tracking-[0.4em] text-foreground/80 group-hover/cv:text-foreground">
              Dossier_Archive
            </span>
            <div className="flex items-center gap-1 bg-primary/10 px-1.5 py-0.5 border border-primary/20">
               <div className="size-1 rounded-full bg-primary animate-pulse" />
               <span className="text-[6px] text-primary font-bold uppercase tracking-widest">Ready</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-4">
            <span className="text-[7px] uppercase tracking-widest text-primary/30 font-mono">PDF_EXT_V.03</span>
            <div className="h-[1px] w-4 bg-primary/10" />
            <span className="text-[7px] uppercase tracking-widest text-primary/30 font-mono">1.2MB_LOADED</span>
          </div>
        </div>
      </div>

      {/* --- END ACTION CARETS --- */}
      <div className="flex items-center gap-4">
        <div className="hidden flex-col items-end opacity-20 group-hover/cv:opacity-60 transition-opacity sm:flex">
          <span className="text-[5px] font-mono text-primary uppercase">Request_Download</span>
          <div className="h-[1px] w-8 bg-primary/40" />
        </div>

        <motion.div
          variants={{ initial: { x: 0 }, hover: { x: 5 } }}
          className="text-primary/40 group-hover/cv:text-primary"
        >
          <ArrowRight size={22} weight="bold" />
        </motion.div>
      </div>

      {/* --- PROGRESS BAR UNDERLAY --- */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-primary/60 shadow-[0_0_10px_rgba(var(--primary),0.5)]"
        variants={{ initial: { width: "0%" }, hover: { width: "100%" } }}
        transition={{ duration: 0.6, ease: "circOut" }}
      />
    </motion.a>
  );
};
// --- SUB-COMPONENTS ---

const TacticalCorners: React.FC = () => (
  <>
    <div className="absolute top-0 left-0 size-3 border-t-[1px] border-l-[1px] border-primary/40" />
    <div className="absolute top-0 right-0 size-3 border-t-[1px] border-r-[1px] border-primary/40" />
    <div className="absolute bottom-0 left-0 size-3 border-b-[1px] border-l-[1px] border-primary/40" />
    <div className="absolute bottom-0 right-0 size-3 border-b-[1px] border-r-[1px] border-primary/40" />
  </>
);

const ToolIcon: React.FC<ToolNode> = ({ name, icon: Icon, version }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="group/tool relative flex flex-col items-center justify-center border border-primary/10 bg-primary/[0.01] p-3 transition-all hover:border-primary/50 hover:bg-primary/[0.05]"
  >
    <Icon size={20} weight="thin" className="text-primary/30 transition-colors group-hover/tool:text-primary" />
    <span className="mt-2 text-[6px] font-bold tracking-[0.2em] text-primary/20 uppercase group-hover/tool:text-primary/60">
      {name}
    </span>
    <div className="absolute top-0 left-0 h-full w-[1px] bg-primary/0 group-hover/tool:bg-primary/40" />
  </motion.div>
);

// --- DATA ---

const TECH_STACK: ToolNode[] = [
  { name: "React", icon: Globe, version: "V19" },
  { name: "TypeScript", icon: Code, version: "V5.4" },
  { name: "Go", icon: Cpu, version: "V1.22" },
  { name: "Node", icon: Lightning, version: "LTS" },
  { name: "Postgres", icon: Database, version: "SQL" },
  { name: "Arch", icon: TerminalWindow, version: "WLD" },
];

export default function ProfileBento() {
  const [time, setTime] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
      className="group relative col-span-12 flex min-h-[550px] flex-col overflow-hidden border border-primary/20 bg-background font-mono transition-all hover:border-primary/40"
    >
      {/* --- FAR LEFT STATUS STRIP (New Decor) --- */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/5 group-hover:bg-primary/10 transition-colors hidden md:block" />

      {/* --- HUD HEADER: SLIM --- */}
      <div className="flex h-6 items-center justify-between border-b border-primary/10 bg-primary/[0.02] px-4">
        <div className="flex items-center gap-3">
          <div className="size-1 bg-primary animate-pulse" />
          <span className="text-[7px] font-bold uppercase tracking-[0.5em] text-primary/40">Dossier_Index // 0xAF4</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[7px] text-primary/20 tracking-widest hidden sm:inline">CHANNEL_STABLE_882</span>
          <span className="text-[8px] text-primary/40 font-bold tracking-widest">[{time}]</span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-12">

        {/* --- LEFT: IDENTITY & ARSENAL --- */}
        <div className="md:col-span-7 flex flex-col gap-8 p-8 md:pl-10">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* IMAGE: CLEAN & INTEGRATED */}
            <div className="relative aspect-square size-32 flex-none overflow-hidden border border-primary/30 group-hover:border-primary transition-all duration-500">
              <img
                src="https://avatars.githubusercontent.com/u/72890769?v=4"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Identity_AP"
              />
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-primary/[0.1] backdrop-blur-[2px]"
                  >
                    <ShieldCheck size={24} weight="thin" className="text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute top-1 right-1 text-[5px] text-primary/50">SEC_IMG_882</div>
            </div>

            <div className="flex flex-col">
              <div className="text-[6px] tracking-[0.6em] text-primary/30 uppercase mb-1">Authenticated_Subject</div>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.8] md:text-5xl">Alexandru P.</h2>
              <div className="mt-2 h-[1px] w-12 bg-primary/40 group-hover:w-24 transition-all duration-700" />
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.4em] text-primary/50">Full-Stack Architect</p>
            </div>
          </div>

          {/* TECH GRID: COMPACT TILE SYSTEM */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-primary/20">System_Specs</span>
              <div className="h-[1px] flex-1 bg-primary/5" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
              {TECH_STACK.map((tool) => (
                <ToolIcon key={tool.name} {...tool} />
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT: MICRO QR & DATA LINK --- */}
        <div className="md:col-span-5 flex flex-col border-l border-primary/5 bg-primary/[0.01]">

          <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
            {/* COMPACT QR DASHBOARD */}
            <div className="relative group/qr p-6 border border-primary/10 bg-background transition-colors hover:border-primary/30">
              <QrCode
                size={140}
                weight="thin"
                className="text-primary/[0.1] transition-all duration-1000 group-hover/qr:text-primary/30 group-hover/qr:scale-[1.05]"
              />
              {/* Corner Pips */}
              <div className="absolute -top-1 -left-1 size-2 border-t border-l border-primary/40" />
              <div className="absolute -bottom-1 -right-1 size-2 border-b border-r border-primary/40" />
            </div>

            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="text-[7px] font-mono uppercase tracking-[1.5em] text-primary/20">Access_Key</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="size-0.5 bg-primary/20" />
                ))}
              </div>
            </div>
          </div>

          {/* CV ACTION: SLIM STRIP */}
<CVDownloadAction />
        </div>
      </div>

      {/* --- FOOTER: MINIMALIST MICRO-STRIP --- */}
      <div className="flex h-4 items-center justify-between bg-primary/[0.03] px-4 text-[5px] uppercase tracking-[0.4em] text-primary/20 font-mono">
        <div className="flex gap-8">
          <span>AP_882_A</span>
          <span>KUO_FI_NODE</span>
          <span className="hidden sm:inline">LAT: 62.89 // LNG: 27.67</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-6 bg-primary/10 relative overflow-hidden">
             <motion.div
               animate={{ x: ["-100%", "100%"] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-primary/40"
             />
          </div>
          <span>Sync_Active</span>
        </div>
      </div>

      <TacticalCorners />
    </motion.div>
  );
}
