"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

// Two identical wave periods across the viewBox, so translating a strip by
// -50% lands exactly one period later and the loop has no visible seam.
// The back wave rides ~9 units higher than the front so it actually shows
// above it; the two scroll at different speeds, so the amount of back wave
// peeking over the front keeps changing, which is what reads as liquid.
const CREST_FRONT =
  "M0,55 C240,16 480,16 720,55 C960,94 1200,94 1440,55 C1680,16 1920,16 2160,55 C2400,94 2640,94 2880,55"
const CREST_BACK =
  "M0,46 C240,7 480,7 720,46 C960,85 1200,85 1440,46 C1680,7 1920,7 2160,46 C2400,85 2640,85 2880,46"
const FILLED = " L2880,111 L0,111 Z"

const WAVE_FRONT = CREST_FRONT + FILLED
const WAVE_BACK = CREST_BACK + FILLED

type LiquidWaveProps = {
  /** Colour of the leading wave. Usually the section the wave flows into. */
  fill: string
  /** Colour of the trailing wave. Defaults to `fill` for a single-tone edge. */
  backFill?: string
  backOpacity?: number
  /**
   * Light laid over the crest. It fades to nothing before the bottom edge, so
   * the very last row of pixels still matches the section exactly and the
   * join stays invisible.
   */
  pink?: string
  pinkStrength?: number
  /** Paper fibre strength. Set to 0 for a flat wave. */
  grain?: number
  className?: string
  shadow?: string
}

export function LiquidWave({
  fill,
  backFill,
  backOpacity,
  pink = "#DE5B80",
  pinkStrength = 0.5,
  grain = 0.32,
  className,
  shadow,
}: LiquidWaveProps) {
  // Filter and clip ids have to be unique per instance or the four borders
  // would all resolve to whichever one rendered first.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "")
  const clipId = `wave-clip-${uid}`
  const washId = `wave-wash-${uid}`
  const grainId = `wave-grain-${uid}`

  const trailing = backFill ?? fill
  const trailingOpacity = backOpacity ?? (backFill ? 1 : 0.5)

  return (
    <div className={cn("pointer-events-none relative overflow-hidden", className)} aria-hidden="true">
      <div className="liquid-wave-track liquid-wave-back">
        <svg className="h-full w-full" viewBox="0 0 2880 110" preserveAspectRatio="none">
          <path d={WAVE_BACK} fill={trailing} opacity={trailingOpacity} />
          {/* The trailing sheet catches a little less light than the front one. */}
          <path
            d={CREST_BACK}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.2"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="liquid-wave-track liquid-wave-front">
        <svg className="h-full w-full" viewBox="0 0 2880 110" preserveAspectRatio="none">
          <defs>
            <clipPath id={clipId}>
              <path d={WAVE_FRONT} />
            </clipPath>
            <linearGradient id={washId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={pink} stopOpacity={pinkStrength} />
              <stop offset="0.5" stopColor={pink} stopOpacity={pinkStrength * 0.32} />
              <stop offset="1" stopColor={pink} stopOpacity="0" />
            </linearGradient>
            {/* Stretched noise: the viewBox is squashed horizontally on the way
                to the screen, which pulls the speckle into fibres running with
                the wave, the way paper stock does. */}
            <filter id={grainId} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.7 1.4" numOctaves="4" stitchTiles="stitch" seed="7" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>

          <path
            d={WAVE_FRONT}
            fill={fill}
            style={shadow ? { filter: `drop-shadow(${shadow})` } : undefined}
          />

          <rect x="0" y="0" width="2880" height="111" fill={`url(#${washId})`} clipPath={`url(#${clipId})`} />

          {grain > 0 ? (
            <g clipPath={`url(#${clipId})`} opacity={grain} style={{ mixBlendMode: "overlay" }}>
              <rect x="0" y="0" width="2880" height="111" filter={`url(#${grainId})`} />
            </g>
          ) : null}

          {/* The lit edge of the sheet. */}
          <path
            d={CREST_FRONT}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.38"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  )
}
