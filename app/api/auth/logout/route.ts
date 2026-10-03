import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionCookie, clearSessionCookie, verifySessionToken } from '@/lib/auth';

export async function POST(_req: NextRequest) {
  try {
    const token = await getSessionCookie();
    if (token) {
      const payload = await verifySessionToken(token);
      if (payload?.sessionId) {
        await prisma.session.deleteMany({ where: { id: payload.sessionId } });
      }
    }
    await clearSessionCookie();
    return NextResponse.json({ success: true });
  } catch {
    await clearSessionCookie();
    return NextResponse.json({ success: true });
  }
}
