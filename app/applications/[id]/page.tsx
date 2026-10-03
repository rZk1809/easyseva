'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { StatusBadge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ApplicationTimeline } from '@/components/features/ApplicationTimeline';
import { cn, formatDate, formatFileSize } from '@/lib/utils';
import {
  CheckCircle2, FileCheck, ChevronDown, ChevronUp, Download,
  ArrowRight, RefreshCw, File, Loader2, FlaskConical,
} from 'lucide-react';
import type { Application } from '@/lib/types';

const STATUS_NEXT_LABEL: Record<string, string> = {
  submitted: 'Mark Documents Verified',
  documents_verified: 'Mark Under Review',
  under_review: 'Mark Approved',
};

const STATUS_DESCRIPTION: Record<string, string> = {
  submitted: 'Your application has been received and is awaiting document verification.',
  documents_verified: 'Your documents have been verified. The application is awaiting officer review.',
  under_review: 'A Revenue Officer is reviewing your application. No action needed.',
  action_required: 'Additional information is required. Please contact the district office.',
  approved: 'Your application has been approved. Collect your certificate from the district office.',
  rejected: 'Your application was not approved. Please contact the district office for details.',
};

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { updateApplication, refreshNotifications } = useApp();

  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advancing, setAdvancing] = useState(false);
  const [advanceError, setAdvanceError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    timeline: true,
    formData: false,
    documents: false,
  });

  const fetchApp = useCallback(async () => {
    try {
      const res = await fetch(`/api/applications/${id}`);
      if (res.status === 404) { router.push('/applications'); return; }
      if (!res.ok) throw new Error('Failed to load.');
      const data = await res.json();
      setApp(data.application);
    } catch {
      setError('Failed to load application details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    fetchApp();
  }, [user, fetchApp]);

  const handleAdvanceStatus = async () => {
    if (!app) return;
    setAdvancing(true);
    setAdvanceError(null);
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const err = await res.json();
        setAdvanceError(err.error ?? 'Could not advance status.');
        return;
      }
      const data = await res.json();
      setApp(data.application);
      updateApplication(id, data.application);
      await refreshNotifications();
    } catch {
      setAdvanceError('Network error. Please try again.');
    } finally {
      setAdvancing(false);
    }
  };

  const handleReject = async () => {
    if (!app) return;
    setAdvancing(true);
    setAdvanceError(null);
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });
      if (!res.ok) { setAdvanceError('Could not update status.'); return; }
      const data = await res.json();
      setApp(data.application);
      updateApplication(id, data.application);
      await refreshNotifications();
    } catch {
      setAdvanceError('Network error.');
    } finally {
      setAdvancing(false);
    }
  };

  const toggle = (key: string) =>
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  if (loading) {
    return (
      <PageLayout maxWidth="md">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-32 w-full mb-4 rounded-xl" />
        <Skeleton className="h-64 w-full mb-4 rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </PageLayout>
    );
  }

  if (error || !app) {
    return (
      <PageLayout maxWidth="md">
        <Alert variant="error">{error ?? 'Application not found.'}</Alert>
        <Button variant="outline" className="mt-4" onClick={() => router.push('/applications')}>
          Back to Applications
        </Button>
      </PageLayout>
    );
  }

  const service = services.find(s => s.id === app.serviceId);
  const isFinal = ['approved', 'rejected'].includes(app.status);
  const canAdvance = !isFinal && app.status !== 'action_required' && STATUS_NEXT_LABEL[app.status];
  const formStepData = app.formData as Record<string, Record<string, string>> | undefined;
  const documents = app.documents ?? [];

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title={app.serviceName}
        description={`Reference: ${app.referenceNumber}`}
        backHref="/applications"
        backLabel="My Applications"
        actions={<StatusBadge status={app.status} />}
      />

      {/* Status explanation */}
      <Alert
        variant={app.status === 'approved' ? 'success' : app.status === 'rejected' ? 'error' : app.status === 'action_required' ? 'warning' : 'info'}
        className="mb-5"
      >
        {STATUS_DESCRIPTION[app.status] ?? 'Processing your application.'}
      </Alert>

      {/* Dates */}
      <Card className="mb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Submitted</p>
            <p className="font-semibold text-slate-900">{app.submittedAt ? formatDate(app.submittedAt) : '—'}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Last Updated</p>
            <p className="font-semibold text-slate-900">{formatDate(app.lastUpdated)}</p>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="mb-4" padding="sm">
        <button
          className="w-full flex items-center justify-between gap-3 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded-lg"
          onClick={() => toggle('timeline')}
          aria-expanded={expandedSections.timeline}
        >
          <span className="font-semibold text-slate-800">Application Progress</span>
          {expandedSections.timeline ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>
        {expandedSections.timeline && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <ApplicationTimeline steps={app.timeline} />
          </div>
        )}
      </Card>

      {/* Form data */}
      {service && formStepData && Object.keys(formStepData).length > 0 && (
        <Card className="mb-4" padding="sm">
          <button
            className="w-full flex items-center justify-between gap-3 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded-lg"
            onClick={() => toggle('formData')}
            aria-expanded={expandedSections.formData}
          >
            <span className="font-semibold text-slate-800">Application Details</span>
            {expandedSections.formData ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>
          {expandedSections.formData && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-5">
              {service.formSteps.map(step => {
                const stepData = formStepData[step.id];
                if (!stepData) return null;
                const entries = step.fields
                  .map(f => ({ label: f.label, value: stepData[f.id], field: f }))
                  .filter(e => e.value);
                if (entries.length === 0) return null;
                return (
                  <div key={step.id}>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{step.title}</p>
                    <div className="space-y-1.5">
                      {entries.map(({ label, value, field }) => {
                        const displayVal = field.type === 'select' && field.options
                          ? field.options.find(o => o.value === value)?.label ?? value
                          : field.type === 'number' && field.id.toLowerCase().includes('income')
                          ? `₹${Number(value).toLocaleString('en-IN')}`
                          : value;
                        return (
                          <div key={field.id} className="flex gap-3 text-sm">
                            <span className="text-slate-500 shrink-0 w-40">{label}:</span>
                            <span className="font-medium text-slate-900 break-all">{displayVal}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      )}

      {/* Documents */}
      {documents.length > 0 && (
        <Card className="mb-4" padding="sm">
          <button
            className="w-full flex items-center justify-between gap-3 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded-lg"
            onClick={() => toggle('documents')}
            aria-expanded={expandedSections.documents}
          >
            <div className="flex items-center gap-2">
              <FileCheck size={16} className="text-green-600" />
              <span className="font-semibold text-slate-800">Documents ({documents.length})</span>
            </div>
            {expandedSections.documents ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>
          {expandedSections.documents && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
              {documents.map((doc, i) => (
                <div key={doc.id ?? i} className="flex items-center gap-3 text-sm bg-slate-50 rounded-lg px-3 py-2">
                  <File size={16} className="text-slate-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.filename} · {formatFileSize(doc.sizeKB)}</p>
                  </div>
                  <CheckCircle2 size={15} className="text-green-600 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Demo: Status Simulation */}
      {!isFinal && (
        <Card className="mb-5 border-amber-200 bg-amber-50/50">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical size={16} className="text-amber-700" />
            <p className="text-sm font-bold text-amber-800">Demo: Officer Actions</p>
          </div>
          <p className="text-xs text-amber-700 mb-4">
            Simulate what a government officer would do. This creates real notifications and updates the application status in the database.
          </p>
          {advanceError && <Alert variant="error" className="mb-3 text-sm">{advanceError}</Alert>}
          <div className="flex flex-col gap-2">
            {canAdvance && (
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleAdvanceStatus}
                disabled={advancing}
                iconLeft={advancing ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
              >
                {advancing ? 'Updating…' : STATUS_NEXT_LABEL[app.status]}
              </Button>
            )}
            {app.status !== 'submitted' && (
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleReject}
                disabled={advancing}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Mark Rejected
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          href={`/track?ref=${app.referenceNumber}`}
          className={cn(
            'flex items-center justify-center gap-2 w-full px-5 py-4 rounded-xl',
            'bg-navy-800 text-white font-bold text-sm shadow-sm',
            'hover:bg-navy-900 transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 min-h-[52px]'
          )}
        >
          Track Application <ArrowRight size={16} />
        </Link>
        <button
          onClick={() => window.print()}
          className={cn(
            'flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl',
            'border-2 border-slate-200 text-slate-700 font-semibold text-sm',
            'hover:border-slate-300 hover:bg-slate-50 transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 min-h-[48px]'
          )}
        >
          <Download size={16} /> Download / Print
        </button>
      </div>
    </PageLayout>
  );
}
