import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Accessible breadcrumb trail. Improves orientation and supports "recognition
 * rather than recall" by always showing where the user is in the hierarchy.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm text-slate-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} className="text-slate-300 shrink-0" aria-hidden="true" />}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 hover:text-gov-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded px-0.5"
                >
                  {i === 0 && <Home size={13} aria-hidden="true" />}
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-semibold text-slate-700' : ''} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
