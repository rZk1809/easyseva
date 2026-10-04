'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { ApplicationCard } from '@/components/features/ApplicationCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { trx } from '@/lib/translations';
import { FileText, ArrowRight, Search, X } from 'lucide-react';

type Tab = 'active' | 'drafts' | 'completed';

const TABS: { id: Tab; label: string }[] = [
  { id: 'active', label: 'Active' },
  { id: 'drafts', label: 'Drafts' },
  { id: 'completed', label: 'Completed' },
];

export default function ApplicationsPage() {
  const { applications, language } = useApp();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();

  const filtered = q
    ? applications.filter(
        a =>
          a.serviceName.toLowerCase().includes(q) ||
          a.referenceNumber.toLowerCase().includes(q)
      )
    : applications;

  const active = filtered.filter(a =>
    ['submitted', 'documents_verified', 'under_review', 'action_required'].includes(a.status)
  );
  const drafts = filtered.filter(a => a.status === 'draft');
  const completed = filtered.filter(a => ['approved', 'rejected'].includes(a.status));

  const lists: Record<Tab, typeof applications> = { active, drafts, completed };
  const current = lists[activeTab];

  const isLoading = authLoading || (!!user && applications.length === 0 && !q);

  return (
    <PageLayout maxWidth="xl">
      <PageHeader
        title="My Applications"
        description="Track and manage all your government service applications."
        backHref="/home"
      />

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={trx('Search by service name or reference number…', language)}
          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600"
          aria-label="Search applications"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 w-fit" role="tablist" aria-label="Application tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600',
              activeTab === tab.id
                ? 'bg-white text-navy-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {trx(tab.label, language)}
            {lists[tab.id].length > 0 && (
              <span
                className={cn(
                  'ml-1.5 text-xs font-bold rounded-full px-1.5 py-0.5',
                  activeTab === tab.id
                    ? tab.id === 'active' && active.some(a => a.status === 'action_required')
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gov-100 text-gov-700'
                    : 'bg-slate-200 text-slate-500'
                )}
                aria-label={`${lists[tab.id].length} ${tab.label.toLowerCase()} applications`}
              >
                {lists[tab.id].length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div id={`tab-panel-${activeTab}`} role="tabpanel">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : !user ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <FileText size={28} className="text-slate-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700 mb-1">{trx('Sign in to view your applications', language)}</p>
            <p className="text-sm text-slate-500 mb-6">{trx('Your submitted applications will appear here.', language)}</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-800 text-white rounded-xl font-semibold text-sm hover:bg-navy-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
            >
              {trx('Sign in', language)} <ArrowRight size={16} />
            </Link>
          </div>
        ) : current.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-slate-400" aria-hidden="true" />
            </div>
            <p className="font-semibold text-slate-700 mb-1">
              {q
                ? trx('No applications match your search', language)
                : activeTab === 'active' ? trx('No active applications', language)
                : activeTab === 'drafts' ? trx('No saved drafts', language)
                : trx('No completed applications yet', language)}
            </p>
            <p className="text-sm text-slate-500 mb-6">
              {q
                ? trx('Try a different search term.', language)
                : activeTab === 'drafts'
                ? trx('Start an application and save it to continue later.', language)
                : trx('Browse services to start a new application.', language)}
            </p>
            {!q && (
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-800 text-white rounded-xl font-semibold text-sm hover:bg-navy-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
              >
                {trx('Browse Services', language)} <ArrowRight size={16} />
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {current.map(app => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
