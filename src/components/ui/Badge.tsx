import type { ReactNode } from 'react'

type Variant = 'default' | 'primary' | 'gold' | 'coral' | 'neon' | 'success'
type Shape = 'chamfer' | 'hex' | 'pill'

interface BadgeProps {
  variant?: Variant
  shape?: Shape
  children: ReactNode
  className?: string
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-raised border border-border text-text-secondary',
  primary: 'bg-primary/20 border border-primary/40 text-primary-light',
  gold: 'bg-gold/20 border border-gold/40 text-gold',
  coral: 'bg-coral/20 border border-coral/40 text-coral',
  neon: 'bg-neon-green/10 border border-neon-green/30 text-neon-green',
  success: 'bg-success/20 border border-success/40 text-success',
}

const shapeStyles: Record<Shape, string> = {
  chamfer: 'geo-chamfer-sm',
  hex: 'geo-hex',
  pill: 'rounded-full',
}

export function Badge({ variant = 'default', shape = 'chamfer', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium tracking-wider uppercase ${variantStyles[variant]} ${shapeStyles[shape]} ${className}`}
    >
      {children}
    </span>
  )
}
