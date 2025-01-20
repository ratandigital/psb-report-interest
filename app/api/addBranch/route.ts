import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prismadb';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { divisionName, districtName, branchName, branchCode, password, status } = body;

    // Basic validation
    if (!divisionName || !districtName || !branchName || !branchCode || !password) {
      return NextResponse.json({ errors: 'All fields are required' }, { status: 400 });
    }

    const existingBranch = await prisma.branchList.findFirst({
      where: { branchCode },
    });
    if (existingBranch) {
      return NextResponse.json({ errors: `Branch Code ${branchCode} already exists` }, { status: 400 });
    }

    const token = req.cookies.get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided.' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY) as { id: string; status: string };
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token.' }, { status: 401 });
    }

    // Retrieve the user and current transactions
    const user = await prisma.branchList.findUnique({
      where: { id: decodedToken.id },
      select: { transactions: true, status: true, divisionName: true, districtName: true, branchName: true,
        branchCode: true
       },
    });

    if (!user || ( user.status !== 'admin')) {
      return NextResponse.json({ error: 'Only Admin can add Branch.' }, { status: 400 });
    }

    // Save branch data to the database
    const branch = await prisma.branchList.create({
      data: {
        divisionName,
        districtName,
        branchName,
        branchCode,
        password,
        status: status || 'pending', // Default to 'pending' if not provided
      },
    });
    console.log(branch)
    return NextResponse.json({ message: 'Branch added successfully', branch }, { status: 200 });
  } catch (error) {
    console.error('Error adding branch:', error);
    return NextResponse.json({ errors: 'Internal server error' }, { status: 500 });
  }
}
