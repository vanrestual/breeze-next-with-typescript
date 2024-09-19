'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Modal from '@/components/Modal'
import { useAuth, type DeleteUser } from '@/hooks/auth'
import { useRef, useState, type FormEventHandler } from 'react'

export default function DeleteUserForm({
    className = '',
}: {
    className?: string
}) {
    const { deleteUser } = useAuth({ middleware: 'auth' })
    const passwordInput = useRef<HTMLInputElement>(null)
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const [errors, setErrors] = useState<DeleteUser | string[]>([])
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const submitForm: FormEventHandler = event => {
        event.preventDefault()
        setLoading(true)
        deleteUser({
            onError: () => passwordInput.current?.focus(),
            onFinish: () => {
                setLoading(false)
                setPassword('')
            },
            onSuccess: () => closeModal(),
            password,
            setErrors,
        })
    }
    const closeModal = () => {
        setConfirmingUserDeletion(false)
        setErrors([])
        setPassword('')
    }
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>
            <Button
                onClick={() => setConfirmingUserDeletion(true)}
                scheme="danger"
            >
                Delete Account
            </Button>
            <Modal onClose={closeModal} show={confirmingUserDeletion}>
                <form className="p-6" onSubmit={submitForm}>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your account?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>
                    <div className="mt-6">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            className="mt-1 block w-3/4"
                            id="password"
                            isFocused
                            name="password"
                            onChange={event => setPassword(event.target.value)}
                            placeholder="Password"
                            ref={passwordInput}
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
                    <div className="mt-6 flex justify-end">
                        <Button onClick={closeModal} scheme="secondary">
                            Cancel
                        </Button>
                        <Button
                            className="ms-3"
                            disabled={loading}
                            scheme="danger"
                        >
                            Delete Account
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    )
}
