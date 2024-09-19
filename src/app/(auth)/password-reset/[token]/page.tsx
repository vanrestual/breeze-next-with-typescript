'use client'
import SessionStatus from '@/app/(auth)/SessionStatus'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth, type ResetPassword } from '@/hooks/auth'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, type FormEventHandler } from 'react'

export default function PasswordReset() {
    const { resetPassword } = useAuth({ middleware: 'guest' })
    const searchParams = useSearchParams()
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<ResetPassword | string[]>([])
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [status, setStatus] = useState<string | null>(null)
    const submitForm: FormEventHandler = event => {
        event.preventDefault()
        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }
    useEffect(() => {
        setEmail(searchParams.get('email') || '')
    }, [searchParams])
    return (
        <>
            <SessionStatus className="mb-4" status={status} />
            <form onSubmit={submitForm}>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        autoFocus
                        className="mt-1 block w-full"
                        id="email"
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
                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        className="mt-1 block w-full"
                        id="password"
                        onChange={event => setPassword(event.target.value)}
                        required
                        type="password"
                        value={password}
                    />
                    <InputError
                        className="mt-2"
                        messages={
                            Array.isArray(errors) ? errors : errors.password
                        }
                    />
                </div>
                <div className="mt-4">
                    <Label htmlFor="passwordConfirmation">
                        Confirm Password
                    </Label>
                    <Input
                        className="mt-1 block w-full"
                        id="passwordConfirmation"
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        required
                        type="password"
                        value={passwordConfirmation}
                    />
                    <InputError
                        className="mt-2"
                        messages={
                            Array.isArray(errors)
                                ? errors
                                : errors.password_confirmation
                        }
                    />
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Button type="submit">Reset Password</Button>
                </div>
            </form>
        </>
    )
}
