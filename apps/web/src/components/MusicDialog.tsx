"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Cpu,
  Database,
  Fingerprint,
  Clock,
  TerminalWindow,
  ArrowRight,
  HardDrive,
  GraphIcon,
  ShieldCheck,
  CodeBlock,
  Globe,
  MusicNotes
} from "@phosphor-icons/react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@portfolio/ui/components/ui/dialog"

/**
 * System Information Manifest
 * Styled to match the ProfileDialog "Dossier" aesthetic
 */
export function MusicDialog() {
  const [time, setTime] = useState("");
  const kernelVersion = "6.12.arch1-1";

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 group hover:text-primary transition-colors outline-none font-mono">
          <Database size={22} className="group-hover:animate-bounce text-primary/60" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl border border-primary/10 p-0 gap-0 shadow-2xl rounded-none font-mono overflow-hidden">
        {/* --- 1. SLIM HEADER --- */}
        <div className="h-7 border-b border-primary/10 bg-primary/5 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="size-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]" />
              <span className="text-[8px] text-primary/80 uppercase tracking-[0.4em]">Sys_Inspect_Active</span>
            </div>
            <span className="text-[8px] text-primary/20 uppercase tracking-[0.2em] hidden md:block">Node: KERNEL_X64</span>
          </div>
          <div className="flex items-center gap-4 text-[8px] text-primary/40">
            <span className="flex items-center gap-1.5 tracking-widest uppercase">
              <Clock size={10} /> {time}
            </span>
          </div>
        </div>

        {/* --- 2. MAIN CONTENT AREA --- */}
        <div className="p-8 space-y-10">
          {/* TOP SECTION: TITLE & CORE STATS */}
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TerminalWindow size={20} className="text-primary/40" />
                <h2 className="text-2xl uppercase tracking-tighter text-foreground/90 leading-none">Environment_Specs</h2>
              </div>
              <p className="text-[8px] text-primary/30 uppercase tracking-[0.5em] italic leading-none">Kernel_Sync_Verified</p>
            </div>

            {/* LIVE METRICS */}
            <div className="flex gap-6 shrink-0">
              <div className="space-y-1 w-24">
                <span className="text-[7px] text-primary/30 uppercase tracking-widest">CPU_Thread</span>
                <div className="flex items-center gap-2">
                  <div className="h-[1px] flex-1 bg-primary/5 overflow-hidden">
                    <motion.div
                      animate={{ width: ["10%", "90%", "30%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-full bg-primary/40"
                    />
                  </div>
                  <span className="text-[8px] text-primary/60 italic tabular-nums">0.4%</span>
                </div>
              </div>
              <div className="space-y-1 w-24">
                <span className="text-[7px] text-primary/30 uppercase tracking-widest">Sys_Uptime</span>
                <div className="flex items-center gap-2">
                  <GraphIcon size={10} className="text-primary/20" />
                  <span className="text-[8px] text-primary/60 tabular-nums">99.9%</span>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION: DATA SECTORS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
            {/* Sector: Audio Workstation (Music Tools) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary/40">
                <MusicNotes size={14} />
                <span className="text-[9px] uppercase tracking-widest">Audio_Workstation</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Primary_DAW", value: "Ableton Live 12 // Suite" },
                  { label: "Synthesis_Engine", value: "Serum + Vital + PhasePlant" },
                  { label: "Signal_Processing", value: "FabFilter + Soundtoys" },
                ].map((item) => (
                  <div key={item.label} className="border-l border-primary/20 pl-4">
                    <p className="text-[10px] text-foreground/80 uppercase tracking-tight">{item.value}</p>
                    <p className="text-[7px] text-primary/30 uppercase italic mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector: Core Infrastructure */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary/40">
                <Cpu size={14} />
                <span className="text-[9px] uppercase tracking-widest">Base_System</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "OS_Distribution", value: "Arch Linux // Rolling" },
                  { label: "Window_Manager", value: "Niri // Wayland" },
                  { label: "Shell_Environment", value: "Zsh // Starship" },
                ].map((item) => (
                  <div key={item.label} className="border-l border-primary/10 pl-4">
                    <p className="text-[10px] text-foreground/80 uppercase tracking-tight">{item.value}</p>
                    <p className="text-[7px] text-primary/30 uppercase italic mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: SYSTEM LOG ENTRY */}
          <div className="relative bg-primary/[0.02] border border-primary/5 p-4 group">
            <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={20} className="text-primary" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={12} className="text-primary/20" />
              <span className="text-[8px] uppercase tracking-[0.2em] text-primary/40">Internal_Manifest_Summary</span>
            </div>
            <p className="text-[10px] leading-relaxed text-primary/60 uppercase tracking-tight">
              <span className="text-primary mr-2">/&gt;</span>
              System architected for low-latency terminal interaction. Nodes optimized for Arch/Wayland compositor pipelines. Audio buffers synchronized via high-priority kernel threads.
            </p>
          </div>
        </div>

        {/* --- 3. FOOTER --- */}
        <div className="h-7 border-t border-primary/10 bg-background px-4 flex items-center justify-between shrink-0">
          <div className="flex gap-8 text-[7px] tracking-[0.3em] text-primary/20 uppercase">
            <span className="flex items-center gap-2">
              <HardDrive size={12} className="opacity-40" /> KERNEL: {kernelVersion}
            </span>
            <span className="hidden sm:inline italic">#LOG_STABLE_099</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[7px] text-primary/10 uppercase tracking-widest">Process_Rate</span>
            <div className="h-[1px] w-20 bg-primary/5 overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="h-full bg-primary/30"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default MusicDialog;
