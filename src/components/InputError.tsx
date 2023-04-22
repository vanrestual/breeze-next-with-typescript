import { FC, HTMLAttributes } from 'react'

const InputError: FC<
    HTMLAttributes<HTMLParagraphElement> & { messages: Array<string> }
> = ({ className = '', messages = [], ...props }) => (
    <>
        {messages.length > 0 &&
            messages.map((message, index) => (
                <p
                    className={`${className} text-sm text-red-600`}
                    key={index}
                    {...props}
                >
                    {message}
                </p>
            ))}
    </>
)

export default InputError
