'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.about', href: '/about' },
    { labelKey: 'nav.programs', href: '/programs/education' },
    { labelKey: 'nav.campaigns', href: '/campaigns' },
    { labelKey: 'nav.reports', href: '/reports' },
    { labelKey: 'nav.contact', href: '/contact' },
  ];

  return (
    <footer className="bg-primary-dark text-white pt-12 pb-8 border-t border-primary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          {/* Col 1: Logo + Site Name + Short Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/logo.png"
                  alt={t('site.name.bn')}
                  width={40}
                  height={40}
                  className="w-full h-auto object-contain"
                />
              </div>
              <span className="font-bangla font-bold text-lg text-white leading-tight">
                {t('site.name.bn')}
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-accent-light tracking-wide">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white hover:underline transition-colors inline-block py-0.5"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-accent-light tracking-wide">
              {t('footer.contact')}
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-accent-light shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`tel:${t('site.phone')}`}
                  className="hover:text-white transition-colors"
                >
                  {t('site.phone')}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-accent-light shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`mailto:${t('site.email')}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {t('site.email')}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-light shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {t('contact.addressValue')}{' '}
                  <span className="text-xs text-white/60">{t('sample.data')}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Motto + Donate Button */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-accent-light tracking-wide">
              {t('site.motto')}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-accent hover:bg-accent-light text-white font-medium rounded-md shadow-sm transition-colors text-sm"
              >
                <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>{t('btn.donateNow')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar: Copyright + Demo Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p className="text-center sm:text-left">
            {t('footer.rights')}
          </p>

          {/* Prominent Demo Notice */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-400/15 border border-amber-400/50 text-amber-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
            <span>{t('site.demo')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
