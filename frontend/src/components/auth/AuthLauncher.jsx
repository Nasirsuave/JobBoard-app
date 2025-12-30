import React from 'react'
import LoginRoleSelector from './LoginRoleSelector'
import { useAuth } from '@/context/AuthProvider';


export default function AuthLauncher() {
    const { isAuthenticated } = useAuth();

  return (
    <div className='fixed top-2 right-2'>
      {!isAuthenticated && <LoginRoleSelector /> }
    </div>
  )
}
