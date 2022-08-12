import type { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'

interface AuthSessionStatusProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    status?: string | null
}

const AuthSessionStatus: FC<AuthSessionStatusProps> = ({
    status,
    className,
    ...props
}) => (
    <>
        {status && (
            <div
                className={clsx(
                    className,
                    'text-sm font-medium text-green-600',
                )}
                {...props}
            >
                {status}
            </div>
        )}
    </>
)

export default AuthSessionStatus
