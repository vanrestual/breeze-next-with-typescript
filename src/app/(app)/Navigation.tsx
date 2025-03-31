'use client'
import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
    const { logout, user } = useAuth({ middleware: 'auth' })
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    return (
        <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href="/dashboard">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </Link>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                active={pathname === '/dashboard'}
                                href="/dashboard"
                            >
                                Dashboard
                            </NavLink>
                        </div>
                    </div>
                    <div className="hidden sm:ms-6 sm:flex sm:items-center">
                        <Dropdown
                            align="right"
                            trigger={
                                <button
                                    className="focus:outline-hidden flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                    type="button"
                                >
                                    {user && user.name}
                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4 fill-current"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            }
                            width="48"
                        >
                            <Dropdown.Link href="/profile">
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Button onClick={logout}>
                                Logout
                            </Dropdown.Button>
                        </Dropdown>
                    </div>
                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            className="focus:outline-hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 dark:text-gray-500 dark:hover:bg-gray-900/50 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            onClick={() => setOpen(open => !open)}
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className="inline-flex"
                                    d={
                                        open
                                            ? 'M6 18L18 6M6 6l12 12'
                                            : 'M4 6h16M4 12h16M4 18h16'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {open ? (
                <div className="block sm:hidden">
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            active={pathname === '/dashboard'}
                            href="/dashboard"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>
                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="flex items-center">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                    {user?.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                active={pathname === '/profile'}
                                href="/profile"
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavButton onClick={logout}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            ) : null}
        </nav>
    )
}
