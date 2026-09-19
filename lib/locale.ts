"use client"

import { useLanguage } from "@/components/language-provider"

/**
 * Prefixes an internal path with the active locale, so every link keeps the
 * reader in the language they are already reading. Anchors and external URLs
 * are returned untouched.
 */
export function useLocaleHref() {
  const { language } = useLanguage()
  return (path: string) => {
    if (!path.startsWith("/")) return path
    return path === "/" ? `/${language}` : `/${language}${path}`
  }
}
