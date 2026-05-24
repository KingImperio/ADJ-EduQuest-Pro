import type { ReactNode } from 'react'

type Variant = 'bar' | 'ring' | 'angular'

interface ProgressProps {
  value: number
  max?: number
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'gold' | 'coral' | 'neon' | 'success'
  label?: ReactNode
  showValue?: boolean
  className?: string
}

const colorMap = {
  primary: { stroke: '#1E3FCC', glow: 'rgba(30,63,204,0.3)' },
  gold: { stroke: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
  coral: { stroke: '#F4622A', glow: 'rgba(244,98,42,0.3)' },
  neon: { stroke: '#00FF88', glow: 'rgba(0,255,136,0.3)' },
  success: { stroke: '#10B981', glow: 'rgba(16,185,129,0.3)' },
}

const sizeMap = {
  sm: { ring: 40, stroke: 4, bar: 'h-1.5' },
  md: { ring: 60, stroke: 5, bar: 'h-2.5' },
  lg: { ring: 80, stroke: 6, bar: 'h-3.5' },
}

export function Progress({
  value,
  max = 100,
  variant = 'bar',
  size = 'md',
  color = 'primary',
  label,
  showValue = true,
  className = '',
}: ProgressProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100)
  const c = colorMap[color]
  const s = sizeMap[size]

  if (variant === 'ring') {
    const radius = (s.ring - s.stroke) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (pct / 100) * circumference

    return (
      <div className={`inline-flex flex-col items-center gap-1 ${className}`}>
        <svg width={s.ring} height={s.ring} className="-rotate-90">
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={radius}
            fill="none"
            stroke="rgba(42,51,84,0.5)"
            strokeWidth={s.stroke}
          />
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={radius}
            fill="none"
            stroke={c.stroke}
            strokeWidth={s.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            style={{ filter: `drop-shadow(0 0 6px ${c.glow})`, transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        {showValue && (
          <span className="text-xs font-mono font-bold text-text-primary">{pct}%</span>
        )}
        {label && <span className="text-xs text-text-muted font-body">{label}</span>}
      </div>
    )
  }

  if (variant === 'angular') {
    return (
      <div className={`${className}`}>
        {label && (
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">{label}</span>
            {showValue && <span className="text-xs font-mono font-bold text-text-primary">{pct}%</span>}
          </div>
        )}
        <div className={`w-full bg-raised overflow-hidden geo-chamfer-sm ${s.bar}`}>
          <div
            className={`${s.bar} transition-all duration-600 ease-out`}
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${c.stroke}, ${c.stroke}dd)`,
              boxShadow: `0 0 12px ${c.glow}`,
            }}
          />
        </div>
      </div>
    )
  }

  // Default bar
  return (
    <div className={`${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-body text-text-secondary">{label}</span>
          {showValue && <span className="text-xs font-mono font-bold text-text-primary">{pct}%</span>}
        </div>
      )}
      <div className={`w-full bg-raised rounded-sm overflow-hidden ${s.bar}`}>
        <div
          className={`${s.bar} rounded-sm transition-all duration-600 ease-out`}
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${c.stroke}, ${c.stroke}dd)`,
          }}
        />
      </div>
    </div>
  )
}
