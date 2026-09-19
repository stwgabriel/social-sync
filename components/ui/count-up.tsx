"use client"

import { useEffect, useRef, useState } from "react"

/** Splits "96%" into 96 and "%", or "3x" into 3 and "x". */
function parse(value: string) {
  const match = value.match(/^([^0-9-]*)(-?[0-9]+(?:[.,][0-9]+)?)(.*)$/)
  if (!match) return null
  return {
    prefix: match[1],
    target: Number(match[2].replace(",", ".")),
    suffix: match[3],
    decimals: (match[2].split(/[.,]/)[1] || "").length,
  }
}

type CountUpProps = {
  /** The finished figure, punctuation and all: "50+", "3x", "96%". */
  value: string
  play: boolean
  durationMs?: number
  className?: string
}

export function CountUp({ value, play, durationMs = 1400, className }: CountUpProps) {
  const parsed = parse(value)
  const [shown, setShown] = useState(() => (parsed ? parsed.prefix + "0" + parsed.suffix : value))
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (!parsed) return

    // Anyone who asked for less motion just gets the number.
    if (!play || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value)
      return
    }

    const started = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / durationMs)
      // Fast out of the gate, easing into the final figure.
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = (parsed.target * eased).toFixed(parsed.decimals)
      setShown(parsed.prefix + current + parsed.suffix)
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [play, value, durationMs, parsed?.target, parsed?.prefix, parsed?.suffix, parsed?.decimals])

  // The finished value stays in the accessibility tree; the ticking digits are
  // decorative and would otherwise be announced on every frame.
  return (
    <span className={className}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
