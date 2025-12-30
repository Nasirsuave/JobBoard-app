import React, { useState } from 'react';
import { Button } from '../ui/button';
import RoleCredentialForm from './RoleCredentialForm';

export default function LoginRoleSelector() {
    
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);
  const [activeRole, setActiveRole] = useState(null);

  const roles = [
    {
      id: 'admin',
      label: 'Admin',
      icon: '🛠️',
      description: 'Manage platform'
    },
    {
      id: 'employee',
      label: 'Employee',
      icon: '👤',
      description: 'Job seeker'
    },
    {
      id: 'employer',
      label: 'Employer',
      icon: '🏢',
      description: 'Post jobs'
    }
  ];

  const handleRoleSelect = (roleId) => {
    // User clicked a role -> set active and close the sliding panel
    setActiveRole(roleId);
    // setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button - Sticky at bottom */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="default"
        className="font-semibold   bg-[#7B294E] hover:bg-[#A35176]  px-[3rem]"
      >
        Login
      </Button>

      {/* Sliding Panel */}
      <div
      //z-50 opacity-100 opacity-0
        className={`
           fixed top-0 right-0 z-60
          bg-white rounded-b-lg shadow-lg
           overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
        style={{
          width: '300px',
          maxHeight: '400px'
        }}
      >
        {/* Header */}
        <div className="bg-[#7B294E] text-white px-6 py-4">
          <h3 className="text-lg font-semibold">Select Role</h3>
          <p className="text-sm text-blue-100">Choose your login type</p>
        </div>

        {/* Role Options */}
        <div className="divide-y">
          {roles.map((role) => (
            <button
              key={role.id}
              onMouseEnter={() => setHoveredRole(role.id)}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={() => handleRoleSelect(role.id)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{role.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-[#7B294E] transition-colors">
                    {role.label}
                  </p>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Hover preview (non-interactive) */}
       <RoleCredentialForm
         selectedRole={hoveredRole}
         isVisible={!!hoveredRole && !activeRole}  
          isPreview={true} 
        />
        

   
       
      </div>

      {/* Active role form (opens after click) - rendered outside sliding panel */}
      <RoleCredentialForm
        selectedRole={activeRole}
        isVisible={!!activeRole}
        isPreview={false}
        onClose={() => setActiveRole(null)}
      />
      

        {/* Close Button / Footer */}
 
      {/* Backdrop (optional) */}
      {(isOpen || !!activeRole) && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
