import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/apiAuth';
import { buildTimeline, getStatusLabel, getStatusProgress } from '@/lib/applicationUtils';
import type { Application } from '@/lib/types';

const STATUS_SEQUENCE = [
  'submitted',
  'documents_verified',
  'under_review',
  'approved',
] as const;

const STATUS_MESSAGES: Record<string, { title: string; message: string; type: string }> = {
  documents_verified: {
    title: 'Documents Verified',
    message: 'Your uploaded documents have been verified successfully.',
    type: 'success',
  },
  under_review: {
    title: 'Application Under Review',
    message: 'Your application is now being reviewed by a Revenue Officer.',
    type: 'info',
  },
  approved: {
    title: 'Application Approved! 🎉',
    message: 'Congratulations! Your application has been approved. Please collect your certificate from the district office.',
    type: 'success',
  },
  rejected: {
    title: 'Application Rejected',
    message: 'Unfortunately, your application was not approved. Please contact the district office for more details.',
    type: 'warning',
  },
  action_required: {
    title: 'Action Required',
    message: 'Additional information is required for your application. Please visit the district office.',
    type: 'action',
  },
};

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { status: requestedStatus } = await req.json();

  const app = await prisma.application.findFirst({ where: { id, userId: user.id } });
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let nextStatus: string;

  if (requestedStatus) {
    // Explicit status override
    nextStatus = requestedStatus;
  } else {
    // Auto-advance to next in sequence
    const currentIndex = STATUS_SEQUENCE.indexOf(app.status as typeof STATUS_SEQUENCE[number]);
    if (currentIndex === -1 || currentIndex >= STATUS_SEQUENCE.length - 1) {
      return NextResponse.json({ error: 'Already at final status.' }, { status: 400 });
    }
    nextStatus = STATUS_SEQUENCE[currentIndex + 1];
  }

  const updated = await prisma.application.update({
    where: { id },
    data: { status: nextStatus },
  });

  // Create a notification for the status change
  const notifData = STATUS_MESSAGES[nextStatus];
  if (notifData) {
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: notifData.type,
        title: notifData.title,
        message: `${app.serviceName} (${app.referenceNumber}): ${notifData.message}`,
        referenceNumber: app.referenceNumber,
        applicationId: app.id,
      },
    });
  }

  const status = updated.status as Application['status'];
  return NextResponse.json({
    application: {
      id: updated.id,
      referenceNumber: updated.referenceNumber,
      serviceId: updated.serviceId,
      serviceName: updated.serviceName,
      serviceCategory: updated.serviceCategory,
      status,
      statusLabel: getStatusLabel(status),
      progress: getStatusProgress(status),
      submittedAt: updated.submittedAt.toISOString(),
      lastUpdated: updated.updatedAt.toISOString(),
      timeline: buildTimeline(status, updated.submittedAt.toISOString()),
    } satisfies Application,
  });
}
