import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/apiAuth';
import { buildTimeline, getStatusLabel, getStatusProgress } from '@/lib/applicationUtils';
import type { Application } from '@/lib/types';

function mapApp(a: {
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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const app = await prisma.application.findFirst({
    where: { id, userId: user.id },
  });

  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ application: mapApp(app) });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const existing = await prisma.application.findFirst({ where: { id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (body.formData !== undefined) data.formData = body.formData;
  if (body.documents !== undefined) data.documents = body.documents;
  if (body.status !== undefined) data.status = body.status;

  const updated = await prisma.application.update({ where: { id }, data });

  return NextResponse.json({ application: mapApp(updated) });
}
