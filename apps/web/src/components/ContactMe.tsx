"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  EnvelopeSimple,
  CircleNotch,
  Broadcast,
  ShieldCheck,
  Target,
  TerminalWindow,
  GraphIcon
} from "@phosphor-icons/react"
import { cn } from "@portfolio/ui/lib/utils"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    // Artificial delay for the "Uplink" feel
    setTimeout(() => setStatus("success"), 2200)
  }

  const inputClasses =
    "w-full border border-primary/10 bg-muted/20 px-4 py-3 font-mono text-sm transition-all outline-none " +
    "placeholder:text-primary/10 focus:border-primary focus:bg-muted/40 text-foreground"

  return (
    <motion.div
      whileHover="hover"
      className="group relative w-full max-w-2xl overflow-hidden border border-primary/12 bg-background/40 p-8 md:p-12 transition-all shadow-2xl"
    >

      {/* --- 1. VECTOR ORBITAL (Parent Triggered) --- */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] transition-opacity duration-1000 group-hover:opacity-20">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full text-primary"
        >
          {/* 1. OUTER STATIC BOUNDARY */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 4" />

          {/* 2. INNER ROTATING RINGS (Nested) */}
          {[
            { r: 35, dash: "2 6", speed: 40, rev: false }, // Outer ring
            { r: 22, dash: "10 5", speed: 25, rev: true }, // Middle ring (Reverse)
            { r: 10, dash: "1 2", speed: 15, rev: false }, // Core ring
          ].map((ring, i) => (
            <motion.circle
              key={i}
              cx="50"
              cy="50"
              r={ring.r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.15"
              strokeDasharray={ring.dash}
              animate={{ rotate: ring.rev ? -360 : 360 }}
              transition={{
                duration: ring.speed,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "50px", originY: "50px" }}
            />
          ))}

          {/* 3. CENTER TARGET POINT */}
          <circle cx="50" cy="50" r="0.5" fill="currentColor" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.div
            key="form-view"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-10"
          >
            {/* HEADER */}
            <div className="relative z-20 flex justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Broadcast size={14} className="text-primary/60 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-[0.4em] text-primary/40 uppercase font-bold">Protocol_v3</span>
                </div>
                <h2 className="text-5xl uppercase tracking-tighter text-foreground leading-none">Contact</h2>
                <p className="text-[10px] text-muted-foreground/80 uppercase tracking-widest italic leading-tight">
                  Ready to start a new project or just say hi.
                </p>
              </div>
              <div className="text-[7px] text-primary/10 uppercase tracking-[0.5em] [writing-mode:vertical-rl] h-16">System_Ready</div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="relative z-20 space-y-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <input required type="email" placeholder="IDENTITY@NODE.COM" className={inputClasses} />
                <select className={inputClasses}>
                  <option className="bg-background">FULL-STACK_DEV</option>
                  <option className="bg-background">BACKEND_SYSTEMS</option>
                </select>
              </div>

              <textarea required rows={4} placeholder="HOW CAN I ASSIST?" className={`${inputClasses} resize-none`} />

              {/* --- REDESIGNED FROM SCRATCH: THE COMMAND TRIGGER --- */}
              <div className="relative group/cmd w-full max-w-xl">
                {/* 1. TOP LABEL: DATA PACKET INFO */}
                <div className="flex justify-between items-end mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <div className="size-1 bg-primary animate-pulse" />
                    <span className="text-[8px] uppercase tracking-[0.4em] text-primary/40 font-bold">
                      {status === "sending" ? "Uplink_In_Progress" : "Ready_For_Deployment"}
                    </span>
                  </div>
                  <span className="text-[7px] text-primary/20 font-mono">
                    0x{Math.floor(Math.random() * 1000).toString(16).toUpperCase()} // BUF_82
                  </span>
                </div>

                {/* 2. THE MAIN TRIGGER BUTTON */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className={cn(
                    "relative w-full h-14 flex items-center overflow-hidden border transition-all duration-300",
                    status === "sending"
                      ? "border-primary/20 bg-primary/5 cursor-wait"
                      : "border-primary/40 bg-transparent hover:border-primary group-hover/cmd:shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                  )}
                >
                  {/* HOVER SLIDE FILL */}
                  <div className="absolute inset-0 w-full h-full bg-primary/80 -translate-x-full group-hover/cmd:translate-x-0 transition-transform duration-500 ease-out" />

                  {/* LEFT INDICATOR GASKET */}
                  <div className="relative z-20 h-full w-14 border-r border-primary/20 flex items-center justify-center bg-background/20 backdrop-blur-md">
                    {status === "sending" ? (
                      <CircleNotch size={20} className="animate-spin text-primary" />
                    ) : (
                      <Target size={20} className="text-primary group-hover/cmd:text-background transition-colors" />
                    )}
                  </div>

                  {/* CONTENT AREA */}
                  <div className="relative z-20 flex-1 flex items-center justify-between px-6">
                    <div className="flex flex-col items-start">
                      <span className={cn(
                        "text-[11px] font-black uppercase tracking-[0.5em] transition-colors duration-300",
                        "group-hover/cmd:text-background text-primary"
                      )}>
                        {status === "sending" ? "Transmitting..." : "Initialize_Uplink"}
                      </span>
                      <span className="text-[6px] uppercase tracking-[0.2em] text-primary/40 group-hover/cmd:text-background/50 transition-colors">
                        Security_Protocol: Enabled // RSA_4096
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                       <div className="hidden md:flex flex-col items-end gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-[1px] w-4 bg-primary/20 group-hover/cmd:bg-background/20" />
                          ))}
                       </div>
                       <ArrowRight size={18} className="text-primary group-hover/cmd:text-background group-hover/cmd:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* DECORATIVE SCAN LINE (Subtle pulse) */}

                </motion.button>

                {/* 3. BOTTOM DECOR: BIT-STREAM INDICATOR */}
                <div className="mt-2 flex gap-1 h-1 w-full opacity-30 group-hover/cmd:opacity-100 transition-opacity">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={status === "sending" ? {
                        backgroundColor: ["rgba(var(--primary), 0.1)", "rgba(var(--primary), 1)", "rgba(var(--primary), 0.1)"]
                      } : {}}
                      transition={{ delay: i * 0.1, duration: 0.8, repeat: Infinity }}
                      className="flex-1 bg-primary/20"
                    />
                  ))}
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          /* --- SUCCESS STATE: COMMUNICATION CHANNEL OPEN --- */
          <motion.div
            key="success-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-20 pt-16 pb-6 flex flex-col items-center text-center space-y-12"
          >
            {/* 1. TOP DECOR: SYSTEM STAMP */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={48} weight="thin" />
            </div>

            {/* 2. VOX RADIO WAVE VISUAL */}
            <div className="relative flex flex-col items-center gap-6">
              <div className="size-28 rounded-full border-2 border-primary/20 flex items-center justify-center relative bg-muted/20 backdrop-blur-md">
                 <div className="absolute inset-2 rounded-full border border-primary/10" />

                 {/* --- DYNAMIC VOX WAVE --- */}
                 <svg viewBox="0 0 100 60" className="w-16 h-auto text-primary" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="30" x2="95" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-30" />
                    {[...Array(3)].map((_, i) => (
                       <motion.path
                          key={i}
                          d="M 5 30 Q 25 10, 50 30 T 95 30"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          className="opacity-80"
                          animate={{ d: [
                              "M 5 30 Q 25 10, 50 30 T 95 30",
                              "M 5 30 Q 25 50, 50 30 T 95 30",
                              "M 5 30 Q 25 10, 50 30 T 95 30"
                          ] }}
                          transition={{
                             duration: 1.5 + (i * 0.3),
                             repeat: Infinity,
                             ease: "easeInOut",
                             delay: i * 0.2
                          }}
                       />
                    ))}
                 </svg>
              </div>

              <div className="space-y-2 border-b border-primary/10 pb-4">
                <div className="flex items-center justify-center gap-3">
                   <div className="h-[1px] w-8 bg-primary/20" />
                   <span className="text-[10px] uppercase tracking-[0.5em] text-primary">Channel_Established</span>
                   <div className="h-[1px] w-8 bg-primary/20" />
                </div>
                <h3 className="text-5xl uppercase tracking-tighter text-foreground/90 leading-none">Transmission_Success</h3>
                <p className="text-[8px] uppercase tracking-widest text-primary/20 italic font-mono">Uplink_Frequency_92.4 // {new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            {/* 3. RESPONSE MESSAGE */}
            <div className="relative group max-w-sm border-l border-primary/30 bg-muted/10 p-6 space-y-3">
               <div className="absolute top-0 right-0 size-1.5 border-t border-r border-primary/20 opacity-40 group-hover:opacity-100 transition-opacity" />
               <div className="absolute bottom-0 right-0 size-1.5 border-b border-r border-primary/20 opacity-40 group-hover:opacity-100 transition-opacity" />

               <p className="text-xs uppercase leading-relaxed text-foreground/80 tracking-tight text-left">
                  Message has been successfully logged to the secure archive. I will process your inquiry and provide a response via the provided uplink shortly.
               </p>
               <div className="pt-2 flex items-center justify-between text-[8px] uppercase tracking-widest text-primary/30 border-t border-primary/5">
                  <span className="font-bold">- Alexandru Paduret</span>
                  <span className="italic">Auto_Response</span>
               </div>
            </div>

            {/* 4. FOOTER: FIXED RESET */}
            <button
              onClick={() => setStatus("idle")}
              className="relative group flex items-center gap-3 border border-primary/10 px-6 py-2 transition-all hover:bg-primary/5 hover:border-primary/30"
            >
              <div className="size-1.5 bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary/40 group-hover:text-primary transition-colors font-medium">Reset_Terminal_Session</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER: MANUAL OVERRIDE --- */}
      <div className="relative z-20 mt-16 pt-8 border-t border-primary/10">
        <a href="mailto:contact-me@pixlized.net" className="flex items-center justify-between group/mail">
          <div className="flex items-center gap-4">
            <div className="p-3 border border-primary/20 bg-primary/5 text-primary group-hover/mail:bg-primary group-hover/mail:text-background transition-colors">
              <EnvelopeSimple size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-[0.4em] text-primary/40 font-mono italic">Manual_Uplink</span>
              <span className="font-mono text-sm tracking-widest text-foreground group-hover:text-primary transition-colors italic">contact-me@pixlized.net</span>
            </div>
          </div>
          <div className="flex items-center gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
            <span className="text-[7px] uppercase tracking-[0.5em] hidden sm:block">Identity_Verified</span>
            <ShieldCheck size={20} />
          </div>
        </a>
      </div>
    </motion.div>
  );
}
