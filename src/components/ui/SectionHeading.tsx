import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string | ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  accentColor?: 'primary' | 'gold' | 'coral';
  className?: string;
}

const labelColors = {
  primary: 'text-primary-400 border-primary/30',
  gold: 'text-gold-400 border-gold/30',
  coral: 'text-coral-400 border-coral/30',
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  accentColor = 'primary',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <motion.div
      className={`mb-12 ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {label && (
        <span
          className={`terminal-label inline-block px-3 py-1 rounded-full border text-xs mb-4 ${labelColors[accentColor]}`}
        >
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
