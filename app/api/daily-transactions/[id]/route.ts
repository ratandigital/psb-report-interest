import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await req.json();

    const updatedTransaction = await prisma.dailyTransaction.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to update transaction.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.dailyTransaction.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Transaction deleted successfully.' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { error: 'Failed to delete transaction.' },
      { status: 500 }
    );
  }
}
