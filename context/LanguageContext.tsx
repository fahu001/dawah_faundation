'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, t } from '@/data/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bn');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dwf-lang');
      if (saved === 'bn' || saved === 'en') {
        setLangState(saved);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('dwf-lang', newLang);
    } catch {
      // localStorage unavailable
    }
  };

  const translate = (key: string) => t(key, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
