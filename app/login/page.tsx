"use client"

import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/template/login-form"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Login() {
    const router = useRouter()
    const [error, setError] = useState<boolean>(false)

    const handleLogin = async (payload: { email: string; password: string }) => {
        try {
            const res = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const err = await res.text()
                console.error("Login failed:", err)
                setError(true)
                return
            }

            const data = await res.json()
            setError(false)
            document.cookie = `idGoalsUser=${data.idUser}; path=/`
            console.log("login success:", data)
            router.push('/')
        } catch (error) {
            setError(true)
            console.error("Login error:", error)
        }
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm onLogin={handleLogin} />
                {error && (
                    <div className="mt-4">
                        <Alert variant="destructive">
                            <AlertTitle>Erro ao fazer login.</AlertTitle>
                            <AlertDescription>
                                <p>Por favor, verifique suas credenciais e tente novamente.</p>
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>
        </div>
    )
}