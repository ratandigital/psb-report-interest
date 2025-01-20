// app/api/users/[id]/approve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
 
  const { id } = params;
  console.log(id);  // Check if this log appears
  try {
    const updatedUser = await prismadb.branchList.update({
      where: { id },
      data: { status: 'approved' },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error approving user:', error);
    return NextResponse.json({ message: 'Error approving user' }, { status: 500 });
  }
}
