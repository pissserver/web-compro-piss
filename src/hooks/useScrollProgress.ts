import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

export function useScrollProgress() {
  const progress = useMotionValue(0)

  useEffect(() => {
    let frameId = 0

    const updateProgress = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
        progress.set(scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0)
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [progress])

  return progress
}
