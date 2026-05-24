type Size = 'sm' | 'md' | 'lg' | 'xl'

interface LogoProps {
  size?: Size
  showText?: boolean
  className?: string
}

const sizeMap: Record<Size, { img: string; text: string }> = {
  sm: { img: 'h-8', text: 'text-lg' },
  md: { img: 'h-12', text: 'text-xl' },
  lg: { img: 'h-20', text: 'text-2xl' },
  xl: { img: 'h-28', text: 'text-3xl' },
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const s = sizeMap[size]
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/img/ADJ-logo-v2-transparent.png"
        alt="ADJ EduQuest"
        loading="lazy"
        decoding="async"
        className={`${s.img} w-auto object-contain`}
      />
      {showText && (
        <span className={`${s.text} font-bold text-white font-display tracking-wide`}>
          EduQuest
        </span>
      )}
    </div>
  )
}
