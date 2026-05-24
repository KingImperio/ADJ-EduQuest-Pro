interface DividerProps {
  text?: string
  className?: string
}

export function Divider({ text, className = '' }: DividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-border" />
      {text && <span className="text-xs text-text-muted uppercase font-body tracking-wider">{text}</span>}
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
