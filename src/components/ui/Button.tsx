import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
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
    'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-glow hover:shadow-lg hover:brightness-110',
  secondary:
    'bg-surface border-2 border-border text-text-primary hover:border-primary hover:text-white',
  ghost:
    'bg-transparent text-text-secondary hover:text-white hover:bg-raised',
  danger:
    'bg-gradient-to-r from-coral-500 to-coral-600 text-white hover:brightness-110',
  gold:
    'bg-gradient-to-r from-gold-500 to-gold-600 text-gray-900 font-bold hover:brightness-110 shadow-gold-glow',
}

const sizeStyles: Record<Size, string> = {
  sm: 'py-2 px-4 text-sm gap-1.5',
  md: 'py-3 px-6 text-sm gap-2',
  lg: 'py-3.5 px-8 text-base gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, icon, children, className = '', disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 font-display tracking-wide disabled:opacity-50 disabled:cursor-not-allowed'

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
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
