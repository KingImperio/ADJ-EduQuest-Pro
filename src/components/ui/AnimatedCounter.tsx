import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

/** easeOutCubic — matches the showcase's 1 - (1 - t)^3 easing */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState('0')
  const [hasAnimated, setHasAnimated] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If reduced motion, show final value immediately
    if (prefersReducedMotion) {
      setDisplay(value.toLocaleString())
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el)
          setHasAnimated(true)

          const start = performance.now()

          function tick(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = easeOutCubic(progress)
            const current = Math.floor(value * eased)

            setDisplay(current.toLocaleString())

            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              setDisplay(value.toLocaleString())
            }
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [value, duration, prefersReducedMotion])

  return (
    <span
      ref={ref}
      className={`terminal-value ${className}`}
      style={{
        opacity: hasAnimated ? 1 : 0,
        transition: 'opacity 0.4s ease-out',
      }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
