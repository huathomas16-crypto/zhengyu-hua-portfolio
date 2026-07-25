'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from '@/components/language-switcher';

export default function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();

  const navItems = [
    { label: t('nav.work'), href: '/work' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header className="w-full px-6 md:px-12 py-8 md:py-10">
      <div className="max-w-content mx-auto flex items-end justify-between">
        <Link
          href="/"
          className="text-base md:text-lg font-normal tracking-[0.2em] uppercase text-foreground no-underline hover:text-foreground/70 transition-colors duration-300"
        >
          {t('brandName')}
        </Link>

        <div className="flex items-end gap-6 md:gap-8">
          <nav aria-label="Main navigation">
            <ul className="flex gap-6 md:gap-8 list-none m-0 p-0">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        relative inline-block text-xs md:text-sm tracking-[0.15em] uppercase no-underline pb-0.5
                        transition-colors duration-300
                        ${isActive ? 'text-foreground' : 'text-muted hover:text-foreground'}
                      `}
                    >
                      {item.label}
                      <span
                        className={`
                          absolute bottom-0 left-0 h-px bg-foreground transition-all duration-300
                          ${isActive ? 'w-full' : 'w-0'}
                        `}
                      />
                      <span
                        className="absolute bottom-0 left-0 h-px bg-foreground transition-all duration-300 w-0 group-hover:w-full"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
