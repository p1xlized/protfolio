"use client"

import { useEffect, useState, useCallback } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { ArrowDown } from "@phosphor-icons/react"

// Components
import Profile from "@/components/Profile"
import { SystemLoader } from "@/components/Loader"
import ContactSection from "@/components/ContactMe"
import TestimonialsNode from "@/components/Testimonials" // Your new component
import { useBrowserTab } from "@/lib/BrowserTab"
import SpaceParallax from "@/components/SpaceParallax"

export const Route = createFileRoute("/")({ component: App })

// Updated section mapping: PROFILE -> TESTIMONIALS -> CONTACT
const SECTIONS = ["PROFILE", "TESTIMONIALS", "CONTACT"]

function App() {
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState("")
  const [activeSection, setActiveSection] = useState("PROFILE")
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">("desktop")

  // --- 1. SYSTEM MONITORING ---
  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }))
    const updateScreen = () => {
      const w = window.innerWidth
      setScreen(w >= 1024 ? "desktop" : w >= 768 ? "tablet" : "mobile")
    }

    updateTime()
    updateScreen()

    const t = setTimeout(() => setLoading(false), 5000)
    const interval = setInterval(updateTime, 1000)
    window.addEventListener("resize", updateScreen)

    return () => {
      clearTimeout(t)
      clearInterval(interval)
      window.removeEventListener("resize", updateScreen)
    }
  }, [])

  useBrowserTab({
    section: activeSection,
    appSuffix: "x_x",
    switchInterval: 2000,
    spinnerInterval: 150,
  })

  // --- 2. SCROLL ENGINE ---
  const { scrollYProgress } = useScroll({
    container: container ? { current: container } : undefined,
  })

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (!container || loading) return

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.offsetHeight)
      if (SECTIONS[index] && activeSection !== SECTIONS[index]) {
        setActiveSection(SECTIONS[index])
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [container, loading, activeSection])

  const smoothScrollTo = useCallback((index: number) => {
    if (!container) return
    container.scrollTo({
      top: index * container.offsetHeight,
      behavior: "smooth"
    })
  }, [container])

  // --- 3. INPUT HANDLERS ---
  const handleNext = useCallback(() => {
    const currentIndex = SECTIONS.indexOf(activeSection)
    // FIX: Target CONTACT as the reboot trigger instead of TESTIMONIALS
    smoothScrollTo(activeSection === "CONTACT" ? 0 : currentIndex + 1)
  }, [activeSection, smoothScrollTo])

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!container || loading) return
      const currentIndex = SECTIONS.indexOf(activeSection)

      if (e.key === "ArrowDown") {
        e.preventDefault()
        smoothScrollTo((currentIndex + 1) % SECTIONS.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        smoothScrollTo((currentIndex - 1 + SECTIONS.length) % SECTIONS.length)
      }
    }
    window.addEventListener("keydown", handleKeys)
    return () => window.removeEventListener("keydown", handleKeys)
  }, [container, activeSection, loading, smoothScrollTo])

  return (
    <div className="relative min-h-screen bg-background/20 text-primary font-mono selection:bg-primary/30 overflow-hidden uppercase">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loader" exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-background">
            <SystemLoader onComplete={() => setLoading(false)} />
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

            <SpaceParallax scrollYProgress={scrollYProgress} />

            {/* --- HUD: STATIC BORDER LAYER --- */}
            <div className="pointer-events-none fixed inset-0 z-50 p-4 opacity-20 hidden md:block">
              <div className="absolute top-4 left-4 h-12 w-12 border-l border-t border-primary" />
              <div className="absolute top-4 right-4 h-12 w-12 border-r border-t border-primary" />
              <div className="absolute bottom-4 left-4 h-12 w-12 border-l border-b border-primary" />
              <div className="absolute bottom-4 right-4 h-12 w-12 border-r border-b border-primary" />
            </div>

            {/* --- HUD: UPGRADED NAV GAUGES (NO SCALEY) --- */}
            <div className="fixed top-1/2 right-8 z-50 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
              {/* TOP STATUS HEADER */}
              <div className="flex flex-col items-center gap-1.5 opacity-40">
                <div className="flex items-center gap-1">
                  <div className="size-1 bg-primary animate-pulse" />
                  <div className="h-[2px] w-6 bg-primary" />
                </div>
                <span className="text-[6px] tracking-[0.4em] font-black uppercase">Nav_Track</span>
              </div>

              {/* MAIN GAUGE ASSEMBLY */}
              <div className="relative flex items-center justify-center w-20">

                {/* Left Side: Ruler Ticks & Hex Readouts */}
                <div className="absolute right-4 flex flex-col justify-between h-72 py-0 opacity-30 pointer-events-none">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="flex items-center justify-end gap-1.5 w-8">
                      <span className="text-[5px] font-mono">
                        {i % 5 === 0 ? `0x0${i}` : ""}
                      </span>
                      <div className={`h-[1px] bg-primary ${i % 5 === 0 ? "w-3" : "w-1"}`} />
                    </div>
                  ))}
                </div>

                {/* Center: The Physical Scroll Track */}
                <div className="flex flex-col items-center gap-2">
                  <div className="size-2 border border-primary/50 flex items-center justify-center opacity-60">
                     <div className="size-[2px] bg-primary" />
                  </div>

                  <div className="relative h-72 w-[2px] bg-primary/10 rounded-full overflow-hidden">
                    {/* FIX: Reordered height states based on new flow */}
                    <motion.div
                      animate={{
                        height: activeSection === "PROFILE" ? "0%" :
                                activeSection === "TESTIMONIALS" ? "50%" :
                                activeSection === "CONTACT" ? "100%" : "0%"
                      }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                      className="absolute top-0 w-full bg-primary shadow-[0_0_12px_var(--primary)]"
                    />
                  </div>

                  <div className="size-2 border border-primary/50 flex items-center justify-center opacity-60">
                     <div className="size-[2px] bg-primary animate-ping" />
                  </div>
                </div>

                {/* Right Side: Vertical Labeling */}
                <div className="absolute -right-4 flex flex-col items-center h-72 justify-center opacity-20 pointer-events-none">
                  <div className="text-[6px] tracking-[0.6em] [writing-mode:vertical-rl] font-mono font-black rotate-180">
                      ALIGN::TGT_LOCK
                  </div>
                </div>
              </div>

            </div>

            {/* --- HUD: HEADER DATA --- */}
            <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden md:flex justify-between p-8 items-start">
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="h-2 w-2 bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold tracking-[0.2em]">P1XLIZED // {screen.toUpperCase()}</span>
                </div>
                <div className="text-[7px] opacity-40 font-bold tracking-tighter uppercase">STRLNK::ESTABLISHED</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black tabular-nums leading-none">{time}</div>
                <div className="text-xs opacity-60 tracking-[0.3em] mt-2 font-bold uppercase">INDEX::{activeSection}</div>
              </div>
            </header>

            {/* --- MAIN MODULE ENGINE --- */}
            <div
              ref={setContainer}
              className="hide-scrollbar relative z-10 h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
            >
              <section id="profile-module" className="h-screen w-full snap-start flex items-center justify-center p-4 md:p-10">
                <Profile />
              </section>

              {/* TESTIMONIALS NOW IN MIDDLE */}
              <section id="testimonials-module" className="h-screen w-full snap-start flex items-center justify-center p-4 md:p-10">
                <TestimonialsNode />
              </section>

              {/* CONTACT NOW AT END */}
              <section id="contact-module" className="h-screen w-full snap-start flex items-center justify-center p-4 md:p-10">
                <ContactSection />
              </section>
            </div>

            {/* --- HUD: NAVIGATION TRIGGER --- */}
            <footer className="fixed bottom-0 inset-x-0 z-50 p-6 hidden md:flex flex-col items-center pointer-events-none">
              <div className="group relative flex flex-col items-center pointer-events-auto">
                <button onClick={handleNext} className="relative size-10 flex items-center justify-center rounded-full border border-primary/20 bg-background/50 backdrop-blur-md hover:bg-primary hover:text-background transition-all">
                  {/* FIX: Target CONTACT for reboot animation */}
                  <motion.div animate={{ rotate: activeSection === "CONTACT" ? 180 : 0 }}>
                    <ArrowDown size={18} weight="bold" />
                  </motion.div>
                </button>
                <span className="mt-2 text-[6px] tracking-[0.8em] opacity-30 font-black group-hover:opacity-100 transition-opacity">
                  {/* FIX: Target CONTACT for text swap */}
                  {activeSection === "CONTACT" ? "REBOOT_CYCLE" : "NEXT_MODULE"}
                </span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

export default App
