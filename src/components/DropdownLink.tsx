import type { ButtonHTMLAttributes, PropsWithChildren, FC } from 'react'
import Link, { type LinkProps } from 'next/link'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'

const DropdownLink: FC<PropsWithChildren<LinkProps>> = ({
    children,
    ...props
}) => (
    <Menu.Item>
        {({ active }: { active: boolean }) => (
            <Link {...props}>
                <a
                    className={clsx(
                        active ? 'bg-gray-100' : '',
                        'block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none',
                    )}
                >
                    {children}
                </a>
            </Link>
        )}
    </Menu.Item>
)

export const DropdownButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...props
}) => (
    <Menu.Item>
        {({ active }: { active: boolean }) => (
            <button
                className={clsx(
                    active ? 'bg-gray-100' : '',
                    'block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none',
                )}
                {...props}
            >
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
