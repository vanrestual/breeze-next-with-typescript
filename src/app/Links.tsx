'use client'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'

export default function Links() {
    const { user } = useAuth({ middleware: 'guest' })
    return (
        <div className="fixed right-0 top-0 hidden px-6 py-4 sm:block">
            {user ? (
                <Link
                    className="ms-4 text-sm text-gray-700 underline dark:text-gray-300"
                    href="/dashboard"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        className="text-sm text-gray-700 underline dark:text-gray-300"
                        href="/login"
                    >
                        Login
                    </Link>
                    <Link
                        className="ms-4 text-sm text-gray-700 underline dark:text-gray-300"
                        href="/register"
                    >
                        Register
                    </Link>
                </>
            )}
        </div>
    )
}
