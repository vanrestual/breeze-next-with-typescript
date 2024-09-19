import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import clsx from 'clsx'
import Link, { type LinkProps } from 'next/link'
import {
    Fragment,
    type ButtonHTMLAttributes,
    type PropsWithChildren,
    type ReactElement,
} from 'react'

function Dropdown({
    align = 'right',
    contentClasses = 'py-1 bg-white dark:bg-gray-800',
    trigger,
    width = '48',
    ...props
}: PropsWithChildren<{
    align: 'left' | 'right' | 'top'
    contentClasses?: string
    trigger: ReactElement
    width: string
}>) {
    let alignmentClasses: string
    switch (align) {
        case 'left':
            alignmentClasses = 'origin-top-left left-0'
            break
        case 'top':
            alignmentClasses = 'origin-top top-0'
            break
        case 'right':
        default:
            alignmentClasses = 'origin-top-right right-0'
            break
    }
    switch (width) {
        case '48':
            width = 'w-48'
            break
    }
    return (
        <Menu as="div" className="relative ms-3">
            {({ open }) => (
                <>
                    <MenuButton as={Fragment}>{trigger}</MenuButton>
                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                        show={open}
                    >
                        <div
                            className={clsx(
                                alignmentClasses,
                                width,
                                'absolute z-50 mt-2 rounded-md shadow-lg dark:shadow-white/5',
                            )}
                        >
                            <MenuItems
                                className={clsx(
                                    contentClasses,
                                    'rounded-md ring-1 ring-black/5 focus:outline-none dark:ring-white/5',
                                )}
                                static
                            >
                                {props.children}
                            </MenuItems>
                        </div>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

Dropdown.Button = function DropdownButton(
    props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
    return (
        <MenuItem>
            {({ focus }) => (
                <button
                    className={clsx(
                        focus ? 'bg-gray-100 dark:bg-gray-900' : null,
                        'block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none dark:text-gray-300',
                    )}
                    {...props}
                />
            )}
        </MenuItem>
    )
}

Dropdown.Link = function DropdownLink(props: PropsWithChildren<LinkProps>) {
    return (
        <MenuItem>
            {({ focus }) => (
                <Link
                    className={clsx(
                        focus ? 'bg-gray-100 dark:bg-gray-900' : null,
                        'block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none dark:text-gray-300',
                    )}
                    {...props}
                />
            )}
        </MenuItem>
    )
}

export default Dropdown
