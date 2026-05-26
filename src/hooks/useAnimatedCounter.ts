import { useEffect, useRef, useState, useCallback } from 'react';

interface AnimatedCounterOptions {
  target: number;
  duration?: number;
  startOnView?: boolean;
  threshold?: number;
  suffix?: string;
  prefix?: string;
}

/**
 * Animated counter that counts from 0 to target with ease-out cubic easing.
 * Triggers when element enters viewport (IntersectionObserver).
 */
export function useAnimatedCounter({
  target,
  duration = 2000,
  startOnView = true,
  threshold = 0.5,
  suffix = '',
  prefix = '',
}: AnimatedCounterOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(startOnView ? '0' : `${prefix}${target.toLocaleString()}${suffix}`);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(target * eased);

      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(`${prefix}${target.toLocaleString()}${suffix}`);
      }
    }

    requestAnimationFrame(update);
  }, [target, duration, prefix, suffix]);

  useEffect(() => {
    if (!startOnView) {
      animate();
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView, threshold, animate]);

  return { ref, displayValue };
}
