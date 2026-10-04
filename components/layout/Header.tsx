'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { tr, trx } from '@/lib/translations';
import {
  Bell,
  Settings,
  Menu,
  X,
  Globe,
  ChevronDown,
  User,
  LogOut,
  LogIn,
} from 'lucide-react';

const NAV_LINKS = [
  { href: '/home', labelKey: 'nav.home' },
  { href: '/services', labelKey: 'nav.services' },
  { href: '/applications', labelKey: 'nav.applications' },
  { href: '/track', labelKey: 'nav.track' },
  { href: '/help', labelKey: 'nav.help' },
];

const LANGUAGES = [
  { code: 'en' as const, label: 'English', native: 'English' },
  { code: 'ta' as const, label: 'Tamil', native: 'தமிழ்' },
  { code: 'hi' as const, label: 'Hindi', native: 'हिंदी' },
];

export function Header() {
  const pathname = usePathname();
  const { language, setLanguage, unreadCount } = useApp();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isLanding = pathname === '/' || pathname === '/language';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b',
        isLanding
          ? 'bg-navy-800 border-navy-700'
          : 'bg-white border-slate-200 shadow-sm'
      )}
      role="banner"
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2.5 font-bold text-xl tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg px-1',
              isLanding ? 'text-white' : 'text-navy-800'
            )}
            aria-label="EasySeva — Go to homepage"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0',
                isLanding ? 'bg-white text-navy-800' : 'bg-navy-800 text-white'
              )}
              aria-hidden="true"
            >
              ES
            </div>
            EasySeva
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, labelKey }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2',
                    isLanding
                      ? active
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10 focus-visible:ring-white'
                      : active
                      ? 'bg-gov-50 text-gov-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-gov-600'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {tr(labelKey, language)}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(v => !v)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2',
                  isLanding
                    ? 'text-white/80 hover:text-white hover:bg-white/10 focus-visible:ring-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-gov-600'
                )}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label={`Language: ${language.toUpperCase()}`}
              >
                <Globe size={16} aria-hidden="true" />
                <span className="uppercase">{language}</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-slate-200 py-1 min-w-36 z-50 animate-fade-in"
                  role="listbox"
                  aria-label="Select language"
                >
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={language === lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors',
                        language === lang.code
                          ? 'text-gov-700 font-semibold bg-gov-50'
                          : 'text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      <span>{lang.native}</span>
                      {language === lang.code && (
                        <span className="text-gov-600" aria-hidden="true">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            {!isLanding && (
              <Link
                href="/notifications"
                className={cn(
                  'relative p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600',
                  'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span
                    className="absolute top-1 right-1 min-w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-0.5"
                    aria-hidden="true"
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}

            {/* Accessibility */}
            {!isLanding && (
              <Link
                href="/accessibility"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600"
                aria-label="Accessibility settings"
              >
                <Settings size={20} />
              </Link>
            )}

            {/* User / Login */}
            {!isLanding && (
              <div className="relative">
                {user ? (
                  <>
                    <button
                      onClick={() => setUserMenuOpen(v => !v)}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600"
                      aria-label="User menu"
                    >
                      <div className="w-7 h-7 bg-navy-100 rounded-full flex items-center justify-center shrink-0">
                        <User size={14} className="text-navy-700" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium max-w-24 truncate">{user.name ?? user.email.split('@')[0]}</span>
                      <ChevronDown size={13} />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-slate-200 py-2 min-w-48 z-50">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-xs font-semibold text-slate-700 truncate">{user.email}</p>
                        </div>
                        <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                          <User size={14} /> {trx('Profile', language)}
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={14} /> {trx('Sign out', language)}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-navy-800 border border-navy-200 hover:bg-navy-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                  >
                    <LogIn size={15} /> {trx('Sign in', language)}
                  </Link>
                )}
                {userMenuOpen && (
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} aria-hidden="true" />
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2',
                isLanding
                  ? 'text-white hover:bg-white/10 focus-visible:ring-white'
                  : 'text-slate-600 hover:bg-slate-100 focus-visible:ring-gov-600'
              )}
              onClick={() => setMobileOpen(v => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white border-t border-slate-200 animate-fade-in"
        >
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, labelKey }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                    active
                      ? 'bg-gov-50 text-gov-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {tr(labelKey, language)}
                </Link>
              );
            })}
            <div className="border-t border-slate-100 mt-2 pt-2 flex gap-3 px-2">
              <Link
                href="/notifications"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Bell size={18} />
                {tr('nav.notifications', language)}
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <Link
                href="/accessibility"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Settings size={18} />
                {tr('nav.accessibility', language)}
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Close language menu on outside click */}
      {langOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLangOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
