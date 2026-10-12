'use client';

import React, { useEffect } from 'react';
import { Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpButton from '@/components/layout/HelpButton';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui';

export default function NotFound() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = `404 - ${t('404.title')} | ${t('site.name.en')}`;
  }, [lang, t]);

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 bg-background min-h-[60vh]">
        <Container className="text-center max-w-xl">
          <div className="mb-6">
            <span className="text-7xl sm:text-9xl font-extrabold text-primary tracking-tight">
              404
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('404.title')}
          </h1>

          <p className="text-base sm:text-lg text-foreground/75 mb-8 max-w-md mx-auto leading-relaxed">
            {t('404.desc')}
          </p>

          <div>
            <Button href="/" variant="primary" size="lg">
              <Home className="w-5 h-5 mr-2" aria-hidden="true" />
              {t('404.home')}
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
      <HelpButton />
    </>
  );
}
