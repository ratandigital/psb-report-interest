// components/UserMenu.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle the logout process
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'GET' });

      if (res.ok) {
        // After logging out, redirect to the home page
        setMessage('Logged out successfully');
        router.push('/');
      } else {
        setMessage('Logout failed, please try again');
      }
    } catch (error) {
      setMessage('Logout failed, please try again');
    }
  };

  return (
    <div className="relative">
      {/* User Profile Icon */}
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
      >
        <img
          src="../photo-1472099645785-5658abf4ff4e.avif" // Replace with your image
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <span>User Area</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2">
            <a
              href="#profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Profile
            </a>
            <a
              href="/password-reset"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Reset Password
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Log out
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {message && (
        <div className="mt-2 text-center text-green-500">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
