import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getProjects } from '@/lib/projects';
import { localizedProject } from '@/lib/translations';
import WorkGrid from '@/components/work-grid';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('work.title') };
}

export default async function WorkPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WorkPage' });
  const projects = getProjects().map((p) => localizedProject(p, locale));

  return (
    <div className="px-6 md:px-12 pb-section">
      <div className="max-w-content mx-auto">
        <h1 className="sr-only">{t('title')}</h1>
        <WorkGrid projects={projects} />
      </div>
    </div>
  );
}
