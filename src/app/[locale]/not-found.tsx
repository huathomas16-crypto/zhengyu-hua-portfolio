import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="px-6 md:px-12 pb-section">
      <div className="max-w-content mx-auto text-center py-20">
        <p className="text-sm md:text-base text-muted font-light mb-6">
          {t('message')}
        </p>
        <Link
          href="/"
          className="text-sm md:text-base text-foreground font-light hover:text-muted transition-colors duration-300"
        >
          &larr; {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
