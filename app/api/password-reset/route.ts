import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function POST(req: Request) {
  const { password } = await req.json(); // Parse the JSON body

  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value; // Extract the cookie value as a string

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    const decodedToken = payload as { id: string; status: string };

    const user = await prismadb.branchList.findUnique({
      where: { id: decodedToken.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Hash the new password (optional if you're hashing the password)
    // const hashedPassword = await bcrypt.hash(password, 10);

    await prismadb.branchList.update({
      where: { id: decodedToken.id },
      data: {
        password: password, // Or hashedPassword if you use bcrypt
      },
    });

    return NextResponse.json({ message: 'Password has been successfully reset' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while resetting the password' }, { status: 500 });
  }
}
