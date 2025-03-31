import Header from '@/app/(app)/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard',
}

export default function Dashboard() {
    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="shadow-xs overflow-hidden bg-white dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You&apos;re logged in!
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
