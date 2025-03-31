import ApplicationLogo from '@/components/ApplicationLogo'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: Readonly<PropsWithChildren>) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 antialiased dark:bg-gray-900 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500 dark:text-gray-400" />
                </Link>
            </div>
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md dark:bg-gray-800 dark:shadow-white/5 sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    )
}
