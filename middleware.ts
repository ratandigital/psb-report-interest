import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // Import jwtVerify from jose

const protectedRoutes = ['/dashboard', '/profile', '/daily-report'];
const protectedRoutesForAdminAndManagement = ['/reports', '/user-list']; // Add '/reports' route here
const protectedRoutesForAdmin = ['/admin-list']; // Add '/reports' route here
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value; // Get the session token from cookies

  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // If the route is not protected, allow the request without a token
  if (!protectedRoutes.includes(pathname) && !protectedRoutesForAdminAndManagement.includes(pathname)&& !protectedRoutesForAdmin.includes(pathname)) {
    return NextResponse.next();
  }

  // If the token is not found for protected routes, return a 401 Unauthorized response
  if (!token) {
    const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
  }

  let decodedToken;
  try {
    // Verify the token using the jose library
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY)); // Use TextEncoder to convert secret to Uint8Array
    decodedToken = payload as { id: string; status: string };
    console.log('Decoded Token:', decodedToken); // Log the decoded token for debugging
  } catch (err) {
    console.error('Token verification failed:', err); // Log the error for debugging
    return NextResponse.json({ error: 'Unauthorized: Invalid token.' }, { status: 401 });
  }

  // If the route requires authentication and the token is invalid or not present, redirect to login
  if (protectedRoutes.includes(pathname)) {
    if (!decodedToken) {
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if the route requires admin or management status
  if (protectedRoutesForAdminAndManagement.includes(pathname)) {
    if (!decodedToken || (decodedToken.status !== 'admin' && decodedToken.status !== 'management')) {
      const notAuthorizedUrl = new URL('/dashboard', request.url); // Redirect to a not-authorized page
      return NextResponse.redirect(notAuthorizedUrl);
    }
  } // Check if the route requires admin or management status
  if (protectedRoutesForAdmin.includes(pathname)) {
    if (!decodedToken || (decodedToken.status !== 'admin')) {
      const notAuthorizedUrl = new URL('/dashboard', request.url); // Redirect to a not-authorized page
      return NextResponse.redirect(notAuthorizedUrl);
    }
  }
  // If the route doesn't require special status or the user has the right status, allow the request
  return NextResponse.next();
}
