"use client"

import * as React from "react"
import { useStore } from "@tanstack/react-store"
import { AnimatePresence, motion } from "framer-motion"
import * as react from "@phosphor-icons/react"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { Moon, Sun } from "@phosphor-icons/react"
import { navbarStore } from "@/lib/store"
import { cn } from "@/lib/utils"

// --- 1. CONFIGURATION (Removed BLOG) ---
const navItems = [
  { name: "PROJECTS", path: "/projects", id: "01" },
  { name: "MUSIC", path: "/music", id: "02" },
]

const RecordingAperture = () => (
  <div className="relative flex h-10 w-10 items-center justify-center">
    {/* Outer Ring */}
    <div className="absolute inset-0 rounded-full border border-primary/20" />

    {/* Rotating Aperture Blades */}
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute h-7 w-7 text-primary/60"
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <path
          id="blade-small"
          d="M50 15 L58 42 L50 50 L42 42 Z"
          fill="currentColor"
        />
      </defs>
      {[...Array(6)].map((_, i) => (
        <use
          key={i}
          href="#blade-small"
          transform={`rotate(${i * 60} 50 50)`}
          opacity={0.7 - i * 0.08}
        />
      ))}
    </motion.svg>

    {/* Central Lens Core */}
    <div className="relative flex h-4 w-4 items-center justify-center rounded-full border border-primary/10 bg-background">
      <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
    </div>

    {/* Minimal REC Indicator */}
    <motion.div
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute -top-1 -right-1 h-1 w-1 rounded-full bg-primary"
    />

    {/* HUD Corner Brackets (Smaller/Thinner) */}
    {[
      "top-0 left-0 border-l border-t",
      "top-0 right-0 border-r border-t",
      "bottom-0 left-0 border-l border-b",
      "bottom-0 right-0 border-r border-b",
    ].map((pos, i) => (
      <div
        key={i}
        className={`absolute h-1.5 w-1.5 border-primary/30 ${pos}`}
      />
    ))}
  </div>
)
export const MothershipLogo = () => (
  <div className="group flex cursor-pointer items-center gap-3 select-none">
    <div className="relative">
      <svg
        viewBox="0 0 100 100"
        className="h-7 w-7 text-primary transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-[360deg]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Exterior Armor Plates / Satellite Array */}
        <path
          d="M50 5 L65 20 M35 20 L50 5 M10 40 L25 50 L10 60 M90 40 L75 50 L90 60"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-60"
        />

        {/* Main Superstructure (The Core Frame) */}
        <path
          d="M30 35 H70 L80 50 L70 65 H30 L20 50 Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Interior Mechanical Detail / Radiators */}
        <path
          d="M35 45 V55 M42 45 V55 M58 45 V55 M65 45 V55"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="group-hover:stroke-primary/80"
        />

        {/* Central Core (The Engine) */}
        <circle
          cx="50"
          cy="50"
          r="6"
          fill="currentColor"
          className="animate-pulse shadow-xl shadow-primary"
        />

        {/* Top/Bottom Sensor Spires */}
        <path
          d="M50 20 V35 M50 65 V80"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Subtle Glow Effect behind the ship on hover */}
      <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
    </div>

    <span className="text-[14px] tracking-[0.2em] text-primary/20 uppercase transition-colors duration-300 group-hover:text-primary">
      @p1xlized
    </span>
  </div>
)
// --- UPDATED MOBILE DRAWER ---
const MobileDrawer = ({ currentPath, onNavigate, onClose, theme }: any) => (
  <motion.div
    initial={{ opacity: 0, x: "100%" }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: "100%" }}
    transition={{ type: "spring", damping: 25, stiffness: 200 }}
    className="fixed inset-0 z-[150] flex flex-col bg-background/20 backdrop-blur-md font-mono"
  >
    <div className="pointer-events-none absolute inset-0 " />

    <div className="flex h-20 items-center justify-between px-8 md:px-12">
      <MothershipLogo />
      <button onClick={onClose} className="p-2 text-primary active:scale-90">
        <react.X size={32} weight="thin" />
      </button>
    </div>

    <nav className="flex flex-1 flex-col justify-center gap-12 px-12">
      {navItems.map((item, i) => (
        <motion.button
          key={item.name}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => {
            onNavigate(item.path)
            onClose() // <-- CRITICAL FIX: Closes drawer on click
          }}
          className="group flex flex-col items-start"
        >
          <span className="mb-1 text-[10px] tracking-[0.4em] text-primary/20">
            // {item.id}
          </span>
          <span
            className={cn(
              "text-5xl font-black tracking-tighter uppercase transition-all",
              currentPath === item.path
                ? "text-primary drop-shadow-[0_0_10px_var(--primary)]"
                : "text-primary/30"
            )}
          >
            {item.name}
          </span>
        </motion.button>
      ))}
    </nav>

    <div className="flex items-center justify-between p-12 pb-16">
      <div className="flex flex-col gap-1">
        <span className="text-[8px] font-bold tracking-widest text-primary/40 uppercase">
          System_Active
        </span>
        <span className="text-[10px] font-black text-primary uppercase">
          {theme}_MODE
        </span>
      </div>
      <RecordingAperture />
    </div>
  </motion.div>
)

