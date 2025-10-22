"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SignupPayload {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type SignupFormProps = Omit<React.ComponentProps<typeof Card>, "onSubmit"> & {
  onSignup?: (payload: SignupPayload) => void | Promise<void>
}

export function SignupForm({ onSignup, ...props }: SignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload: SignupPayload = { name, email, password, confirmPassword }
    setIsSubmitting(true)
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      setIsSubmitting(false)
      return
    }
    setError(null)
    try {
      if (onSignup) {
        await onSignup(payload)
      } else {
        console.log("signup payload:", payload)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie uma conta</CardTitle>
        <CardDescription>
          Insira suas informações abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FieldDescription>
                Usaremos isso para entrar em contato com você. Não compartilharemos seu e-mail
                com mais ninguém.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FieldDescription>Deve ter pelo menos 8 caracteres.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirmar Senha</FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Criando..." : "Criar Conta"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Já tem uma conta? <a href="/login">Entrar</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
        
      </CardContent>
    </Card>

    
      {error && (
        <div className="mt-4">
          <Alert variant="destructive">
            <AlertTitle>Erro ao criar conta.</AlertTitle>
            <AlertDescription>
              <p>Por favor, verifique suas informações e tente novamente.</p>
              <p><strong>{error}</strong></p>
            </AlertDescription>
          </Alert>
        </div>
        )}
    </div>
  )
}
