'use client'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

export default function VerifyEmail() {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })
    const [status, setStatus] = useState<string | null>(null)
    return (
        <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn&apos;t receive the email, we will gladly send
                you another.
            </div>
            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-500">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}
            <div className="mt-4 flex items-center justify-between">
                <Button
                    onClick={() => resendEmailVerification({ setStatus })}
                    type="submit"
                >
                    Resend Verification Email
                </Button>
                <button
                    className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    onClick={logout}
                    type="button"
                >
                    Logout
                </button>
            </div>
        </>
    )
}
