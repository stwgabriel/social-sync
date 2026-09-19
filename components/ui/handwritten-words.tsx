"use client"

import { useEffect, useId, useRef, useState, type CSSProperties } from "react"

const FONT_URL = "/fonts/caveat.ttf"

// Parsing the Caveat file is the expensive part, so one instance is shared
// across languages and across every scroll replay. Keyed by the settings that
// are baked into the constructor.
const instances = new Map<string, Promise<any>>()

function getInstance(color: string, fontSize: number, duration: number, stagger: number) {
  const key = [color, fontSize, duration, stagger].join("/")
  let instance = instances.get(key)

  if (!instance) {
    instance = (async () => {
      const mod: any = await import("svg-text-animate")
      const SVGTextAnimate = mod.default ?? mod
      const created = new SVGTextAnimate(
        FONT_URL,
        { duration, delay: stagger, mode: "delay", "fill-mode": "forwards" },
        { stroke: color, "stroke-width": "1px", "font-size": fontSize, "fill-color": color },
      )
      await created.setFont()
      return created
    })()
    instances.set(key, instance)
  }

  return instance
}

type HandwrittenWordsProps = {
  words: readonly string[]
  /** Each word draws itself while true, and clears when it goes false. */
  play: boolean
  color: string
  fontSize: number
  duration?: number
  /** Gap between letters inside a word, so each word writes left to right. */
  stagger?: number
  /** Gap between words, so the column writes top to bottom. */
  wordDelay?: number
  className?: string
  wordClassName?: string
  wordStyle?: (index: number) => CSSProperties
}

export function HandwrittenWords({
  words,
  play,
  color,
  fontSize,
  duration = 620,
  stagger = 75,
  wordDelay = 560,
  className,
  wordClassName,
  wordStyle,
}: HandwrittenWordsProps) {
  // useId contains colons, which are not valid inside a CSS selector.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "")
  const hosts = useRef<(HTMLDivElement | null)[]>([])
  // Falls back to ordinary Caveat text when motion is reduced or the font
  // fails to load, so the words are never simply missing.
  const [plain, setPlain] = useState(false)
  const signature = words.join("/")

  useEffect(() => {
    if (!play || plain) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlain(true)
      return
    }

    let cancelled = false

    getInstance(color, fontSize, duration, stagger)
      .then((instance) => {
        if (cancelled) return
        words.forEach((word, index) => {
          const host = hosts.current[index]
          if (!host) return

          instance.create(word, "#" + uid + "-w" + index)
          if (index === 0) return

          // The library gives every word the same start time. Pushing each
          // word back by its position is what makes the column read top to
          // bottom instead of all four words writing at once. Every glyph
          // keeps its own left-to-right offset on top of this.
          const offset = index * wordDelay
          host.querySelectorAll("path").forEach((path) => {
            const own = parseFloat(getComputedStyle(path).animationDelay) * 1000
            ;(path as SVGPathElement).style.animationDelay = own + offset + "ms"
          })
        })
      })
      .catch(() => {
        if (!cancelled) setPlain(true)
      })

    return () => {
      cancelled = true
      // Clearing means re-entering the section draws the words again.
      hosts.current.forEach((host) => {
        if (host) host.replaceChildren()
      })
    }
  }, [play, plain, color, fontSize, duration, stagger, wordDelay, uid, signature, words])

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <div className={className} aria-hidden="true">
        {words.map((word, index) => (
          <div
            key={word}
            id={uid + "-w" + index}
            ref={(el) => {
              hosts.current[index] = el
            }}
            className={wordClassName}
            style={wordStyle?.(index)}
          >
            {/* Left empty so the library owns this node, unless we fell back. */}
            {plain ? word : null}
          </div>
        ))}
      </div>
    </>
  )
}
