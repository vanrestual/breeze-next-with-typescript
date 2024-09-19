import '@/app/globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const geistMono = localFont({
    src: '../assets/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

const geistSans = localFont({
    src: '../assets/fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Laravel',
    description: 'Laravel description',
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
