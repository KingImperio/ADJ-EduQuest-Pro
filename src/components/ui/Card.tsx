import { motion } from 'framer-motion'
import type { ReactNode, HTMLAttributes } from 'react'

type Variant = 'default' | 'elevated' | 'outlined' | 'accent' | 'glass' | 'glass-light' | 'glass-strong'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  accent?: 'primary' | 'gold' | 'coral' | 'neon'
  chamfer?: boolean
  hoverLift?: boolean
  children: ReactNode
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-surface border border-border',
  elevated: 'bg-raised border border-border',
  outlined: 'bg-transparent border-2 border-border',
  accent: 'bg-surface border border-border relative overflow-hidden',
  glass: 'glass',
  'glass-light': 'glass-light',
  'glass-strong': 'glass-strong',
}

const accentColors: Record<string, string> = {
  primary: 'from-primary',
  gold: 'from-gold',
  coral: 'from-coral',
  neon: 'from-neon-green',
}

export function Card({
  variant = 'default',
  accent,
  chamfer = true,
  hoverLift = false,
  children,
  className = '',
  ...props
}: CardProps) {
  const clipClass = chamfer ? 'geo-chamfer' : 'rounded-lg'
  const liftClass = hoverLift ? 'hover-lift' : ''

  return (
    <motion.div
      className={`${variantStyles[variant]} ${clipClass} ${liftClass} ${className} relative`}
      whileHover={hoverLift ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      {...(props as any)}
    >
      {/* Geometric accent line — top-left diagonal */}
      {variant === 'accent' && accent && (
        <div
          className={`absolute top-0 left-0 w-10 h-10 bg-gradient-to-br ${accentColors[accent]} to-transparent opacity-20`}
          style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
        />
      )}
      <div className="relative p-4">
        {children}
      </div>
    </motion.div>
  )
}
