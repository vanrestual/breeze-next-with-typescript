import type { FC, LabelHTMLAttributes } from 'react'
import clsx from 'clsx'

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
    children,
    className,
    ...props
}) => (
    <label
        className={clsx(className, 'block text-sm font-medium text-gray-700')}
        {...props}
    >
        {children}
    </label>
)

export default Label
