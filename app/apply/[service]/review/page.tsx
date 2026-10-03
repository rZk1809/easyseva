'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { services } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { ConfirmDialog } from '@/components/ui/Dialog';
import { cn, formatFileSize } from '@/lib/utils';
import { Edit2, CheckCircle2, FileCheck, Send, ChevronDown, ChevronUp, Save, Loader2 } from 'lucide-react';

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.service as string;
  const service = services.find(s => s.id === serviceId);
  const { language, getFormData, uploadedDocs, applications, addApplication, clearFormData, refreshNotifications } = useApp();
  const { user } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!service) return <PageLayout><Alert variant="error">Service not found.</Alert></PageLayout>;

  const title = language === 'ta' ? service.titleTa : language === 'hi' ? service.titleHi : service.title;
  const formData = getFormData(serviceId);
  const uploaded = uploadedDocs[serviceId] ?? [];

  const toggleSection = (id: string) =>
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));

  const getDocumentPayload = () =>
    uploaded.map(({ id, requirementId, name, filename, sizeKB, uploadedAt, url }) => ({
      id, requirementId, name, filename, sizeKB, uploadedAt, url, status: 'success',
    }));

  const handleSubmit = async () => {
    if (!user) { router.push('/login'); return; }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          serviceName: service.title,
          serviceCategory: service.categoryId,
          formData,
          documents: getDocumentPayload(),
          status: 'submitted',
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        if (res.status === 401) { router.push('/login'); return; }
        throw new Error(err.error ?? 'Submission failed. Please try again.');
      }

      const { application } = await res.json();
      addApplication(application);
      await refreshNotifications();
      clearFormData(serviceId);
      router.push(`/apply/${serviceId}/confirmation?ref=${application.referenceNumber}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
      setSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!user) { router.push('/login'); return; }

    setSavingDraft(true);
    try {
      // Check if a draft for this service already exists
      const existingDraft = applications.find(a => a.serviceId === serviceId && a.status === 'draft');

      if (existingDraft) {
        await fetch(`/api/applications/${existingDraft.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData, documents: getDocumentPayload() }),
        });
      } else {
        const res = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceId,
            serviceName: service.title,
            serviceCategory: service.categoryId,
            formData,
            documents: getDocumentPayload(),
            status: 'draft',
          }),
        });
        if (res.ok) {
          const { application } = await res.json();
          addApplication(application);
        }
      }
    } catch { /* fail silently — still navigate home */ }

    router.push('/home');
  };

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Review Your Application"
        description="Please check everything carefully before submitting."
        backHref={`/apply/${serviceId}/form`}
        backLabel="Back to form"
      />

      <Alert variant="warning" className="mb-6">
        Once submitted, some details may not be editable. Please review everything carefully.
      </Alert>

      {!user && (
        <Alert variant="error" className="mb-6">
          You must be signed in to submit.{' '}
          <a href="/login" className="underline font-semibold">Sign in here</a>.
        </Alert>
      )}

      {submitError && <Alert variant="error" className="mb-6">{submitError}</Alert>}

      <div className="space-y-4 mb-8">
        {service.formSteps.map(step => {
          const isExpanded = expandedSections[step.id] !== false;
          const stepData = (formData[step.id] as Record<string, string>) ?? {};
          const hasData = Object.values(stepData).some(v => v && v.trim() !== '');

          return (
            <Card key={step.id} padding="sm">
              <button
                className="w-full flex items-center justify-between gap-3 p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded-lg"
                onClick={() => toggleSection(step.id)}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className={hasData ? 'text-green-600' : 'text-slate-300'} aria-hidden="true" />
                  <span className="font-semibold text-slate-800">{step.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    onClick={e => { e.stopPropagation(); router.push(`/apply/${serviceId}/form`); }}
                    className="text-xs font-semibold text-gov-600 flex items-center gap-1 hover:text-gov-800"
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && router.push(`/apply/${serviceId}/form`)}
                  >
                    <Edit2 size={12} /> Edit
                  </span>
                  {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 animate-fade-in">
                  {step.fields.map(field => {
                    const val = stepData[field.id];
                    if (!val) return null;
                    const displayVal = field.type === 'select' && field.options
                      ? field.options.find(o => o.value === val)?.label ?? val
                      : field.type === 'number' && field.id.toLowerCase().includes('income')
                      ? `₹${Number(val).toLocaleString('en-IN')}`
                      : val;
                    return (
                      <div key={field.id} className="flex gap-3 text-sm">
                        <span className="text-slate-500 shrink-0 w-36">{field.label}:</span>
                        <span className="font-medium text-slate-900 break-all">{displayVal}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}

        <Card padding="sm">
          <button
            className="w-full flex items-center justify-between gap-3 p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded-lg"
            onClick={() => toggleSection('documents')}
            aria-expanded={expandedSections['documents'] !== false}
          >
            <div className="flex items-center gap-3">
              <FileCheck size={18} className={uploaded.length > 0 ? 'text-green-600' : 'text-slate-300'} aria-hidden="true" />
              <span className="font-semibold text-slate-800">Documents</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">{uploaded.length} uploaded</span>
              {expandedSections['documents'] !== false ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
            </div>
          </button>

          {expandedSections['documents'] !== false && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 animate-fade-in">
              {service.documents.map(req => {
                const doc = uploaded.find(u => u.requirementId === req.id);
                return (
                  <div key={req.id} className="flex items-center gap-3 text-sm">
                    {doc ? <CheckCircle2 size={14} className="text-green-600 shrink-0" /> : (
                      <div className={cn('w-3.5 h-3.5 rounded-full border-2 shrink-0', req.required ? 'border-red-400' : 'border-slate-300')} />
                    )}
                    <span className={cn('flex-1', !doc && 'text-slate-400')}>{req.name}</span>
                    {doc && <span className="text-slate-500 text-xs">{formatFileSize(doc.sizeKB)}</span>}
                    {!doc && req.required && <span className="text-xs text-red-500">Not uploaded</span>}
                    {!doc && !req.required && <span className="text-xs text-slate-400">Optional</span>}
                  </div>
                );
              })}
              <a href={`/apply/${serviceId}/documents`} className="text-xs font-semibold text-gov-600 flex items-center gap-1 mt-2 hover:text-gov-800">
                <Edit2 size={11} /> Manage Documents
              </a>
            </div>
          )}
        </Card>
      </div>

      <Card shadow="md" className="border-navy-200 bg-navy-50/40">
        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
          By submitting this application, you confirm that all information provided is accurate to the best of your knowledge.
        </p>
        <Button
          variant="primary"
          size="xl"
          fullWidth
          iconRight={submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          onClick={() => setConfirmOpen(true)}
          disabled={!user || submitting}
        >
          {submitting ? 'Submitting…' : 'Submit Application'}
        </Button>
        <Button
          variant="ghost"
          size="md"
          fullWidth
          className="mt-3"
          iconLeft={savingDraft ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          onClick={handleSaveDraft}
          disabled={savingDraft}
        >
          {savingDraft ? 'Saving…' : 'Save & Finish Later'}
        </Button>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        title="Submit your application?"
        message="You are about to submit your application. Once submitted, you will receive a reference number. You cannot undo this action."
        confirmLabel={submitting ? 'Submitting…' : 'Yes, Submit Now'}
        cancelLabel="Not Yet"
      />
    </PageLayout>
  );
}
