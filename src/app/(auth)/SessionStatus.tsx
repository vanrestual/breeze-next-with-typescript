import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

export default function SessionStatus({
    className,
    status,
    ...props
}: { status?: string | null } & HTMLAttributes<HTMLDivElement>) {
    return (
        status && (
            <div
                className={clsx(
                    className,
                    'text-sm font-medium text-green-600 dark:text-green-400',
                )}
                {...props}
            >
                {status}
            </div>
        )
    )
}
