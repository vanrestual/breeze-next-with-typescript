import { useEffect, useState, SyntheticEvent } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GuestLayout from '@/components/Layouts/GuestLayout'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'

const Login: NextPage = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState<{
        email: Array<string>
        password: Array<string>
    }>(
        {} as {
            email: Array<string>
            password: Array<string>
        },
    )
    const [status, setStatus] = useState<string | null>(null)

    useEffect(() => {
        if (
            (router.query.reset?.length as number) > 0 &&
            errors ===
                ({} as {
                    email: Array<string>
                    password: Array<string>
                })
        ) {
            setStatus((window as any).atob(router.query.reset))
        } else {
            setStatus(null)
        }
    }, [router.query.reset, errors])

    const submitForm = async (event: SyntheticEvent) => {
        event.preventDefault()
        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                }
            >
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="mt-1 block w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />
                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="mt-1 block w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="mt-4 block">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center"
                        >
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={event =>
                                    setShouldRemember(event.target.checked)
                                }
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <Link
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                            href="/forgot-password"
                        >
                            Forgot your password?
                        </Link>
                        <Button className="ml-3">Login</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
