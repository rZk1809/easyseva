'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { services } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { StepProgress } from '@/components/ui/Progress';
import { ConfirmDialog } from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
import type { FormField, FormStep } from '@/lib/types';
import type { Language } from '@/lib/types';
import { trx } from '@/lib/translations';
import { Save, CheckCircle2, ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';

type FieldErrors = Record<string, string>;
type FieldValues = Record<string, string>;

function validateField(field: FormField, value: string): string | null {
  if (field.required && (!value || value.trim() === '')) {
    return `${field.label} is required.`;
  }
  if (!value) return null;
  const v = field.validation;
  if (!v) return null;
  if (v.pattern) {
    const re = new RegExp(v.pattern);
    if (!re.test(value)) return v.message ?? `Please check your ${field.label.toLowerCase()}.`;
  }
  if (v.minLength && value.length < v.minLength)
    return v.message ?? `Please enter at least ${v.minLength} characters.`;
  if (v.maxLength && value.length > v.maxLength)
    return v.message ?? `Please enter at most ${v.maxLength} characters.`;
  if (v.min !== undefined && Number(value) < v.min)
    return v.message ?? `Please enter a value of at least ${v.min}.`;
  return null;
}

function FormFieldRenderer({
  field,
  value,
  error,
  onChange,
  onBlur,
  language,
}: {
  field: FormField;
  value: string;
  error?: string;
  onChange: (id: string, value: string) => void;
  onBlur: (id: string) => void;
  language: Language;
}) {
  const commonProps = {
    id: field.id,
    label: trx(field.label, language),
    required: field.required,
    helperText: field.helperText,
    error: error,
    example: field.example,
  };

  if (field.type === 'select' && field.options) {
    return (
      <Select
        {...commonProps}
        value={value}
        onChange={e => onChange(field.id, e.target.value)}
        onBlur={() => onBlur(field.id)}
        options={field.options.map(o => ({ ...o, label: trx(o.label, language) }))}
        placeholder={trx('Choose one…', language)}
      />
    );
  }

  if (field.type === 'textarea') {
    return (
      <Textarea
        {...commonProps}
        value={value}
        onChange={e => onChange(field.id, e.target.value)}
        onBlur={() => onBlur(field.id)}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <Input
      {...commonProps}
      type={field.type}
      value={value}
      onChange={e => onChange(field.id, e.target.value)}
      onBlur={() => onBlur(field.id)}
      placeholder={field.placeholder}
    />
  );
}

export default function FormPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.service as string;
  const service = services.find(s => s.id === serviceId);
  const { language, setFormData, getFormData } = useApp();

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [values, setValues] = useState<FieldValues>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Load saved data
  useEffect(() => {
    if (!service) return;
    const saved = getFormData(serviceId);
    const merged: FieldValues = {};
    service.formSteps.forEach(step => {
      const stepData = (saved[step.id] as FieldValues) ?? {};
      Object.assign(merged, stepData);
    });
    setValues(merged);
  }, [service, serviceId, getFormData]);

  const autosave = useCallback(async (newValues: FieldValues) => {
    if (!service) return;
    setSaveStatus('saving');
    const step = service.formSteps[currentStepIdx];
    const stepData: FieldValues = {};
    step.fields.forEach(f => { stepData[f.id] = newValues[f.id] ?? ''; });
    setFormData(serviceId, step.id, stepData);
    await new Promise(r => setTimeout(r, 500));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  }, [service, currentStepIdx, serviceId, setFormData]);

  if (!service) return <PageLayout><Alert variant="error">Service not found.</Alert></PageLayout>;

  const title = language === 'ta' ? service.titleTa : language === 'hi' ? service.titleHi : service.title;
  const steps = service.formSteps;
  const step: FormStep = steps[currentStepIdx];
  const isLast = currentStepIdx === steps.length - 1;
  const stepTitles = steps.map(s => s.title);

  const handleChange = (id: string, value: string) => {
    const newValues = { ...values, [id]: value };
    setValues(newValues);
    if (touched[id]) {
      const field = step.fields.find(f => f.id === id);
      if (field) {
        const err = validateField(field, value);
        setErrors(prev => ({ ...prev, [id]: err ?? '' }));
      }
    }
    autosave(newValues);
  };

  const handleBlur = (id: string) => {
    setTouched(prev => ({ ...prev, [id]: true }));
    const field = step.fields.find(f => f.id === id);
    if (field) {
      const err = validateField(field, values[id] ?? '');
      setErrors(prev => ({ ...prev, [id]: err ?? '' }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: FieldErrors = {};
    const newTouched: Record<string, boolean> = { ...touched };
    let valid = true;
    step.fields.forEach(field => {
      newTouched[field.id] = true;
      const err = validateField(field, values[field.id] ?? '');
      if (err) { newErrors[field.id] = err; valid = false; }
    });
    setErrors(prev => ({ ...prev, ...newErrors }));
    setTouched(newTouched);
    return valid;
  };

  const handleNext = async () => {
    if (!validateStep()) {
      const firstError = document.querySelector('[aria-invalid="true"]') as HTMLElement;
      firstError?.focus();
      return;
    }
    await autosave(values);
    if (isLast) {
      router.push(`/apply/${serviceId}/review`);
    } else {
      setCurrentStepIdx(i => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStepIdx === 0) {
      setShowExitDialog(true);
    } else {
      setCurrentStepIdx(i => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const completedFields = step.fields.filter(f => values[f.id] && values[f.id].trim() !== '').length;
  const stepProgress = Math.round((completedFields / step.fields.length) * 100);

  return (
    <PageLayout maxWidth="md">
      {/* Progress header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-base font-semibold text-slate-500">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {saveStatus === 'saving' && (
              <span className="flex items-center gap-1 text-amber-600">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" aria-hidden="true" />
                {trx('Saving…', language)}
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="flex items-center gap-1 text-green-600" role="status" aria-live="polite">
                <CheckCircle2 size={13} />
                {trx('Saved', language)}
              </span>
            )}
          </div>
        </div>

        <StepProgress
          currentStep={currentStepIdx + 1}
          totalSteps={steps.length + 1}
          stepTitles={[...stepTitles.map(s => trx(s, language)), trx('Review', language)]}
          className="mb-3"
        />

        <p className="text-xs text-slate-500 text-center">
          {trx('Step', language)} {currentStepIdx + 1} {trx('of', language)} {steps.length + 1}
        </p>
      </div>

      {/* Step card */}
      <Card shadow="md" className="animate-fade-in-up">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">{trx(step.title, language)}</h2>
          <p className="text-slate-500 text-sm mt-1">{trx(step.description, language)}</p>
        </div>

        <p className="text-xs text-slate-400 mb-5">{trx('Fields marked', language)} <span className="text-red-600 font-bold">*</span> {trx('are required', language)}</p>

        <div className="space-y-5">
          {step.fields.map(field => (
            <FormFieldRenderer
              key={field.id}
              field={field}
              value={values[field.id] ?? ''}
              error={touched[field.id] ? errors[field.id] : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
              language={language}
            />
          ))}
        </div>

        {/* Step actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNext}
            iconRight={<ArrowRight size={18} />}
          >
            {isLast ? trx('Review Application', language) : trx('Save & Continue', language)}
          </Button>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="md"
              onClick={handleBack}
              iconLeft={<ArrowLeft size={16} />}
              className="flex-1"
            >
              {trx('Back', language)}
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => { autosave(values); router.push('/home'); }}
              iconLeft={<Save size={16} />}
              className="flex-1"
            >
              {trx('Save & Exit', language)}
            </Button>
          </div>
        </div>
      </Card>

      <p className="text-xs text-center text-slate-400 mt-4">
        {trx('Your progress is saved automatically. You can continue later from "My Applications".', language)}
      </p>

      {/* Help */}
      <div className="mt-4 text-center">
        <a
          href="/help"
          className="inline-flex items-center gap-1 text-sm text-gov-600 hover:text-gov-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded"
        >
          <HelpCircle size={14} />
          {trx('Need help with this step?', language)}
        </a>
      </div>

      <ConfirmDialog
        open={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onConfirm={() => {
          autosave(values);
          router.push(`/services/${service.categoryId}/${serviceId}`);
        }}
        title={trx('Leave this application?', language)}
        message={trx("Your progress will be saved. You can continue from 'My Applications' whenever you're ready.", language)}
        confirmLabel={trx('Save & Leave', language)}
        cancelLabel={trx('Stay Here', language)}
      />
    </PageLayout>
  );
}
