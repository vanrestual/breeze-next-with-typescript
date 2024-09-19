import Navigation from '@/app/(app)/Navigation'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: Readonly<PropsWithChildren>) {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <Navigation />
            <main>{children}</main>
        </div>
    )
}
