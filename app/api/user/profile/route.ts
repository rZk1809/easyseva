import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/apiAuth';

export async function PATCH(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, phone } = await req.json();

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(name !== undefined && { name: name?.trim() || null }),
      ...(phone !== undefined && { phone: phone?.trim() || null }),
    },
  });

  return NextResponse.json({
    user: { id: updated.id, email: updated.email, name: updated.name, phone: updated.phone },
  });
}
