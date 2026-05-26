import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Direction = 'up' | 'left' | 'right' | 'scale'

interface ScrollRevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
}

const initialTransforms: Record<Direction, string> = {
  up: 'translateY(40px)',
  left: 'translateX(-60px)',
  right: 'translateX(60px)',
  scale: 'scale(0.8)',
}

const visibleTransforms: Record<Direction, string> = {
  up: 'translateY(0)',
  left: 'translateX(0)',
  right: 'translateX(0)',
  scale: 'scale(1)',
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

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
      { threshold: 0.2 }
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [prefersReducedMotion])

  const style: CSSProperties = prefersReducedMotion
    ? {}
    : {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? visibleTransforms[direction] : initialTransforms[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: isVisible ? undefined : 'opacity, transform',
      }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
