'use client'


import { useState } from 'react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state for the button

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await fetch('/api/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Your password has been successfully reset');
        setErrorMessage(null);
        // Reset form after successful password reset
        setPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage(result.error || 'Something went wrong');
      }
    } catch (error) {
      setErrorMessage('Failed to reset password');
    } finally {
      setLoading(false); // Set loading to false once the request is completed
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white border rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 mt-1 border rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-2 mt-1 border rounded-md shadow-sm"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-600 text-white rounded-md"
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Loading...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}


