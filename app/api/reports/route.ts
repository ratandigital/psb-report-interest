import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { jwtVerify } from 'jose'; // Import jwtVerify from jose
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const division = searchParams.get('division');
  const district = searchParams.get('district');
  const upazila = searchParams.get('upazila');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const filters: any = {};

  // Collecting filters from search parameters
  if (division) filters.division = division;
  if (district) filters.district = district;
  if (upazila) filters.upazila = upazila;

  // Applying the start date filter if provided
  if (startDate) {
    const start = new Date(startDate);
    // Set the time to the beginning of the day in local time (00:00:00)
    start.setHours(0, 0, 0, 0);
    filters.createdAt = { gte: start }; // Use 'gte' for start date
  }

  // Applying the end date filter if provided
  if (endDate) {
    const end = new Date(endDate);
    // Set the time to the end of the day in local time (23:59:59.999)
    end.setHours(23, 59, 59, 999);
    filters.createdAt = {
      ...filters.createdAt,
      lte: end, // Use 'lte' for end date
    };
  }

  // Default to current month if no filters are provided
  if (Object.keys(filters).length === 0) {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    filters.createdAt = {
      gte: firstDayOfMonth,
      lte: lastDayOfMonth,
    };
  }

  if (!token) {
    return NextResponse.json({ error: 'Token not provided' }, { status: 400 });
  }

  let decodedToken;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    decodedToken = payload as { id: string; status: string };
    if (!decodedToken.id) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 400 });
    }

    const totalReports = await prisma.dailyTransaction.count({
      where: filters,
    });

    const reports = await prisma.dailyTransaction.findMany({
      where: filters,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      reports,
      totalPages: Math.ceil(totalReports / pageSize),
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json({ error: 'Failed to fetch reports.' }, { status: 500 });
  }
}
