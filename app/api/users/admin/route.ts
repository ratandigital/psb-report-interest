import { NextRequest, NextResponse } from 'next/server';
import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const division = searchParams.get('divisionName');
  const district = searchParams.get('districtName');
  const upazila = searchParams.get('branchName'); // Expect branchName in the query
  const status = searchParams.get('status');
  const branchCode = searchParams.get('branchCode'); // Get the branchCode from the query
  const page = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 10;

  try {
    const filters: any = {};

    // Apply filters from query parameters
    if (division) filters.divisionName = division;
    if (district) filters.districtName = district;
    if (upazila) filters.branchName = upazila;

    // Include 'submit' and 'approved' statuses, in addition to any specific status filter
    if (status) {
      filters.status = {
        in: [status], // Include the status query and predefined statuses
      };
    } else {
      filters.status = {
        in: ['admin', 'management'], // Default to only 'submit' and 'approved' if no status query
      };
    }

    // Convert branchCode to a number if it exists
    if (branchCode) {
      const branchCodeInt = parseInt(branchCode, 10);
      if (!isNaN(branchCodeInt)) {
        filters.branchCode = branchCodeInt;
      }
    }

    // Query to fetch filtered users with pagination
    const users = await prismadb.branchList.findMany({
      where: filters,
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: { createdAt: 'desc' },
    });

    // Fetching the total count of users for pagination
    const totalUsers = await prismadb.branchList.count({ where: filters });
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    // Response
    return NextResponse.json({ users, totalPages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}
