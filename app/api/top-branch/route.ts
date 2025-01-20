import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  try {
    // Query to get the top 5 branches based on total collection
    const topBranches = await prisma.dailyTransaction.groupBy({
      by: ['branchCode', 'upazila'], // Group by both branchCode and upazila
      _sum: {
        savingsCollection: true,
        loanCollectionRegular: true,
        loanCollectionSMA: true,
        loanCollectionCL: true,
      },
      orderBy: {
        _sum: {
          savingsCollection: 'desc', // Sorting in descending order based on collection
        },
      },
      take: 5, // Limit to top 5 branches
    });

    // Format the response to include the total collection for each branch along with upazila
    const top5CollectionBranches = topBranches.map(branch => ({
      branchCode: branch.branchCode,
      upazila: branch.upazila, // Include upazila in the response
      totalCollection: 
        (branch._sum.savingsCollection || 0) +
        (branch._sum.loanCollectionRegular || 0) +
        (branch._sum.loanCollectionSMA || 0) +
        (branch._sum.loanCollectionCL || 0),
    }));

    return NextResponse.json(top5CollectionBranches);

  } catch (error) {
    console.error('Error fetching top 5 branches:', error);
    return NextResponse.json({ error: 'Failed to fetch top 5 branches' }, { status: 500 });
  }
}
