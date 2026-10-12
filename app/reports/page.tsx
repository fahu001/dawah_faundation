'use client';

import React, { useEffect } from 'react';
import { FileText, Download, Calendar, Tag, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpButton from '@/components/layout/HelpButton';
import Container from '@/components/ui/Container';
import { Button, Card } from '@/components/ui';
import { reports } from '@/data/reports';

export default function ReportsPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('reports.title')} | ${t('site.name.en')}`;
  }, [lang, t]);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero banner */}
        <section className="bg-primary-dark text-white py-16">
          <Container className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {t('reports.title')}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {t('reports.subtitle')}
            </p>
          </Container>
        </section>

        {/* Reports Grid Section */}
        <section className="py-12 sm:py-16 bg-background">
          <Container>
            {/* Notice / Sample badge */}
            <div className="mb-8 p-4 rounded-lg bg-surface border border-border flex items-center gap-3 text-sm text-foreground/80">
              <AlertCircle className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
              <p>
                <span className="font-semibold text-accent">{t('site.demo')}</span> —{' '}
                {t('transparency.reportCard')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {reports.map((report) => (
                <Card
                  key={report.id}
                  className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200 border border-border"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <FileText className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-muted text-primary border border-primary/20">
                          <Tag className="w-3 h-3" aria-hidden="true" />
                          {report.type[lang]}
                        </span>
                        <span className="text-xs text-foreground/50 font-medium">
                          {t('sample.data')}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-2">
                      {report.title[lang]}
                    </h2>

                    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-6">
                      <Calendar className="w-4 h-4 text-foreground/50" aria-hidden="true" />
                      <span>{report.period[lang]}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-foreground/60 italic">
                      {t('btn.comingSoon')}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={true}
                      className="cursor-not-allowed opacity-60"
                      ariaLabel={`${t('btn.download')} ${report.title[lang]} - ${t('btn.comingSoon')}`}
                    >
                      <Download className="w-4 h-4 mr-1.5" aria-hidden="true" />
                      {t('btn.comingSoon')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <HelpButton />
    </>
  );
}
