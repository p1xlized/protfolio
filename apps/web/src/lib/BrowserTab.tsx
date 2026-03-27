import { useEffect, useRef } from "react"

type UseBrowserTabOptions = {
  section: string
  appSuffix?: string
  switchInterval?: number
  spinnerInterval?: number
}

export function useBrowserTab({
  section,
  appSuffix = "MY PORTFOLIO",
}: UseBrowserTabOptions) {
  const faviconRef = useRef<HTMLLinkElement | null>(null)
  const intervalRef = useRef<number | null>(null)

  // Draw a subtle spaceship favicon
  const drawFavicon = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dark background
    ctx.fillStyle = "#111"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Slight subtle thruster pulse
    const pulse = (Math.sin(Date.now() / 500) + 1) / 2 // slower pulse

    ctx.fillStyle = "#fff"

    // Nose cone
    ctx.beginPath()
    ctx.moveTo(16, 12)
    ctx.lineTo(48, 12)
    ctx.lineTo(32, 28)
    ctx.closePath()
    ctx.fill()

    // Wings
    ctx.fillRect(12, 28, 8, 12) // left
    ctx.fillRect(44, 28, 8, 12) // right

    // Center body
    ctx.fillRect(24, 28, 16, 16)

    // Thruster / tail (pulsing subtly)
    ctx.fillStyle = `rgba(255,255,255,${0.4 + pulse * 0.2})`
    ctx.fillRect(24, 44, 16, 8)

    if (faviconRef.current)
      faviconRef.current.href = canvas.toDataURL("image/png")
  }

  useEffect(() => {
    if (!faviconRef.current) {
      let link: HTMLLinkElement | null =
        document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement("link")
        link.rel = "icon"
        document.head.appendChild(link)
      }
      faviconRef.current = link
    }

    // Set a single interval just to subtly animate the thruster
    drawFavicon()
    intervalRef.current = window.setInterval(drawFavicon, 500)

    // Static, readable title
    document.title = `${section} – ${appSuffix}`

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [section, appSuffix])
}
type UseMusicTabOptions = {
  isPlaying: boolean
  songTitle?: string
  appSuffix?: string
  visualizerInterval?: number
  tabWidth?: number // how many characters wide the tab title is
}

/**
 * Music tab hook: scrolling title when paused + full-width visualizer when playing
 */
export function useMusicTab({
  isPlaying,
  songTitle = "TBA",
  appSuffix = "MY MUSIC",
  visualizerInterval = 120,
  tabWidth = 16,
}: UseMusicTabOptions) {
  const intervalRef = useRef<number | null>(null)
  const scrollIndex = useRef(0)
  const barHeights = useRef<Array<number>>([0, 0, 0, 0, 0, 0, 0, 0])

  const levels = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"]

  const generateBars = () => {
    return barHeights.current
      .map((_, i) => {
        const level = levels[Math.floor(Math.random() * levels.length)]
        barHeights.current[i] = levels.indexOf(level)
        return level
      })
      .join("")
  }

  const scrollText = (text: string, index: number, width: number) => {
    const padded = text + " ".repeat(width)
    const start = index % padded.length
    return (padded + padded).substring(start, start + width)
  }

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = window.setInterval(() => {
      if (isPlaying) {
        // Full-width visualizer
        let bars = ""
        while (bars.length < tabWidth) {
          bars += generateBars()
        }
        document.title = bars.slice(0, tabWidth)
      } else {
        // Scrolling song title + app suffix
        const text = `${songTitle} – ${appSuffix}`
        document.title = scrollText(text, scrollIndex.current, tabWidth)
        scrollIndex.current += 1
      }
    }, visualizerInterval)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, songTitle, appSuffix, visualizerInterval, tabWidth])
}
