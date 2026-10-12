'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Heart, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpButton from '@/components/layout/HelpButton';
import Container from '@/components/ui/Container';
import { Button, Card, ImagePlaceholder } from '@/components/ui';
import { programs } from '@/data/programs';

export default function ProgramDetailPage() {
  const { lang, t } = useLanguage();
  const rawParams = useParams();
  const params =
    rawParams && typeof (rawParams as Promise<{ slug?: string }>).then === 'function'
      ? React.use(rawParams as Promise<{ slug?: string }>)
      : (rawParams as { slug?: string | string[] } | null);

  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
  const program = programs.find((p) => p.slug === slug);

  useEffect(() => {
    if (program) {
      document.title = `${program.title[lang]} | ${t('site.name.en')}`;
    } else {
      document.title = `${t('404.title')} | ${t('site.name.en')}`;
    }
  }, [program, lang, t]);

  if (!program) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-background py-16">
          <Container className="text-center max-w-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-muted flex items-center justify-center text-accent">
              <AlertCircle className="w-8 h-8" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {t('404.title')}
            </h1>
            <p className="text-foreground/75 mb-8">
              {t('404.desc')}
            </p>
            <Button href="/programs" variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              {t('btn.ourPrograms')}
            </Button>
          </Container>
        </main>
        <Footer />
        <HelpButton />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero banner */}
        <section className="bg-primary-dark text-white py-16">
          <Container>
            <div className="mb-4">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                {t('btn.ourPrograms')}
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {program.title[lang]}
            </h1>
          </Container>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <Container className="max-w-4xl">
            <Card className="p-6 sm:p-8">
              <div className="mb-8 overflow-hidden rounded-lg">
                <ImagePlaceholder
                  aspectRatio="video"
                  label={program.title[lang]}
                  className="w-full h-[320px] sm:h-[400px]"
                />
              </div>

              <div className="prose prose-lg max-w-none text-foreground mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {program.title[lang]}
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-foreground/80 mb-6">
                  {program.longDesc[lang]}
                </p>
              </div>

              <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/75 hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  {t('btn.ourPrograms')}
                </Link>
                <Button href="/donate" variant="primary" size="lg" className="w-full sm:w-auto">
                  <Heart className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('btn.donateNow')}
                </Button>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <Footer />
      <HelpButton />
    </>
  );
}
