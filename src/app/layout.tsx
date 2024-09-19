import '@/app/globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import type { PropsWithChildren } from 'react'

const nunitoFont = Nunito({ display: 'swap', subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Laravel',
    description: 'Laravel description',
}

export default function Layout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en">
            <body className={nunitoFont.className}>{children}</body>
        </html>
    )
}
