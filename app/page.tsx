'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { ArrowRight, Shield, Clock, Globe, CheckCircle2, Sparkles } from 'lucide-react';

const LANGUAGES = [
  { code: 'en' as const, native: 'English', flag: '🇬🇧' },
  { code: 'ta' as const, native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi' as const, native: 'हिंदी', flag: '🇮🇳' },
];

const TRUST_ITEMS = [
  { icon: Shield, text: 'Secure & Private' },
  { icon: Globe, text: 'Available in 3 Languages' },
  { icon: Clock, text: 'Save & Resume Anytime' },
  { icon: CheckCircle2, text: 'Step-by-Step Guidance' },
];

const FEATURES = [
  { title: 'Plain Language', desc: 'No confusing government jargon. Everything explained simply.' },
  { title: 'Step-by-Step Forms', desc: 'Never face a 30-field form again. We guide you one step at a time.' },
  { title: 'Save & Continue Later', desc: 'Not ready? Save your progress and return whenever you are.' },
  { title: 'Track Your Application', desc: 'Always know what is happening with your application, in clear terms.' },
];

export default function LandingPage() {
  const { language, setLanguage } = useApp();

  return (
    <main id="main-content" className="flex-1">
      {/* Hero */}
      <section className="bg-navy-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-teal-400 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <Sparkles size={14} aria-hidden="true" />
              HCI Academic Prototype · Tamil Nadu
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              {tr('landing.hero', language)}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              {tr('landing.subHero', language)}
            </p>

            {/* Language Selection */}
            <div className="mb-8">
              <p className="text-sm font-medium text-white/60 mb-3">{tr('landing.chooseLanguage', language)}</p>
              <div className="flex justify-center gap-3 flex-wrap" role="group" aria-label="Select your language">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800',
                      language === lang.code
                        ? 'bg-white text-navy-800 shadow-lg scale-105'
                        : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                    )}
                    aria-pressed={language === lang.code}
                    aria-label={`${lang.native}`}
                  >
                    <span aria-hidden="true">{lang.flag}</span>
                    <span>{lang.native}</span>
                    {language === lang.code && <CheckCircle2 size={15} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/home"
                className={cn(
                  'w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl',
                  'bg-white text-navy-800 font-bold text-lg shadow-lg',
                  'hover:bg-slate-50 hover:shadow-xl transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800',
                  'min-h-[56px]'
                )}
              >
                {tr('landing.getStarted', language)}
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link
                href="/track"
                className={cn(
                  'w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl',
                  'bg-white/10 text-white font-semibold text-base border border-white/25',
                  'hover:bg-white/20 transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800',
                  'min-h-[56px]'
                )}
              >
                {tr('landing.trackApp', language)}
              </Link>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-white/15 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3" role="list">
              {TRUST_ITEMS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-sm text-white/70">
                  <Icon size={16} className="text-teal-400" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20" aria-labelledby="features-heading">
        <div className="text-center mb-12">
          <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Designed for real people
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base">
            EasySeva is built around how citizens think about services, not how departments are organised.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-gov-50 flex items-center justify-center shrink-0">
                <span className="text-gov-700 font-bold text-sm" aria-hidden="true">{i + 1}</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo CTA */}
      <section className="bg-teal-700 text-white" aria-labelledby="demo-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <Sparkles className="mx-auto mb-4 text-teal-200" size={28} aria-hidden="true" />
          <h2 id="demo-heading" className="text-2xl sm:text-3xl font-bold mb-3">Try the demo experience</h2>
          <p className="text-teal-100 mb-8 text-base max-w-lg mx-auto">
            Walk through applying for an Income Certificate as Lakshmi, a first-time user who needs step-by-step guidance.
          </p>
          <Link
            href="/home"
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4 rounded-xl',
              'bg-white text-teal-800 font-bold text-base shadow-md',
              'hover:bg-teal-50 transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-700'
            )}
          >
            Explore EasySeva
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-t border-amber-200 px-4 py-3 text-center text-xs text-amber-800" role="note">
        <strong>Academic Prototype:</strong> This is a demonstration application for an HCI research project. Do not enter real personal information. All application submissions are simulated.
      </div>
    </main>
  );
}
