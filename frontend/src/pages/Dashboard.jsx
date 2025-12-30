import React from 'react';
import { useAuth } from '@/context/AuthProvider';
import LogoutButton from '@/components/auth/LogoutButton';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF6EE] to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1 capitalize">Welcome, {user?.role}</p>
          </div>
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hello, you're authenticated! 🎉
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Welcome <span className="font-semibold text-[#7B294E]">{user?.email}</span>
          </p>
          <p className="text-gray-500">
            You are logged in as: <span className="font-bold text-[#7B294E]">{user?.role?.toUpperCase()}</span>
          </p>

          {/* User Info Card */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-medium text-gray-900 capitalize">{user?.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-medium text-gray-900">{user?.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
