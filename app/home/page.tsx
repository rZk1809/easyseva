'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tr, trx } from '@/lib/translations';
import { serviceCategories } from '@/lib/mockData';
import { PageLayout } from '@/components/layout/PageLayout';
import { ServiceCategoryCard } from '@/components/features/ServiceCard';
import { ApplicationCard } from '@/components/features/ApplicationCard';
import { cn } from '@/lib/utils';
import {
  Search,
  ArrowRight,
  FileText,
  GraduationCap,
  Heart,
  Users,
  UserCheck,
  Edit3,
  HelpCircle,
  MapPin,
} from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  FileText, GraduationCap, Heart, Users, UserCheck, Edit3, HelpCircle,
};

export default function HomePage() {
  const { language, applications } = useApp();

  const recentApps = applications.slice(0, 3);
  const draftApps = applications.filter(a => a.status === 'draft');
  const activeApps = applications.filter(a => a.status !== 'draft' && a.status !== 'approved' && a.status !== 'rejected');

  return (
    <PageLayout maxWidth="xl">
      {/* Greeting */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-1">
              <MapPin size={14} aria-hidden="true" />
              {trx('Tamil Nadu', language)}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {tr('home.greeting', language)}
            </h1>
            <p className="text-slate-600 mt-1 text-base">
              {tr('home.subGreeting', language)}
            </p>
          </div>
        </div>
      </div>

      {/* Quick search */}
      <Link
        href="/find-service"
        className={cn(
          'flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl mb-8',
          'hover:border-gov-400 hover:shadow-md transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600'
        )}
        aria-label="Search for a service — What do you need help with?"
      >
        <Search size={20} className="text-slate-400 shrink-0" aria-hidden="true" />
        <span className="text-slate-500 text-base">{trx('What do you need help with?', language)}</span>
      </Link>

      {/* Active application alerts */}
      {activeApps.filter(a => a.status === 'action_required').map(app => (
        <div key={app.id} className="mb-4 bg-orange-50 border border-orange-300 rounded-xl p-4 flex items-start gap-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 shrink-0 animate-pulse" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-orange-900">{trx('Action needed:', language)} {app.serviceName}</p>
            <p className="text-sm text-orange-700 mt-0.5">{trx('Please check your application — a response is required.', language)}</p>
          </div>
          <Link
            href={`/track?ref=${app.referenceNumber}`}
            className="text-sm font-semibold text-orange-700 hover:text-orange-900 shrink-0 flex items-center gap-1"
          >
            {trx('View', language)} <ArrowRight size={14} />
          </Link>
        </div>
      ))}

      {/* Draft alerts */}
      {draftApps.slice(0, 1).map(app => (
        <div key={app.id} className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-900">{trx('Continue your draft:', language)} {app.serviceName}</p>
            <p className="text-sm text-amber-700 mt-0.5">{trx('You saved', language)} {app.progress}% {trx('of your application. Continue where you left off.', language)}</p>
          </div>
          <Link
            href={`/apply/${app.serviceId}/form`}
            className="shrink-0 bg-amber-200 hover:bg-amber-300 text-amber-900 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            {trx('Continue', language)}
          </Link>
        </div>
      ))}

      {/* Service Categories */}
      <section aria-labelledby="categories-heading" className="mb-10">
        <h2 id="categories-heading" className="sr-only">Service Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {serviceCategories.map(cat => (
            <ServiceCategoryCard
              key={cat.id}
              category={cat}
              href={`/services/${cat.id}`}
            />
          ))}

          {/* Help me find */}
          <Link
            href="/find-service"
            className={cn(
              'group flex flex-col gap-4 p-5 sm:p-6 rounded-xl border-2 border-dashed border-slate-300',
              'bg-white/60 hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
            )}
            aria-label="Help me find a service — Not sure what you need?"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
              <HelpCircle size={24} className="text-teal-600" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-slate-700 group-hover:text-teal-800 transition-colors">{trx('Help Me Find a Service', language)}</h3>
              <p className="text-sm text-slate-500 mt-1">{trx('Not sure what you need? Answer a few questions.', language)}</p>
            </div>
            <span className="text-sm font-semibold text-teal-600 flex items-center gap-1">
              {trx('Get Help', language)} <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* Recent Applications */}
      <section aria-labelledby="recent-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="recent-heading" className="text-lg font-bold text-slate-900">
            {tr('home.recentApps', language)}
          </h2>
          <Link
            href="/applications"
            className="text-sm font-semibold text-gov-600 hover:text-gov-800 flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded"
          >
            {trx('View all', language)} <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {recentApps.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-slate-400" aria-hidden="true" />
            </div>
            <p className="font-semibold text-slate-700 mb-1">{tr('home.noApps', language)}</p>
            <p className="text-sm text-slate-500 mb-4">{trx('Choose a service above to start your first application.', language)}</p>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gov-600 hover:text-gov-800"
            >
              {tr('home.exploreServices', language)} <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {recentApps.map(app => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
