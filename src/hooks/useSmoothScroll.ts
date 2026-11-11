import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    let rafId = 0

    const loop = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [enabled])
}
