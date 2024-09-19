'use client'
import SessionStatus from '@/app/(auth)/SessionStatus'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useState, type FormEventHandler } from 'react'

export default function ForgotPassword() {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<{ email: string } | string[]>([])
    const [status, setStatus] = useState<string | null>(null)
    const submitForm: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault()
        forgotPassword({ email, setErrors, setStatus })
    }
    return (
        <>
            <SessionStatus className="mb-4" status={status} />
            <div className="mb-4 text-justify text-sm text-gray-600 dark:text-gray-400">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>
            <form onSubmit={submitForm}>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        autoFocus
                        className="mt-1 block w-full"
                        id="email"
                        name="email"
                        onChange={event => setEmail(event.target.value)}
                        required
                        type="email"
                        value={email}
                    />
                    <InputError
                        className="mt-2"
                        messages={Array.isArray(errors) ? errors : errors.email}
                    />
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Button type="submit">Email Password Reset Link</Button>
                </div>
            </form>
        </>
    )
}
