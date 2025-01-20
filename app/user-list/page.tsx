

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import bangladeshData from '@/component/bangladeshData';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  username: string;
  email: string;
  branchCode: string;
  divisionName: string;
  districtName: string;
  branchName: string;
  status: string;
  createdAt: string;
}

export default function UserListPage() {
  const router = useRouter();
  const [adminStatus, setAdminStatus] = useState<boolean | null>(null); // Initial state as null to avoid premature redirect


  const [users, setUsers] = useState<User[]>([]);
 
  const [filters, setFilters] = useState({
    division: '',
    district: '',
    upazila: '',
    status: '',
    branchName: '',
    branchCode: '',  // Add branchCode to the filter state
  });
  
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  // Check if the user has "admin" status using JWT from the cookie

  // useEffect(() => {
  //   const token = document.cookie
  //     .split('; ')
  //     .find((row) => row.startsWith('session='))
  //     ?.split('=')[1];

  //   if (token) {
  //     try {
  //       const decodedToken = jwt.decode(token) as { status?: string };
  //       const isAdmin = decodedToken?.status === 'admin';

  //       setAdminStatus(isAdmin);

  //       if (!isAdmin) {
  //         router.push('/'); // Redirect if not admin
  //       }
  //     } catch (error) {
  //       console.error('Token decoding error:', error);
  //       router.push('/'); // Redirect if token is invalid
  //     }
  //   } else {
  //     router.push('/'); // Redirect if no token found
  //   }
  // }, [router]);
  
  // Fetch users with filters and pagination
  useEffect(() => {
    async function fetchUsers() {
      const queryParams: Record<string, string> = { page: page.toString() };
      if (filters.division) queryParams.divisionName = filters.division;
      if (filters.district) queryParams.districtName = filters.district;
      if (filters.upazila) queryParams.branchName = filters.upazila; // Send selected branch (upazila)
      if (filters.status) queryParams.status = filters.status;
      if (filters.branchCode) queryParams.branchCode = filters.branchCode; // Add branchCode filter
  
      try {
        const res = await fetch(`/api/users?${new URLSearchParams(queryParams)}`);
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  
    fetchUsers();
  }, [page, filters]);
  


const handleApproveUser = async (userId: string) => {
  try {
    const res = await fetch(`/api/userss/${userId}/approve`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to approve user');
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: 'approved' } : user
      )
    );
  } catch (error) {
    console.error("Error approving user:", error);
  }
};

  
  
const handleMakeAdmin = async (userId: string) => {
  try {
    const res = await fetch(`/api/userss/${userId}/make-admin`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to make user admin');
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: 'admin' } : user
      )
    );
  } catch (error) {
    console.error("Error making user admin:", error);
  }
};

