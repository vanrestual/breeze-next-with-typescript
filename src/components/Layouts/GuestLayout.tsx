import type { FC, PropsWithChildren } from 'react'
import Head from 'next/head'

const GuestLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Laravel</title>
            </Head>

            <div className="font-sans text-gray-900 antialiased">
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
