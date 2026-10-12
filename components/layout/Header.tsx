'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, ChevronDown, Menu, X, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SubMenuItem {
  labelKey: string;
  href: string;
}

interface NavItem {
  labelKey: string;
  href?: string;
  children?: SubMenuItem[];
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.home', href: '/' },
  {
    labelKey: 'nav.about',
    children: [
      { labelKey: 'nav.about.who', href: '/about' },
      { labelKey: 'nav.about.mission', href: '/about#mission' },
      { labelKey: 'nav.about.team', href: '/about#team' },
    ],
  },
  {
    labelKey: 'nav.programs',
    children: [
      { labelKey: 'nav.programs.education', href: '/programs/education' },
      { labelKey: 'nav.programs.health', href: '/programs/health' },
      { labelKey: 'nav.programs.relief', href: '/programs/relief' },
      { labelKey: 'nav.programs.dawah', href: '/programs/dawah-community' },
    ],
  },
  { labelKey: 'nav.campaigns', href: '/campaigns' },
  {
    labelKey: 'nav.waysToGive',
    children: [
      { labelKey: 'nav.waysToGive.general', href: '/donate' },
      { labelKey: 'nav.waysToGive.monthly', href: '/donate' },
      { labelKey: 'nav.waysToGive.zakat', href: '/donate' },
      { labelKey: 'nav.waysToGive.sadaqah', href: '/donate' },
    ],
  },
  { labelKey: 'nav.reports', href: '/reports' },
  { labelKey: 'nav.contact', href: '/contact' },
];

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  const [desktopOpenMenu, setDesktopOpenMenu] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileExpandedMenus, setMobileExpandedMenus] = useState<Record<string, boolean>>({});

  const navContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setDesktopOpenMenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle escape key to close menus
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDesktopOpenMenu(null);
        setMobileDrawerOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
    setDesktopOpenMenu(null);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDesktopOpenMenu(key);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setDesktopOpenMenu(null);
    }, 150);
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileExpandedMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <header className="w-full">
      {/* a) TOP UTILITY BAR */}
      <div className="bg-primary-dark text-white text-xs sm:text-sm py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Phone & Email */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a
              href={`tel:${t('site.phone')}`}
              className="flex items-center gap-1.5 hover:text-accent-light transition-colors"
              aria-label="Phone"
            >
              <Phone className="w-3.5 h-3.5 text-accent-light shrink-0" aria-hidden="true" />
              <span>{t('site.phone')}</span>
            </a>
            <a
              href={`mailto:${t('site.email')}`}
              className="flex items-center gap-1.5 hover:text-accent-light transition-colors"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5 text-accent-light shrink-0" aria-hidden="true" />
              <span>{t('site.email')}</span>
            </a>
          </div>

          {/* Right: Language toggle & Gold Donate button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-1" role="group" aria-label="Language selection">
              <button
                type="button"
                onClick={() => setLang('bn')}
                className={`px-2 py-0.5 text-xs font-bangla transition-colors ${
                  lang === 'bn'
                    ? 'text-white border-b-2 border-accent-light font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-pressed={lang === 'bn'}
              >
                {t('lang.bn')}
              </button>
              <span className="text-white/40 text-xs">|</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 text-xs transition-colors ${
                  lang === 'en'
                    ? 'text-white border-b-2 border-accent-light font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-pressed={lang === 'en'}
              >
                {t('lang.en')}
              </button>
            </div>

            <Link
              href="/donate"
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-light text-white font-medium px-3 py-1 rounded text-xs transition-colors shadow-xs"
            >
              <Heart className="w-3 h-3 fill-current" aria-hidden="true" />
              <span>{t('btn.donate')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* b) MAIN HEADER */}
      <div className="bg-surface sticky top-0 z-50 shadow-xs border-b border-border py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo & Site Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-accent"
            aria-label={t('site.name.bn')}
          >
            <div className="relative w-[50px] h-[50px] shrink-0">
              <Image
                src="/logo.png"
                alt={t('site.name.bn')}
                width={50}
                height={50}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bangla font-bold text-lg sm:text-xl text-primary-dark leading-tight group-hover:text-primary transition-colors">
                {t('site.name.bn')}
              </span>
              <span className="text-[11px] font-sans tracking-wide text-foreground/60 hidden sm:block">
                {t('site.motto')}
              </span>
            </div>
          </Link>

          {/* Right: Desktop Navigation */}
          <nav
            ref={navContainerRef}
            className="hidden lg:flex items-center space-x-1"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.children && item.children.length > 0);
              const isOpen = desktopOpenMenu === item.labelKey;
              const isActive = item.href ? pathname === item.href : false;

              if (!hasDropdown) {
                return (
                  <Link
                    key={item.labelKey}
                    href={item.href || '#'}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary font-semibold bg-surface-muted'
                        : 'text-foreground hover:text-primary hover:bg-surface-muted/60'
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              }

              return (
                <div
                  key={item.labelKey}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.labelKey)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setDesktopOpenMenu((current) =>
                        current === item.labelKey ? null : item.labelKey
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setDesktopOpenMenu((current) =>
                          current === item.labelKey ? null : item.labelKey
                        );
                      }
                    }}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      isOpen
                        ? 'text-primary bg-surface-muted'
                        : 'text-foreground hover:text-primary hover:bg-surface-muted/60'
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                  >
                    <span>{t(item.labelKey)}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-primary' : 'text-foreground/60'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      className="absolute left-0 mt-1 w-56 rounded-lg bg-surface shadow-lg border border-border py-1.5 z-50 focus:outline-none"
                    >
                      {item.children?.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.labelKey}
                            href={subItem.href}
                            role="menuitem"
                            onClick={() => setDesktopOpenMenu(null)}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isSubActive
                                ? 'bg-surface-muted text-primary font-medium'
                                : 'text-foreground hover:bg-surface-muted/80 hover:text-primary'
                            }`}
                          >
                            {t(subItem.labelKey)}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-surface-muted transition-colors focus-visible:outline-accent"
              aria-label="Open main menu"
              aria-expanded={mobileDrawerOpen}
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-surface shadow-2xl flex flex-col z-50 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setMobileDrawerOpen(false)}
              >
                <Image
                  src="/logo.png"
                  alt={t('site.name.bn')}
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
                <span className="font-bangla font-bold text-base text-primary-dark">
                  {t('site.name.bn')}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-surface-muted"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Language switch & Quick Donate inside Drawer */}
            <div className="p-4 bg-surface-muted/50 border-b border-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-2" role="group" aria-label="Language selection">
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`px-3 py-1 rounded text-xs font-bangla transition-colors ${
                    lang === 'bn'
                      ? 'bg-primary text-white font-semibold'
                      : 'bg-surface text-foreground hover:bg-surface-muted'
                  }`}
                >
                  {t('lang.bn')}
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    lang === 'en'
                      ? 'bg-primary text-white font-semibold'
                      : 'bg-surface text-foreground hover:bg-surface-muted'
                  }`}
                >
                  {t('lang.en')}
                </button>
              </div>

              <Link
                href="/donate"
                onClick={() => setMobileDrawerOpen(false)}
                className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-light text-white font-medium px-3 py-1 rounded text-xs transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                <span>{t('btn.donate')}</span>
              </Link>
            </div>

            {/* Nav List */}
            <nav className="p-4 flex-1 space-y-1">
              {NAV_ITEMS.map((item) => {
                const hasDropdown = Boolean(item.children && item.children.length > 0);
                const isExpanded = Boolean(mobileExpandedMenus[item.labelKey]);
                const isActive = item.href ? pathname === item.href : false;

                if (!hasDropdown) {
                  return (
                    <Link
                      key={item.labelKey}
                      href={item.href || '#'}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-foreground hover:bg-surface-muted hover:text-primary'
                      }`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  );
                }

                return (
                  <div key={item.labelKey} className="rounded-lg">
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion(item.labelKey)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-surface-muted hover:text-primary transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{t(item.labelKey)}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-primary' : 'text-foreground/50'
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Accordion children */}
                    {isExpanded && (
                      <div className="mt-1 ml-4 pl-3 border-l-2 border-primary/20 space-y-1">
                        {item.children?.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.labelKey}
                              href={subItem.href}
                              onClick={() => setMobileDrawerOpen(false)}
                              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                isSubActive
                                  ? 'text-primary font-semibold bg-primary/10'
                                  : 'text-foreground/80 hover:text-primary hover:bg-surface-muted'
                              }`}
                            >
                              {t(subItem.labelKey)}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Footer contact info */}
            <div className="p-4 border-t border-border bg-surface-muted/30 text-xs text-foreground/70 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                <span>{t('site.phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                <span>{t('site.email')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
