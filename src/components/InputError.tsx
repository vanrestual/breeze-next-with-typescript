import type { HTMLAttributes } from 'react'

export default function InputError({
    className,
    messages,
    ...props
}: HTMLAttributes<HTMLParagraphElement> & {
    messages: string | string[]
}) {
    return Array.isArray(messages) ? (
        messages.map((message, index) => (
            <p
                className={`${className} text-sm text-red-600 dark:text-red-500`}
                key={index}
                {...props}
            >
                {message}
            </p>
        ))
    ) : (
        <p
            className={`${className} text-sm text-red-600 dark:text-red-500`}
            {...props}
        >
            {messages}
        </p>
    )
}
