import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/lib/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();
    if (token && storedUser) {
      setUserState(storedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const  login = async (email, password, role) => {
    // TODO: Replace with actual API call
    try{
    const res = await fetch("http://127.0.0.1:8000/api/login/employee/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    }) 

    const data = await res.json();
    console.log("Login response data:", data);

    if (!res.ok) {
      throw new Error(data.detail || "Login failed");
    }


    setToken(data.access);
    setUserState(data.user);
    setUser(data.user);
    setIsAuthenticated(true);

    return { success: true, user: data.user, token: data.access };


    }catch(error){
        console.error("Error trying to send data to API or store user and token",error);
        return {
        success: false,
        error: error.message,
        };
    }    
      };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
