'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { services } from '@/lib/mockData';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { ProgressBar } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';
import {
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Clock,
  FileText,
  RefreshCw,
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Option {
  value: string;
  label: string;
  emoji: string;
  serviceIds?: string[];
  nextQuestionId?: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'need',
    text: 'What do you need help with today?',
    options: [
      {
        value: 'income-proof',
        label: 'Proof of my family\'s income',
        emoji: '📄',
        serviceIds: ['income-certificate'],
      },
      {
        value: 'education-support',
        label: 'Financial support for my education',
        emoji: '🎓',
        nextQuestionId: 'education',
      },
      {
        value: 'elderly-support',
        label: 'Financial help for an elderly family member',
        emoji: '👴',
        serviceIds: ['old-age-pension'],
      },
      {
        value: 'not-sure',
        label: 'I\'m not sure — help me find out',
        emoji: '🤔',
        nextQuestionId: 'profile',
      },
    ],
  },
  {
    id: 'education',
    text: 'What kind of education support are you looking for?',
    options: [
      {
        value: 'scholarship',
        label: 'Scholarship for school or college fees',
        emoji: '💰',
        serviceIds: ['merit-scholarship'],
      },
      {
        value: 'fee-waiver',
        label: 'Fee waiver or exemption',
        emoji: '🏫',
        serviceIds: ['merit-scholarship'],
      },
      {
        value: 'hostel',
        label: 'Hostel accommodation support',
        emoji: '🏠',
        serviceIds: ['merit-scholarship'],
      },
    ],
  },
  {
    id: 'profile',
    text: 'Tell us a little about yourself.',
    options: [
      {
        value: 'student',
        label: 'I am a student',
        emoji: '📚',
        serviceIds: ['merit-scholarship'],
      },
      {
        value: 'senior',
        label: 'I am 60 years or older',
        emoji: '🌟',
        serviceIds: ['old-age-pension'],
      },
      {
        value: 'family',
        label: 'I need to prove my family\'s income',
        emoji: '👨‍👩‍👧',
        serviceIds: ['income-certificate'],
      },
    ],
  },
];

const getQuestion = (id: string) => QUESTIONS.find(q => q.id === id);

export default function FindServicePage() {
  const { language } = useApp();
  const [history, setHistory] = useState<string[]>(['need']);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [resultServiceIds, setResultServiceIds] = useState<string[] | null>(null);

  const currentQuestionId = history[history.length - 1];
  const currentQuestion = getQuestion(currentQuestionId);
  const progress = (history.length / 3) * 100;

  const handleSelect = (option: Option) => {
    const newAnswers = { ...answers, [currentQuestionId]: option };
    setAnswers(newAnswers);

    if (option.serviceIds) {
      setResultServiceIds(option.serviceIds);
    } else if (option.nextQuestionId) {
      setHistory(h => [...h, option.nextQuestionId!]);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(h => h.slice(0, -1));
      setResultServiceIds(null);
    }
  };

  const handleReset = () => {
    setHistory(['need']);
    setAnswers({});
    setResultServiceIds(null);
  };

  const resultServices = resultServiceIds
    ? services.filter(s => resultServiceIds.includes(s.id))
    : [];

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Help Me Find a Service"
        description="Not sure which service you need? Answer a few quick questions."
        backHref="/home"
      />

      <ProgressBar
        value={progress}
        size="sm"
        className="mb-6"
        label={`Step ${history.length} of 3`}
      />

      {/* Results */}
      {resultServiceIds && resultServices.length > 0 && (
        <div className="animate-fade-in-up space-y-4">
          <Alert variant="success" role="status">
            Based on your answers, these services may be right for you.
          </Alert>

          {resultServices.map(service => (
            <Card key={service.id} shadow="md" className="border-gov-200">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="text-slate-600 mt-1">{service.shortDescription}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1.5"><Clock size={14} /> ~{service.estimatedMinutes} min</span>
                <span className="flex items-center gap-1.5"><FileText size={14} /> {service.documents.length} documents</span>
                <span className="text-green-600 font-semibold">{service.fee}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/apply/${service.id}/eligibility`}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl',
                    'bg-navy-800 text-white font-semibold text-sm',
                    'hover:bg-navy-900 transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2'
                  )}
                >
                  Apply Now <ArrowRight size={16} />
                </Link>
                <Link
                  href={`/services/${service.categoryId}/${service.id}`}
                  className={cn(
                    'flex items-center justify-center gap-1 px-4 py-3 rounded-xl text-sm font-medium',
                    'border border-slate-200 text-slate-600 hover:bg-slate-50',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600'
                  )}
                >
                  Learn More <ChevronRight size={14} />
                </Link>
              </div>
            </Card>
          ))}

          <p className="text-xs text-slate-400 text-center">
            These suggestions are based on your answers and are not official eligibility decisions.
          </p>

          <div className="flex justify-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              iconLeft={<RefreshCw size={14} />}
              onClick={handleReset}
            >
              Start over with different answers
            </Button>
          </div>
        </div>
      )}

      {/* Question */}
      {!resultServiceIds && currentQuestion && (
        <Card shadow="md" className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle size={18} className="text-gov-600" aria-hidden="true" />
            <span className="text-xs font-semibold text-gov-600 uppercase tracking-wider">
              Question {history.length}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">{currentQuestion.text}</h2>

          <div className="space-y-3" role="group" aria-label={currentQuestion.text}>
            {currentQuestion.options.map(option => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={cn(
                  'w-full text-left flex items-center gap-4 px-4 py-4 rounded-xl border-2 transition-all',
                  'border-slate-200 bg-white hover:border-gov-400 hover:bg-gov-50',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600',
                  'min-h-[60px]'
                )}
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{option.emoji}</span>
                <span className="font-medium text-slate-800 flex-1">{option.label}</span>
                <ChevronRight size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>

          {history.length > 1 && (
            <button
              onClick={handleBack}
              className="mt-4 text-sm font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded px-1"
            >
              ← Go back
            </button>
          )}
        </Card>
      )}

      {!resultServiceIds && !currentQuestion && (
        <Alert variant="info">
          We couldn&apos;t find a matching service. Please <Link href="/services" className="underline font-medium">browse all services</Link> or <Link href="/help" className="underline font-medium">contact support</Link>.
        </Alert>
      )}
    </PageLayout>
  );
}
