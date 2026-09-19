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
  stagger?: number
  className?: string
  wordClassName?: string
  wordStyle?: (index: number) => CSSProperties
}

export function HandwrittenWords({
  words,
  play,
  color,
  fontSize,
  duration = 850,
  stagger = 110,
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
          if (hosts.current[index]) instance.create(word, "#" + uid + "-w" + index)
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
  }, [play, plain, color, fontSize, duration, stagger, uid, signature, words])

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
