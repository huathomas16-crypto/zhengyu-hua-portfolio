'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  /** Delay in ms before the fade-in triggers (for staggered reveals) */
  delay?: number;
  /** Additional wrapper classes */
  className?: string;
  /** IntersectionObserver threshold (0–1). Default 0.1 = trigger when 10% visible */
  threshold?: number;
}

/**
 * Wraps content in a scroll-triggered fade-in-up animation.
 * Uses IntersectionObserver — the animation fires once when the
 * element enters the viewport, then the observer disconnects.
 *
 * The actual transition is driven by the `.fade-in-up` / `.visible`
 * CSS classes defined in globals.css.
 */
export default function FadeInSection({
  children,
  delay = 0,
  className = '',
  threshold = 0.1,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`fade-in-up ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
