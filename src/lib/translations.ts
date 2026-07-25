import type { Project } from './types';

export function localizedProject(project: Project, locale: string): Project {
  if (locale === 'zh') {
    return {
      ...project,
      title: project.titleZh ?? project.title,
      location: project.locationZh ?? project.location,
      description: project.descriptionZh ?? project.description,
    };
  }
  return project;
}
