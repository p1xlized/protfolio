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

  Cpu,
  Globe,
  HardDrives,
  Pulse,
  PlugsConnected,
  ChartLineUp
} from "@phosphor-icons/react"

const inputClasses =
  "w-full border border-primary/10 bg-muted/5 px-4 py-3 font-mono text-xs transition-all outline-none " +
  "placeholder:text-primary/20 focus:border-primary/40 focus:bg-primary/5 text-primary"

// --- COMPONENT 1: SYSTEM ANALYTICS & VOX NODE ---
function SystemMetricsNode() {
  const sparklineData = useMemo(() =>
    [...Array(32)].map(() => Math.floor(Math.random() * 50) + 10),
  [])

  return (
    <motion.div className="group relative w-full overflow-hidden border border-primary/10 bg-background/20 p-8 md:p-12 transition-all shadow-2xl flex flex-col justify-between">
      {/* CORNER CROSSHAIRS */}
      <div className="absolute top-2 left-2 size-4 border-t border-l border-primary/20" />
      <div className="absolute top-2 right-2 size-4 border-t border-r border-primary/20" />
      <div className="absolute bottom-2 left-2 size-4 border-b border-l border-primary/20" />
      <div className="absolute bottom-2 right-2 size-4 border-b border-r border-primary/20" />

      {/* BACKGROUND SCAN GRID */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(to_right,var(--primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--primary)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-20 flex justify-between items-start mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Pulse size={14} className="text-primary animate-pulse" />
            <span className="text-[8px] font-mono tracking-[0.4em] text-primary/40 uppercase font-bold">NODE_MONITOR_V3.2</span>
          </div>
          <h2 className="text-4xl uppercase tracking-tighter text-foreground font-black">Analytics</h2>
          <div className="h-[1px] w-24 bg-primary/20" />
        </div>
        <div className="text-right">
            <span className="text-[6px] text-primary/30 uppercase tracking-[0.3em] block">Uptime: 99.99%</span>
            <span className="text-[6px] text-primary/30 uppercase tracking-[0.3em] block">Status: Optimal</span>
        </div>
      </div>

      <div className="relative z-20 space-y-6 flex-1">
        {/* VOX WAVELENGTH ANIMATION */}
        <div className="border border-primary/10 bg-primary/5 p-6 relative overflow-hidden group/vox">
            <div className="absolute top-0 right-0 bg-primary/10 px-2 py-0.5 text-[5px] text-primary/60 uppercase font-bold">Comm_Link_Active</div>
            <div className="flex items-center justify-center h-16 w-full">
                <svg viewBox="0 0 200 60" className="w-full h-full text-primary/60">
                    <line x1="0" y1="30" x2="200" y2="30" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 4" opacity="0.2" />
                    {[...Array(4)].map((_, i) => (
                        <motion.path
                            key={i}
                            d="M 0 30 Q 25 10, 50 30 T 100 30 T 150 30 T 200 30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={i === 1 ? "1.2" : "0.5"}
                            opacity={i === 1 ? "0.9" : "0.2"}
                            animate={{
                                d: [
                                    "M 0 30 Q 25 5, 50 30 T 100 30 T 150 30 T 200 30",
                                    "M 0 30 Q 25 55, 50 30 T 100 30 T 150 30 T 200 30",
                                    "M 0 30 Q 25 5, 50 30 T 100 30 T 150 30 T 200 30"
                                ]
                            }}
                            transition={{
                                duration: 1.5 + i,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </svg>
            </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 gap-4">
            <div className="border border-primary/5 p-4 flex flex-col gap-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 size-1 bg-primary/20" />
                <div className="flex items-center gap-2">
                    <Cpu size={12} className="text-primary/40" />
                    <span className="text-[7px] text-primary/40 uppercase font-bold">System Load</span>
                </div>
                <span className="text-xl font-black tabular-nums tracking-tighter text-primary">42.8%</span>
            </div>
            <div className="border border-primary/5 p-4 flex flex-col gap-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 size-1 bg-primary/20" />
                <div className="flex items-center gap-2">
                    <Broadcast size={12} className="text-primary/40" />
                    <span className="text-[7px] text-primary/40 uppercase font-bold">Uplink Rate</span>
                </div>
                <span className="text-xl font-black tabular-nums tracking-tighter text-primary">1.2GB/s</span>
            </div>
        </div>

        {/* DATA PACKET STREAM */}
        <div className="border border-primary/10 p-5 bg-background/20 relative">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="size-1 bg-primary animate-ping" />
                    <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-primary/60">Data_Packets</span>
                </div>
                <span className="text-[6px] font-mono text-primary/20 tracking-widest">HEX_BUFF_0XFF</span>
            </div>
            <div className="h-10 w-full flex items-end gap-[2px]">
                {sparklineData.map((val, i) => (
                    <motion.div
                        key={i}
                        animate={{ height: [`${val}%`, `${Math.random() * 95 + 5}%`, `${val}%`] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.04 }}
                        className="flex-1 bg-primary/10 hover:bg-primary/40 transition-colors"
                    />
                ))}
            </div>
        </div>
      </div>

      {/* FOOTER DECOR */}
      <div className="relative z-20 pt-8 mt-6 border-t border-primary/10 flex justify-between items-center">
        <div className="flex gap-8">
            <div className="space-y-1">
                <span className="text-[5px] uppercase tracking-widest text-primary/40 block">Encryption</span>
                <span className="text-[8px] font-bold font-mono text-primary/60">AES_256_GCM</span>
            </div>
            <div className="space-y-1">
                <span className="text-[5px] uppercase tracking-widest text-primary/40 block">Protocol</span>
                <span className="text-[8px] font-bold font-mono text-primary/60">WSS_SECURE</span>
            </div>
        </div>
        <div className="flex items-center gap-4">
             <div className="flex gap-1">
                {[...Array(4)].map((_, i) => <div key={i} className="h-1.5 w-[1px] bg-primary/40" />)}
             </div>
             <PlugsConnected size={14} className="text-primary/40" />
        </div>
      </div>
    </motion.div>
  )
}

// --- COMPONENT 2: CONTACT FORM ---
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setTimeout(() => setStatus("success"), 2200)
  }

  return (
    <motion.div className="group relative w-full overflow-hidden border border-primary/10 bg-background/20 p-8 md:p-12 transition-all shadow-2xl">
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-primary/60 animate-pulse" />
                  <span className="text-[8px] font-mono tracking-[0.4em] text-primary/40 uppercase font-bold">COMM_CHANNEL_V3</span>
                </div>
                <h2 className="text-5xl uppercase tracking-tighter text-foreground font-black leading-none">Contact Me</h2>
                <p className="text-[9px] text-primary/60 uppercase tracking-[0.2em] font-medium max-w-xs">
                  Ready to start a new project or just say hi.
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-[6px] text-primary/20 uppercase tracking-[0.6em] [writing-mode:vertical-rl] h-20 border-r border-primary/10 pr-2">Link_Stable</div>
                <div className="size-1.5 bg-primary/20 rounded-full" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-[6px] text-primary/30 uppercase ml-1">Email_Identity</span>
                  <input required type="email" placeholder="IDENTITY@DOMAIN.COM" className={inputClasses} />
                </div>
                <div className="space-y-1">
                  <span className="text-[6px] text-primary/30 uppercase ml-1">Subject_Node</span>
                  <select className={inputClasses}>
                    <option className="bg-background">Full-Stack Development</option>
                    <option className="bg-background">Backend Systems</option>
                    <option className="bg-background">UI/UX Interface</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[6px] text-primary/30 uppercase ml-1">Message_Payload</span>
                <textarea required rows={4} placeholder="Type your message here..." className={`${inputClasses} resize-none`} />
              </div>

              <div className="relative group/btn w-full pt-4">
                <motion.button
                  disabled={status === "sending"}
                  className="relative w-full h-14 flex items-center overflow-hidden border border-primary/20 bg-transparent hover:border-primary/60 transition-all"
                >
                  <div className="absolute inset-0 w-full h-full bg-primary/90 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
                  <div className="relative z-10 h-full w-14 border-r border-primary/10 flex items-center justify-center bg-background/20">
                    {status === "sending" ? <CircleNotch size={18} className="animate-spin text-primary" /> : <ArrowRight size={18} className="group-hover/btn:text-background group-hover/btn:translate-x-1 transition-all" />}
                  </div>
                  <span className="relative z-10 flex-1 text-[10px] font-black uppercase tracking-[0.6em] group-hover/btn:text-background transition-colors text-center">
                    {status === "sending" ? "Transmitting..." : "Initialize Uplink"}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center space-y-8 py-12">
            <div className="size-24 rounded-full border border-primary/10 flex items-center justify-center bg-primary/5 relative">
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
              <ShieldCheck size={40} weight="thin" className="text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-4xl font-black uppercase tracking-tighter">Transmission Success</h3>
              <p className="text-[8px] uppercase tracking-widest text-primary/40 font-mono font-bold">Log_ID: 0x{Math.floor(Math.random() * 1000).toString(16).toUpperCase()} // {new Date().toLocaleTimeString()}</p>
            </div>
            <button onClick={() => setStatus("idle")} className="text-[8px] uppercase tracking-[0.5em] border border-primary/10 px-8 py-2 hover:bg-primary/5 transition-all font-bold">Return to Terminal</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-14 pt-8 border-t border-primary/10 group/mail">
        <a href="mailto:contact-me@pixlized.net" className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 border border-primary/10 bg-primary/5 text-primary group-hover/mail:bg-primary group-hover/mail:text-background transition-all">
                <EnvelopeSimple size={18} />
            </div>
            <div className="flex flex-col">
                <span className="text-[6px] uppercase tracking-[0.4em] text-primary/30 font-bold">Manual Uplink</span>
                <span className="font-mono text-sm text-foreground/80 group-hover:text-primary transition-colors">contact-me@pixlized.net</span>
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover/mail:opacity-100 transition-all">
             <span className="text-[6px] uppercase tracking-widest text-primary/40">Launch Mailer</span>
             <ArrowRight size={14} className="translate-x-0 group-hover/mail:translate-x-2 transition-all text-primary" />
          </div>
        </a>
      </div>
    </motion.div>
  )
}

export default function ContactSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      {/* On mobile: grid-cols-1 centers the form.
        On desktop: lg:grid-cols-2 puts them side-by-side.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch max-w-2xl lg:max-w-none mx-auto">
        <ContactForm />

        {/* We wrap the node in a div or add classes directly to it.
          'hidden' hides it by default (mobile/tablet).
          'lg:flex' shows it as a flex container on desktop.
        */}
        <div className="hidden lg:flex w-full">
          <SystemMetricsNode />
        </div>
      </div>
    </section>
  )
}
