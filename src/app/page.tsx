import Links from '@/app/Links'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Welcome',
}

export default function Home() {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Links />
            <div className="mx-auto max-w-7xl p-6 lg:p-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Next.js Typescript Edition
                </h1>
            </div>
        </div>
    )
}
