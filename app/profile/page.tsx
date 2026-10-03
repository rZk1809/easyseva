'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  User, Settings, Bell, Globe, ShieldCheck, LogOut, LogIn,
  ChevronRight, Edit2, Check, X, Phone, Mail,
} from 'lucide-react';

const MENU_ITEMS = [
  { icon: Settings, label: 'Accessibility Settings', href: '/accessibility', desc: 'Text size, contrast, language' },
  { icon: Bell, label: 'Notification Preferences', href: '/notifications', desc: 'Manage how you receive updates' },
  { icon: Globe, label: 'Language', href: '/accessibility', desc: 'Change interface language' },
  { icon: ShieldCheck, label: 'Privacy & Data', href: '/help', desc: 'How your data is used' },
];

export default function ProfilePage() {
  const { applications } = useApp();
  const { user, logout, refreshUser } = useAuth();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const active = applications.filter(a => !['approved', 'rejected', 'draft'].includes(a.status)).length;
  const drafts = applications.filter(a => a.status === 'draft').length;

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleEdit = () => {
    setName(user?.name ?? '');
    setPhone(user?.phone ?? '');
    setSaveError(null);
    setSaveSuccess(false);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setSaveError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || null, phone: phone.trim() || null }),
      });
      if (!res.ok) {
        const err = await res.json();
        setSaveError(err.error ?? 'Failed to save. Please try again.');
        return;
      }
      await refreshUser();
      setSaveSuccess(true);
      setEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const displayName = user?.name ?? user?.email?.split('@')[0] ?? 'Guest User';

  return (
    <PageLayout maxWidth="md">
      <PageHeader title="Profile & Settings" backHref="/home" />

      {saveSuccess && (
        <Alert variant="success" className="mb-4">
          Profile updated successfully.
        </Alert>
      )}

      {/* Profile card */}
      <Card className="mb-5">
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <User size={32} className="text-navy-600" aria-hidden="true" />
          </div>

          {editing ? (
            <div className="max-w-xs mx-auto space-y-3 mt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 text-left">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 text-left">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600"
                />
              </div>
              {saveError && <p className="text-sm text-red-600">{saveError}</p>}
              <div className="flex gap-2 pt-1">
                <Button variant="primary" size="md" fullWidth onClick={handleSave} disabled={saving} iconLeft={<Check size={15} />}>
                  {saving ? 'Saving…' : 'Save'}
                </Button>
                <Button variant="outline" size="md" fullWidth onClick={handleCancel} iconLeft={<X size={15} />}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="font-bold text-slate-900 text-lg">{displayName}</p>
              <div className="flex items-center justify-center gap-1 text-sm text-slate-500 mt-0.5">
                <Mail size={13} aria-hidden="true" />
                <span>{user?.email ?? 'Not signed in'}</span>
              </div>
              {user?.phone && (
                <div className="flex items-center justify-center gap-1 text-sm text-slate-500 mt-0.5">
                  <Phone size={13} aria-hidden="true" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user && (
                <button
                  onClick={handleEdit}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gov-600 hover:text-gov-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded"
                >
                  <Edit2 size={12} /> Edit Profile
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-navy-800">{active}</p>
            <p className="text-xs text-slate-500 mt-0.5">Active</p>
          </div>
          <div className="w-px bg-slate-200" aria-hidden="true" />
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">{drafts}</p>
            <p className="text-xs text-slate-500 mt-0.5">Drafts</p>
          </div>
          <div className="w-px bg-slate-200" aria-hidden="true" />
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-500">{applications.length}</p>
            <p className="text-xs text-slate-500 mt-0.5">Total</p>
          </div>
        </div>
      </Card>

      {/* Menu items */}
      <Card padding="none" className="mb-5">
        {MENU_ITEMS.map((item, i) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={cn(
              'flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gov-600',
              i < MENU_ITEMS.length - 1 && 'border-b border-slate-100'
            )}
          >
            <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
              <item.icon size={18} className="text-slate-600" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 text-sm">{item.label}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
            <ChevronRight size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
          </Link>
        ))}
      </Card>

      {user ? (
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 min-h-[52px] mb-5"
        >
          <LogOut size={18} /> Sign out
        </button>
      ) : (
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-navy-800 text-white font-semibold hover:bg-navy-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 min-h-[52px] mb-5"
        >
          <LogIn size={18} /> Sign in
        </Link>
      )}

      <Alert variant="info">
        This is an HCI academic prototype for Tamil Nadu government services. Your data is stored securely and used only for this demonstration.
      </Alert>
    </PageLayout>
  );
}
