import { Lang } from './translations';

export interface Report {
  id: string;
  title: Record<Lang, string>;
  period: Record<Lang, string>;
  type: Record<Lang, string>;
  available: boolean;
}

export const reports: Report[] = [
  {
    id: 'annual-2024',
    title: { bn: 'বার্ষিক প্রতিবেদন ২০২৪', en: 'Annual Report 2024' },
    period: { bn: 'জানুয়ারি – ডিসেম্বর ২০২৪', en: 'January – December 2024' },
    type: { bn: 'বার্ষিক', en: 'Annual' },
    available: false,
  },
  {
    id: 'financial-2024',
    title: { bn: 'আর্থিক প্রতিবেদন ২০২৪', en: 'Financial Report 2024' },
    period: { bn: 'জানুয়ারি – ডিসেম্বর ২০২৪', en: 'January – December 2024' },
    type: { bn: 'আর্থিক', en: 'Financial' },
    available: false,
  },
  {
    id: 'quarterly-q3-2024',
    title: { bn: 'ত্রৈমাসিক প্রতিবেদন (জুলাই–সেপ্টেম্বর ২০২৪)', en: 'Quarterly Report (Jul–Sep 2024)' },
    period: { bn: 'জুলাই – সেপ্টেম্বর ২০২৪', en: 'July – September 2024' },
    type: { bn: 'ত্রৈমাসিক', en: 'Quarterly' },
    available: false,
  },
  {
    id: 'impact-2024',
    title: { bn: 'প্রভাব প্রতিবেদন ২০২৪', en: 'Impact Report 2024' },
    period: { bn: 'জানুয়ারি – ডিসেম্বর ২০২৪', en: 'January – December 2024' },
    type: { bn: 'প্রভাব', en: 'Impact' },
    available: false,
  },
];
