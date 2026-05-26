import { useMemo } from 'react';

/**
 * Returns a style object with animationDelay for staggered framer-motion entrances.
 * Usage: <motion.div style={stagger(index)} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} />
 */
export function useStaggeredAnimation(baseMs: number = 50) {
  return useMemo(
    () => (index: number) => ({
      animationDelay: `${index * baseMs}ms`,
    }),
    [baseMs]
  );
}

/**
 * Returns framer-motion stagger variants for use with StaggerContainer pattern.
 * Usage: <motion.div variants={staggerContainer()} initial="hidden" animate="show">
 *          <motion.div variants={staggerItem()} />
 */
export function staggerContainer(staggerChildren: number = 0.05, delayChildren: number = 0) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export function staggerItem(direction: 'up' | 'left' | 'right' = 'up') {
  const directions = {
    up: { y: 20, x: 0 },
    left: { y: 0, x: -20 },
    right: { y: 0, x: 20 },
  };
  const { x, y } = directions[direction];

  return {
    hidden: { opacity: 0, x, y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };
}
