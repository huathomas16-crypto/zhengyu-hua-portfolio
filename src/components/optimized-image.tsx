'use client';

import { useEffect, useRef, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Skip lazy loading for above-the-fold images */
  priority?: boolean;
  /** Additional classes applied to the <img> element */
  className?: string;
  /** Override the computed aspect ratio (e.g. "3/2") */
  aspectRatio?: string;
}

/**
 * A minimal image component that:
 * - Reserves space via CSS aspect-ratio (prevents layout shift)
 * - Lazy-loads by default (except when priority is true)
 * - Fades in on load with a subtle transition
 * - Shows a barely-visible skeleton during loading
 *
 * Uses native <img> rather than next/image so it works with
 * any image source (local, picsum, CDN) without extra config.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  aspectRatio,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle cached images that load before the effect runs
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  const ratio = aspectRatio || `${width} / ${height}`;

  return (
    <div
      className="relative overflow-hidden bg-border/10"
      style={{ aspectRatio: ratio }}
    >
      {/* Subtle skeleton placeholder — only visible during loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-border/10" aria-hidden="true" />
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? undefined : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={`
          block w-full h-full object-cover
          transition-opacity duration-600 ease-out
          ${loaded ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
      />
    </div>
  );
}
