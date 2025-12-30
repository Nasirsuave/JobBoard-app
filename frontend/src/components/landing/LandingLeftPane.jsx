import React from 'react'

export default function LandingLeftPane() {
  return (
      <div className="w-1/2 bg-[#7B294E] text-white p-10 flex flex-col justify-between rounded-md">
          <div>
            <h1 className="text-3xl font-bold mb-4">Welcome to JobBoard!</h1>
            <p className="text-sm leading-relaxed">
              We're thrilled to have you here. Whether you’re a job seeker searching 
              for your next opportunity or an employer ready to hire top talent, 
              JobBoard makes recruitment easy and rewarding.
            </p>
          </div>
          <img
            src="/jobboard_logo.webp"
            alt="Job Seekers"
            className="rounded-xl mt-6"
          />
          <div className="flex justify-center space-x-2 mt-4">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>
  )
}
