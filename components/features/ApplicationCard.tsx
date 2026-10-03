'use client';

import React from 'react';
import Link from 'next/link';
import { cn, formatRelative } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/Progress';
import { ChevronRight, AlertCircle } from 'lucide-react';
import type { Application } from '@/lib/types';

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const hasAction = application.status === 'action_required';
  const isDraft = application.status === 'draft';

  const href = isDraft
    ? `/apply/${application.serviceId}/form`
    : `/applications/${application.id}`;

  return (
    <Link
      href={href}
      className={cn(
        'group block bg-white rounded-xl border shadow-sm p-5',
        'hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 focus-visible:ring-offset-2',
        hasAction ? 'border-orange-300 bg-orange-50/30' : 'border-slate-200'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 group-hover:text-navy-800 transition-colors">
            {application.serviceName}
          </h3>
          {application.referenceNumber && (
            <p className="text-xs text-slate-500 mt-0.5 font-mono">{application.referenceNumber}</p>
          )}
        </div>
        <StatusBadge status={application.status} className="shrink-0" />
      </div>

      {hasAction && (
        <div className="flex items-start gap-2 mb-3 text-sm text-orange-800 bg-orange-100 rounded-lg p-3">
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>An action is needed from you. Tap to see what&apos;s required.</span>
        </div>
      )}

      {isDraft && (
        <ProgressBar
          value={application.progress}
          showPercent
          size="sm"
          className="mb-3"
          label={`${application.currentStep ?? 1} of ${application.totalSteps ?? 4} steps completed`}
        />
      )}

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {isDraft ? 'Last edited' : 'Last updated'}: {formatRelative(application.lastUpdated)}
        </span>
        <span className="flex items-center gap-1 text-gov-600 font-semibold group-hover:gap-2 transition-all">
          {isDraft ? 'Continue' : 'View details'}
          <ChevronRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
