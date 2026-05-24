interface DividerProps {
  text?: string
  variant?: 'line' | 'diagonal' | 'dots'
  className?: string
}

export function Divider({ text, variant = 'line', className = '' }: DividerProps) {
  if (variant === 'diagonal') {
    return (
      <div className={`relative h-8 ${className}`}>
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent"
          style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 50%, 0 100%)' }}
        />
        {text && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-text-muted font-mono uppercase tracking-wider bg-deep px-3">
            {text}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex-1 flex items-center gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-border" />
          ))}
        </div>
        {text && <span className="text-xs text-text-muted font-mono uppercase tracking-wider">{text}</span>}
        <div className="flex-1 flex items-center gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-border" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-border" />
      {text && <span className="text-xs text-text-muted font-mono uppercase tracking-wider">{text}</span>}
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
