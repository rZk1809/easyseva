import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning';
  className?: string;
}

const sizeClasses = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
const colorClasses = {
  primary: 'bg-gov-600',
  success: 'bg-green-600',
  warning: 'bg-amber-500',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = false,
  size = 'md',
  color = 'primary',
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
          {showPercent && <span className="text-sm font-semibold text-slate-600">{pct}%</span>}
        </div>
      )}
      <div
        className={cn('w-full bg-slate-200 rounded-full overflow-hidden', sizeClasses[size])}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `${pct}% complete`}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', colorClasses[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
  className?: string;
}

export function StepProgress({ currentStep, totalSteps, stepTitles, className }: StepProgressProps) {
  return (
    <div className={cn('w-full', className)} aria-label={`Step ${currentStep} of ${totalSteps}`}>
      <div className="flex items-center gap-0">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
                    isCompleted && 'bg-green-600 text-white',
                    isCurrent && 'bg-gov-600 text-white ring-4 ring-gov-100',
                    !isCompleted && !isCurrent && 'bg-slate-200 text-slate-500'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {stepTitles && (
                  <span className={cn('text-xs mt-1 font-medium hidden sm:block max-w-16 text-center leading-tight',
                    isCurrent ? 'text-gov-700' : isCompleted ? 'text-green-700' : 'text-slate-400'
                  )}>
                    {stepTitles[i]}
                  </span>
                )}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-1 mb-5',
                    i < currentStep - 1 ? 'bg-green-500' : 'bg-slate-200'
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
