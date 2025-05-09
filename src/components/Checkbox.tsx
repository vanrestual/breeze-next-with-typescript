import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'

export default function Checkbox({
    className,
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={clsx(
                className,
                'shadow-xs rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800',
            )}
            type="checkbox"
            {...props}
        />
    )
}
