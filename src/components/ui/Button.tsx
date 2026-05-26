import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold' | 'neon' | 'glass'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  icon?: ReactNode
  children: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-primary-600 to-primary-700 text-white border border-primary-400/30 hover:shadow-sharp-primary',
  secondary:
    'bg-surface border-2 border-border text-text-primary hover:border-primary hover:text-white',
  ghost:
    'bg-transparent text-text-secondary hover:text-white hover:bg-raised border border-transparent hover:border-border',
  danger:
    'bg-gradient-to-r from-coral-500 to-coral-600 text-white border border-coral-400/30 hover:shadow-sharp-coral',
  gold:
    'bg-gradient-to-r from-gold-500 to-gold-600 text-gray-900 font-bold border border-gold-400/30 hover:shadow-sharp-gold',
  neon:
    'bg-transparent border-2 border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-neon-glow',
  glass:
    'glass-light border border-white/10 text-text-primary hover:border-white/20 hover:bg-white/10',
}

const sizeStyles: Record<Size, string> = {
  sm: 'py-1.5 px-3 text-xs gap-1.5',
  md: 'py-2.5 px-5 text-sm gap-2',
  lg: 'py-3 px-7 text-base gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, icon, children, className = '', disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold geo-chamfer-sm transition-all duration-200 font-display tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed'

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !isLoading ? { scale: 1.02, x: -1, y: -1 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
        className={`${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : icon ? (
          <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
        ) : null}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
