import { NextRequest, NextResponse } from 'next/server';
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { status } = await req.json();

    // Ensure valid status transitions
    if (status !== 'locked' && status !== 'approved') {
      return NextResponse.json({ message: 'Invalid status value' }, { status: 400 });
    }

    const updatedUser = await prismadb.branchList.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json({ message: 'Error updating user status' }, { status: 500 });
  }
}
