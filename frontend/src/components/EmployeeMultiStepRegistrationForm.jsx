import React, { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EmployeeMultiStepRegistrationForm() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        { name: "fullName", label: "Full Name", required: true, type: "text" },
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

  function handleSubmit(e) {
    e.preventDefault()
    // validate final step
    if (!validateStep(step)) return

    // Prepare payload
    const payload = { ...values }
    if (values.skills) payload.skills = values.skills.split(",").map((s) => s.trim()).filter(Boolean)

    // For demo: print to console. Replace with API call.
    console.log("Submitting registration:", payload)
    alert("Registration submitted (check console)")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Register - {steps[step].title}</h2>
          <div className="flex gap-2">
            {steps.map((_, i) => ( //In this case, we don’t actually need the step object itself — we only care about the index (i), so we use _
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === step ? "bg-primary" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${steps.length * 100}%`, transform: `translateX(-${step * (100 / steps.length)}%)` }}
          >
            {steps.map((s, idx) => (
              <div key={s.title} className="w-full pr-4"> {/* w-full and min-w-full refer to the flex container’s width of the visible parent (50px).NOT the entire scrollable track (150px). */ }
                <div className="grid grid-cols-1 gap-4">


                  {s.fields.map((field) => {
                    const name = field.name
                    const val = values[name]
                    return (
                      <div key={name} className="w-full ">
                        <Label htmlFor={name}>{field.label}{field.required ? " *" : ""}</Label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={name}
                            value={val}
                            onChange={(e) => setValue(name, e.target.value)}
                            className="w-full rounded-md border px-3 py-2 resize-vertical"
                            rows={3}
                          />
                        ) : field.type === "select" ? (
                          <select
                            id={name}
                            value={val}
                            onChange={(e) => setValue(name, e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                          >
                            <option value="">Select experience</option>
                            <option value="entry">Entry</option>
                            <option value="mid">Mid</option>
                            <option value="senior">Senior</option>
                          </select>
                        ) : field.type === "file" ? (
                          <Input
                            id={name}
                            type="file"
                            ref={resumeRef}
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setValue("resume", e.target.files[0] || null)}
                          />
                        ) : (
                          <Input
                            id={name}
                            type={field.type}
                            value={val}
                            onChange={(e) => setValue(name, e.target.value)}
                          />
                        )}

                        {errors[name] && (
                          <p className="mt-1 text-sm text-destructive">{errors[name]}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            {step > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrev} className="mr-2">Previous</Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {step < steps.length - 1  ? (
              <Button type="button" onClick={handleNext}>Next</Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
