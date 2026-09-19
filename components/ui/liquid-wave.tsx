import { cn } from "@/lib/utils"

// Two identical wave periods across the viewBox, so translating the strip by
// -50% lands exactly one period later and the loop has no visible seam.
const WAVE_FRONT =
  "M0,55 C240,16 480,16 720,55 C960,94 1200,94 1440,55 C1680,16 1920,16 2160,55 C2400,94 2640,94 2880,55 L2880,111 L0,111 Z"
const WAVE_BACK =
  "M0,64 C240,30 480,30 720,64 C960,98 1200,98 1440,64 C1680,30 1920,30 2160,64 C2400,98 2640,98 2880,64 L2880,111 L0,111 Z"

type LiquidWaveProps = {
  fill: string
  className?: string
  shadow?: string
}

export function LiquidWave({ fill, className, shadow }: LiquidWaveProps) {
  return (
    <div className={cn("pointer-events-none overflow-hidden", className)} aria-hidden="true">
      <div className="liquid-wave-track liquid-wave-back">
        <svg className="h-full w-full" viewBox="0 0 2880 110" preserveAspectRatio="none">
          <path d={WAVE_BACK} fill={fill} opacity="0.5" />
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
