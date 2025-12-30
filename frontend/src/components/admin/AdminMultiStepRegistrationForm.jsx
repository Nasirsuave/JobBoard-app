
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AdminMultiStepRegistrationForm() {
  const [values, setValues] = useState({
    emailUsername: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  function setValue(name, val) {
    setValues((prev) => ({ ...prev, [name]: val }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  function validateForm() {
    const nextErrors = {}

    // Email/Username validation
    if (!values.emailUsername) {
      nextErrors.emailUsername = "Email or Username is required"
    } else if (emailRegex.test(values.emailUsername) === false && values.emailUsername.length < 3) {
      nextErrors.emailUsername = "Enter a valid email or username (min 3 characters)"
    }

    // Password validation
    if (!values.password) {
      nextErrors.password = "Password is required"
    } else if (values.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters"
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validateForm()) return

    const payload = { ...values }
    console.log("Submitting admin registration:", payload)
    alert("Admin registration submitted (check console)")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-md">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Admin Registration</h2>
          <p className="text-sm text-gray-600 mt-2">Create your admin account</p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="emailUsername" className="text-gray-700 font-medium">
              Email or Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="emailUsername"
              type="text"
              value={values.emailUsername}
              onChange={(e) => setValue("emailUsername", e.target.value)}
              placeholder="admin@jobboard.com or username"
              className="mt-2"
            />
            {errors.emailUsername && (
              <p className="mt-2 text-sm text-red-500">{errors.emailUsername}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              value={values.password}
              onChange={(e) => setValue("password", e.target.value)}
              placeholder="Enter a strong password"
              className="mt-2"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-8">
          <Button type="submit" className="px-6">
            Create Admin Account
          </Button>
        </div>
      </div>
    </form>
  )
}
