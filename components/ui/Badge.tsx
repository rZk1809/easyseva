'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { trx } from '@/lib/translations';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Loader2,
  Info,
} from 'lucide-react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'pending' | 'in_progress' | 'action';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
  size?: 'sm' | 'md';
}

const variantConfig: Record<BadgeVariant, { classes: string; Icon: React.ElementType }> = {
  success: { classes: 'text-green-700 bg-green-50 border border-green-200', Icon: CheckCircle2 },
  warning: { classes: 'text-amber-700 bg-amber-50 border border-amber-200', Icon: AlertTriangle },
  danger: { classes: 'text-red-700 bg-red-50 border border-red-200', Icon: XCircle },
  info: { classes: 'text-blue-700 bg-blue-50 border border-blue-200', Icon: Info },
  neutral: { classes: 'text-slate-600 bg-slate-100 border border-slate-200', Icon: Info },
  pending: { classes: 'text-slate-600 bg-slate-50 border border-slate-200', Icon: Clock },
  in_progress: { classes: 'text-blue-700 bg-blue-50 border border-blue-200', Icon: Loader2 },
  action: { classes: 'text-orange-700 bg-orange-50 border border-orange-200', Icon: AlertTriangle },
};

export function Badge({ variant = 'neutral', children, className, icon = true, size = 'md' }: BadgeProps) {
  const { classes, Icon } = variantConfig[variant];
  const iconSize = size === 'sm' ? 12 : 14;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold rounded-full',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1',
        classes,
        className
      )}
    >
      {icon && (
        <Icon
          size={iconSize}
          aria-hidden="true"
          className={variant === 'in_progress' ? 'animate-spin' : undefined}
        />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    draft: { variant: 'warning', label: 'Draft' },
    submitted: { variant: 'info', label: 'Submitted' },
    documents_verified: { variant: 'success', label: 'Documents Verified' },
    under_review: { variant: 'in_progress', label: 'Under Review' },
    action_required: { variant: 'action', label: 'Action Required' },
    approved: { variant: 'success', label: 'Approved' },
    rejected: { variant: 'danger', label: 'Rejected' },
    completed: { variant: 'success', label: 'Completed' },
    in_progress: { variant: 'in_progress', label: 'In Progress' },
    pending: { variant: 'pending', label: 'Pending' },
  };
  const { language } = useApp();
  const { variant, label } = map[status] ?? { variant: 'neutral' as BadgeVariant, label: status };
  return <Badge variant={variant} className={className}>{trx(label, language)}</Badge>;
}
