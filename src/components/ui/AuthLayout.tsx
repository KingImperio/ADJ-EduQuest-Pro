import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Logo } from './Logo'

interface AuthLayoutProps {
  headline: ReactNode
  subtitle?: ReactNode
  stats?: { value: string; label: string }[]
  stepIndicator?: { current: number; total: number }
  children: ReactNode
  footer?: ReactNode
}

/**
 * Shared layout for all auth and onboarding screens.
 * Split layout: left panel (visual, hidden on mobile) + right panel (form).
 * Uses the custom design system tokens consistently.
 */
export function AuthLayout({
  headline,
  subtitle,
  stats,
  stepIndicator,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-deep flex">
      {/* Left Panel — Geometric visual */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] relative overflow-hidden">
        {/* Geometric background */}
        <div className="absolute inset-0 bg-gradient-to-br from-deepest via-deep to-surface">
          {/* Diagonal grid lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="diag-grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="#4F6FEF" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="40" y2="0" stroke="#4F6FEF" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag-grid)" />
          </svg>

          {/* Accent geometric shapes */}
          <div
            className="absolute top-[15%] right-[10%] w-48 h-48 border-2 border-primary opacity-10 rotate-45"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)' }}
          />
          <div
            className="absolute bottom-[20%] left-[5%] w-32 h-32 border-2 border-gold opacity-10 rotate-12"
            style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%, 0 25%)' }}
          />

          {/* Gradient orb — subtle, not rotating */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-15 blur-3xl"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(31,63,204,0.3) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Logo size="md" className="mb-8" />

            <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 font-display">
              {headline}
            </h1>

            {subtitle && (
              <p className="text-lg text-text-secondary max-w-md leading-relaxed font-body">
                {subtitle}
              </p>
            )}

            {stats && stats.length > 0 && (
              <div className="flex gap-8 mt-12">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-white font-display">{stat.value}</div>
                    <div className="text-sm text-text-muted font-body">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Step Indicator */}
        {stepIndicator && (
          <div className="absolute bottom-12 left-12 xl:left-16 flex gap-3">
            {Array.from({ length: stepIndicator.total }).map((_, step) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step === stepIndicator.current
                    ? 'w-10 bg-gradient-to-r from-primary to-primary-light'
                    : step < stepIndicator.current
                    ? 'w-3 bg-primary'
                    : 'w-3 bg-raised'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-border/50">
          <Logo size="sm" />
          {stepIndicator && (
            <span className="text-sm text-text-muted font-body">
              Step {stepIndicator.current + 1} of {stepIndicator.total}
            </span>
          )}
        </div>

        {/* Form Content */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto w-full"
          >
            {children}
          </motion.div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 sm:px-12 lg:px-16 xl:px-24 py-6 border-t border-border/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
