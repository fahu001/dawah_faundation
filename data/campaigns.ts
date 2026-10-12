import { Lang } from './translations';

export interface Campaign {
  slug: string;
  category: string;
  title: Record<Lang, string>;
  shortDesc: Record<Lang, string>;
  longDesc: Record<Lang, string>;
  goalBDT: number;
  raisedBDT: number;
  image: string;
}

export const campaignCategories: Record<Lang, Record<string, string>> = {
  bn: {
    all: 'সব',
    education: 'শিক্ষা',
    health: 'স্বাস্থ্য',
    relief: 'ত্রাণ',
    dawah: 'দাওয়াহ',
  },
  en: {
    all: 'All',
    education: 'Education',
    health: 'Health',
    relief: 'Relief',
    dawah: 'Dawah',
  },
};

export const campaigns: Campaign[] = [
  {
    slug: 'winter-blanket-drive',
    category: 'relief',
    title: { bn: 'শীতবস্ত্র বিতরণ ক্যাম্পেইন', en: 'Winter Blanket Drive' },
    shortDesc: {
      bn: 'শীতার্ত মানুষদের জন্য কম্বল ও শীতবস্ত্র বিতরণ (নমুনা তথ্য)',
      en: 'Distributing blankets and warm clothes to those in need (sample data)',
    },
    longDesc: {
      bn: 'প্রতি শীতে আমরা সুবিধাবঞ্চিত পরিবারগুলোর কাছে কম্বল ও উষ্ণ পোশাক পৌঁছে দিই। এই ক্যাম্পেইনে আপনার অবদান প্রত্যক্ষভাবে একটি পরিবারকে শীত থেকে রক্ষা করবে। (নমুনা বিবরণ)',
      en: 'Every winter, we deliver blankets and warm clothing to underprivileged families. Your contribution to this campaign directly protects a family from the cold. (Sample description)',
    },
    goalBDT: 500000,
    raisedBDT: 325000,
    image: '/images/campaigns/winter.jpg',
  },
  {
    slug: 'school-supplies',
    category: 'education',
    title: { bn: 'স্কুল সামগ্রী বিতরণ', en: 'School Supplies Distribution' },
    shortDesc: {
      bn: 'দরিদ্র শিক্ষার্থীদের জন্য বই, খাতা ও শিক্ষা উপকরণ (নমুনা তথ্য)',
      en: 'Books, notebooks, and supplies for underprivileged students (sample data)',
    },
    longDesc: {
      bn: 'প্রতি শিক্ষাবর্ষের শুরুতে আমরা অসচ্ছল পরিবারের শিক্ষার্থীদের বই, খাতা, কলম এবং স্কুল ব্যাগ প্রদান করি। (নমুনা বিবরণ)',
      en: 'At the beginning of each academic year, we provide books, notebooks, pens, and school bags to students from disadvantaged families. (Sample description)',
    },
    goalBDT: 300000,
    raisedBDT: 180000,
    image: '/images/campaigns/school.jpg',
  },
  {
    slug: 'free-medical-camp',
    category: 'health',
    title: { bn: 'বিনামূল্যে চিকিৎসা শিবির', en: 'Free Medical Camp' },
    shortDesc: {
      bn: 'প্রত্যন্ত অঞ্চলে বিনামূল্যে স্বাস্থ্য পরীক্ষা ও ঔষধ বিতরণ (নমুনা তথ্য)',
      en: 'Free health checkups and medicine distribution in remote areas (sample data)',
    },
    longDesc: {
      bn: 'আমাদের চিকিৎসা শিবিরে অভিজ্ঞ ডাক্তাররা বিনামূল্যে রোগীদের পরীক্ষা করেন এবং প্রয়োজনীয় ঔষধ প্রদান করেন। (নমুনা বিবরণ)',
      en: 'At our medical camps, experienced doctors examine patients free of charge and provide necessary medicine. (Sample description)',
    },
    goalBDT: 400000,
    raisedBDT: 250000,
    image: '/images/campaigns/medical.jpg',
  },
  {
    slug: 'quran-education',
    category: 'dawah',
    title: { bn: 'কুরআন শিক্ষা কার্যক্রম', en: 'Quran Education Program' },
    shortDesc: {
      bn: 'শিশু ও প্রাপ্তবয়স্কদের জন্য কুরআন শিক্ষা কার্যক্রম (নমুনা তথ্য)',
      en: 'Quran education programs for children and adults (sample data)',
    },
    longDesc: {
      bn: 'আমরা শিশু ও প্রাপ্তবয়স্কদের জন্য সঠিক তাজউইদসহ কুরআন পড়া শেখানোর ব্যবস্থা করি। যোগ্য শিক্ষকদের মাধ্যমে নিয়মিত ক্লাস পরিচালিত হয়। (নমুনা বিবরণ)',
      en: 'We arrange Quran recitation classes with proper tajweed for children and adults, conducted by qualified teachers. (Sample description)',
    },
    goalBDT: 200000,
    raisedBDT: 120000,
    image: '/images/campaigns/quran.jpg',
  },
];
