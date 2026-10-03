import { prisma } from './db';
import { getSessionCookie, verifySessionToken } from './auth';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const token = await getSessionCookie();
    if (!token) return null;

    const payload = await verifySessionToken(token);
    if (!payload?.sessionId) return null;

    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) return null;

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      phone: session.user.phone,
    };
  } catch {
    return null;
  }
}
