import {
    type FC,
    Fragment,
    type PropsWithChildren,
    type ReactElement,
} from 'react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'

interface DropdownProps {
    align: 'left' | 'right' | 'top'
    width: string
    contentClasses?: string
    triggerClasses?: string
    trigger: ReactElement
}

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
    align = 'right',
    children,
    contentClasses = 'py-1 bg-white',
    trigger,
    width = 48,
}) => {
    let alignmentClasses: string

    switch (align) {
        case 'left':
            alignmentClasses = 'origin-top-left left-0'
            break
        case 'top':
            alignmentClasses = 'origin-top'
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
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button as={Fragment}>{trigger}</Menu.Button>
                    <Transition
                        show={open}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className={clsx(
                                alignmentClasses,
                                width,
                                'absolute z-50 mt-2 rounded-md shadow-lg',
                            )}
                        >
                            <Menu.Items
                                className={clsx(
                                    contentClasses,
                                    'rounded-md ring-1 ring-black/5 focus:outline-none',
                                )}
                                static
                            >
                                {children}
                            </Menu.Items>
                        </div>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

export default Dropdown
