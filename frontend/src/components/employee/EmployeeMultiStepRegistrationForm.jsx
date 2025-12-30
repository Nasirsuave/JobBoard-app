import React, { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import MultiStepContainer from "../registration/MultiStepContainer"
import RenderDynamicField from "../registration/RenderDynamicField"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EmployeeMultiStepRegistrationForm() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    phone: "",
    resume: null,
    skills: "",
    experience: "",
    location: "",
  })

  const [errors, setErrors] = useState({})
  const resumeRef = useRef(null)

  const steps = [
    {
      title: "Account",
      fields: [
        { name: "full_name", label: "Full Name", required: true, type: "text" },
        { name: "email", label: "Email", required: true, type: "email" },
        { name: "password", label: "Password", required: true, type: "password" },
      ],
    },
    {
      title: "Profile",
      fields: [
        { name: "confirmPassword", label: "Confirm Password", required: true, type: "password" },
        { name: "phone", label: "Phone Number", required: false, type: "text" },
        { name: "resume", label: "Resume Upload", required: false, type: "file" },
      ],
    },
    {
      title: "Details",
      fields: [
        { name: "skills", label: "Skills (comma separated)", required: false, type: "textarea" },
        { name: "experience", label: "Experience Level", required: false, type: "select" },
        { name: "location", label: "Location", required: false, type: "text" },
      ],
    },
  ]

  function setValue(name, val) {
    setValues((prev) => ({ ...prev, [name]: val }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  function validateStep(currentStep) {
    const s = steps[currentStep]
    const nextErrors = {}

    for (const field of s.fields) {
      const v = values[field.name]
      if (field.required) {
        if (!v || (field.type === "file" && !values.resume)) {
          nextErrors[field.name] = `${field.label} is required`
          continue
        }
      }

      if (field.name === "email" && v) {
        if (!emailRegex.test(v)) nextErrors.email = "Enter a valid email"
      }

      if (field.name === "password" && v) {
        if (v.length < 8) nextErrors.password = "Password must be at least 8 characters"
      } 

      if (field.name === "confirmPassword") {
        if (v !== values.password) nextErrors.confirmPassword = "Passwords do not match"
      }

      if (field.name === "resume" && values.resume) {
        const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        if (!allowed.includes(values.resume.type)) nextErrors.resume = "Resume must be PDF or DOC/DOCX"
      }
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }))
    return Object.keys(nextErrors).length === 0
  }

  function handleNext(e) {
    e.preventDefault();
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, steps.length - 1))
    }
  }

  function handlePrev(e) {
    e.preventDefault();
    setStep((s) => Math.max(s - 1, 0))
  }

  // function handleSubmit(e) {
  //   e.preventDefault()
  //   // validate final step
  //   if (!validateStep(step)) return

  //   // Prepare payload
  //   const payload = { ...values }
  //   if (values.skills) payload.skills = values.skills.split(",").map((s) => s.trim()).filter(Boolean)

  //   // For demo: print to console. Replace with API call.
  //   console.log("Submitting registration:", payload)
  //   alert("Registration submitted (check console)")
  // }



  async function handleSubmit(e) {
  e.preventDefault()

  if (!validateStep(step)) return

  const formData = new FormData()

  Object.entries(values).forEach(([key, val]) => {
    if (val !== null && val !== "") {
      if (key === "skills" && typeof val === "string") {
        val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((skill) => formData.append("skills", skill))
      } else {
        formData.append(key, val)
      }
    }
  })

  try {
    const res = await fetch("http://127.0.0.1:8000/api/register/employee/", {
      method: "POST",
      body: formData, // DO NOT set Content-Type manually
    })

    if (!res.ok) {
      const err = await res.json()
      console.error(err)
      alert("Registration failed")
      return
    }

    const data = await res.json()
    console.log("Success:", data)
    alert("Registration successful!")
  } catch (err) {
    console.error("Network error:", err)
    alert("Network error")
  }
}



  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto "> 
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Register - {steps[step].title}</h2>
          <div className="flex gap-2">
            {steps.map((_, i) => ( //In this case, we don’t actually need the step object itself — we only care about the index (i), so we use _
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-300  ${i === step ? "bg-[#7B294E]" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>

    <MultiStepContainer
      step={step}
      steps={steps}
      renderFields={(fields) => 
        fields.map((field) => (
          <RenderDynamicField
            key={field.name}
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={(name, val) => setValue(name, val)}
            inputRef={resumeRef}
          />
        ))
      }
    />


        <div className="flex items-center justify-between mt-6">
          <div>
            {step > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrev} className="mr-2">Previous</Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {step < steps.length - 1  ? (
              <Button type="button" onClick={handleNext} className="bg-[#7B294E] hover:bg-[#7B294E] hover:opacity-90 hover:transition-opacity duration-300 ease-in-out ">Next</Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
