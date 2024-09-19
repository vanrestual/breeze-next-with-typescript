'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth, type UpdateProfileInformation } from '@/hooks/auth'
import { Transition } from '@headlessui/react'
import { useEffect, useState, type FormEventHandler } from 'react'

export default function UpdateProfileInformation({
    className = '',
}: {
    className?: string
}) {
    const { resendEmailVerification, updateProfileInformation, user } = useAuth(
        { middleware: 'auth' },
    )
    const [errors, setErrors] = useState<UpdateProfileInformation | string[]>(
        [],
    )
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [recentlySuccessful, setRecentlySuccessful] = useState(false)
    const [status, setStatus] = useState<string | null>(null)
    const submit: FormEventHandler = e => {
        e.preventDefault()
        setLoading(true)
        updateProfileInformation({
            email,
            name,
            onSuccess: () => setRecentlySuccessful(true),
            setErrors,
        })
    }
    useEffect(() => {
        if (user) {
            setEmail(user.email)
            setName(user.name)
        }
    }, [user])
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
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account&apos;s profile information and email
                    address.
                </p>
            </header>
            <form className="mt-6 space-y-6" onSubmit={submit}>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        autoComplete="name"
                        className="mt-1 block w-full"
                        id="name"
                        isFocused
                        onChange={event => setName(event.target.value)}
                        required
                        value={name}
                    />
                    <InputError
                        className="mt-2"
                        messages={Array.isArray(errors) ? errors : errors.name}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        autoComplete="username"
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
                {user &&
                user.mustVerifyEmail &&
                user.email_verified_at === null ? (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <button
                                className="ms-1 rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                onClick={() =>
                                    resendEmailVerification({ setStatus })
                                }
                                type="submit"
                            >
                                Click here to re-send the verification email.
                            </button>
                        </p>
                        {status === 'verification-link-sent' ? (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        ) : null}
                    </div>
                ) : null}
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
