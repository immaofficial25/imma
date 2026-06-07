import { getAdminSession } from '@/lib/admin';
import { grantCourseAccess, revokeCourseAccess } from '@/lib/admin';
import { NextResponse } from 'next/server';

// POST: grant access
export async function POST(req) {
  const session = await getAdminSession();
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const { email, courseId, name, phoneNumber } = await req.json();
  const adminId = session.user.id;

  try {
    const grant = await grantCourseAccess({ email, courseId, name, phoneNumber, adminId });
    return NextResponse.json({ success: true, grant });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE: revoke access
export async function DELETE(req) {
  const session = await getAdminSession();
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const { email, courseId } = await req.json();

  try {
    await revokeCourseAccess({ email, courseId });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
