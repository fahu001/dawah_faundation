'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface SectionHeadingProps {
  titleKey: string;
  subtitleKey?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  titleKey,
  subtitleKey,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`mb-10 sm:mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`.trim()}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
        {t(titleKey)}
      </h2>
      <div
        className={`h-1 w-16 bg-accent rounded-full mt-3 mb-3 ${
          centered ? 'mx-auto' : ''
        }`}
        aria-hidden="true"
      />
      {subtitleKey && (
        <p className="text-base sm:text-lg text-foreground/75 max-w-2xl mt-2 mx-auto">
          {t(subtitleKey)}
        </p>
      )}
    </div>
  );
}
