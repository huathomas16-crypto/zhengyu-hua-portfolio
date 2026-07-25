import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="w-full px-6 md:px-12 py-10 md:py-12">
      <div className="max-w-content mx-auto">
        <p className="text-xs md:text-sm text-muted font-light tracking-wide m-0">
          {t('copyright', { year })}
        </p>
      </div>
    </footer>
  );
}
