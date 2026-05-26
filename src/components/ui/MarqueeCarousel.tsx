import { ReactNode } from 'react';

interface MarqueeCarouselProps {
  children: ReactNode[];
  speed?: number; // seconds for one full loop
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Infinite auto-scrolling marquee ported from layout-showcase/carousel.html
 * Items are duplicated for seamless looping.
 * Pauses on hover by default.
 */
export default function MarqueeCarousel({
  children,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
  className = '',
}: MarqueeCarouselProps) {
  // Duplicate children for seamless loop
  const allItems = [...children, ...children];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex gap-4 w-max animate-marquee ${
          reverse ? 'animate-marquee-reverse' : ''
        } ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {allItems.map((child, i) => (
          <div key={i} className="flex-shrink-0 w-[280px]">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
