import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { memo } from 'react'

const AnimatedGradientBackground = memo(function AnimatedGradientBackground() {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-deep" />
      
      {/* Animated gradient orbs - reduced count and size for performance */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(30,63,204,0.3) 0%, transparent 70%)',
          willChange: 'transform',
        }}
        animate={{
          x: prefersReducedMotion ? 0 : [0, 100, -50, 0],
          y: prefersReducedMotion ? 0 : [0, -75, 50, 0],
          scale: prefersReducedMotion ? 1 : [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '-10%', y: '5%' }}
      />
      
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-12 blur-[70px]"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)',
          willChange: 'transform',
        }}
        animate={{
          x: prefersReducedMotion ? 0 : [0, -100, 100, 0],
          y: prefersReducedMotion ? 0 : [0, 60, -80, 0],
          scale: prefersReducedMotion ? 1 : [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        initial={{ x: '50%', y: '15%' }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
})

export default AnimatedGradientBackground
