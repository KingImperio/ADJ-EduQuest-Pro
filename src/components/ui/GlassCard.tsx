import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'glass' | 'glass-light' | 'glass-strong';
  accent?: 'primary' | 'gold' | 'coral' | 'neon';
  glow?: boolean;
  chamfer?: boolean;
  hoverLift?: boolean;
  className?: string;
  onClick?: () => void;
}

const accentBorderColors = {
  primary: 'border-primary/20 hover:border-primary/40',
  gold: 'border-gold/20 hover:border-gold/40',
  coral: 'border-coral/20 hover:border-coral/40',
  neon: 'border-neon-green/20 hover:border-neon-green/40',
};

const glowShadows = {
  primary: 'hover:shadow-glow',
  gold: 'hover:shadow-gold-glow',
  coral: 'hover:shadow-[0_0_20px_rgba(244,98,42,0.3)]',
  neon: 'hover:shadow-neon-glow',
};

export default function GlassCard({
  children,
  variant = 'glass',
  accent,
  glow = false,
  chamfer = false,
  hoverLift = false,
  className = '',
  onClick,
}: GlassCardProps) {
  const base = variant;
  const border = accent ? accentBorderColors[accent] : '';
  const shadow = glow && accent ? glowShadows[accent] : '';
  const clip = chamfer ? 'geo-chamfer' : 'rounded-lg';
  const lift = hoverLift ? 'hover-lift' : '';

  return (
    <motion.div
      className={`${base} ${border} ${shadow} ${clip} ${lift} ${className}`}
      onClick={onClick}
      whileHover={hoverLift ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
