'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth, type UpdatePassword } from '@/hooks/auth'
import { Transition } from '@headlessui/react'
import { useEffect, useRef, useState, type FormEventHandler } from 'react'
export default function UpdatePasswordForm({
    className = '',
}: {
    className?: string
}) {
    const { updatePassword } = useAuth({ middleware: 'auth' })
    const passwordInput = useRef<HTMLInputElement>(null)
    const currentPasswordInput = useRef<HTMLInputElement>(null)
    const [currentPassword, setCurrentPassword] = useState('')
    const [errors, setErrors] = useState<UpdatePassword | string[]>([])
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [recentlySuccessful, setRecentlySuccessful] = useState(false)
    const submitForm: FormEventHandler = event => {
        event.preventDefault()
        setLoading(true)
        updatePassword({
            current_password: currentPassword,
            onError: () => {
                if (!Array.isArray(errors) && errors.password) {
                    setPassword('')
                    setPasswordConfirmation('')
                    passwordInput.current?.focus()
                }
                if (!Array.isArray(errors) && errors.current_password) {
                    setCurrentPassword('')
                    currentPasswordInput.current?.focus()
                }
            },
            onSuccess: () => {
                setRecentlySuccessful(true)
                setCurrentPassword('')
                setPassword('')
                setPasswordConfirmation('')
            },
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }
    useEffect(() => {
        if (recentlySuccessful) {
            setTimeout(() => {
                setLoading(false)
                setRecentlySuccessful(false)
            }, 2000)
        }
    }, [recentlySuccessful])
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Update Password
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>
            <form className="mt-6 space-y-6" onSubmit={submitForm}>
                <div>
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input
                        autoComplete="current-password"
                        className="mt-1 block w-full"
                        id="current_password"
                        onChange={event =>
                            setCurrentPassword(event.target.value)
                        }
                        ref={currentPasswordInput}
                        type="password"
                        value={currentPassword}
                    />
                    <InputError
                        className="mt-2"
                        messages={
                            Array.isArray(errors)
                                ? errors
                                : errors.current_password
                        }
                    />
                </div>
                <div>
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        autoComplete="new-password"
                        className="mt-1 block w-full"
                        id="password"
                        onChange={event => setPassword(event.target.value)}
                        ref={passwordInput}
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
                <div>
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>
                    <Input
                        autoComplete="new-password"
                        className="mt-1 block w-full"
                        id="password_confirmation"
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
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
                <div className="flex items-center gap-4">
                    <Button disabled={loading}>Save</Button>
                    <Transition
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                        show={recentlySuccessful}
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}
