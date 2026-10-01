import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import FadeInSection from '@/components/fade-in-section';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('contact.title') };
}

export default function ContactPage() {
  const t = useTranslations('ContactPage');

  return (
    <div className="px-6 md:px-12 pb-section">
      <div className="max-w-content mx-auto">
        <FadeInSection>
          <div className="max-w-lg">
            <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground m-0 mb-8">
              {t('title')}
            </h1>

            <div className="space-y-4 text-sm md:text-base font-light">
              <div>
                <span className="block text-xs text-muted font-light tracking-wide mb-1">
                  {t('email')}
                </span>
                <a
                  href="mailto:huathomas16@gmail.com"
                  className="text-foreground hover:text-muted transition-colors duration-300"
                >
                  huathomas16@gmail.com
                </a>
              </div>

              <div>
                <span className="block text-xs text-muted font-light tracking-wide mb-1">
                  {t('instagram')}
                </span>
                <a
                  href="https://instagram.com/qualia_thomas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-muted transition-colors duration-300"
                >
                  @qualia_thomas
                </a>
              </div>

              <div>
                <span className="block text-xs text-muted font-light tracking-wide mb-1">
                  {t('phoneChina')}
                </span>
                <a
                  href="tel:+8613028942297"
                  className="text-foreground hover:text-muted transition-colors duration-300"
                >
                  +86 13028942297
                </a>
              </div>

              <div>
                <span className="block text-xs text-muted font-light tracking-wide mb-1">
                  {t('phoneUS')}
                </span>
                <a
                  href="tel:+19178639040"
                  className="text-foreground hover:text-muted transition-colors duration-300"
                >
                  +1 9178639040
                </a>
              </div>

              <div>
                <span className="block text-xs text-muted font-light tracking-wide mb-1">
                  {t('location')}
                </span>
                <p className="text-foreground m-0">New York City / Ningbo</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
