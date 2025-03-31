import '@/app/globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

const geistMono = Geist({
    subsets: ['latin'],
    variable: '--font-geist-mono',
})

const geistSans = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-sans',
})

export const metadata: Metadata = {
    description: 'Laravel description',
    title: 'Laravel',
}

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    )
}
