"use client"

import { useEffect, useState, useCallback } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowDown,
  Cpu,
  Terminal,
} from "@phosphor-icons/react"

// Components
import Profile from "@/components/Profile"
import { SystemLoader } from "@/components/Loader"
import ContactSection from "@/components/ContactMe"
import { useBrowserTab } from "@/lib/BrowserTab"
import SpaceParallax from "@/components/SpaceParallax"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState("")
  const [activeSection, setActiveSection] = useState("INITIALIZING")
  const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null)
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const SECTIONS = ["profile-module", "contact-module", "gaming-module"]

  // --- 1. INITIALIZATION & SCREEN LOGIC ---
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000)
    const updateScreen = () => {
      const w = window.innerWidth
      if (w >= 1024) setScreen("desktop")
      else if (w >= 768) setScreen("tablet")
      else setScreen("mobile")
    }
    updateScreen()
    window.addEventListener("resize", updateScreen)

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }))
    }, 1000)

    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", updateScreen)
      clearInterval(timer)
    }
  }, [])

  useBrowserTab({
    section: activeSection,
    appSuffix: "x_x",
    switchInterval: 2000,
    spinnerInterval: 150,
  })

  // --- 2. SMOOTH SCROLL ENGINE ---
  const { scrollYProgress } = useScroll({
    container: containerElement ? { current: containerElement } : undefined,
  })

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const smoothScrollTo = useCallback((index: number) => {
    if (!containerElement) return
    const targetScroll = index * containerElement.clientHeight
    containerElement.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    })
  }, [containerElement])

  // --- 3. NAVIGATION LOGIC ---
  const handleScrollClick = () => {
    if (!containerElement) return
    const currentId = `${activeSection.toLowerCase()}-module`
    const currentIndex = SECTIONS.indexOf(currentId)

    if (activeSection === "GAMING") {
      smoothScrollTo(0)
    } else {
      smoothScrollTo(currentIndex + 1)
    }
  }

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!containerElement || loading) return
      const currentId = `${activeSection.toLowerCase()}-module`
      const currentIndex = SECTIONS.indexOf(currentId)

      if (e.key === "ArrowDown") {
        e.preventDefault()
        smoothScrollTo((currentIndex + 1) % SECTIONS.length)
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        smoothScrollTo((currentIndex - 1 + SECTIONS.length) % SECTIONS.length)
      }
    }
    window.addEventListener("keydown", handleKeys)
    return () => window.removeEventListener("keydown", handleKeys)
  }, [containerElement, activeSection, loading, smoothScrollTo])

  // --- 4. SECTION OBSERVER ---
  useEffect(() => {
    if (!containerElement || loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.replace("-module", "").toUpperCase())
          }
        })
      },
      { root: containerElement, threshold: 0.6 }
    )
    containerElement.querySelectorAll("section").forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [containerElement, loading])

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

            {/* --- HUD: BRACKETS (HIDDEN ON MOBILE) --- */}
            <div className="pointer-events-none fixed inset-0 z-50 p-4 opacity-20 hidden md:block">
              <div className="absolute top-4 left-4 h-12 w-12 border-l border-t border-primary" />
              <div className="absolute top-4 right-4 h-12 w-12 border-r border-t border-primary" />
              <div className="absolute bottom-4 left-4 h-12 w-12 border-l border-b border-primary" />
              <div className="absolute bottom-4 right-4 h-12 w-12 border-r border-b border-primary" />
            </div>

            {/* --- HUD: NAV GAUGE (HIDDEN ON MOBILE) --- */}
            <div className="fixed top-1/2 right-8 z-50 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-1 opacity-20">
                <div className="h-px w-8 bg-primary" />
                <span className="text-[6px] tracking-[0.3em] font-bold">NAV_BUFFER</span>
              </div>
              <div className="relative flex items-center">
                <div className="absolute right-6 flex flex-col justify-between h-72 py-2 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} className="size-[2px] bg-primary rotate-45" />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-[7px] tracking-[0.5em] opacity-30 [writing-mode:vertical-lr] font-mono uppercase">Register::0x040203BC1</div>
                  <div className="relative h-72 w-[1px] bg-primary/10">
                    <motion.div style={{ scaleY, originY: 0, height: "100%" }} className="absolute top-0 w-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                  </div>
                </div>
                <div className="absolute left-4 flex flex-col justify-between h-72 py-10 opacity-10 pointer-events-none font-bold">
                   <span className="text-[8px] [writing-mode:vertical-lr] tracking-widest uppercase">LAT_62.89</span>
                   <div className="h-12 w-px bg-primary/40 mx-auto" />
                   <span className="text-[8px] [writing-mode:vertical-rl] tracking-widest uppercase">LON_27.67</span>
                </div>
              </div>
              <div className="mt-2 text-[10px] font-black border border-primary/40 px-2 py-0.5 bg-background shadow-[4px_4px_0px_rgba(var(--primary),0.1)]">
                {activeSection}
              </div>
            </div>

            {/* --- HUD: HEADER (HIDDEN ON MOBILE) --- */}
            <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden md:flex justify-between p-8 items-start">
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="h-2 w-2 bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold tracking-[0.2em]">ALX_OS // {screen.toUpperCase()}</span>
                </div>
                <div className="text-[7px] opacity-40 font-bold tracking-tighter uppercase">STRLNK::ESTABLISHED // 27.67E</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black tabular-nums leading-none">{time}</div>
                <div className="text-[8px] opacity-60 tracking-[0.3em] mt-2 font-bold uppercase">INDEX::{activeSection}</div>
              </div>
            </header>

            {/* --- MAIN CONTENT ENGINE --- */}
            <div
              ref={setContainerElement}
              className={`hide-scrollbar relative z-10 h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth`}
            >
              <section id="profile-module" className="h-screen w-full snap-start flex items-center justify-center p-4 md:p-10">
                <Profile />
              </section>

              <section id="contact-module" className="h-screen w-full snap-start flex items-center justify-center p-4 md:p-10">
                <ContactSection />
              </section>

              <section id="gaming-module" className="h-screen w-full snap-start flex items-center justify-center p-6 md:p-10 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="relative flex flex-col items-center group cursor-crosshair">
                  <div className="relative size-48 md:size-64 mb-12 flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-dashed border-primary/20 rounded-full" />
                    <div className="relative size-12 flex items-center justify-center">
                      <div className="absolute h-px w-full bg-primary animate-pulse" />
                      <div className="absolute w-px h-full bg-primary animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-none">REBOOT</h1>
                    <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-primary/80 uppercase">Initiate Entertainment Protocol?</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => smoothScrollTo(0)}
                    className="mt-12 relative px-10 py-3 border border-primary/30 bg-primary/5 hover:bg-primary hover:text-background transition-all uppercase text-[10px] font-black tracking-[0.8em]"
                  >
                    Start_Session
                  </motion.button>
                </div>
              </section>
            </div>

            {/* --- HUD: FOOTER (HIDDEN ON MOBILE) --- */}
            <footer className="fixed bottom-0 inset-x-0 z-50 p-6 hidden md:flex flex-col items-center pointer-events-none">
              <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-6" />
              <div className="group relative flex flex-col items-center">
                <div className="absolute bottom-16 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                   <div className="bg-background/90 backdrop-blur-md border border-primary/20 p-3 space-y-1 min-w-[150px] text-[7px] font-bold shadow-2xl">
                      <div className="flex justify-between"><span>KEYBOARD</span><span>ARROWS</span></div>
                      <div className="flex justify-between"><span>INPUT</span><span>OMNI_BTN</span></div>
                   </div>
                </div>
                <button onClick={handleScrollClick} className="relative size-11 border border-primary/30 flex items-center justify-center bg-background/50 backdrop-blur-md hover:bg-primary hover:text-background transition-all pointer-events-auto">
                  <motion.div animate={activeSection === "GAMING" ? { rotate: 180 } : { rotate: 0 }}>
                    <ArrowDown size={18} weight="bold" />
                  </motion.div>
                </button>
                <span className="mt-3 text-[6px] tracking-[0.8em] opacity-30 font-black group-hover:opacity-100 transition-opacity">
                  {activeSection === "GAMING" ? "REBOOT" : "NEXT"}
                </span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        section { scroll-snap-align: start; scroll-snap-stop: always; }
      `}</style>
    </div>
  )
}

export default App