interface ThemeOverlayProps {
  theme: string
}

export const ThemeOverlay = ({ theme }: ThemeOverlayProps) => {
  const isDark = theme === "dark"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-background/80 font-mono backdrop-blur-md"
    >
      {/* Background Pulse Color */}
      <div
        className={cn(
          "absolute inset-0 opacity-5 transition-colors duration-1000",
          isDark ? "bg-blue-500" : "bg-amber-500"
        )}
      />

      {/* Retro Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,150,147,0.03)_1px,transparent_1px)] bg-[size:100%_3px]" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Phosphor Celestial Icon */}
        <motion.div
          initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-primary drop-shadow-[0_0_15px_var(--primary)]"
        >
          {isDark ? (
            <react.MoonStars size={48} weight="duotone" />
          ) : (
            <react.Sun size={48} weight="duotone" />
          )}
        </motion.div>

        <div className="flex flex-col items-center border-y border-primary/20 px-20 py-10">
          {/* Header Text */}
          <motion.span
            initial={{ letterSpacing: "0.2em", opacity: 0 }}
            animate={{ letterSpacing: "0.6em", opacity: 1 }}
            className="text-[14px] font-black text-primary uppercase"
          >
            {isDark ? "Lunar_Cycle_Active" : "Solar_Cycle_Active"}
          </motion.span>

          {/* Glowing Divider Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            className="mt-3 h-[1px] bg-primary shadow-[0_0_15px_var(--primary)]"
          />

          {/* Subtitle Details */}
          <div className="mt-4 flex flex-col items-center gap-1">
            <span className="text-[7px] tracking-[0.4em] text-primary/40 uppercase">
              Environment: {theme.toUpperCase()}_MODE
            </span>
            <span className="text-[6px] tracking-[0.2em] text-primary/20 uppercase">
              Atmospheric_Shift_Complete
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
// --- UPDATED NAVBAR (With improved mobile padding) ---
export const Navbar = () => {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("theme") || "dark"
    return "dark"
  })

  const [showOverlay, setShowOverlay] = React.useState(false)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault()
    const newTheme = theme === "dark" ? "light" : "dark"
    setShowOverlay(true)
    setTheme(newTheme)
    setTimeout(() => setShowOverlay(false), 1200)
  }

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <AnimatePresence>
        {showOverlay && <ThemeOverlay theme={theme} />}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileOpen && (
          <MobileDrawer
            theme={theme}
            currentPath={location.pathname}
            onNavigate={(path: string) => navigate({ to: path as any })}
            onClose={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 z-[100] w-full font-mono md:top-4">
        {/* Responsive padding: px-8 for small screens, px-12 for desktop center-alignment */}
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8 md:justify-center md:gap-12 md:px-12">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex shrink-0 transition-transform active:scale-90"
          >
            <MothershipLogo />
          </button>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate({ to: item.path as any })}
                className={cn(
                  "text-[10px] font-black tracking-[0.4em] transition-all",
                  location.pathname === item.path
                    ? "text-primary drop-shadow-[0_0_8px_var(--primary)]"
                    : "text-primary/20 hover:text-primary/60"
                )}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6 md:gap-12">
            {/* The Bare Switch */}
            <button
              onClick={toggleTheme}
              className="relative flex h-8 items-center px-3 transition-opacity select-none active:scale-95"
            >
              {/* Track */}
              <div className="relative h-2.5 w-14 rounded-full border border-primary/20 bg-primary/5">
                {/* Sliding knob */}
                <motion.div
                  animate={{
                    x: theme === "dark" ? 0 : 56 - 20, // Track width (56px) - Knob width (20px)
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className={cn(
                    "absolute top-0 left-0 h-2.5 w-5 rounded-full shadow-[0_0_8px_var(--primary)]",
                    theme === "dark" ? "bg-primary" : "bg-primary/80"
                  )}
                />
              </div>

              {/* Icon */}
              <div className="ml-2 text-primary">
                {theme === "dark" ? (
                  <Moon size={14} weight="fill" className="animate-pulse" />
                ) : (
                  <Sun size={14} weight="fill" className="animate-pulse" />
                )}
              </div>
            </button>

            <RecordingAperture className="hidden md:flex" />

            {/* Mobile Trigger with glow */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="flex flex-col items-end gap-1.5 p-2 text-primary md:hidden"
            >
              <div className="h-px w-6 bg-primary shadow-[0_0_8px_var(--primary)]" />
              <div className="h-px w-4 bg-primary/40" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
export default Navbar
