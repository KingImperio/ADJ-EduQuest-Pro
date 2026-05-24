import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function AnimatedGridBackground() {
  const gridRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    
    let ticking = false
    const handleScroll = () => {
      if (!ticking && gridRef.current) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          // Move grid subtly based on scroll - reduced multiplier for less movement
          gridRef.current!.style.transform = `translateY(${scrollY * 0.01}px)`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-deep">
      {/* Base dotted grid */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Single animated layer only */}
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(245, 158, 11, 0.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'gridSweep1 20s ease-in-out infinite',
          }}
        />
      )}

      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 50% at 50% 50%,
              transparent 0%,
              rgba(15, 17, 23, 0.3) 60%,
              rgba(15, 17, 23, 0.6) 100%
            )
          `,
          ...(prefersReducedMotion ? {} : { animation: 'waveFade 15s ease-in-out infinite' }),
        }}
      />
    </div>
  )
}
