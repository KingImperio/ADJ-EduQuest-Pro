import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-xs font-medium text-text-secondary mb-1.5 font-mono uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted flex items-center justify-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-deepest border-2 ${
              error ? 'border-error' : 'border-border'
            } geo-chamfer-sm py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors font-body ${
              icon ? 'pl-10' : 'pl-3'
            } ${rightIcon ? 'pr-10' : 'pr-3'} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-error text-xs mt-1 font-mono">&gt; {error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
