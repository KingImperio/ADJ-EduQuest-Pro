import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';

interface CoverflowCarouselProps {
  children: ReactNode[];
  autoAdvanceMs?: number;
  className?: string;
}

/**
 * 3D coverflow carousel ported from layout-showcase/carousel.html
 * Children should be individual slide elements.
 */
export default function CoverflowCarousel({
  children,
  autoAdvanceMs = 4000,
  className = '',
}: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = children.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback(
    (dir: number) => {
      setActiveIndex((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  // Auto-advance
  useEffect(() => {
    if (isPaused || total <= 1) return;
    intervalRef.current = setInterval(() => navigate(1), autoAdvanceMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, autoAdvanceMs, navigate, total]);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  const getTransform = (index: number) => {
    const offset = index - activeIndex;
    const absOff = Math.abs(offset);
    const x = offset * 160;
    const z = -absOff * 120;
    const rotY = offset * -35;
    const scale = absOff === 0 ? 1 : 0.85;
    const opacity = absOff > 2 ? 0 : 1;

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`,
      opacity,
      zIndex: total - absOff,
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel viewport */}
      <div
        className="relative overflow-hidden"
        style={{ height: 380, perspective: 1200 }}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{ transformStyle: 'preserve-3d', width: 0, height: 0 }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="absolute cursor-pointer"
              style={{
                ...getTransform(i),
                width: 300,
                height: 200,
                left: -150,
                top: -100,
                backfaceVisibility: 'hidden',
              }}
              onClick={() => setActiveIndex(i)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 glass geo-chamfer-sm text-text-secondary text-xs uppercase tracking-widest hover:text-accent hover:border-accent transition-all font-mono"
        >
          Prev
        </button>
        <span className="flex items-center text-xs text-text-muted font-mono uppercase tracking-widest">
          {activeIndex + 1} / {total}
        </span>
        <button
          onClick={() => navigate(1)}
          className="px-5 py-2 glass geo-chamfer-sm text-text-secondary text-xs uppercase tracking-widest hover:text-accent hover:border-accent transition-all font-mono"
        >
          Next
        </button>
      </div>
    </div>
  );
}
