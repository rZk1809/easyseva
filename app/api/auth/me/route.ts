import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionCookie, verifySessionToken } from '@/lib/auth';

export async function GET(_req: NextRequest) {
  try {
    const token = await getSessionCookie();
    if (!token) return NextResponse.json({ user: null });

    const payload = await verifySessionToken(token);
    if (!payload?.sessionId) return NextResponse.json({ user: null });

    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        phone: session.user.phone,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
