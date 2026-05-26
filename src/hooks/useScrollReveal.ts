import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Hook that returns a ref and visibility state for scroll-triggered reveals.
 * Uses IntersectionObserver with threshold 0.2.
 *
 * Usage:
 *   const { ref, isVisible } = useScrollReveal()
 *   return <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>...</div>
 */
export function useScrollReveal(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If user prefers reduced motion, mark visible immediately
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [prefersReducedMotion, threshold])

  return { ref, isVisible }
}
