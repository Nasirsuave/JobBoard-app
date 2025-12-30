import React,{useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EmployeeMultiStepRegistrationForm from '../employee/EmployeeMultiStepRegistrationForm'
import EmployerMultiStepRegistrationForm from '../employer/EmployerMultiStepRegistrationForm'
import AdminMultiStepRegistrationForm from '../admin/AdminMultiStepRegistrationForm'








export default function LandingRightPane({userTypes}) {
 const [currUser, setCurrUser] = useState(null)

  return (
     <div className="w-1/2 bg-[#FDF6EE] p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Please Select User Type
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            This will enable us to customize your portal to suit your needs.
          </p>

          
          <Dialog>
      <form>
        {userTypes.map((user) => (
          <DialogTrigger asChild>
                <button
                  key={user.title}
                  className="w-full text-left flex items-center gap-3 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition"
                  onClick={()=>setCurrUser(user.title)}
                >
                  <span className="text-3xl">{user.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.title}</h3>
                    <p className="text-sm text-gray-600">{user.description}</p>
                  </div>
                </button>
            </DialogTrigger>
           ))}

        <DialogContent className="sm:max-w-[425px]">
          {/* {currUser === "Job Seeker" ? <EmployeeMultiStepRegistrationForm />:
          currUser === "Employer" ? <EmployerMultiStepRegistrationForm /> : null} */}

            {currUser === "Job Seeker" && <EmployeeMultiStepRegistrationForm />}
           {currUser === "Employer" && <EmployerMultiStepRegistrationForm />}
           {currUser === "Admin" && <AdminMultiStepRegistrationForm />}

        </DialogContent>
      </form>
    </Dialog>

        </div>
  )
}
