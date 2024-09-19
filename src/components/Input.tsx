import clsx from 'clsx'
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    type InputHTMLAttributes,
} from 'react'

export default forwardRef(function Input(
    {
        className,
        disabled = false,
        isFocused = false,
        type = 'text',
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus()
        }
    }, [isFocused])
    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }))
    return (
        <input
            className={clsx(
                className,
                ' rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-indigo-200/50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-700 dark:focus:ring-indigo-600 dark:focus:ring-indigo-800/50',
            )}
            disabled={disabled}
            ref={localRef}
            type={type}
            {...props}
        />
    )
})
