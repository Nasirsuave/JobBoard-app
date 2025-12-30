import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import LandingLayout from './components/landing/LandingLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AuthLauncher from './components/auth/AuthLauncher.jsx'
import { useAuth } from '@/context/AuthProvider';


function App() {
    // const { isAuthenticated } = useAuth();
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthLauncher />
        <Routes>
          <Route path="/" element={<LandingLayout />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
