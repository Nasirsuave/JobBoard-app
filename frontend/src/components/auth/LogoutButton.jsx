import React from 'react';
import { useAuth } from '@/context/AuthProvider';
import { Button } from '../ui/button';

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="bg-red-600 hover:bg-red-700 text-white font-semibold"
    >
      Logout
    </Button>
  );
}
