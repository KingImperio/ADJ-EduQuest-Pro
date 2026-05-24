import type { ReactNode, HTMLAttributes } from 'react'

type Variant = 'default' | 'elevated' | 'outlined'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  children: ReactNode
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-surface border border-border',
  elevated: 'bg-raised border border-border shadow-card',
  outlined: 'bg-transparent border-2 border-border',
}

export function Card({ variant = 'default', children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg p-5 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
