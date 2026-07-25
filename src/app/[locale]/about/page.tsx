import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import FadeInSection from '@/components/fade-in-section';
import OptimizedImage from '@/components/optimized-image';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('about.title') };
}

const ABOUT_PHOTO = {
  src: '/images/about/portrait.jpg',
  alt: 'ZHENGYU HUA — photographer portrait',
  width: 820,
  height: 1025,
};

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <div className="px-6 md:px-12 pb-section">
      <div className="max-w-content mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <FadeInSection>
            <OptimizedImage
              src={ABOUT_PHOTO.src}
              alt={ABOUT_PHOTO.alt}
              width={ABOUT_PHOTO.width}
              height={ABOUT_PHOTO.height}
              priority
            />
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="space-y-6 text-sm md:text-base leading-relaxed font-light">
              <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground m-0">
                {t('title')}
              </h1>

              <p className="text-foreground/85 m-0">
                {t('bio.paragraph1')}
              </p>
              <p className="text-foreground/85 m-0">
                {t('bio.paragraph2')}
              </p>

              <div className="pt-4 space-y-1">
                <p className="text-sm text-muted font-light tracking-wide m-0">
                  {t('basedIn')}
                </p>
                <p className="text-sm text-muted font-light tracking-wide m-0">
                  {t('available')}
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}
