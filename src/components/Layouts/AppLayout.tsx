import type { FC, PropsWithChildren, ReactElement } from 'react'
import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'

interface AppLayoutProps {
    header: ReactElement
}

const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({
    header,
    children,
}) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
