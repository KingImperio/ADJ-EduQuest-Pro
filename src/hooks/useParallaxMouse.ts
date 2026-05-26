import { useEffect, useRef, useCallback } from 'react';

interface ParallaxMouseOptions {
  maxMove?: number;
  smoothFactor?: number;
}

/**
 * Mouse-driven parallax effect for child elements with data-depth attribute.
 * Attach ref to the container, and add data-depth="0.1" to "0.9" on children.
 */
export function useParallaxMouse<T extends HTMLElement = HTMLDivElement>({
  maxMove = 60,
  smoothFactor = 0.08,
}: ParallaxMouseOptions = {}) {
  const containerRef = useRef<T>(null);
  const animationRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const loop = useCallback(() => {
    const { x: tx, y: ty } = targetRef.current;
    const { x: cx, y: cy } = currentRef.current;

    currentRef.current.x += (tx - cx) * smoothFactor;
    currentRef.current.y += (ty - cy) * smoothFactor;

    const container = containerRef.current;
    if (container) {
      container.querySelectorAll<HTMLElement>('[data-depth]').forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || '0');
        const moveX = currentRef.current.x * depth * maxMove;
        const moveY = currentRef.current.y * depth * maxMove;
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }

    animationRef.current = requestAnimationFrame(loop);
  }, [maxMove, smoothFactor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetRef.current.x = (e.clientX - rect.left) / rect.width - 0.5;
      targetRef.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const handleMouseLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    animationRef.current = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [loop]);

  return containerRef;
}
