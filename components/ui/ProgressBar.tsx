'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface ProgressBarProps {
  current: number;
  goal: number;
  showLabel?: boolean;
  className?: string;
}

function formatNumber(num: number, lang: string): string {
  const formatted = num.toLocaleString('en-US');
  if (lang === 'bn') {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return formatted.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
  }
  return formatted;
}

export default function ProgressBar({
  current,
  goal,
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  const { lang } = useLanguage();

  const percentage = goal > 0 ? Math.min(100, Math.max(0, Math.round((current / goal) * 100))) : 0;
  const formattedCurrent = formatNumber(current, lang);
  const formattedGoal = formatNumber(goal, lang);
  const formattedPercentage = formatNumber(percentage, lang);

  return (
    <div className={`w-full ${className}`.trim()}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm font-medium text-foreground mb-1.5">
          <span>
            ৳{formattedCurrent} / ৳{formattedGoal}
          </span>
          <span className="font-semibold text-primary">{formattedPercentage}%</span>
        </div>
      )}
      <div
        className="w-full bg-surface-muted rounded-full h-2.5 overflow-hidden border border-border/60"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 animate-progress"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
