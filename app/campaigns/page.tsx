'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpButton from '@/components/layout/HelpButton';
import Container from '@/components/ui/Container';
import { Card, ImagePlaceholder, ProgressBar } from '@/components/ui';
import { campaigns, campaignCategories } from '@/data/campaigns';

export default function CampaignsPage() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    document.title = `${t('campaigns.title')} | ${t('site.name.en')}`;
  }, [lang, t]);

  const categories = campaignCategories[lang] || campaignCategories.bn;

  const filteredCampaigns =
    activeFilter === 'all'
      ? campaigns
      : campaigns.filter((c) => c.category === activeFilter);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero banner */}
        <section className="bg-primary-dark text-white py-16">
          <Container className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {t('campaigns.title')}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {t('campaigns.subtitle')}
            </p>
          </Container>
        </section>

        {/* Campaign filter & grid */}
        <section className="py-12 sm:py-16 bg-background">
          <Container>
            {/* Category Filter Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
              {Object.entries(categories).map(([key, label]) => {
                const isActive = activeFilter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveFilter(key)}
                    className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-accent text-white shadow-sm ring-2 ring-accent ring-offset-2 ring-offset-background'
                        : 'bg-surface text-foreground border border-border hover:bg-surface-muted hover:border-accent/40'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCampaigns.map((campaign) => (
                <Card
                  key={campaign.slug}
                  className="flex flex-col h-full hover:shadow-md transition-shadow duration-200"
                >
                  <ImagePlaceholder
                    aspectRatio="video"
                    label={campaign.title[lang]}
                  />
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="mb-2">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded bg-surface-muted text-primary border border-primary/20">
                          {categories[campaign.category] ?? campaign.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2">
                        {campaign.title[lang]}
                      </h2>
                      <p className="text-sm text-foreground/75 leading-relaxed mb-6">
                        {campaign.shortDesc[lang]}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <ProgressBar
                        current={campaign.raisedBDT}
                        goal={campaign.goalBDT}
                        showLabel={true}
                      />

                      <div className="pt-2">
                        <Link
                          href={`/campaigns/${campaign.slug}`}
                          className="inline-flex items-center justify-between w-full text-sm font-semibold text-accent hover:text-accent-dark transition-colors py-2 border-t border-border"
                        >
                          <span>{t('btn.readMore')}</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
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
