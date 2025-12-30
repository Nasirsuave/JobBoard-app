import React, { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import MultiStepContainer from "../registration/MultiStepContainer"
import RenderDynamicField from "../registration/RenderDynamicField"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

export default function EmployerMultiStepRegistrationForm() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({
    company_name: "",
    company_email: "",
    password: "",
    confirmPassword: "",
    contact_person_name: "",
    company_website: "",
    phone: "",
    company_logo: null,
    company_description: "",
    location: "",
  })
  const [errors, setErrors] = useState({})
  const logoRef = useRef(null)

  const steps = [
    {
      title: "Company",
      fields: [
        { name: "company_name", label: "Company Name", required: true, type: "text" },
        { name: "company_email", label: "Company Email", required: true, type: "email" },
        { name: "password", label: "Password", required: true, type: "password" },
      ],
    },
    {
      title: "Credentials",
      fields: [
        { name: "confirmPassword", label: "Confirm Password", required: true, type: "password" },
        { name: "contact_person_name", label: "Contact Person Name", required: true, type: "text" },
        { name: "company_website", label: "Company Website", required: false, type: "url" },
      ],
    },
    {
      title: "Details",
      fields: [
        { name: "phone", label: "Phone Number", required: false, type: "text" },
        { name: "company_logo", label: "Company Logo", required: false, type: "file" },
        { name: "location", label: "Location", required: false, type: "text" },
      ],
    },
    {
      title: "About",
      fields: [
        { name: "company_description", label: "Company Description", required: false, type: "textarea" },
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
        if (!v || (field.type === "file" && !values.companyLogo)) {
          nextErrors[field.name] = `${field.label} is required`
          continue
        }
      }

      if (field.name === "companyEmail" && v) {
        if (!emailRegex.test(v)) nextErrors.companyEmail = "Enter a valid email"
      }

      if (field.name === "password" && v) {
        if (v.length < 8) nextErrors.password = "Password must be at least 8 characters"
      }

      if (field.name === "confirmPassword") {
        if (v !== values.password) nextErrors.confirmPassword = "Passwords do not match"
      }

      if (field.name === "companyWebsite" && v) {
        if (!urlRegex.test(v)) nextErrors.companyWebsite = "Enter a valid URL (e.g., https://example.com)"
      }

      if (field.name === "companyLogo" && values.companyLogo) {
        const allowed = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"]
        if (!allowed.includes(values.companyLogo.type)) nextErrors.companyLogo = "Logo must be PNG, JPG, GIF, or SVG"
      }
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }))
    return Object.keys(nextErrors).length === 0
  }

  function handleNext(e) {
    e.preventDefault()
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, steps.length - 1))
    }
  }

  function handlePrev(e) {
    e.preventDefault()
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    // validate final step
    if (!validateStep(step)) return

    const formData = new FormData()
    
    Object.entries(values).forEach(([key, val]) => {
    if (val !== null && val !== "") {
        formData.append(key, val)
    }
  })

   try {
    const res = await fetch("http://127.0.0.1:8000/api/register/employer/", {
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


 
    // Prepare payload
    // const payload = { ...values }

    // For demo: print to console. Replace with API call.
    // console.log("Submitting employer registration:", payload)
    // alert("Employer registration submitted (check console)")
  

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Employer Register - {steps[step].title}</h2>
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === step ? "bg-[#7B294E]" : "bg-gray-200"}`}
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
                    inputRef={logoRef}
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
            {step < steps.length - 1 ? (
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
