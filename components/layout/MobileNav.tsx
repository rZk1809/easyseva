'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Grid, FileText, HelpCircle, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const NAV_ITEMS = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/services', icon: Grid, label: 'Services' },
  { href: '/applications', icon: FileText, label: 'Applications' },
  { href: '/help', icon: HelpCircle, label: 'Help' },
  { href: '/accessibility', icon: User, label: 'Settings' },
];

export function MobileNav() {
  const pathname = usePathname();
  const { } = useApp();
  const hiddenRoutes = ['/', '/language'];
  if (hiddenRoutes.includes(pathname)) return null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 safe-area-bottom"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 py-2 px-3 flex-1 min-h-[56px] justify-center',
                'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gov-600',
                active ? 'text-gov-700' : 'text-slate-500 hover:text-slate-900'
              )}
              aria-current={active ? 'page' : undefined}
              aria-label={label}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.75}
                aria-hidden="true"
              />
              <span className={cn('text-xs font-medium', active ? 'text-gov-700 font-semibold' : '')}>{label}</span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-gov-600 rounded-full" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
