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
  Globe
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
          <Database size={16} className="group-hover:animate-bounce text-primary/60" />
          <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">System_Specs</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-background border border-border p-0 gap-0 shadow-2xl rounded-none font-mono overflow-hidden">
        {/* --- 1. SLIM HEADER --- */}
        <div className="h-7 border-b border-border bg-muted/30 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="size-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]" />
              <span className="text-[8px] font-black text-foreground uppercase tracking-widest">Sys_Inspect_Active</span>
            </div>
            <span className="text-[8px] text-muted-foreground/40 uppercase tracking-[0.2em] hidden md:block">Node: KERNEL_X64</span>
          </div>
          <div className="flex items-center gap-4 text-[8px] text-muted-foreground font-bold">
            <span className="flex items-center gap-1 tracking-widest uppercase"><Clock size={10}/> {time}</span>
          </div>
        </div>

        {/* --- 2. MAIN CONTENT AREA --- */}
        <div className="p-8 space-y-8">

          {/* TOP SECTION: TITLE & CORE STATS */}
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TerminalWindow size={20} className="text-primary/60" />
                <h2 className="text-2xl font-black tracking-tighter uppercase text-foreground leading-none">Environment_Specs</h2>
              </div>
              <p className="text-[8px] text-primary/60 font-bold uppercase tracking-[0.4em] italic leading-none">Kernel_Sync_Verified</p>
            </div>

            {/* LIVE METRICS (Like your ProfileDialog side metrics) */}
            <div className="flex gap-6 shrink-0">
               <div className="space-y-1 w-24">
                  <span className="text-[7px] text-primary/60 font-black uppercase">CPU_Thread</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-1 bg-muted overflow-hidden">
                      <motion.div animate={{ width: ["10%", "90%", "30%"] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-primary/40" />
                    </div>
                    <span className="text-[8px] font-bold italic">0.4%</span>
                  </div>
               </div>
               <div className="space-y-1 w-24">
                  <span className="text-[7px] text-primary/60 font-black uppercase">Sys_Uptime</span>
                  <div className="flex items-center gap-2">
                    <GraphIcon size={10} className="text-primary/40" />
                    <span className="text-[8px] font-bold">99.9%</span>
                  </div>
               </div>
            </div>
          </div>

          {/* MIDDLE SECTION: DATA LOGS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Sector: Core Infrastructure */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 opacity-40">
                <Cpu size={14} />
                <span className="text-[9px] font-bold uppercase tracking-widest">Base_Infrastructure</span>
              </div>

              <div className="space-y-3">
                {[
                  { label: "OS_Distribution", value: "Arch Linux // Rolling" },
                  { label: "Window_Manager", value: "Niri // Wayland" },
                  { label: "Runtime_Engine", value: "Bun + ElysiaJS" },
                ].map((item) => (
                  <div key={item.label} className="border-l border-primary/40 pl-3">
                    <p className="text-[10px] font-black text-foreground uppercase leading-none">{item.value}</p>
                    <p className="text-[7px] text-muted-foreground uppercase italic mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector: Development Tools */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 opacity-40">
                <CodeBlock size={14} />
                <span className="text-[9px] font-bold uppercase tracking-widest">Dev_Environment</span>
              </div>

              <div className="space-y-3">
                {[
                  { label: "IDE_Integrated", value: "Neovim // LazyVim" },
                  { label: "Terminal_Shell", value: "Zsh // Starship" },
                  { label: "Framework_Lib", value: "React + Framer Motion" },
                ].map((item) => (
                  <div key={item.label} className="border-l border-border pl-3">
                    <p className="text-[10px] font-black text-foreground uppercase leading-none">{item.value}</p>
                    <p className="text-[7px] text-muted-foreground uppercase italic mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: SYSTEM LOG ENTRY */}
          <div className="relative group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
               <ShieldCheck size={24} className="text-primary" />
            </div>
            <div className="bg-muted/10 border border-border/50 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-primary/40" />
                <span className="text-[8px] font-black uppercase text-muted-foreground">Internal_Manifest_Summary</span>
              </div>
              <p className="text-[10px] leading-relaxed text-muted-foreground uppercase font-medium">
                <span className="text-primary mr-2 font-black">{">"}</span>
                System architected for low-latency terminal interaction. Nodes optimized for Arch/Wayland compositor pipelines. Deployment synchronized via Cloudflare edge network.
              </p>
            </div>
          </div>
        </div>

        {/* --- 3. FOOTER --- */}
        <div className="h-7 border-t border-border bg-background px-4 flex items-center justify-between shrink-0">
          <div className="flex gap-10 text-[7px] tracking-[0.2em] text-muted-foreground uppercase font-black">
            <span className="flex items-center gap-2"><HardDrive size={12} className="opacity-30"/> KERNEL: {kernelVersion}</span>
            <span className="hidden sm:flex items-center gap-2 opacity-30 italic font-medium">#LOG_STABLE_001</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[7px] text-muted-foreground/30 uppercase font-black tracking-widest">Process_Rate</span>
             <div className="h-0.5 w-24 bg-border overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="h-full bg-primary/40"
                />
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default MusicDialog;
