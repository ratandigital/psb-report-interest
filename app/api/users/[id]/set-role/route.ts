import { NextRequest, NextResponse } from 'next/server';
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  console.log('make-admin-or-management');
  const { id } = params;

  try {
    const body = await req.json();
    const { role } = body;

    // Validate the role
    if (!['admin', 'management'].includes(role)) {
      return NextResponse.json(
        { message: 'Invalid role. Role must be "admin" or "management".' },
        { status: 400 }
      );
    }

    // Fetch the user to ensure they exist and are approved
    const user = await prismadb.branchList.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    if (user.status !== 'approved') {
      return NextResponse.json(
        { message: 'User must be approved before assigning a role.' },
        { status: 400 }
      );
    }

    // Update the user's role
    const updatedUser = await prismadb.branchList.update({
      where: { id },
      data: { status: role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ message: 'Error updating user role.' }, { status: 500 });
  }
}
