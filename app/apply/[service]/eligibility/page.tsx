'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { services } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { ProgressBar } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import type { EligibilityQuestion } from '@/lib/types';

interface AnswerState {
  [questionId: string]: string;
}

export default function EligibilityPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.service as string;
  const service = services.find(s => s.id === serviceId);
  const { language } = useApp();

  const [answers, setAnswers] = useState<AnswerState>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [expandedHint, setExpandedHint] = useState<string | null>(null);

  if (!service) return <PageLayout><Alert variant="error">Service not found.</Alert></PageLayout>;

  const questions = service.eligibilityCriteria;
  const title = language === 'ta' ? service.titleTa : language === 'hi' ? service.titleHi : service.title;

  const currentQuestion = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;
  const answeredAll = questions.every(q => answers[q.id]);

  const selectedOption = currentQuestion ? currentQuestion.options.find(o => o.value === answers[currentQuestion.id]) : null;

  const canContinue = currentQuestion && answers[currentQuestion.id];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(q => q - 1);
  };

  // Check overall eligibility
  const overallEligible = answeredAll && questions.every(q => {
    const opt = q.options.find(o => o.value === answers[q.id]);
    return opt?.eligible !== false;
  });

  const ineligibleQuestion = questions.find(q => {
    const opt = q.options.find(o => o.value === answers[q.id]);
    return opt?.eligible === false;
  });

  const ineligibleOption = ineligibleQuestion
    ? ineligibleQuestion.options.find(o => o.value === answers[ineligibleQuestion.id])
    : null;

  if (answeredAll) {
    return (
      <PageLayout maxWidth="md">
        <PageHeader
          title="Eligibility Check"
          backHref={`/services/${service.categoryId}/${service.id}`}
          backLabel={`Back to ${title}`}
        />
        <Card shadow="md" className="text-center py-8" role="status" aria-live="polite">
          {overallEligible ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-600" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">You appear to be eligible</h2>
              <p className="text-slate-600 mb-2">
                Based on the information you provided, you may be eligible for this service.
              </p>
              <p className="text-sm text-slate-500 mb-8">
                Your actual eligibility will be assessed by a government officer after submission.
              </p>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                iconRight={<ArrowRight size={18} />}
                onClick={() => router.push(`/apply/${serviceId}/documents`)}
              >
                Continue to Documents
              </Button>
              <button
                onClick={() => router.push(`/apply/${serviceId}/form`)}
                className="mt-3 text-sm text-slate-500 hover:text-slate-700 underline"
              >
                Skip document check and go directly to form
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle size={32} className="text-red-600" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">You may not be eligible</h2>
              {ineligibleOption?.explanation && (
                <p className="text-slate-600 mb-6">{ineligibleOption.explanation}</p>
              )}
              <Alert variant="warning" className="text-left mb-6">
                If you believe this is incorrect, you can still continue with your application and a government officer will make the final decision.
              </Alert>
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => router.push(`/apply/${serviceId}/form`)}
                >
                  Continue Anyway
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  fullWidth
                  onClick={() => router.push('/find-service')}
                >
                  Help me find a different service
                </Button>
              </div>
            </>
          )}
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Eligibility Check"
        description={`Let's quickly check if this service is right for you.`}
        backHref={`/services/${service.categoryId}/${service.id}`}
        backLabel={`Back to ${title}`}
      />

      <ProgressBar
        value={currentQ}
        max={questions.length}
        label={`Question ${currentQ + 1} of ${questions.length}`}
        showPercent={false}
        className="mb-6"
      />

      {currentQuestion && (
        <Card shadow="md" className="animate-fade-in-up">
          <p className="text-xs font-semibold text-gov-600 uppercase tracking-wider mb-3">
            Question {currentQ + 1} of {questions.length}
          </p>
          <h2 className="text-xl font-bold text-slate-900 mb-6 leading-snug">
            {language === 'ta' ? currentQuestion.questionTa :
              language === 'hi' ? currentQuestion.questionHi :
              currentQuestion.question}
          </h2>

          {/* Hint */}
          {currentQuestion.hint && (
            <div className="mb-4">
              <button
                onClick={() => setExpandedHint(expandedHint === currentQuestion.id ? null : currentQuestion.id)}
                className="flex items-center gap-1.5 text-sm font-medium text-gov-600 hover:text-gov-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded"
                aria-expanded={expandedHint === currentQuestion.id}
              >
                <HelpCircle size={15} />
                Why are we asking this?
                {expandedHint === currentQuestion.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {expandedHint === currentQuestion.id && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 animate-fade-in">
                  {currentQuestion.hint}
                </div>
              )}
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 mb-6" role="radiogroup" aria-label={currentQuestion.question}>
            {currentQuestion.options.map(option => {
              const isSelected = answers[currentQuestion.id] === option.value;
              return (
                <button
                  key={option.value}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={cn(
                    'w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-150',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600',
                    'min-h-[56px]',
                    isSelected
                      ? 'border-gov-600 bg-gov-50 text-gov-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                        isSelected ? 'border-gov-600 bg-gov-600' : 'border-slate-300'
                      )}
                      aria-hidden="true"
                    >
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>

                  {/* Explanation on selection */}
                  {isSelected && option.explanation && option.eligible !== null && (
                    <div className={cn(
                      'mt-2 ml-8 text-sm rounded-lg p-2.5',
                      option.eligible === false
                        ? 'text-red-700 bg-red-50'
                        : 'text-slate-600 bg-slate-100'
                    )}>
                      {option.explanation}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {currentQ > 0 && (
              <Button variant="outline" size="md" onClick={handleBack} className="w-32">
                Back
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={currentQ < questions.length - 1 ? handleNext : () => {
                // Force re-render to show results
                setCurrentQ(questions.length);
              }}
              disabled={!canContinue}
              fullWidth
              iconRight={<ArrowRight size={16} />}
            >
              {currentQ < questions.length - 1 ? 'Next Question' : 'See Result'}
            </Button>
          </div>
        </Card>
      )}
    </PageLayout>
  );
}
