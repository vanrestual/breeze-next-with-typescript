import type { FC, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
    disabled = false,
    className,
    ...props
}) => (
    <input
        className={clsx(
            className,
            'rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50',
        )}
        disabled={disabled}
        {...props}
    />
)

export default Input
