"use client"

import { useInView, type IntersectionOptions } from "react-intersection-observer"

/**
 * Testing switch. While true, every scroll-reveal on the landing page replays
 * each time its section comes back into view. Set to false to go back to
 * playing once per page load.
 */
export const REPLAY_REVEALS_ON_SCROLL = true

export function useReveal(options: IntersectionOptions = {}) {
  return useInView({ ...options, triggerOnce: !REPLAY_REVEALS_ON_SCROLL })
}
