import type { ApplicationStatusStep } from './types';

export function buildTimeline(status: string, submittedAt: string): ApplicationStatusStep[] {
  const steps = [
    {
      id: 'received',
      title: 'Application Received',
      description: 'Your application has been successfully submitted and received by the department.',
    },
    {
      id: 'docs',
      title: 'Document Verification',
      description: 'Your uploaded documents will be checked by a document verification officer.',
    },
    {
      id: 'officer',
      title: 'Officer Verification',
      description: 'A Revenue Officer will verify your application details.',
    },
    {
      id: 'decision',
      title: 'Final Decision',
      description: 'The final certificate or approval will be issued once all checks are complete.',
    },
  ];

  const activeStep: Record<string, number> = {
    submitted: 0,
    documents_verified: 1,
    under_review: 2,
    action_required: 2,
    approved: 3,
    rejected: 3,
  };

  const current = activeStep[status] ?? 0;
  const isTerminal = status === 'approved' || status === 'rejected';

  return steps.map((step, i): ApplicationStatusStep => {
    if (i < current) return { ...step, status: 'completed', date: submittedAt };
    if (i === current) {
      if (isTerminal) return { ...step, status: 'completed', date: submittedAt };
      if (status === 'action_required') {
        return { ...step, status: 'action_required', actionLabel: 'View required action', actionHref: '/applications' };
      }
      return { ...step, status: 'in_progress' };
    }
    return { ...step, status: 'pending' };
  });
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: 'Draft',
    submitted: 'Submitted',
    documents_verified: 'Documents Verified',
    under_review: 'Under Review',
    action_required: 'Action Required',
    approved: 'Approved',
    rejected: 'Rejected',
  };
  return labels[status] ?? status;
}

export function getStatusProgress(status: string): number {
  const progress: Record<string, number> = {
    draft: 0,
    submitted: 25,
    documents_verified: 50,
    under_review: 75,
    action_required: 75,
    approved: 100,
    rejected: 100,
  };
  return progress[status] ?? 0;
}
