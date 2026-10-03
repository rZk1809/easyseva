'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { cn, formatRelative } from '@/lib/utils';
import { Bell, CheckCircle2, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import type { Notification } from '@/lib/types';

const ICONS = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  action: AlertTriangle,
};

const COLORS = {
  success: 'text-green-600 bg-green-100',
  info: 'text-blue-600 bg-blue-100',
  warning: 'text-amber-600 bg-amber-100',
  action: 'text-orange-600 bg-orange-100',
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Notifications"
        description="Updates about your applications."
        backHref="/home"
        actions={
          unreadCount > 0 ? (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              Mark all as read
            </Button>
          ) : undefined
        }
      />

      {notifications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <Bell size={32} className="text-slate-300 mx-auto mb-3" aria-hidden="true" />
          <p className="font-semibold text-slate-700">No notifications yet</p>
          <p className="text-sm text-slate-500 mt-1">Application updates will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(notif => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onRead={() => markNotificationRead(notif.id)}
            />
          ))}
        </div>
      )}
    </PageLayout>
  );
}

function NotificationItem({ notification, onRead }: { notification: Notification; onRead: () => void }) {
  const Icon = ICONS[notification.type];
  const colorClass = COLORS[notification.type];

  return (
    <div
      className={cn(
        'flex gap-4 p-4 rounded-xl border transition-colors',
        notification.read
          ? 'bg-white border-slate-200'
          : 'bg-slate-50 border-slate-300 border-l-4',
        !notification.read && notification.type === 'action' && 'border-l-orange-400',
        !notification.read && notification.type === 'info' && 'border-l-blue-400',
        !notification.read && notification.type === 'success' && 'border-l-green-400',
      )}
      onClick={onRead}
      role={!notification.read ? 'button' : undefined}
      tabIndex={!notification.read ? 0 : undefined}
      onKeyDown={!notification.read ? (e) => e.key === 'Enter' && onRead() : undefined}
      aria-label={!notification.read ? `Mark as read: ${notification.title}` : notification.title}
    >
      <div className={cn('w-9 h-9 rounded-full flex items-center justify-center shrink-0', colorClass)}>
        <Icon size={18} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm font-semibold', notification.read ? 'text-slate-700' : 'text-slate-900')}>
            {notification.title}
            {!notification.read && (
              <span className="ml-2 inline-block w-2 h-2 bg-gov-600 rounded-full" aria-label="Unread" />
            )}
          </p>
          <span className="text-xs text-slate-400 shrink-0">{formatRelative(notification.createdAt)}</span>
        </div>
        <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{notification.message}</p>
        {notification.applicationId && (
          <Link
            href={notification.type === 'action'
              ? `/applications`
              : `/track?ref=${notification.applicationId}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gov-600 hover:text-gov-800 mt-2"
            onClick={onRead}
          >
            View application <ArrowRight size={11} />
          </Link>
        )}
      </div>
    </div>
  );
}
