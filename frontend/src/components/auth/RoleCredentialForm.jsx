import React, { useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {X} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function RoleCredentialForm({ selectedRole, isVisible, isPreview = false, onClose, isOpen }) {
    const navigate = useNavigate();


  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
   
    // try {
    //   // Call login from AuthProvider
    //   const result = login(formData.email, formData.password, selectedRole);
      
    //   if (result.success) {
    //     // Redirect to dashboard on successful login
    //     window.location.href = '/dashboard';
    //   } else {
    //     setError('Login failed. Please try again.');
    //   }
    // } catch (err) {
    //   setError(err.message || 'An error occurred during login');
    // } finally {
    //   setLoading(false);
    // }

    
      // Call login from AuthProvider
      try{
      const result = await login(formData.email, formData.password, selectedRole);
      
      if (result.success) {
        // Redirect to dashboard on successful login
        navigate('/dashboard'); 
      } else {
        setError('Login failed. Please try again.');
      }
    }catch(error){
        console.error("Login error:", error);
    }finally{
        setLoading(false);
    }
    
    
      
    
   
  };

  const getRoleData = () => {
    const roleConfigs = {
      admin: {
        label: 'Admin Login',
        placeholder: 'Enter admin email',
        icon: '🛠️',
      },
      employee: {
        label: 'Employee Login',
        placeholder: 'Enter your email',
        icon: '👤',
      },
      employer: {
        label: 'Employer Login',
        placeholder: 'Enter company email',
        icon: '🏢',
      },
    };
    return roleConfigs[selectedRole] || roleConfigs.employee;
  };

  const roleData = getRoleData();

  if (!isVisible || !selectedRole) {
    return null;
  }

//top-0 right-40
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[300px] max-h-[400px] z-60 rounded-md border border-solid ">
      <div className={"bg-white border-t border-gray-200 px-6 py-6  rounded-md shadow-lg" + (isPreview ? 'opacity-90 pointer-events-none' : '')}>
        {/* Form Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{roleData.icon}</span>
            <h4 className="text-lg font-semibold text-gray-900">{roleData.label}</h4>
          </div>
          <p className="text-sm text-gray-600">Enter your credentials to login</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={roleData.placeholder}
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isPreview}
              className="w-full border-gray-300 focus:border-[#7B294E] focus:ring-[#7B294E]"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isPreview}
              className="w-full border-gray-300 focus:border-[#7B294E] focus:ring-[#7B294E]"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-[#7B294E] hover:text-[#A35176] font-medium transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#7B294E] hover:bg-[#A35176] text-white font-semibold py-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPreview || loading}
          >
            {loading ? 'Logging in...' : `Login as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
          </Button>
        </form>

        {/* Signup Link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="#" className="text-[#7B294E] hover:text-[#A35176] font-semibold transition-colors">
            Sign up here
          </a>
        </div>
      </div>
      {isPreview && (
        <div className="text-center mt-2 text-sm text-gray-500">Preview — hover to view. Click the role to open the login form.</div>
      )}
      {!isPreview && onClose && (
        <div className="absolute top-5 right-2">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  )
};
  

