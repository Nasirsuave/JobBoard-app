import React from 'react';
import { useAuth } from '@/context/AuthProvider';
import LogoutButton from '@/components/auth/LogoutButton';

export default function Dashboard() {
  const { user } = useAuth();

  //bg-gradient-to-br from-[#FDF6EE] to-gray-100
  return (
    <div className="min-h-screen ">
      <p>Hello Dashboard page</p>
    </div>
  );
}
