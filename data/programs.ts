import { Lang } from './translations';

export interface Program {
  slug: string;
  icon: string;
  title: Record<Lang, string>;
  shortDesc: Record<Lang, string>;
  longDesc: Record<Lang, string>;
  image: string;
}

export const programs: Program[] = [
  {
    slug: 'education',
    icon: 'GraduationCap',
    title: { bn: 'শিক্ষা কার্যক্রম', en: 'Education Program' },
    shortDesc: {
      bn: 'সুবিধাবঞ্চিত শিশুদের জন্য মানসম্মত শিক্ষা প্রদান (নমুনা তথ্য)',
      en: 'Providing quality education for underprivileged children (sample data)',
    },
    longDesc: {
      bn: 'আমাদের শিক্ষা কার্যক্রমের মাধ্যমে আমরা সুবিধাবঞ্চিত শিশুদের মানসম্মত শিক্ষা, স্কুল সামগ্রী ও বৃত্তি প্রদান করি। (নমুনা বিবরণ – প্রকৃত তথ্য পরে যোগ করা হবে)',
      en: 'Through our education program, we provide quality education, school supplies, and scholarships to underprivileged children. (Sample description – real content will be added later)',
    },
    image: '/images/programs/education.jpg',
  },
  {
    slug: 'health',
    icon: 'HeartPulse',
    title: { bn: 'স্বাস্থ্যসেবা কার্যক্রম', en: 'Healthcare Program' },
    shortDesc: {
      bn: 'বিনামূল্যে স্বাস্থ্য পরীক্ষা ও চিকিৎসা সেবা (নমুনা তথ্য)',
      en: 'Free health checkups and medical services (sample data)',
    },
    longDesc: {
      bn: 'আমরা প্রত্যন্ত অঞ্চলে বিনামূল্যে স্বাস্থ্য শিবির, ঔষধ বিতরণ এবং স্বাস্থ্য সচেতনতা কার্যক্রম পরিচালনা করি। (নমুনা বিবরণ)',
      en: 'We organize free health camps, medicine distribution, and health awareness programs in remote areas. (Sample description)',
    },
    image: '/images/programs/health.jpg',
  },
  {
    slug: 'relief',
    icon: 'HandHeart',
    title: { bn: 'ত্রাণ ও দুর্যোগ ব্যবস্থাপনা', en: 'Relief & Disaster Response' },
    shortDesc: {
      bn: 'প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্তদের জন্য জরুরি ত্রাণ (নমুনা তথ্য)',
      en: 'Emergency relief for natural disaster victims (sample data)',
    },
    longDesc: {
      bn: 'বন্যা, ঘূর্ণিঝড় ও অন্যান্য প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্তদের জন্য আমরা খাদ্য, বস্ত্র, আশ্রয় ও পুনর্বাসন সহায়তা প্রদান করি। (নমুনা বিবরণ)',
      en: 'We provide food, clothing, shelter, and rehabilitation support for victims of floods, cyclones, and other natural disasters. (Sample description)',
    },
    image: '/images/programs/relief.jpg',
  },
  {
    slug: 'dawah-community',
    icon: 'Users',
    title: { bn: 'দাওয়াহ ও সমাজসেবা', en: 'Dawah & Community Service' },
    shortDesc: {
      bn: 'ইসলামী দাওয়াহ ও সামাজিক সচেতনতা কার্যক্রম (নমুনা তথ্য)',
      en: 'Islamic dawah and social awareness programs (sample data)',
    },
    longDesc: {
      bn: 'ইসলামী শিক্ষা, সেমিনার, কর্মশালা এবং সামাজিক সচেতনতামূলক কার্যক্রমের মাধ্যমে আমরা সমাজে ইতিবাচক পরিবর্তন আনতে কাজ করি। (নমুনা বিবরণ)',
      en: 'Through Islamic education, seminars, workshops, and social awareness programs, we work to bring positive change in society. (Sample description)',
    },
    image: '/images/programs/dawah.jpg',
  },
];
