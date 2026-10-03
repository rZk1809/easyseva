import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/apiAuth';

export async function GET(_req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    notifications: notifications.map(n => ({
      id: n.id,
      type: n.type as 'info' | 'success' | 'warning' | 'action',
      title: n.title,
      message: n.message,
      applicationId: n.referenceNumber ?? undefined,
      read: n.read,
      createdAt: n.createdAt.toISOString(),
    })),
  });
}
