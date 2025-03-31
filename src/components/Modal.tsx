import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import clsx from 'clsx'
import type { PropsWithChildren } from 'react'

export default function Modal({
    children,
    closeable = true,
    maxWidth = '2xl',
    onClose = () => {},
    show = false,
}: PropsWithChildren<{
    closeable?: boolean
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    onClose: CallableFunction
    show: boolean
}>) {
    const maxWidthClass = {
        '2xl': 'sm:max-w-2xl',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        sm: 'sm:max-w-sm',
        xl: 'sm:max-w-xl',
    }[maxWidth]
    return (
        <Transition leave="duration-200" show={show}>
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
                onClose={() => {
                    if (closeable) {
                        onClose()
                    }
                }}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75" />
                </TransitionChild>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={clsx(
                            maxWidthClass,
                            'mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all dark:bg-gray-800 sm:mx-auto sm:w-full',
                        )}
                    >
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    )
}
