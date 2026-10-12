'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HelpButton() {
  const { t } = useLanguage();

  return (
    <Link
      href="/contact"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-accent active:scale-95"
      aria-label={t('help.text')}
    >
      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
      <span>{t('help.text')}</span>
    </Link>
  );
}
