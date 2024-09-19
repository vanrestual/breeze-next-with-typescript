'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useState, type FormEventHandler } from 'react'

export default function ConfirmPassword() {
    const { confirmPassword } = useAuth({ middleware: 'guest' })
    const [errors, setErrors] = useState<{ password: string } | string[]>([])
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const submit: FormEventHandler = event => {
        event.preventDefault()
        setLoading(true)
        confirmPassword({
            onFinish: () => {
                setPassword('')
                setLoading(false)
            },
            password,
            setErrors,
        })
    }
    return (
        <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>
            <form onSubmit={submit}>
                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        className="mt-1 block w-full"
                        id="password"
                        isFocused={true}
                        name="password"
                        onChange={event => setPassword(event.target.value)}
                        type="password"
                        value={password}
                    />
                    <InputError
                        className="mt-2"
                        messages={
                            Array.isArray(errors) ? errors : errors.password
                        }
                    />
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Button className="ms-4" disabled={loading}>
                        Confirm
                    </Button>
                </div>
            </form>
        </>
    )
}
