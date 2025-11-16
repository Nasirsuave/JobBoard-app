import React from 'react'
import LandingLeftPane from './LandingLeftPane';
import LandingRightPane from './LandingRightPane';

export default function LandingLayout() {
 const userTypes = [
    {
      title: "Job Seeker",
      description: "looking for jobs and opportunities",
      icon: "👤",
      link: "/register/jobseeker",
    },
    {
      title: "Employer",
      description: "ready to post job openings",
      icon: "🏢",
      link: "/register/employer",
    },
    {
      title: "Admin",
      description: "manage users and job listings",
      icon: "🛠️",
      link: "/admin",
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center  py-20">
      <div className="flex w-11/12 max-w-6xl rounded-3xl bg-[#FDF6EE] overflow-hidden shadow-lg p-[1rem]">
        
        {/* Left Section */}
      <LandingLeftPane />

        {/* Right Section */}
       <LandingRightPane userTypes={userTypes} />

      </div>
    </div>
  );
}
