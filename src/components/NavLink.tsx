import clsx from 'clsx'
import Link, { type LinkProps } from 'next/link'
import type { PropsWithChildren } from 'react'

export default function NavLink({
    active = false,
    className,
    ...props
}: PropsWithChildren<LinkProps & { active: boolean; className?: string }>) {
    return (
        <Link
            className={clsx(
                className,
                active
                    ? 'border-indigo-400 text-gray-900 focus:border-indigo-700 dark:border-indigo-600 dark:text-gray-100 dark:focus:border-indigo-300'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300',
                'focus:outline-hidden inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out',
            )}
            {...props}
        />
    )
}
