// app/api/users/[id]/approve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  console.log('approve');
  const { id } = params;

  try {
    const updatedUser = await prismadb.branchList.update({
      where: { id },
      data: { status: 'reject' },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error approving user:', error);
    return NextResponse.json({ message: 'Error reject user' }, { status: 500 });
  }
}
