import React from 'react'
import LogoutButton from '../auth/LogoutButton'
import { Briefcase,Search } from "lucide-react";
import { Input } from '../ui/input';

//px-6 py-4 

export default function Header() {
  return (
    <header className='h-15 w-full border-b  fixed z-50'>
        <div className='flex items-center justify-between px-6 py-4'> 
           <div className='flex items-center'>
             <Briefcase className='text-[#7B294E]'/>
            <span className='font-semibold text-[#7B294E] tracking-tight text-sm ml-2'>JOBBOARD</span>
           </div>

           <div className='flex items-center relative w-150  '>
            
               <Input
                type="text"
                placeholder="Search"
                className="w-full bg-gradient-to-br from-[#FDF6EE] to-gray-100  border-gray-300 focus:outline-none focus:ring-0 "
                />
                <Search className='text-gray-500 ml-[-30px] absolute top-2 right-2' size={20}/>
         
           </div>

           <div className=' '>
            <LogoutButton />   
            </div>
        </div>



        
    </header>
  )
}
