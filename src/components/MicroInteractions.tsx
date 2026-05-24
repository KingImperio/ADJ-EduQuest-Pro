// Micro-Interaction Components for Delightful UX
import { motion, useMotionValue, useSpring, useTransform, animate as framerAnimate } from 'framer-motion'
import { useState, useRef, useEffect, useMemo } from 'react'

// ============================================
// 1. Magnetic Button - follows cursor slightly
// ============================================
interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  strength?: number // 0-1, how much it follows
}

export function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  disabled = false,
  strength = 0.3 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = (e.clientX - centerX) * strength
    const distY = (e.clientY - centerY) * strength
    x.set(distX)
    y.set(distY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

// ============================================
// 2. Ripple Effect on Click
// ============================================
interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  rippleColor?: string
}

export function RippleButton({ 
  children, 
  className = '', 
  onClick,
  rippleColor = 'rgba(255, 255, 255, 0.3)'
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    
    setRipples(prev => [...prev, { x, y, id }])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 600)
    
    onClick?.()
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
            borderRadius: '50%',
            backgroundColor: rippleColor,
            pointerEvents: 'none',
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// ============================================
// 3. Floating Particles Background
// ============================================
interface FloatingParticlesProps {
  count?: number
  color?: string
}

export function FloatingParticles({ count = 8, color = 'rgba(45, 82, 232, 0.12)' }: FloatingParticlesProps) {
  const particles = useMemo(() => 
    [...Array(count)].map(() => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xDrift: Math.random() * 15 - 7,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 2,
    }))
  , [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            backgroundColor: color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xDrift, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// 4. Text Reveal - Letter by Letter
// ============================================
interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export function TextReveal({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.03 
}: TextRevealProps) {
  const letters = text.split('')
  
  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * staggerDelay,
            ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
          }}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

// ============================================
// 5. Pulse Glow Effect
// ============================================
interface PulseGlowProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  intensity?: number
}

export function PulseGlow({ 
  children, 
  className = '',
  glowColor = 'rgba(45, 82, 232, 0.5)',
  intensity = 20
}: PulseGlowProps) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 ${intensity}px ${glowColor}`,
          `0 0 ${intensity * 2}px ${glowColor}`,
          `0 0 ${intensity}px ${glowColor}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 6. Breathing Scale Animation
// ============================================
interface BreathingProps {
  children: React.ReactNode
  className?: string
  scale?: [number, number]
  duration?: number
}

export function Breathing({ 
  children, 
  className = '',
  scale = [1, 1.05],
  duration = 3
}: BreathingProps) {
  return (
    <motion.div
      className={className}
      animate={{ scale: scale }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 7. Shake Animation (for errors)
// ============================================
interface ShakeProps {
  children: React.ReactNode
  className?: string
  trigger: boolean
  onComplete?: () => void
}

export function Shake({ 
  children, 
  className = '',
  trigger,
  onComplete
}: ShakeProps) {
  return (
    <motion.div
      className={className}
      animate={trigger ? {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      } : {}}
      onAnimationComplete={onComplete}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 8. Counter Animation
// ============================================
interface CounterProps {
  value: number
  className?: string
  duration?: number
  suffix?: string
  prefix?: string
}

export function Counter({ 
  value, 
  className = '',
  duration = 1,
  suffix = '',
  prefix = ''
}: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = framerAnimate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v: number) => setDisplayValue(Math.round(v))
    })
    
    return () => controls.stop()
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

// ============================================
// 9. Stagger Container - for lists
// ============================================
interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    }
  },
}

export function StaggerContainer({ 
  children, 
  className = ''
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ 
  children, 
  className = '' 
}: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}

// ============================================
// 10. Confetti Burst
// ============================================
interface ConfettiPiece {
  id: number
  color: string
  x: number
  rotation: number
}

export function useConfetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  const burst = () => {
    const colors = ['#1E3FCC', '#10B981', '#F59E0B', '#FF6B6B', '#8B5CF6']
    const newConfetti = [...Array(30)].map((_, i) => ({
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 200 - 100,
      rotation: Math.random() * 720 - 360,
    }))
    
    setConfetti(newConfetti)
    
    setTimeout(() => setConfetti([]), 2000)
  }

  const ConfettiComponent = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            y: -10, 
            x: window.innerWidth / 2,
            opacity: 1,
            rotate: 0,
            scale: 1
          }}
          animate={{ 
            y: window.innerHeight + 100,
            x: window.innerWidth / 2 + piece.x,
            opacity: 0,
            rotate: piece.rotation,
            scale: 0.5
          }}
          transition={{ 
            duration: 1.5 + Math.random(),
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: 10,
            height: 10,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  )

  return { burst, ConfettiComponent }
}

// ============================================
// 11. Elastic Bounce Button
// ============================================
interface ElasticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ElasticButton({ 
  children, 
  className = '', 
  onClick 
}: ElasticButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
    >
      {children}
    </motion.button>
  )
}

// ============================================
// 12. Gradient Text Animation
// ============================================
interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export function GradientText({ 
  children, 
  className = '',
  from = '#1E3FCC',
  via = '#10B981', 
  to = '#F59E0B'
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to})`,
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  )
}

// ============================================
// 13. Hover Tilt Card (3D effect)
// ============================================
interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  onClick?: () => void
}

export function TiltCard({ 
  children, 
  className = '',
  tiltAmount = 10,
  onClick
}: TiltCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount])
  const rotateY = useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 14. Icon Bounce
// ============================================
interface BounceIconProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function BounceIcon({ 
  children, 
  className = '',
  delay = 0
}: BounceIconProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 2,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 15. Loading Dots
// ============================================
interface LoadingDotsProps {
  className?: string
  color?: string
}

export function LoadingDots({ 
  className = '',
  color = 'currentColor'
}: LoadingDotsProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}