import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

export default function Button({
    className,
    disabled,
    scheme = 'primary',
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    scheme?: 'danger' | 'primary' | 'secondary'
}) {
    return (
        <button
            className={clsx(
                className,
                disabled && 'opacity-25',
                scheme === 'danger'
                    ? 'border-red-600 bg-red-600 text-white hover:bg-red-500 focus:ring-red-500 focus:ring-offset-white active:bg-red-700 dark:border-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-600 dark:focus:ring-offset-gray-800 dark:active:bg-red-600'
                    : null,
                scheme === 'primary'
                    ? 'border-gray-700 bg-gray-800 text-white ring-gray-300 hover:bg-gray-700 focus:border-gray-900 focus:bg-gray-700 focus:ring-indigo-500 focus:ring-offset-white active:bg-gray-900 dark:border-gray-300 dark:bg-white dark:text-gray-800 dark:shadow-sm dark:ring-gray-700 dark:hover:bg-gray-50 dark:focus:border-gray-100 dark:focus:bg-gray-50 dark:focus:ring-indigo-600 dark:active:bg-gray-100'
                    : null,
                scheme === 'secondary'
                    ? 'border-gray-300 bg-white text-gray-800 shadow-sm ring-gray-700 hover:bg-gray-50 focus:border-gray-100 focus:bg-gray-50 focus:ring-indigo-500 focus:ring-offset-white active:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:ring-gray-300 dark:hover:bg-gray-700 dark:focus:border-gray-900 dark:focus:bg-gray-700 dark:focus:ring-indigo-600 dark:active:bg-gray-900'
                    : null,
                'inline-flex items-center rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25',
            )}
            disabled={disabled}
            {...props}
        />
    )
}
