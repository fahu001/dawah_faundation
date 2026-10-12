'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, HeartPulse, HandHeart, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpButton from '@/components/layout/HelpButton';
import Container from '@/components/ui/Container';
import { Button, Card, SectionHeading, ImagePlaceholder } from '@/components/ui';
import { programs } from '@/data/programs';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  HeartPulse,
  HandHeart,
  Users,
};

export default function ProgramsPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('programs.title')} | ${t('site.name.en')}`;
  }, [lang, t]);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero banner */}
        <section className="bg-primary-dark text-white py-16">
          <Container className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {t('programs.title')}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {t('programs.subtitle')}
            </p>
          </Container>
        </section>

        {/* Programs Listing */}
        <section className="py-12 sm:py-16 bg-background">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program) => {
                const IconComponent = iconMap[program.icon] || GraduationCap;
                return (
                  <Card
                    key={program.slug}
                    className="flex flex-col h-full hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative">
                      <ImagePlaceholder
                        aspectRatio="video"
                        label={program.title[lang]}
                      />
                      <div className="absolute top-3 left-3 bg-primary text-white p-2 rounded-lg shadow-sm">
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-2">
                          {program.title[lang]}
                        </h2>
                        <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                          {program.shortDesc[lang]}
                        </p>
                      </div>
                      <div className="pt-2">
                        <Link
                          href={`/programs/${program.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                        >
                          {t('btn.learnMore')}
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <HelpButton />
    </>
  );
}
