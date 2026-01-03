import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, User, FileText, Briefcase, ClipboardList } from "lucide-react";

//bg-[#d7c7b6]
//bg-[#ecdfd1]
//bg-[#ecdfd1]

const navbar  = [
  { name: 'Dashboard', path: '/dashboard', icon:Home },
  { name: 'Profile', path: '/profile' ,icon:User},
  { name: 'Resume', path: '/resume', icon:FileText },
  { name: 'Jobs', path: '/jobs', icon:Briefcase },
  { name: 'Applications', path: '/application', icon:ClipboardList },
]

export default function Sidebar() {
      //`bg-gradient-to-br from-[#FDF6EE] to-gray-100`

  return (
    <aside className='min-h-screen z-10  w-64 fixed  bg-gradient-to-br from-[#FDF6EE] to-gray-100'>
      <nav className='mt-20'>
        <ul className='flex flex-col p-4 space-y-4'>
          { 
          navbar.map((item) => (
            <li key={item.name} >   
              {/* <div className='flex items-center gap-2 text-sm font-medium hover:bg-[#faf0e5] px-3 py-2 rounded-md cursor-pointer'>
                <item.icon className='ml-2 text-gray-700 hover:text-[#7B294E]' size={16}/>
                <span>{item.name}</span>
              </div> */}
              <NavLink
                  to={item.path} // make sure each item in navbar has a path property
                  className={(
                    { isActive }) =>
                    `flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md cursor-pointer
                    ${isActive ? 'bg-[#ecdfd1] text-[#7B294E]' : 'text-gray-700 hover:bg-[#faf0e5] hover:text-[#7B294E]'}`
                  }
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
              </NavLink>
            </li>
          ))
          }
        </ul>
      </nav>
    </aside>
  )
}
