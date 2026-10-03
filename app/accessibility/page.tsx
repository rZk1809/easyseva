'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { TextSize, ContrastMode, Language } from '@/lib/types';
import { Type, Eye, Globe, Activity, CheckCircle2 } from 'lucide-react';

const TEXT_SIZES: { id: TextSize; label: string; preview: string }[] = [
  { id: 'default', label: 'Default', preview: 'Aa' },
  { id: 'large', label: 'Large', preview: 'Aa' },
  { id: 'xlarge', label: 'Extra Large', preview: 'Aa' },
];

const CONTRAST_MODES: { id: ContrastMode; label: string; description: string }[] = [
  { id: 'default', label: 'Default', description: 'Standard colours' },
  { id: 'high', label: 'High Contrast', description: 'Maximum text visibility' },
];

const LANGUAGES: { code: Language; native: string; english: string }[] = [
  { code: 'en', native: 'English', english: 'English' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil' },
  { code: 'hi', native: 'हिंदी', english: 'Hindi' },
];

export default function AccessibilityPage() {
  const { accessibility, setAccessibility, language, setLanguage } = useApp();

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Accessibility Settings"
        description="Adjust the display to make EasySeva easier for you to use."
        backHref="/home"
      />

      <div className="space-y-5">
        {/* Text Size */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gov-50 rounded-lg flex items-center justify-center">
              <Type size={18} className="text-gov-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Text Size</h2>
              <p className="text-sm text-slate-500">Choose a text size that is comfortable for you.</p>
            </div>
          </div>
          <div className="flex gap-3" role="radiogroup" aria-label="Text size">
            {TEXT_SIZES.map(size => (
              <button
                key={size.id}
                role="radio"
                aria-checked={accessibility.textSize === size.id}
                onClick={() => setAccessibility({ textSize: size.id })}
                className={cn(
                  'flex-1 flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition-all',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600',
                  accessibility.textSize === size.id
                    ? 'border-gov-600 bg-gov-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <span
                  className={cn(
                    'font-bold text-slate-700',
                    size.id === 'default' && 'text-base',
                    size.id === 'large' && 'text-lg',
                    size.id === 'xlarge' && 'text-2xl',
                  )}
                  aria-hidden="true"
                >
                  {size.preview}
                </span>
                <span className={cn('text-xs font-medium', accessibility.textSize === size.id ? 'text-gov-700' : 'text-slate-500')}>
                  {size.label}
                </span>
                {accessibility.textSize === size.id && (
                  <CheckCircle2 size={14} className="text-gov-600" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Contrast */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
              <Eye size={18} className="text-slate-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Display Contrast</h2>
              <p className="text-sm text-slate-500">Increase contrast to make text stand out more.</p>
            </div>
          </div>
          <div className="flex gap-3" role="radiogroup" aria-label="Contrast mode">
            {CONTRAST_MODES.map(mode => (
              <button
                key={mode.id}
                role="radio"
                aria-checked={accessibility.contrast === mode.id}
                onClick={() => setAccessibility({ contrast: mode.id })}
                className={cn(
                  'flex-1 p-4 rounded-xl border-2 text-left transition-all',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600',
                  accessibility.contrast === mode.id
                    ? 'border-gov-600 bg-gov-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <div
                  className={cn(
                    'h-8 rounded-lg mb-2 border',
                    mode.id === 'default'
                      ? 'bg-white border-slate-200'
                      : 'bg-black border-white'
                  )}
                  aria-hidden="true"
                >
                  <div className={cn('px-2 py-1 text-xs font-bold', mode.id === 'default' ? 'text-slate-800' : 'text-white')}>
                    Sample text
                  </div>
                </div>
                <p className={cn('text-sm font-semibold', accessibility.contrast === mode.id ? 'text-gov-700' : 'text-slate-700')}>
                  {mode.label}
                </p>
                <p className="text-xs text-slate-500">{mode.description}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Reduce Motion */}
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                <Activity size={18} className="text-purple-600" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Reduce Motion</h2>
                <p className="text-sm text-slate-500">Minimise animations and transitions.</p>
              </div>
            </div>
            <button
              role="switch"
              aria-checked={accessibility.reduceMotion}
              onClick={() => setAccessibility({ reduceMotion: !accessibility.reduceMotion })}
              className={cn(
                'relative w-12 h-6 rounded-full transition-colors shrink-0',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 focus-visible:ring-offset-2',
                accessibility.reduceMotion ? 'bg-gov-600' : 'bg-slate-300'
              )}
              aria-label={`Reduce motion: ${accessibility.reduceMotion ? 'on' : 'off'}`}
            >
              <span
                className={cn(
                  'absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all',
                  accessibility.reduceMotion ? 'left-7' : 'left-1'
                )}
                aria-hidden="true"
              />
            </button>
          </div>
        </Card>

        {/* Language */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center">
              <Globe size={18} className="text-teal-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Language</h2>
              <p className="text-sm text-slate-500">Choose the language for the interface.</p>
            </div>
          </div>
          <div className="space-y-2" role="radiogroup" aria-label="Interface language">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                role="radio"
                aria-checked={language === lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600',
                  language === lang.code
                    ? 'border-gov-600 bg-gov-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-slate-700">{lang.native}</span>
                  {lang.code !== 'en' && (
                    <span className="text-sm text-slate-500">({lang.english})</span>
                  )}
                </div>
                {language === lang.code && (
                  <CheckCircle2 size={18} className="text-gov-600" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Reset */}
        <div className="text-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setAccessibility({ textSize: 'default', contrast: 'default', reduceMotion: false });
            }}
          >
            Reset to defaults
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
