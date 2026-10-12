'use client';

import React from 'react';
import Link from 'next/link';
import {
  Heart,
  BookOpen,
  Stethoscope,
  HandHeart,
  Users,
  ChevronRight,
  Shield,
  BarChart3,
  Clock,
  Globe,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpButton from '@/components/layout/HelpButton';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import ProgressBar from '@/components/ui/ProgressBar';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { programs } from '@/data/programs';
import { campaigns } from '@/data/campaigns';

function toLocalNumber(numStr: string, lang: string): string {
  if (lang !== 'bn') return numStr;
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return numStr.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export default function HomePage() {
  const { lang, t } = useLanguage();

  const featuredCampaigns = campaigns.slice(0, 3);

  const impactStats = [
    { value: '5,000+', labelKey: 'impact.families', icon: Users },
    { value: '3,200+', labelKey: 'impact.students', icon: BookOpen },
    { value: '8,500+', labelKey: 'impact.medical', icon: Stethoscope },
    { value: '120+', labelKey: 'impact.communities', icon: Heart },
  ];

  const donationSteps = [
    {
      step: 1,
      titleKey: 'donation.step1.title',
      descKey: 'donation.step1.desc',
      icon: Heart,
    },
    {
      step: 2,
      titleKey: 'donation.step2.title',
      descKey: 'donation.step2.desc',
      icon: HandHeart,
    },
    {
      step: 3,
      titleKey: 'donation.step3.title',
      descKey: 'donation.step3.desc',
      icon: Users,
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* 1. Hero Section */}
        <section
          className="hero-pattern py-24 md:py-32 text-white text-center relative overflow-hidden"
          aria-label={t('hero.title')}
        >
          <Container>
            <div className="max-w-4xl mx-auto space-y-6">
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight sm:leading-tight ${
                  lang === 'bn' ? 'font-bangla font-bold' : 'font-display font-bold'
                }`}
              >
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="primary" size="lg" href="/donate" className="w-full sm:w-auto">
                  {t('btn.donateNow')}
                </Button>
                <Button variant="secondary" size="lg" href="/programs" className="w-full sm:w-auto">
                  {t('btn.ourPrograms')}
                </Button>
              </div>

              {/* Trust Items Row */}
              <div className="pt-12 mt-12 border-t border-white/15">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/90">
                  <div className="flex items-center justify-center gap-3">
                    <Shield className="w-5 h-5 text-accent-light shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium">{t('hero.trust1')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Globe className="w-5 h-5 text-accent-light shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium">{t('hero.trust2')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <BarChart3 className="w-5 h-5 text-accent-light shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium">{t('hero.trust3')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. Impact Numbers */}
        <section className="bg-surface py-16 sm:py-20 border-b border-border" aria-label={t('impact.title')}>
          <Container>
            <SectionHeading
              titleKey="impact.title"
              subtitleKey="impact.subtitle"
              centered
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {impactStats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={idx}
                    className="p-6 text-center hover:shadow-md transition-shadow bg-surface border-border flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1 tracking-tight">
                      {toLocalNumber(stat.value, lang)}
                    </div>
                    <div className="text-sm sm:text-base font-medium text-foreground/80">
                      {t(stat.labelKey)}
                    </div>
                  </Card>
                );
              })}
            </div>

            <p className="text-center text-xs text-foreground/60 mt-6">
              {t('sample.data')}
            </p>
          </Container>
        </section>

        {/* 3. Our Programs */}
        <section className="py-16 sm:py-20" aria-label={t('programs.title')}>
          <Container>
            <SectionHeading
              titleKey="programs.title"
              subtitleKey="programs.subtitle"
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {programs.map((program) => (
                <Card
                  key={program.slug}
                  className="flex flex-col h-full hover:shadow-md transition-shadow group border-border"
                >
                  <ImagePlaceholder
                    aspectRatio="video"
                    label={program.title[lang]}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {program.title[lang]}
                    </h3>
                    <p className="text-sm text-foreground/75 mb-4 flex-1 leading-relaxed">
                      {program.shortDesc[lang]}
                    </p>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors mt-auto pt-2 group-hover:translate-x-0.5"
                    >
                      <span>{t('btn.learnMore')}</span>
                      <ChevronRight className="w-4 h-4 ml-1 shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* 4. Featured Campaigns */}
        <section className="bg-surface py-16 sm:py-20 border-y border-border" aria-label={t('campaigns.title')}>
          <Container>
            <SectionHeading
              titleKey="campaigns.title"
              subtitleKey="campaigns.subtitle"
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredCampaigns.map((campaign) => (
                <Card
                  key={campaign.slug}
                  className="flex flex-col h-full hover:shadow-md transition-shadow border-border"
                >
                  <ImagePlaceholder
                    aspectRatio="video"
                    label={campaign.title[lang]}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                      {campaign.title[lang]}
                    </h3>
                    <p className="text-sm text-foreground/75 mb-5 flex-1 leading-relaxed line-clamp-2">
                      {campaign.shortDesc[lang]}
                    </p>

                    <ProgressBar
                      current={campaign.raisedBDT}
                      goal={campaign.goalBDT}
                      showLabel={true}
                      className="mb-5"
                    />

                    <Button
                      variant="primary"
                      size="md"
                      href={`/campaigns/${campaign.slug}`}
                      className="w-full"
                    >
                      {t('btn.donateNow')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10 sm:mt-12">
              <Button variant="outline" size="md" href="/campaigns">
                {t('btn.viewAll')}
              </Button>
            </div>
          </Container>
        </section>

        {/* 5. How Your Donation Helps */}
        <section className="py-16 sm:py-20" aria-label={t('donation.howTitle')}>
          <Container>
            <SectionHeading
              titleKey="donation.howTitle"
              centered
            />

            <div className="relative mt-8 sm:mt-12">
              {/* Connecting dashed line for md+ */}
              <div
                className="hidden md:block absolute top-7 left-1/6 right-1/6 border-t-2 border-dashed border-primary/20 -z-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
                {donationSteps.map((step) => {
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={step.step}
                      className="text-center flex flex-col items-center"
                    >
                      <div className="relative mb-5">
                        <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-md border-4 border-background">
                          {toLocalNumber(step.step.toString(), lang)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center">
                          <StepIcon className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-sm sm:text-base text-foreground/75 max-w-xs leading-relaxed">
                        {t(step.descKey)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* 6. Transparency */}
        <section className="bg-surface-muted py-16 sm:py-20 border-y border-border" aria-label={t('transparency.title')}>
          <Container>
            <SectionHeading
              titleKey="transparency.title"
              subtitleKey="transparency.subtitle"
              centered
            />

            <div className="max-w-xl mx-auto">
              <Card className="p-8 text-center flex flex-col items-center bg-surface border-border shadow-sm">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {t('transparency.reportCard')}
                </h3>
                <p className="text-sm text-foreground/70 mb-5 max-w-sm">
                  {t('transparency.subtitle')}
                </p>
                <Button variant="outline" size="sm" disabled>
                  {t('btn.comingSoon')}
                </Button>
              </Card>
            </div>
          </Container>
        </section>

        {/* 7. Volunteer CTA */}
        <section className="py-16 sm:py-20" aria-label={t('volunteer.ctaTitle')}>
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <SectionHeading
                titleKey="volunteer.ctaTitle"
                centered
              />
              <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto mb-8 -mt-6 leading-relaxed">
                {t('volunteer.ctaDesc')}
              </p>
              <Button variant="primary" size="lg" href="/volunteer">
                {t('btn.volunteer')}
              </Button>
            </div>
          </Container>
        </section>

        {/* 8. Final Donate Banner */}
        <section
          className="hero-pattern py-16 md:py-20 text-white text-center"
          aria-label={t('donateBanner.title')}
        >
          <Container>
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {t('donateBanner.title')}
              </h2>
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed pb-4">
                {t('donateBanner.desc')}
              </p>
              <div>
                <Button variant="primary" size="lg" href="/donate">
                  {t('btn.donateNow')}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <HelpButton />
    </>
  );
}
