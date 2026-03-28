"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  EnvelopeSimple,
  CircleNotch,
  ShieldCheck,
  TerminalWindow,
  User,
  Briefcase,
  CurrencyDollar,
  ChatCircleDots,
  PaperPlaneTilt,
  Fingerprint,
  Cpu,
  ArrowsInLineVertical
} from "@phosphor-icons/react"

const boxInputClasses =
  "w-full bg-primary/[0.03] border border-primary/10 px-4 py-3 font-mono text-[11px] transition-all outline-none " +
  "placeholder:text-primary/10 focus:border-primary/40 focus:bg-primary/[0.08] text-primary"

const labelClasses = "text-[8px] text-primary/40 uppercase tracking-[0.3em] font-black flex items-center gap-2 mb-2"

const GeometricBackground = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
    <motion.svg
      width="600"
      height="600"
      viewBox="0 0 100 100"
      className="text-primary transition-opacity duration-1000 opacity-[0.03] group-hover:opacity-[0.15]"
    >
      <motion.circle
        cx="50" cy="50" r="48"
        stroke="currentColor" strokeWidth="0.1" fill="none"
        strokeDasharray="4 2"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z"
        stroke="currentColor" strokeWidth="0.15" fill="none"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="50" cy="50" r="1.5" fill="currentColor"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  </div>
)

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle")
  const [logId, setLogId] = useState("")

  useEffect(() => {
    if (status === "success") {
      setLogId(Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase())
    }
  }, [status])

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="group relative overflow-hidden border-2 border-primary/20 bg-background/40 p-8 md:p-12 shadow-2xl backdrop-blur-md"
      >
        <GeometricBackground />

        {/* CORNER DECORATIONS */}
        <div className="absolute top-0 left-0 size-6 border-t-2 border-l-2 border-primary/40" />
        <div className="absolute top-0 right-0 size-6 border-t-2 border-r-2 border-primary/40" />
        <div className="absolute bottom-0 left-0 size-6 border-b-2 border-l-2 border-primary/40" />
        <div className="absolute bottom-0 right-0 size-6 border-b-2 border-r-2 border-primary/40" />

        <AnimatePresence mode="wait">
          {status !== "success" ? (
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">

              {/* HEADER SECTION */}
              <div className="flex justify-between items-end border-b border-primary/10 pb-6 relative">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Fingerprint size={14} className="text-primary/40" />
                    <span className="text-[8px] font-black tracking-[0.4em] text-primary/30 uppercase">Uplink_Identity</span>
                  </div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter text-foreground leading-none">Contact_Me</h2>
                </div>

                <div className="flex gap-1.5 mb-2">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className={`size-1 rounded-full ${i === 0 ? 'bg-primary animate-pulse' : 'bg-primary/20'}`} />
                   ))}
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setStatus("sending"); setTimeout(() => setStatus("success"), 2200); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClasses}><User size={12}/> Subject_Name</label>
                    <input required type="text" placeholder="IDENTITY" className={boxInputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClasses}><EnvelopeSimple size={12}/> Return_Path</label>
                    <input required type="email" placeholder="EMAIL_ADDRESS" className={boxInputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClasses}><Briefcase size={12}/> Project_Type</label>
                    <select className={boxInputClasses}>
                      <option className="bg-background">SOFTWARE_DEVELOPMENT</option>
                      <option className="bg-background">UI/UX_INTERFACE</option>
                      <option className="bg-background">BACKEND_SYSTEMS</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClasses}><CurrencyDollar size={12}/> Budget_Tier</label>
                    <select className={boxInputClasses}>
                      <option className="bg-background">STANDARD_LOAD</option>
                      <option className="bg-background">INDUSTRIAL_LOAD</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                    <label className={labelClasses}><ChatCircleDots size={12}/> Payload_Data</label>
                    <textarea required rows={4} placeholder="DESCRIBE_REQUIREMENTS..." className={`${boxInputClasses} resize-none`} />
                </div>

                {/* REDESIGNED BUTTON: MATRIX FILL */}
                <div className="relative pt-4">
                  <button
                    disabled={status === "sending"}
                    className="group/btn relative w-full h-14 border border-primary/40 bg-background/20 flex items-center justify-between px-8 overflow-hidden transition-all hover:border-primary"
                  >
                    {/* Background Matrix Slide */}
                    <motion.div
                      className="absolute inset-0 bg-primary z-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.3, ease: "circOut" }}
                    />

                    <div className="relative z-10 flex items-center gap-4 transition-colors duration-300 group-hover/btn:text-background">
                       <ArrowsInLineVertical size={20} className="opacity-40 group-hover/btn:opacity-100" />
                       <span className="text-xs font-black uppercase tracking-[0.8em]">Initialize_Handshake</span>
                    </div>

                    <div className="relative z-10 transition-all duration-300 group-hover/btn:text-background group-hover/btn:translate-x-2">
                      {status === "sending" ? (
                        <CircleNotch size={24} className="animate-spin" />
                      ) : (
                        <PaperPlaneTilt size={20} weight="bold" />
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-20 space-y-8">
              <ShieldCheck size={64} weight="thin" className="text-primary drop-shadow-[0_0_20px_var(--primary)]" />
              <div className="text-center space-y-2">
                <h3 className="text-4xl font-black uppercase tracking-tighter">Transmission_Sent</h3>
                <p className="text-[9px] font-mono text-primary/40 uppercase tracking-[0.4em]">Log_ID: 0x{logId} // Handshake_Established</p>
              </div>
              <button onClick={() => setStatus("idle")} className="text-[10px] uppercase tracking-[0.5em] border-2 border-primary bg-primary text-background px-12 py-3 hover:bg-transparent hover:text-primary transition-all font-black">Return_to_Port</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER: MANUAL UPLINK */}
        <div className="mt-8 pt-4 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 group/mail">
          <a href="mailto:contact-me@pixlized.net" className="flex items-center gap-4">
            <div className="p-3 border border-primary/20 bg-background/40 text-primary group-hover/mail:bg-primary group-hover/mail:text-background transition-all">
              <EnvelopeSimple size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[6px] uppercase tracking-[0.6em] text-primary/30 font-black">Manual_Uplink</span>
              <span className="font-mono text-sm text-foreground/80 group-hover/mail:text-primary transition-colors tracking-tighter underline decoration-primary/20">contact-me@pixlized.net</span>
            </div>
          </a>

          <div className="flex items-center gap-4 opacity-20 text-[8px] font-black uppercase tracking-[0.4em]">
             <Cpu size={14} />
             <span>KUO_FI_NODE_882</span>
          </div>
        </div>

        {/* BOTTOM DECOR */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10 overflow-hidden">
           <motion.div
             animate={{ x: ["-100%", "100%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="w-40 h-full bg-primary/40 blur-[1px]"
           />
        </div>
      </motion.div>
    </section>
  )
}
