'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth, type Register } from '@/hooks/auth'
import Link from 'next/link'
import { useState, type FormEventHandler } from 'react'

export default function Register() {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState<Register | string[]>([])
    const submitForm: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault()
        register({
            email,
            name,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }
    return (
        <form onSubmit={submitForm}>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    autoFocus
                    className="mt-1 block w-full"
                    id="name"
                    onChange={event => setName(event.target.value)}
                    required
                    type="text"
                    value={name}
                />
                <InputError
                    className="mt-2"
                    messages={Array.isArray(errors) ? errors : errors.name}
                />
            </div>
            <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
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
                    autoComplete="new-password"
                    className="mt-1 block w-full"
                    id="password"
                    onChange={event => setPassword(event.target.value)}
                    required
                    type="password"
                    value={password}
                />
                <InputError
                    className="mt-2"
                    messages={Array.isArray(errors) ? errors : errors.password}
                />
            </div>
            <div className="mt-4">
                <Label htmlFor="passwordConfirmation">Confirm Password</Label>
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
                <Link
                    className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    href="/login"
                >
                    Already registered?
                </Link>
                <Button className="ms-4" type="submit">
                    Register
                </Button>
            </div>
        </form>
    )
}
