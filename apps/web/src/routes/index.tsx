"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowDown,
  ArrowUp,
  Cpu,
  GameController,
  ShieldCheck,
  Terminal,
} from "@phosphor-icons/react"

// Components
import Profile from "@/components/Profile"
import { SystemLoader } from "@/components/Loader"
import ContactSection from "@/components/ContactMe"
import { useBrowserTab } from "@/lib/BrowserTab"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState("")
  const [activeSection, setActiveSection] = useState("INITIALIZING")
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  )

  // Navigation Logic
  const handleScrollClick = () => {
    if (!containerRef) return

    // Mapping the IDs used in your section tags
    const sections = ["profile-module", "contact-module", "gaming-module"]
    const currentId = `${activeSection.toLowerCase()}-module`
    const currentIndex = sections.indexOf(currentId)

    if (activeSection === "GAMING") {
      // Smooth scroll back to top
      containerRef.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // Find the next element in the array and scroll to it
      const nextSectionId = sections[currentIndex + 1]
      const nextSection = document.getElementById(nextSectionId)

      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }
  useBrowserTab({
    section: activeSection,
    appSuffix: "x_x",
    switchInterval: 2000, // Switch frames every 2 sec
    spinnerInterval: 150, // Spinner animation interval
  })

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    const updateScreen = () => {
      const w = window.innerWidth
      if (w >= 1024) setScreen("desktop")
      else if (w >= 768) setScreen("tablet")
      else setScreen("mobile")
    }
    updateScreen()
    window.addEventListener("resize", updateScreen)
    return () => window.removeEventListener("resize", updateScreen)
  }, [])

  const { scrollYProgress } = useScroll({
    container: containerRef ? { current: containerRef } : undefined,
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Section Observer
  useEffect(() => {
    if (!containerRef || loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(
              entry.target.id.replace("-module", "").toUpperCase()
            )
          }
        })
      },
      { root: containerRef, threshold: 0.6 }
    )
    const sections = containerRef.querySelectorAll("section")
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [containerRef, loading])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-mono text-primary selection:bg-primary/30">
      {/* HUD & NAVIGATION */}
      {!loading && screen !== "mobile" && (
        <>
          {/* Vertical Progress Bar */}
          <div className="fixed top-1/2 right-4 z-[60] flex h-80 w-6 -translate-y-1/2 flex-col items-center gap-3">
            <span className="text-[8px] tracking-[0.4em] uppercase [writing-mode:vertical-lr]">
              NAV_SYSTEM
            </span>
            <div className="relative w-[4px] flex-1 bg-primary/10">
              <motion.div
                className="absolute top-0 w-full bg-primary shadow-[0_0_15px_var(--primary)]"
                style={{ scaleY, originY: 0, height: "100%" }}
              />
            </div>
          </div>

          {/* Main HUD Overlays */}
          <div className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-10">
            <header className="flex items-start justify-between">
              <div className="space-y-1 border-l border-primary/50 pl-4">
                <span className="block text-[9px] tracking-[0.3em]">
                  SOL // ≈ 8.2 kpc | Orion Arm
                </span>
                <span className="block text-[8px] text-primary/40">
                  NODE_6x66_STABLE
                </span>
              </div>
              <div className="space-y-1 border-r border-primary/50 pr-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  <span className="text-[10px] tracking-[0.2em]">
                    ACTIVE_MODULE: {activeSection}
                  </span>
                </div>
                <p className="text-sm tabular-nums opacity-80">{time}</p>
              </div>
            </header>

            {/* --- COMPACT CENTERED NAVIGATION (Hidden on Mobile) --- */}
            {/* --- MICRO-HUD NAVIGATION --- */}
            <footer className="group hidden flex-col items-center justify-center pt-4 pb-2 md:flex">
              <div className="relative flex items-center gap-6">
                {/* Left Vector Data */}
                <div className="flex flex-col items-end opacity-20 transition-opacity duration-300 group-hover:opacity-40">
                  <span className="text-[5px] font-black tracking-[0.4em] uppercase">
                    PROC_0.4
                  </span>
                  <div className="h-[0.5px] w-3 bg-primary" />
                </div>

                {/* The Interactive Anchor (No Square) */}
                <button
                  onClick={handleScrollClick}
                  className="pointer-events-auto relative flex flex-col items-center"
                >
                  {/* HUD Tooltip (Minimalist) */}
                  <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="border-x border-primary/40 bg-primary/10 px-2 py-0.5 backdrop-blur-sm">
                      <span className="text-[7px] font-black tracking-[0.3em] whitespace-nowrap text-primary uppercase">
                        {activeSection === "GAMING" ? "RTN_TOP" : "FWD_LINK"}
                      </span>
                    </div>
                  </div>

                  {/* Floating Arrow (No container) */}
                  <motion.div
                    animate={{
                      y: activeSection === "GAMING" ? [0, -3, 0] : [0, 3, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="text-primary transition-all group-hover:scale-125 group-hover:drop-shadow-[0_0_5px_var(--primary)]"
                  >
                    {activeSection === "GAMING" ? (
                      <ArrowUp size={16} weight="bold" />
                    ) : (
                      <ArrowDown size={16} weight="bold" />
                    )}
                  </motion.div>

                  {/* Dynamic Status Text */}
                  <span className="absolute -bottom-4 text-[6px] font-bold tracking-[0.5em] text-primary/20 uppercase transition-colors group-hover:text-primary/60">
                    {activeSection}
                  </span>
                </button>

                {/* Right Vector Data */}
                <div className="flex flex-col items-start opacity-20 transition-opacity duration-300 group-hover:opacity-40">
                  <span className="text-[5px] font-black tracking-[0.4em] uppercase">
                    DIR_{activeSection === "GAMING" ? "UP" : "DN"}
                  </span>
                  <div className="h-[0.5px] w-3 bg-primary" />
                </div>
              </div>
            </footer>
          </div>
        </>
      )}

      {/* MAIN CONTENT */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <SystemLoader onComplete={() => setLoading(false)} />
          </motion.div>
        ) : (
          <div
            ref={setContainerRef}
            className={`hide-scrollbar relative z-10 w-full ${
              screen === "mobile"
                ? "overflow-auto"
                : "h-screen snap-y snap-mandatory overflow-y-auto"
            }`}
          >
            <section
              id="profile-module"
              className={`relative flex w-full ${screen === "mobile" ? "min-h-[auto] flex-col py-16" : "h-screen snap-start items-center justify-center overflow-hidden"}`}
            >
              {screen !== "mobile" && <SystemGridBackground />}

              <Profile />
            </section>

            <section
              id="contact-module"
              className={`relative flex w-full px-4 ${screen === "mobile" ? "flex-col py-16" : "h-screen snap-start items-center justify-center overflow-hidden"}`}
            >
              {screen !== "mobile" && <SolarSystemBackground />}

              <div className="relative z-20 w-full max-w-4xl">
                <ContactSection />
              </div>
            </section>

            <section
              id="gaming-module"
              className={`relative flex w-full px-4 ${screen === "mobile" ? "flex-col py-24" : "h-screen snap-start items-center justify-center overflow-hidden"}`}
            >
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT/0.03)_0%,transparent_70%)]" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative flex flex-col items-center gap-6 text-center"
              >
                <div className="relative h-28 w-28 items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-[0.2em] uppercase">
                    Game is still in production
                  </h2>
                  <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.3em] opacity-40">
                    <span className="flex items-center gap-1">
                      <Cpu size={12} /> HW_ACCEL
                    </span>
                    <span className="flex items-center gap-1">
                      <Terminal size={12} /> JS_ENGINE
                    </span>
                  </div>
                </div>
                <div className="mt-8 max-w-md border border-primary/20 bg-primary/5 p-8 backdrop-blur-sm">
                  <p className="text-xs leading-relaxed opacity-60">
                    SYSTEM_MSG: Accessing entertainment protocols. Mini-game
                    logic is currently being compiled into the kernel.
                  </p>
                  <div className="mt-6 flex justify-center gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="h-1 w-8 bg-primary"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-orbit { animation: orbit linear infinite; }
      `}</style>
    </div>
  )
}

const SystemGridBackground = () => (
  <div className="pointer-events-none absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,theme(colors.background.DEFAULT)_90%)]" />
  </div>
)

const SolarSystemBackground = () => {
  const planets = [
    { distance: 120, size: 12, duration: 15 },
    { distance: 180, size: 16, duration: 25, reverse: true },
    { distance: 240, size: 14, duration: 40 },
    { distance: 300, size: 20, duration: 60, glow: true, reverse: true },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 -right-20 h-[600px] w-[600px] -translate-y-1/2 md:h-[900px] md:w-[900px]">
        <motion.div
          className="pointer-events-auto absolute top-1/2 left-1/2 z-10 rounded-full border border-primary/50 bg-primary/30 shadow-[0_0_120px_var(--primary)]"
          style={{ width: 96, height: 96, x: "-50%", y: "-50%" }}
        />
        {planets.map((planet, idx) => (
          <div
            key={idx}
            className="absolute top-1/2 left-1/2 rounded-full border border-primary/20"
            style={{
              width: planet.distance * 2,
              height: planet.distance * 2,
              x: "-50%",
              y: "-50%",
              marginLeft: -planet.distance,
              marginTop: -planet.distance,
              animation: `orbit ${planet.duration}s linear infinite`,
              animationDirection: planet.reverse ? "reverse" : "normal",
            }}
          >
            <motion.div
              className="pointer-events-auto absolute top-1/2 left-0 rounded-full border border-primary/40 bg-background"
              style={{
                width: planet.size,
                height: planet.size,
                x: "-50%",
                y: "-50%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
