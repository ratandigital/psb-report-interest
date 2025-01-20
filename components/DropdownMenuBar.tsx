import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';
import { ReportLinks } from './ReportLinks';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

async function getUserStatus() {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return { isApproved: false, isManagement: false, isAdmin: false };

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    const decodedToken = payload as { id: string; status: string };

    return {
      isApproved: decodedToken.status === 'approved',
      isManagement: decodedToken.status === 'management',
      isAdmin: decodedToken.status === 'admin',
    };
  } catch (error) {
    console.error('Invalid token:', error);
    return { isApproved: false, isManagement: false, isAdmin: false };
  }
}

export default async function DropdownMenuBar() {
  const { isApproved, isManagement, isAdmin } = await getUserStatus();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6 text-white">
          <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded-md">
            Home
          </Link>
{/*           <Link href="#" className="hover:bg-gray-700 p-2 rounded-md">
            About
          </Link> */}
         

          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-full bg-gray-800 hover:bg-gray-700">
              <span>Reports</span>
            </button>

            <div className="hidden group-hover:block">
              <ReportLinks
                isApproved={isApproved}
                isManagement={isManagement}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