const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFilters((prevFilters) => ({
    ...prevFilters,
    [name]: value,
  }));
  setPage(1); // Reset to the first page when filters change
};


  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleRejectUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}/reject`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to reject user');
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: 'rejected' } : user
        )
      );
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };
  

  // if (adminStatus === null) return null;
  const handleLockUser = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'locked' ? 'approved' : 'locked';
      const res = await fetch(`/api/users/${userId}/lock`, {
        method: 'POST',
        body: JSON.stringify({ status: newStatus }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to ${newStatus === 'locked' ? 'lock' : 'unlock'} user`);
      }
  
      const updatedUser = await res.json();
  
      // Update the user's status locally in the state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: updatedUser.status } : user
        )
      );
    } catch (error) {
      console.error("Error toggling user lock status:", error);
    }
  };
  
  const handleSetRole = async (userId: string, role: 'admin' | 'management') => {
    try {
      const res = await fetch(`/api/users/${userId}/set-role`, {
        method: 'POST',
        body: JSON.stringify({ role }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to update user role');
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: role } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };
  
  const resetFilters = () => {
    setFilters({
      division: '',
      district: '',
      upazila: '',
      status: '',
      branchName: '',
      branchCode: ''
    });
    setPage(1); // Reset to the first page
  };
  

  return (
    <div className="p-4">
      <nav className="bg-gray-800 text-white p-4 rounded mb-6">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
      </nav>
      <h1 className="text-lg font-bold">User List</h1>
      <div className="flex flex-wrap text-center gap-4 mb-6 items-center">
  <select
    name="division"
    value={filters.division}
    onChange={handleFilterChange}
    className="px-2 py-1 border rounded"
  >
    <option value="">All Divisions</option>
    {Object.keys(bangladeshData).map((division) => (
      <option key={division} value={division}>
        {division}
      </option>
    ))}
  </select>

  <select
    name="district"
    value={filters.district}
    onChange={handleFilterChange}
    className="px-2 py-1 border rounded"
  >
    <option value="">All Districts</option>
    {filters.division &&
      Object.keys(bangladeshData[filters.division]?.districts || {}).map(
        (district) => (
          <option key={district} value={district}>
            {district}
          </option>
        )
      )}
  </select>

  <select
    name="upazila"
    value={filters.upazila}
    onChange={handleFilterChange}
    className="px-2 py-1 border rounded"
  >
    <option value="">Select a Branch</option>
    {filters.division &&
      filters.district &&
      bangladeshData[filters.division]?.districts[filters.district]?.map(
        (branch) => (
          <option key={branch.branchCode} value={branch.branchName}>
            {branch.branchName}
          </option>
        )
      )}
  </select>

  <select
    name="status"
    value={filters.status}
    onChange={handleFilterChange}
    className="px-2 py-1 border rounded"
  >
    <option value="">All Statuses</option>
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    {/* <option value="admin">Admin</option>
    <option value="management">Management</option> */}
    <option value="locked">Locked</option>
  </select>

  <input
    type="text"
    name="branchCode"
    value={filters.branchCode}
    onChange={handleFilterChange}
    placeholder="Search by Branch Code"
    className="px-2 py-1 border rounded"
  />

  <button
    onClick={resetFilters}
    className="px-4 py-2 bg-gray-500 text-white rounded"
  >
    Reset Filters
  </button>
</div>




      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
            <th className="p-3">Created At</th>
     
            <th className="p-3">Division</th>
            <th className="p-3">District</th>
            <th className="p-3">Upazila</th>
            <th className="p-3">Code</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
      
              <td className="p-3">{user.divisionName}</td>
              <td className="p-3">{user.districtName}</td>
              <td className="p-3">{user.branchName}</td>
              <td className="p-3">{user.branchCode}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">
  {user.status === 'pending' && (
    <>
      <button
        onClick={() => handleApproveUser(user.id)}
        className="px-2 py-1 bg-green-500 text-white rounded"
      >
        Approve
      </button>
      <button
        onClick={() => handleRejectUser(user.id)}
        className="px-2 py-1 bg-red-500 text-white rounded ml-2"
      >
        Reject
      </button>
    </>
  )}
  {user.status === 'approved' && (
    <div className="relative inline-block">
      <select
        onChange={(e) => handleSetRole(user.id, e.target.value as 'admin' | 'management')}
        defaultValue=""
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        <option value="" disabled>
          Set Role
        </option>
        <option value="admin">Admin</option>
        <option value="management">Management</option>
      </select>
    </div>
  )}
  {user.status !== 'pending' && (
    <button
      onClick={() => handleLockUser(user.id, user.status)}
      className={`px-2 py-1 ${user.status === 'locked' ? 'bg-gray-500' : 'bg-yellow-500'} text-white rounded ml-2`}
    >
      {user.status === 'locked' ? 'Unlock' : 'Lock'}
    </button>
  )}
</td>


            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1} className="px-3 py-1 bg-gray-300 rounded">
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={users.length < itemsPerPage} className="px-3 py-1 bg-gray-300 rounded">
          Next
        </button>
      </div>
    </div>
  );
}
