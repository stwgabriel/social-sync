"use client"

import type { ReactNode } from "react"
import { BorderBeam } from "border-beam"
import { cn } from "@/lib/utils"

type CtaBeamProps = {
  children: ReactNode
  className?: string
  theme?: "light" | "dark"
  variant?: "colorful" | "mono" | "ocean" | "sunset"
  strength?: number
}

export function CtaBeam({
  children,
  className,
  theme = "dark",
  variant = "colorful",
  strength = 0.7,
}: CtaBeamProps) {
  return (
    <BorderBeam
      size="sm"
      colorVariant={variant}
      strength={strength}
      theme={theme}
      borderRadius={999}
      className={cn("w-fit rounded-full", className)}
    >
      {children}
    </BorderBeam>
  )
}
