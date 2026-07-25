import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getProject, getAdjacentProjects } from '@/lib/projects';
import { localizedProject } from '@/lib/translations';
import ProjectGallery from '@/components/project-gallery';
import FadeInSection from '@/components/fade-in-section';

interface ProjectPageProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Not Found' };

  const localized = localizedProject(project, locale);
  const mt = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: localized.title,
    description: localized.description,
    openGraph: {
      title: `${localized.title} — ${mt('siteName')}`,
      description: localized.description,
      images: [localized.coverImage.src],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProjectPage' });
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const localized = localizedProject(project, locale);
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <div className="px-6 md:px-12 pb-section">
      <div className="max-w-content mx-auto">
        <FadeInSection>
          <header className="mb-12 md:mb-16">
            <Link
              href="/work"
              className="inline-block text-xs md:text-sm text-muted font-light tracking-wide hover:text-foreground transition-colors duration-300 mb-8"
            >
              &larr; {t('backToAll')}
            </Link>

            <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground m-0">
              {localized.title}
            </h1>
            <p className="text-sm md:text-base text-muted font-light tracking-wide mt-3 m-0">
              {localized.year}, {localized.location}
            </p>
          </header>
        </FadeInSection>

        <ProjectGallery images={localized.images} />

        <nav
          className="mt-16 md:mt-24 pt-8 border-t border-border flex justify-between items-start"
          aria-label="Project navigation"
        >
          <div>
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="group inline-block"
              >
                <span className="block text-xs text-muted font-light tracking-wide mb-1">
                  {t('previousProject')}
                </span>
                <span className="text-sm md:text-base font-light tracking-wide text-foreground group-hover:text-muted transition-colors duration-300">
                  &larr; {localizedProject(prev, locale).title}
                </span>
              </Link>
            ) : (
              <span className="text-xs text-muted/40 font-light tracking-wide">
                &nbsp;
              </span>
            )}
          </div>

          <div className="text-right">
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="group inline-block"
              >
                <span className="block text-xs text-muted font-light tracking-wide mb-1">
                  {t('nextProject')}
                </span>
                <span className="text-sm md:text-base font-light tracking-wide text-foreground group-hover:text-muted transition-colors duration-300">
                  {localizedProject(next, locale).title} &rarr;
                </span>
              </Link>
            ) : (
              <span className="text-xs text-muted/40 font-light tracking-wide">
                &nbsp;
              </span>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
