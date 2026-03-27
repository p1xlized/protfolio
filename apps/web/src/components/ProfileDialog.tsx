"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  Fingerprint,
  Scan,
  Calendar,
  Clock,
  GraduationCap,
  FileArrowDown,
  Briefcase,
  ArrowRight,
  Cpu,
  Database,
  ChartBar,
  HardDrive,
  Target
} from "@phosphor-icons/react";

export default function ProfileDialog() {
  const [time, setTime] = useState("");
  const issueDate = "2024.03.15";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", {
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
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative w-full max-w-6xl flex flex-col overflow-hidden border border-border bg-background font-mono selection:bg-primary selection:text-primary-foreground shadow-2xl"
    >
      {/* --- 1. SLIM HEADER --- */}
      <div className="h-7 border-b border-border bg-muted/30 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="size-1 rounded-full bg-primary animate-pulse" />
            <span className="text-[8px] font-black text-foreground uppercase tracking-widest">Auth_Active</span>
          </div>
          <span className="text-[8px] text-muted-foreground/40 uppercase tracking-[0.2em] hidden md:block">Session: 0x88A4F</span>
        </div>
        <div className="flex items-center gap-4 text-[8px] text-muted-foreground font-bold">
          <span className="flex items-center gap-1 tracking-widest uppercase"><Clock size={10}/> {time}</span>
        </div>
      </div>

      {/* --- 2. MAIN BENTO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[110px]">

        {/* IDENTITY BLOCK (IMAGE + SIDE METRICS + BOTTOM DATA) */}
        <div className="md:col-span-5 md:row-span-4 border-r border-border bg-muted/5 p-6 flex flex-col relative group overflow-hidden">
          <div className="flex gap-6 flex-1 min-h-0">
            {/* BIGGER IMAGE */}
            <div className="relative w-52 h-64 shrink-0">
              <img
                src="https://avatars.githubusercontent.com/u/72890769?v=4"
                className="size-full border border-border grayscale transition-all group-hover:grayscale-0 object-cover"
                alt="Subject"
              />
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                <Scan size={32} className="text-primary animate-pulse" />
              </div>
              <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-primary/50" />
            </div>

            {/* SIDE METRICS */}
            <div className="flex-1 flex flex-col justify-between py-2 overflow-hidden">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[7px] text-primary/60 font-black uppercase">Core_Temp</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-1 bg-border overflow-hidden">
                      <motion.div animate={{ width: ["20%", "80%", "45%"] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-primary/40" />
                    </div>
                    <span className="text-[8px] text-foreground font-bold italic">32°C</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[7px] text-primary/60 font-black uppercase">Neural_Load</span>
                  <div className="flex items-center gap-2">
                    <Cpu size={10} className="text-muted-foreground/40" />
                    <span className="text-[8px] text-foreground font-bold">12.4%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[7px] text-primary/60 font-black uppercase">Buffer_Mem</span>
                  <div className="flex items-center gap-2 text-foreground font-bold text-[8px]">
                    <Database size={10} className="text-muted-foreground/40" />
                    <span>4096.0 MB</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/30">
                <ChartBar size={14} className="text-primary/40 mb-2" />
                <div className="flex gap-1 h-8 items-end">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 12, 8, 20, 6] }}
                      transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
                      className="w-1 bg-primary/20"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* NEW DATA DIV UNDER IMAGE */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
            <div className="flex items-center gap-3 bg-muted/20 p-2 border border-border/50">
                <HardDrive size={14} className="text-primary/40" />
                <div className="flex flex-col">
                    <span className="text-[7px] text-muted-foreground uppercase font-black">Storage_Pool</span>
                    <span className="text-[9px] text-foreground font-bold tabular-nums">1.2TB / 2.0TB</span>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-muted/20 p-2 border border-border/50">
                <Target size={14} className="text-primary/40" />
                <div className="flex flex-col">
                    <span className="text-[7px] text-muted-foreground uppercase font-black">Accuracy_Idx</span>
                    <span className="text-[9px] text-foreground font-bold uppercase tracking-tighter">99.98% OK</span>
                </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-black tracking-tighter uppercase text-foreground leading-none">Alexandru P.</h2>
            <p className="text-[8px] text-primary/60 font-bold uppercase tracking-[0.4em] mt-1 italic leading-none">Subject_Verified</p>
          </div>
        </div>

        {/* QR BLOCK */}
        <div className="md:col-span-7 md:row-span-3 border-b border-border bg-muted/5 flex items-center justify-center p-6 relative overflow-hidden">
          <div className="flex flex-col items-center gap-4 z-10">
            <div className="bg-background p-4 border border-border shadow-xl relative group/qr transition-transform hover:scale-105">
              <QrCode size={180} weight="thin" className="text-foreground transition-colors group-hover/qr:text-primary" />
              <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-primary/40" />
              <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-primary/40" />
            </div>
            <span className="text-[8px] tracking-[1.2em] text-muted-foreground uppercase font-black opacity-60">Sync_Protocol_V4</span>
          </div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(theme(colors.foreground)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* EXPERIENCE + STUDIES */}
        <div className="md:col-span-4 md:row-span-3 border-r border-border p-6 flex flex-col gap-6 bg-muted/[0.02]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase size={14} className="text-primary/40" />
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Experience_Log</span>
            </div>
            <div className="space-y-3">
              <div className="border-l border-primary/40 pl-3">
                <p className="text-[10px] font-black text-foreground uppercase leading-none">Staff SWE // Phonia</p>
                <p className="text-[8px] text-muted-foreground uppercase italic mt-1 font-medium">Feb 2024 — Aug 2025</p>
              </div>
              <div className="border-l border-border pl-3">
                <p className="text-[10px] font-black text-foreground uppercase leading-none">Freelance Engineer</p>
                <p className="text-[8px] text-muted-foreground uppercase italic mt-1 font-medium">Dec 2025 — Present</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <GraduationCap size={14} className="text-primary/40" />
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Education_Nodes</span>
            </div>
            <div className="space-y-3">
              <div className="border-l border-border pl-3">
                <p className="text-[10px] font-black text-foreground uppercase leading-none">B.Sc Computer Science</p>
                <p className="text-[8px] text-muted-foreground uppercase italic mt-1 font-medium">UEF - Finland</p>
              </div>
            </div>
          </div>
        </div>

        {/* DOWNLOAD CV */}
        <motion.a
          href="/cv.pdf"
          download
          whileHover={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          className="md:col-span-3 md:row-span-3 border-primary/20 bg-primary/[0.03] flex flex-col items-center justify-center gap-4 transition-all group relative overflow-hidden text-center"
        >
          <FileArrowDown size={48} weight="bold" className="group-hover:scale-110 transition-transform" />
          <div className="space-y-1">
            <span className="block text-xs font-black uppercase tracking-[0.2em]">Get_CV_Final</span>
            <span className="text-[8px] uppercase opacity-50 flex items-center justify-center gap-1 font-bold">
              PDF_UPLINK <ArrowRight size={8} />
            </span>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-10">
            <FileArrowDown size={100} weight="fill" />
          </div>
        </motion.a>

      </div>

      {/* --- 3. FOOTER --- */}
      <div className="h-7 border-t border-border bg-background px-4 flex items-center justify-between shrink-0 font-bold">
        <div className="flex gap-10 text-[7px] tracking-[0.2em] text-muted-foreground uppercase font-black">
          <span className="flex items-center gap-2"><Calendar size={12} className="opacity-30"/> ISSUED: {issueDate}</span>
          <span className="hidden sm:flex items-center gap-2 opacity-30 tracking-tighter italic font-medium">#SYSTEM_ID_88041_A</span>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-[7px] text-muted-foreground/30 uppercase font-black tracking-widest">Sync_Rate</span>
           <div className="h-0.5 w-24 bg-border overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="h-full bg-primary/40"
              />
           </div>
        </div>
      </div>
    </motion.div>
  );
}
