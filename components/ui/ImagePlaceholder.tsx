'use client';

import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface ImagePlaceholderProps {
  aspectRatio?: 'video' | 'square' | 'portrait';
  className?: string;
  label?: string;
}

const aspectRatioStyles: Record<'video' | 'square' | 'portrait', string> = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
};

export default function ImagePlaceholder({
  aspectRatio = 'video',
  className = '',
  label,
}: ImagePlaceholderProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`w-full bg-gray-200 flex flex-col items-center justify-center p-4 text-gray-500 select-none ${aspectRatioStyles[aspectRatio]} ${className}`.trim()}
      role="img"
      aria-label={label ?? t('sample.image')}
    >
      <ImageIcon className="w-8 h-8 mb-2 opacity-60" aria-hidden="true" />
      <span className="text-sm font-medium tracking-wide">
        {label ?? t('sample.image')}
      </span>
    </div>
  );
}
