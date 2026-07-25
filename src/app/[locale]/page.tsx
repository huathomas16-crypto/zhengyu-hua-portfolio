import { useTranslations } from 'next-intl';
import { curatedEntries } from '@/lib/projects';
import ImageGrid from '@/components/image-grid';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="px-6 md:px-12 pb-section">
      <div className="max-w-content mx-auto">
        <h1 className="sr-only">{t('title')}</h1>

        <ImageGrid entries={curatedEntries} />

        <p className="mt-16 md:mt-24 text-xs md:text-sm text-muted font-light tracking-wide text-left">
          {t('closingLine')}
        </p>
      </div>
    </div>
  );
}
