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
                'shadow-xs focus:ring-3 rounded-md border-gray-300 text-gray-700 focus:border-indigo-300 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-700 dark:focus:ring-indigo-600',
            )}
            disabled={disabled}
            ref={localRef}
            type={type}
            {...props}
        />
    )
})
