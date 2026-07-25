'use client';

import { Link } from '@/i18n/routing';
import type { Project } from '@/lib/types';
import OptimizedImage from './optimized-image';

interface ProjectCoverProps {
  project: Project;
  featured?: boolean;
  delay?: number;
}

export default function ProjectCover({
  project,
  featured = false,
  delay = 0,
}: ProjectCoverProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="block group cursor-pointer"
    >
      <div className="overflow-hidden">
        <OptimizedImage
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          width={project.coverImage.width}
          height={project.coverImage.height}
          className="transition-transform duration-600 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-3 md:mt-4">
        <h2 className="text-sm md:text-base font-light tracking-wide text-foreground m-0">
          {project.title}
        </h2>
        <p className="text-xs md:text-sm text-muted font-light tracking-wide mt-1 m-0">
          {project.year}, {project.location}
        </p>
      </div>
    </Link>
  );
}
