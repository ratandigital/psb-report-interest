import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { jwtVerify } from 'jose'; // Import jwtVerify from jose

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const filters: any = {};

  if (startDate) {
    filters.createdAt = { gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)) };
  }
  if (endDate) {
    filters.createdAt = {
      ...filters.createdAt,
      lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);



  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No session token provided.' }, { status: 401 });
  }

  let decodedToken;
  try {
    // Verify the token using jwtVerify
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    decodedToken = payload as { id: string; status: string };

    // Fetch transactions from the database
    const transactionslast = await prisma.dailyTransaction.findFirst({
      where: {
        userId: decodedToken.id,
      },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order to get the latest
      },
    });
    


    let parsedCashInHandYes = transactionslast?.cashInHand
    
    
  
    console.log(parsedCashInHandYes)

   
    return NextResponse.json( parsedCashInHandYes );
    
   


  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions.' }, { status: 500 });
  }
}



export async function POST(req: NextRequest) {
    try {
      const data = await req.json();
  
      if (!data.userId) {
        return NextResponse.json({ error: 'userId is required' }, { status: 400 });
      }
  
      const newTransaction = await prisma.dailyTransaction.create({
        data,
      });
  
      return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
      console.error('Error creating transaction:', error);
      return NextResponse.json(
        { error: 'Failed to create transaction.' },
        { status: 500 }
      );
    }
  }
  
  