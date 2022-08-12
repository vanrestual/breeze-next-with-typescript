import type { FC, HTMLAttributes } from 'react'

interface AuthValidationErrorsProps extends HTMLAttributes<HTMLDivElement> {
    errors?: string[]
}

const AuthValidationErrors: FC<AuthValidationErrorsProps> = ({
    errors = [],
    ...props
}) => (
    <>
        {errors.length > 0 && (
            <div {...props}>
                <div className="font-medium text-red-600">
                    Whoops! Something went wrong.
                </div>
                <ul className="mt-3 list-inside list-disc text-sm text-red-600">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        )}
    </>
)

export default AuthValidationErrors
