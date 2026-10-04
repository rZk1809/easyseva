'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { tr, trx } from '@/lib/translations';
import { ChevronRight, Clock, FileText, GraduationCap, Heart, Users, UserCheck, Edit3, Grid, HelpCircle } from 'lucide-react';
import type { ServiceCategory, Service } from '@/lib/types';

const ICONS: Record<string, React.ElementType> = {
  FileText, GraduationCap, Heart, Users, UserCheck, Edit3, Grid, HelpCircle,
};

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  href: string;
}

export function ServiceCategoryCard({ category, href }: ServiceCategoryCardProps) {
  const { language } = useApp();
  const Icon = ICONS[category.icon] ?? Grid;

  const title = language === 'ta' ? category.titleTa : language === 'hi' ? category.titleHi : category.title;
  const desc = language === 'ta' ? category.descriptionTa : language === 'hi' ? category.descriptionHi : category.description;

  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col gap-4 p-5 sm:p-6 bg-white rounded-xl border border-slate-200 shadow-sm',
        'hover:border-gov-300 hover:shadow-md transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 focus-visible:ring-offset-2'
      )}
      aria-label={`${title} — ${category.count} services`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', category.bgColor)}>
          <Icon size={24} className={category.color} aria-hidden="true" />
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-1 mt-1 shrink-0">
          {category.count} {trx('services', language)}
        </span>
      </div>
      <div className="flex-1">
        <h3 className={cn('font-bold text-slate-900 text-base leading-snug group-hover:text-navy-800 transition-colors')}>{title}</h3>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <div className={cn('flex items-center gap-1 text-sm font-semibold', category.color)}>
        {tr('common.continue', language)}
        <ChevronRight size={16} aria-hidden="true" />
      </div>
    </Link>
  );
}

interface ServiceListItemProps {
  service: Service;
  href: string;
}

export function ServiceListItem({ service, href }: ServiceListItemProps) {
  const { language } = useApp();
  const title = language === 'ta' ? service.titleTa : language === 'hi' ? service.titleHi : service.title;
  const desc = language === 'ta' ? service.shortDescriptionTa : language === 'hi' ? service.shortDescriptionHi : service.shortDescription;

  return (
    <Link
      href={href}
      className={cn(
        'group flex items-start gap-4 p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-sm',
        'hover:border-gov-300 hover:shadow-md transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 focus-visible:ring-offset-2'
      )}
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 group-hover:text-navy-800 transition-colors">{title}</h3>
        <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock size={12} aria-hidden="true" />
            ~{service.estimatedMinutes} {trx('min', language)}
          </span>
          <span>{service.documents.length} {trx('documents needed', language)}</span>
          <span className="text-green-600 font-medium">{service.fee}</span>
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-400 group-hover:text-gov-600 transition-colors mt-1 shrink-0" aria-hidden="true" />
    </Link>
  );
}
