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
          <label className="block text-sm font-medium text-text-secondary mb-2 font-body">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted flex items-center justify-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-deepest border-2 ${
              error ? 'border-error' : 'border-border'
            } rounded-lg py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors ${
              icon ? 'pl-12' : 'pl-4'
            } ${rightIcon ? 'pr-12' : 'pr-4'} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-error text-sm mt-1.5 font-body">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
