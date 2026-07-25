import type { Project } from '@/lib/types';
import FadeInSection from './fade-in-section';
import ProjectCover from './project-cover';

interface WorkGridProps {
  projects: Project[];
}

export default function WorkGrid({ projects }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {projects.map((project, i) => {
        // Every 4th project is "featured" (wider, spans 2 cols on large screens)
        const isFeatured = i % 4 === 0;

        return (
          <FadeInSection
            key={project.slug}
            delay={i * 100}
            className={isFeatured ? 'md:col-span-2' : ''}
          >
            <ProjectCover
              project={project}
              featured={isFeatured}
              delay={i * 100}
            />
          </FadeInSection>
        );
      })}
    </div>
  );
}
