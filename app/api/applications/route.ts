import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/apiAuth';
import { buildTimeline, getStatusLabel, getStatusProgress } from '@/lib/applicationUtils';
import type { Application } from '@/lib/types';

function mapToApplication(a: {
  id: string; referenceNumber: string; serviceId: string; serviceName: string;
  serviceCategory: string; status: string; formData: unknown; documents: unknown;
  submittedAt: Date; updatedAt: Date;
}): Application {
  const status = a.status as Application['status'];
  return {
    id: a.id,
    referenceNumber: a.referenceNumber,
    serviceId: a.serviceId,
    serviceName: a.serviceName,
    serviceCategory: a.serviceCategory,
    status,
    statusLabel: getStatusLabel(status),
    progress: getStatusProgress(status),
    submittedAt: a.submittedAt.toISOString(),
    lastUpdated: a.updatedAt.toISOString(),
    formData: a.formData as Record<string, unknown>,
    documents: a.documents as Application['documents'],
    timeline: buildTimeline(status, a.submittedAt.toISOString()),
  };
}

export async function GET(_req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apps = await prisma.application.findMany({
    where: { userId: user.id },
    orderBy: { submittedAt: 'desc' },
  });

  return NextResponse.json({ applications: apps.map(mapToApplication) });
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { serviceId, serviceName, serviceCategory, formData, documents, status = 'submitted' } = body;

    if (!serviceId || !serviceName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const validStatuses = ['submitted', 'draft'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
    }

    // For drafts: upsert — one draft per (userId, serviceId)
    if (status === 'draft') {
      const existing = await prisma.application.findFirst({
        where: { userId: user.id, serviceId, status: 'draft' },
      });

      if (existing) {
        const updated = await prisma.application.update({
          where: { id: existing.id },
          data: {
            formData: formData ?? {},
            documents: documents ?? [],
          },
        });
        return NextResponse.json({ application: mapToApplication(updated) });
      }
    }

    const serial = (Date.now() % 100000).toString().padStart(5, '0');
    const referenceNumber = status === 'draft'
      ? `DR-${new Date().getFullYear()}-${serial}`
      : `ES-${new Date().getFullYear()}-${serial}`;

    const app = await prisma.application.create({
      data: {
        userId: user.id,
        serviceId,
        serviceName,
        serviceCategory: serviceCategory ?? '',
        referenceNumber,
        status,
        formData: formData ?? {},
        documents: documents ?? [],
      },
    });

    // Notification only for submitted applications
    if (status === 'submitted') {
      await prisma.notification.create({
        data: {
          userId: user.id,
          type: 'success',
          title: 'Application Received',
          message: `Your ${serviceName} application (${referenceNumber}) has been received and is being processed.`,
          referenceNumber,
          applicationId: app.id,
        },
      });
    }

    return NextResponse.json({ application: mapToApplication(app) }, { status: 201 });
  } catch (err) {
    console.error('[applications/POST]', err);
    return NextResponse.json({ error: 'Failed to create application.' }, { status: 500 });
  }
}
