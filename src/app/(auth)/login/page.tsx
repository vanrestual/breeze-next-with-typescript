'use client'
import SessionStatus from '@/app/(auth)/SessionStatus'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth, type Login } from '@/hooks/auth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
    Suspense,
    useEffect,
    useState,
    type Dispatch,
    type FormEventHandler,
    type SetStateAction,
} from 'react'

function Status({
    errors,
    setStatus,
    status,
}: {
    errors: Login | string[]
    setStatus: Dispatch<SetStateAction<string | null>>
    status: string | null
}) {
    const searchParams = useSearchParams()

    useEffect(() => {
        const reset = searchParams.get('reset')
        if (
            reset &&
            reset.length > 0 &&
            Array.isArray(errors) &&
            errors.length === 0
        ) {
            console.log(reset)
            console.log(atob(reset))
            setStatus(atob(reset))
        } else {
            setStatus(null)
        }
    }, [errors, searchParams, setStatus])
    return <SessionStatus className="mb-4" status={status} />
}

export default function Login() {
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState<Login | string[]>([])
    const [status, setStatus] = useState<string | null>(null)
    const submitForm: FormEventHandler<HTMLFormElement> = async event => {
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
        <>
            <Suspense>
                <Status errors={errors} status={status} setStatus={setStatus} />
            </Suspense>
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
                        id="password"
                        type="password"
                        value={password}
                        className="mt-1 block w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <InputError
                        className="mt-2"
                        messages={
                            Array.isArray(errors) ? errors : errors.password
                        }
                    />
                </div>
                <div className="mt-4 block">
                    <div className="flex items-center">
                        <Checkbox
                            id="remember_me"
                            name="remember"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />
                        <label
                            className="ms-2 text-sm text-gray-600 dark:text-gray-400"
                            htmlFor="remember_me"
                        >
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Link
                        className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        href="/forgot-password"
                    >
                        Forgot your password?
                    </Link>
                    <Button className="ms-4" type="submit">
                        Login
                    </Button>
                </div>
            </form>
        </>
    )
}
