/**
 * Static color class maps — replaces dynamic template-literal Tailwind classes
 * that break with JIT purge. Use these lookups instead of `text-${color}`.
 */

export const textColors: Record<string, string> = {
  primary: 'text-primary-400',
  gold: 'text-gold-400',
  coral: 'text-coral-400',
  'neon-green': 'text-neon-green',
  'neon-cyan': 'text-neon-cyan',
  'neon-amber': 'text-neon-amber',
  success: 'text-success-400',
  error: 'text-error-400',
};

export const bgColors: Record<string, string> = {
  primary: 'bg-primary',
  'primary-light': 'bg-primary-light',
  'primary-400': 'bg-primary-400',
  gold: 'bg-gold',
  'gold-400': 'bg-gold-400',
  coral: 'bg-coral',
  'coral-400': 'bg-coral-400',
  'neon-green': 'bg-neon-green',
  'neon-cyan': 'bg-neon-cyan',
  'neon-amber': 'bg-neon-amber',
  success: 'bg-success',
  error: 'bg-error',
};

export const bgColorsAlpha: Record<string, string> = {
  primary: 'bg-primary/10',
  gold: 'bg-gold/10',
  coral: 'bg-coral/10',
  'neon-green': 'bg-neon-green/10',
  'neon-cyan': 'bg-neon-cyan/10',
  success: 'bg-success/10',
};

export const borderColors: Record<string, string> = {
  primary: 'border-primary/30',
  gold: 'border-gold/30',
  coral: 'border-coral/30',
  'neon-green': 'border-neon-green/30',
  'neon-cyan': 'border-neon-cyan/30',
  success: 'border-success/30',
};

export const gradientFrom: Record<string, string> = {
  primary: 'from-primary-400',
  gold: 'from-gold-400',
  coral: 'from-coral-400',
  'neon-green': 'from-neon-green',
  'neon-cyan': 'from-neon-cyan',
};

export const gradientTo: Record<string, string> = {
  primary: 'to-primary-light',
  gold: 'to-gold-300',
  coral: 'to-coral-300',
  'neon-green': 'to-neon-cyan',
  'neon-cyan': 'to-neon-green',
};

export const shadowColors: Record<string, string> = {
  primary: 'shadow-glow',
  gold: 'shadow-gold-glow',
  coral: 'shadow-[0_0_20px_rgba(244,98,42,0.3)]',
  'neon-green': 'shadow-neon-glow',
  'neon-cyan': 'shadow-neon-cyan-glow',
};
