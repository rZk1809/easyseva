import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
  role?: 'alert' | 'status';
}

const variantConfig: Record<AlertVariant, { classes: string; Icon: React.ElementType; iconClass: string }> = {
  info: {
    classes: 'bg-blue-50 border-blue-200 text-blue-900',
    Icon: Info,
    iconClass: 'text-blue-600',
  },
  success: {
    classes: 'bg-green-50 border-green-200 text-green-900',
    Icon: CheckCircle2,
    iconClass: 'text-green-600',
  },
  warning: {
    classes: 'bg-amber-50 border-amber-200 text-amber-900',
    Icon: AlertTriangle,
    iconClass: 'text-amber-600',
  },
  error: {
    classes: 'bg-red-50 border-red-200 text-red-900',
    Icon: AlertCircle,
    iconClass: 'text-red-600',
  },
};

export function Alert({
  variant = 'info',
  title,
  children,
  className,
  onDismiss,
  role = 'alert',
}: AlertProps) {
  const { classes, Icon, iconClass } = variantConfig[variant];

  return (
    <div
      role={role}
      className={cn(
        'flex gap-3 rounded-xl border p-4',
        classes,
        className
      )}
    >
      <Icon size={20} className={cn('mt-0.5 shrink-0', iconClass)} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn('shrink-0 p-1 rounded hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-current')}
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
