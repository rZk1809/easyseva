'use client';

import React from 'react';
import { cn, formatDate } from '@/lib/utils';
import type { ApplicationStatusStep } from '@/lib/types';
import { CheckCircle2, Circle, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { trx } from '@/lib/translations';

interface TimelineProps {
  steps: ApplicationStatusStep[];
}

export function ApplicationTimeline({ steps }: TimelineProps) {
  const { language } = useApp();
  return (
    <ol className="space-y-0" aria-label="Application timeline">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={step.id} className="flex gap-4">
            {/* Icon + connector */}
            <div className="flex flex-col items-center gap-0 shrink-0">
              <TimelineIcon status={step.status} />
              {!isLast && (
                <div
                  className={cn(
                    'w-0.5 flex-1 my-1',
                    step.status === 'completed' ? 'bg-green-400' : 'bg-slate-200'
                  )}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Content */}
            <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h3
                  className={cn(
                    'font-semibold text-base leading-tight',
                    step.status === 'completed' && 'text-green-800',
                    step.status === 'in_progress' && 'text-navy-800',
                    step.status === 'action_required' && 'text-orange-800',
                    step.status === 'pending' && 'text-slate-500'
                  )}
                >
                  {trx(step.title, language)}
                </h3>
                {step.date && (
                  <span className="text-xs text-slate-500 shrink-0">{formatDate(step.date)}</span>
                )}
              </div>

              <p className={cn('text-sm mt-1 leading-relaxed', step.status === 'pending' ? 'text-slate-400' : 'text-slate-600')}>
                {trx(step.description, language)}
              </p>

              {step.status === 'in_progress' && (
                <p className="text-sm font-medium text-navy-700 mt-1.5 flex items-center gap-1.5">
                  <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                  {trx('No action required from you right now.', language)}
                </p>
              )}

              {step.status === 'action_required' && step.actionLabel && step.actionHref && (
                <div className="mt-2">
                  <Button
                    as="a"
                    href={step.actionHref}
                    variant="secondary"
                    size="sm"
                    iconLeft={<AlertTriangle size={14} />}
                  >
                    {trx(step.actionLabel, language)}
                  </Button>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function TimelineIcon({ status }: { status: ApplicationStatusStep['status'] }) {
  const base = 'w-8 h-8 rounded-full flex items-center justify-center shrink-0';
  if (status === 'completed')
    return (
      <div className={cn(base, 'bg-green-100 text-green-600')} aria-label="Completed">
        <CheckCircle2 size={20} />
      </div>
    );
  if (status === 'in_progress')
    return (
      <div className={cn(base, 'bg-blue-100 text-blue-600')} aria-label="In progress">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  if (status === 'action_required')
    return (
      <div className={cn(base, 'bg-orange-100 text-orange-600 ring-2 ring-orange-300')} aria-label="Action required">
        <AlertTriangle size={20} />
      </div>
    );
  return (
    <div className={cn(base, 'bg-slate-100 text-slate-400')} aria-label="Pending">
      <Circle size={20} />
    </div>
  );
}
