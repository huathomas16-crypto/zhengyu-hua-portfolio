'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { CuratedEntry, GridLayoutVariant } from '@/lib/types';
import { resolveCuratedEntry } from '@/lib/projects';
import { localizedProject } from '@/lib/translations';
import FadeInSection from './fade-in-section';
import OptimizedImage from './optimized-image';

const LAYOUT_CLASSES: Record<GridLayoutVariant, string> = {
  full: 'col-span-1 md:col-span-3',
  'wide-left': 'col-span-1 md:col-span-2',
  'wide-right': 'col-span-1 md:col-span-2 md:col-start-2',
  'half-left': 'col-span-1 md:col-span-1',
  'half-right': 'col-span-1 md:col-span-1 md:col-start-3',
  'centered-small': 'col-span-1 md:col-span-1 md:col-start-2',
};

interface ImageGridProps {
  entries: CuratedEntry[];
}

export default function ImageGrid({ entries }: ImageGridProps) {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
      {entries.map((entry, i) => {
        const resolved = resolveCuratedEntry(entry);
        if (!resolved) return null;

        const { image, project: rawProject } = resolved;
        const project = localizedProject(rawProject, locale);
        const layoutClass = LAYOUT_CLASSES[entry.layout];

        return (
          <FadeInSection
            key={`${entry.projectSlug}-${entry.imageIndex}`}
            delay={i * 80}
            className={layoutClass}
          >
            <Link
              href={`/work/${project.slug}`}
              className="block group cursor-pointer"
            >
              <div className="overflow-hidden">
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  priority={i < 3}
                  className="transition-transform duration-600 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-2 md:mt-3">
                <span className="text-xs md:text-sm text-muted font-light tracking-wide">
                  {project.title}
                </span>
                <span className="text-xs md:text-sm text-muted/60 font-light ml-2">
                  {project.year}
                </span>
              </div>
            </Link>
          </FadeInSection>
        );
      })}
    </div>
  );
}
