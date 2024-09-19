import clsx from 'clsx'
import type { LabelHTMLAttributes } from 'react'

export default function Label({
    className,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            className={clsx(
                className,
                'block text-sm font-medium text-gray-700 dark:text-gray-300',
            )}
            {...props}
        />
    )
}
