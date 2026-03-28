"use client"

import { useMemo } from "react"
import { motion, useTransform } from "framer-motion"

const SpaceParallax = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const nebulaY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"])

  // 1. NEBULA FIELD: Irregular gas clouds
  const nebulaField = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      width: Math.random() * 400 + 200,
      height: Math.random() * 250 + 150,
      color: `var(--chart-${(i % 4) + 1})`,
      opacity: Math.random() * 0.1 + 0.05, // Increased visibility
      rotate: Math.random() * 360,
      borderRadius: `${Math.random() * 60 + 40}% ${Math.random() * 40 + 20}%`,
    }));
  }, []);

  // 2. STARFIELD: High-density moving stars
  const starfield = useMemo(() => {
    return [...Array(300)].map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() > 0.85 ? Math.random() * 3 + 2.5 : Math.random() * 1.5 + 0.8,
      // Random drift vectors for CSS animation
      tx: (Math.random() - 0.5) * 60,
      ty: (Math.random() - 0.5) * 60,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-background">
      {/* Cinematic Grain */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* --- LAYER 1: ORGANIC NEBULAS --- */}
      <motion.div style={{ y: nebulaY }} className="absolute inset-0 pointer-events-none will-change-transform">
        {nebulaField.map((n) => (
          <div
            key={`nebula-${n.id}`}
            className="absolute blur-[100px]"
            style={{
              top: `${n.top}%`,
              left: `${n.left}%`,
              width: n.width,
              height: n.height,
              backgroundColor: n.color,
              opacity: n.opacity,
              borderRadius: n.borderRadius,
              transform: `translate(-50%, -50%) rotate(${n.rotate}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* --- LAYER 2: MOVING STARFIELD --- */}
      <motion.div style={{ y: starsY }} className="absolute inset-0 pointer-events-none will-change-transform">
        {starfield.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-primary"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: star.size > 3.5 ? `0 0 10px var(--primary)` : 'none',
              // Performance-first CSS animation
              animation: `drift ${star.duration}s linear ${star.delay}s infinite alternate`,
              // @ts-ignore - custom properties for the keyframe
              '--tx': `${star.tx}px`,
              '--ty': `${star.ty}px`,
            } as any}
          />
        ))}
      </motion.div>

      <style jsx global>{`
        @keyframes drift {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(var(--tx), var(--ty), 0); }
        }
      `}</style>
    </div>
  )
}

export default SpaceParallax;
