'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpButton from '@/components/layout/HelpButton';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { Heart, ShieldCheck, Sparkles, Users } from 'lucide-react';

export default function AboutPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('about.title')} | ${t(lang === 'bn' ? 'site.name.bn' : 'site.name.en')}`;
  }, [lang, t]);

  const values = [
    { title: t('about.value1'), icon: Heart },
    { title: t('about.value2'), icon: ShieldCheck },
    { title: t('about.value3'), icon: Sparkles },
    { title: t('about.value4'), icon: Users },
  ];

  const teamMembers = [
    { id: 1, roleKey: 'about.sampleRole' },
    { id: 2, roleKey: 'about.sampleRole' },
    { id: 3, roleKey: 'about.sampleRole' },
    { id: 4, roleKey: 'about.sampleRole' },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero banner */}
        <section className="bg-primary-dark text-white py-16 text-center">
          <Container>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t('about.title')}
            </h1>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto text-base sm:text-lg">
              {t('site.motto')}
            </p>
          </Container>
        </section>

        {/* Who We Are */}
        <section className="py-16 sm:py-20 bg-background">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {t('about.whoTitle')}
                </h2>
                <div className="h-1 w-16 bg-accent rounded-full mb-6" aria-hidden="true" />
                <p className="text-foreground/80 leading-relaxed text-base sm:text-lg">
                  {t('about.whoDesc')}
                </p>
              </div>
              <div>
                <ImagePlaceholder aspectRatio="video" className="rounded-xl shadow-sm" />
              </div>
            </div>
          </Container>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="py-16 sm:py-20 bg-surface-muted scroll-mt-20">
          <Container>
            <SectionHeading titleKey="nav.about.mission" centered />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                    {t('about.missionTitle')}
                  </h3>
                  <div className="h-0.5 w-12 bg-accent rounded-full mb-4" aria-hidden="true" />
                  <p className="text-foreground/80 leading-relaxed">
                    {t('about.missionDesc')}
                  </p>
                </div>
              </Card>

              <Card className="p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                    {t('about.visionTitle')}
                  </h3>
                  <div className="h-0.5 w-12 bg-accent rounded-full mb-4" aria-hidden="true" />
                  <p className="text-foreground/80 leading-relaxed">
                    {t('about.visionDesc')}
                  </p>
                </div>
              </Card>
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-20 bg-background">
          <Container>
            <SectionHeading titleKey="about.valuesTitle" centered />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <Card key={idx} className="p-6 text-center hover:border-accent transition-colors">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <IconComponent className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {val.title}
                    </h3>
                  </Card>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Team */}
        <section id="team" className="py-16 sm:py-20 bg-surface-muted scroll-mt-20">
          <Container>
            <SectionHeading
              titleKey="about.teamTitle"
              subtitleKey="about.teamSubtitle"
              centered
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="p-4 text-center">
                  <ImagePlaceholder
                    aspectRatio="square"
                    className="rounded-lg mb-4"
                    label={`${t('about.sampleName')} ${member.id}`}
                  />
                  <h3 className="font-semibold text-lg text-foreground">
                    {t('about.sampleName')} {member.id}
                  </h3>
                  <p className="text-sm text-foreground/70 mt-1">
                    {t(member.roleKey)}
                  </p>
                  <span className="inline-block mt-3 text-xs px-2.5 py-0.5 rounded-full bg-surface-muted text-foreground/60 border border-border">
                    {t('sample.data')}
                  </span>
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
