import type { ProjectImage } from '@/lib/types';
import FadeInSection from './fade-in-section';
import OptimizedImage from './optimized-image';

interface ProjectGalleryProps {
  images: ProjectImage[];
}

/**
 * Determines the layout for each gallery image.
 * Pattern: full → left → right → full → left → right → …
 *
 * - full: 100% width
 * - left: 70% width, flush left
 * - right: 70% width, flush right
 *
 * First image is always full-width.
 */
function getLayout(index: number): 'full' | 'left' | 'right' {
  if (index === 0) return 'full';
  const cycle = (index - 1) % 3;
  if (cycle === 0) return 'left';
  if (cycle === 1) return 'right';
  return 'full';
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  return (
    <div className="mt-12 md:mt-16">
      {images.map((image, i) => {
        const layout = getLayout(i);
        const isVertical = image.height > image.width;

        // Vertical images: cap at 80vh so they fit the viewport, center them.
        // Horizontal images: use the existing full / left / right layout.
        const containerClass = isVertical
          ? 'w-full flex justify-center'
          : layout === 'full'
            ? 'w-full'
            : layout === 'left'
              ? 'w-full md:w-[70%]'
              : 'w-full md:w-[70%] md:ml-auto';

        return (
          <FadeInSection
            key={i}
            delay={i * 100}
            className={containerClass}
          >
            <figure className="my-10 md:my-14 m-0">
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority={i < 2}
                maxHeight={isVertical ? '80vh' : undefined}
                objectFit={isVertical ? 'contain' : 'cover'}
              />
              {image.caption && (
                <figcaption className="mt-3 text-xs md:text-sm text-muted font-light tracking-wide">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          </FadeInSection>
        );
      })}
    </div>
  );
}
