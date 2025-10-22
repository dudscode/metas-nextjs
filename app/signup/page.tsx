"use client"

import { useRouter } from "next/navigation"
import { SignupForm } from "@/components/template/signup-form"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
export default function Page() {
  const router = useRouter()
  const [error, setError] = useState<boolean>(false)

  const handleSignup = async (payload: { name: string; email: string; password: string; }) => {
    try {
      const res = await fetch("http://localhost:8080/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error("Signup failed:", err)
        setError(true)
        return
      }

      console.log("signup success:")
      setError(false)
      router.push('/login') 
    } catch (error) {
      console.error("Signup error:", error)
      setError(true)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm onSignup={handleSignup} />
        {error && (
        <div className="mt-4">
          <Alert variant="destructive">
            <AlertTitle>Erro ao criar conta.</AlertTitle>
            <AlertDescription>
              <p>Por favor,  tente novamente mais tarde.</p>
              
            </AlertDescription>
          </Alert>
        </div>
        )}
      </div>
    </div>
  )
}
