'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Heart, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpButton from '@/components/layout/HelpButton';
import Container from '@/components/ui/Container';
import { Button, Card, ImagePlaceholder, ProgressBar } from '@/components/ui';
import { campaigns } from '@/data/campaigns';

function formatCurrency(amount: number, lang: string): string {
  const formatted = amount.toLocaleString('en-US');
  if (lang === 'bn') {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return formatted.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
  }
  return formatted;
}

export default function CampaignDetailPage() {
  const { lang, t } = useLanguage();
  const rawParams = useParams();
  const params =
    rawParams && typeof (rawParams as Promise<{ slug?: string }>).then === 'function'
      ? React.use(rawParams as Promise<{ slug?: string }>)
      : (rawParams as { slug?: string | string[] } | null);

  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
  const campaign = campaigns.find((c) => c.slug === slug);

  useEffect(() => {
    if (campaign) {
      document.title = `${campaign.title[lang]} | ${t('site.name.en')}`;
    } else {
      document.title = `${t('404.title')} | ${t('site.name.en')}`;
    }
  }, [campaign, lang, t]);

  if (!campaign) {
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
            <Button href="/campaigns" variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              {t('nav.campaigns')}
            </Button>
          </Container>
        </main>
        <Footer />
        <HelpButton />
      </>
    );
  }

  const formattedGoal = formatCurrency(campaign.goalBDT, lang);
  const formattedRaised = formatCurrency(campaign.raisedBDT, lang);

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero banner */}
        <section className="bg-primary-dark text-white py-16">
          <Container>
            <div className="mb-4">
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                {t('nav.campaigns')}
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {campaign.title[lang]}
            </h1>
          </Container>
        </section>

        {/* Campaign Details Two-Column Section */}
        <section className="py-12 sm:py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
              {/* Left Column: Image & Long Description */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="overflow-hidden">
                  <ImagePlaceholder
                    aspectRatio="video"
                    label={campaign.title[lang]}
                    className="w-full h-[320px] sm:h-[420px]"
                  />
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {campaign.title[lang]}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-foreground/80 whitespace-pre-line">
                      {campaign.longDesc[lang]}
                    </p>
                  </div>
                </Card>

                <div className="pt-2">
                  <Link
                    href="/campaigns"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/75 hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    {t('nav.campaigns')}
                  </Link>
                </div>
              </div>

              {/* Right Column: Donation Status & Action Card */}
              <div className="lg:col-span-1 lg:sticky lg:top-24">
                <Card className="p-6 sm:p-8 border-2 border-primary/20 shadow-md">
                  <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                    {t('btn.donateNow')}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-foreground/75">
                        <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
                        {t('campaigns.raised')}:
                      </span>
                      <span className="font-bold text-lg text-primary">
                        ৳{formattedRaised}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-foreground/75">
                        <Target className="w-4 h-4 text-accent" aria-hidden="true" />
                        {t('campaigns.goal')}:
                      </span>
                      <span className="font-semibold text-foreground">
                        ৳{formattedGoal}
                      </span>
                    </div>

                    <div className="pt-2">
                      <ProgressBar
                        current={campaign.raisedBDT}
                        goal={campaign.goalBDT}
                        showLabel={false}
                      />
                    </div>
                  </div>

                  <Button
                    href="/donate"
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 text-base font-semibold"
                  >
                    <Heart className="w-5 h-5 fill-current" aria-hidden="true" />
                    {t('btn.donateNow')}
                  </Button>
                </Card>
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
