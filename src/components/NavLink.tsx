import type { FC, PropsWithChildren } from 'react'
import Link, { type LinkProps } from 'next/link'
import clsx from 'clsx'

interface NavLinkProps extends LinkProps {
    active: boolean
}

const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({
    active = false,
    children,
    ...props
}) => (
    <Link
        className={clsx(
            active
                ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700',
            'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none',
        )}
        {...props}
    >
        {children}
    </Link>
)

export default NavLink
