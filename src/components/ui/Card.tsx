import type { ReactNode, HTMLAttributes } from 'react'

type Variant = 'default' | 'elevated' | 'outlined' | 'accent'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  accent?: 'primary' | 'gold' | 'coral' | 'neon'
  children: ReactNode
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-surface border border-border',
  elevated: 'bg-raised border border-border',
  outlined: 'bg-transparent border-2 border-border',
  accent: 'bg-surface border border-border relative overflow-hidden',
}

const accentColors: Record<string, string> = {
  primary: 'from-primary',
  gold: 'from-gold',
  coral: 'from-coral',
  neon: 'from-neon-green',
}

export function Card({ variant = 'default', accent, children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`${variantStyles[variant]} ${className} geo-chamfer relative`}
      style={{ padding: '1px' }}
      {...props}
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
    </div>
  )
}
