import type { FC, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    className,
    type = 'submit',
    ...props
}) => (
    <button
        type={type}
        className={clsx(
            className,
            'inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 focus:border-gray-900 focus:outline-none focus:ring active:bg-gray-900 disabled:opacity-25',
        )}
        {...props}
    />
)

export default Button
