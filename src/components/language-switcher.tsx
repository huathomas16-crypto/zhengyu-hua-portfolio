'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggle = () => {
    const next = locale === 'en' ? 'zh' : 'en';
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      className="text-xs md:text-sm tracking-[0.15em] uppercase text-muted hover:text-foreground transition-colors duration-300 pb-0.5"
      aria-label={locale === 'en' ? 'Switch to Chinese' : '切换到英文'}
    >
      {locale === 'en' ? '中文' : 'EN'}
    </button>
  );
}
