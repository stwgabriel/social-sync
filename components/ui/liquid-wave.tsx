import { cn } from "@/lib/utils"

// Two identical wave periods across the viewBox, so translating a strip by
// -50% lands exactly one period later and the loop has no visible seam.
// The back wave rides ~9 units higher than the front so it actually shows
// above it; the two scroll at different speeds, so the amount of back wave
// peeking over the front keeps changing, which is what reads as liquid.
const WAVE_FRONT =
  "M0,55 C240,16 480,16 720,55 C960,94 1200,94 1440,55 C1680,16 1920,16 2160,55 C2400,94 2640,94 2880,55 L2880,111 L0,111 Z"
const WAVE_BACK =
  "M0,46 C240,7 480,7 720,46 C960,85 1200,85 1440,46 C1680,7 1920,7 2160,46 C2400,85 2640,85 2880,46 L2880,111 L0,111 Z"

type LiquidWaveProps = {
  /** Colour of the leading wave. Usually the section the wave flows into. */
  fill: string
  /** Colour of the trailing wave. Defaults to `fill` for a single-tone edge. */
  backFill?: string
  backOpacity?: number
  className?: string
  shadow?: string
}

export function LiquidWave({ fill, backFill, backOpacity, className, shadow }: LiquidWaveProps) {
  const trailing = backFill ?? fill
  // A distinct trailing colour is meant to read as its own band, so it stays
  // opaque; a same-colour trailing wave is just a soft echo of the front.
  const trailingOpacity = backOpacity ?? (backFill ? 1 : 0.5)

  return (
    <div className={cn("pointer-events-none relative overflow-hidden", className)} aria-hidden="true">
      <div className="liquid-wave-track liquid-wave-back">
        <svg className="h-full w-full" viewBox="0 0 2880 110" preserveAspectRatio="none">
          <path d={WAVE_BACK} fill={trailing} opacity={trailingOpacity} />
        </svg>
      </div>
      <div className="liquid-wave-track liquid-wave-front">
        <svg className="h-full w-full" viewBox="0 0 2880 110" preserveAspectRatio="none">
          <path d={WAVE_FRONT} fill={fill} style={shadow ? { filter: `drop-shadow(${shadow})` } : undefined} />
        </svg>
      </div>
    </div>
  )
}
