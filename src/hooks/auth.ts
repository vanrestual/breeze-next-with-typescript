import axios from '@/lib/axios'
import { useParams, useRouter } from 'next/navigation'
import {
    useCallback,
    useEffect,
    type Dispatch,
    type SetStateAction,
} from 'react'
import useSWR from 'swr'

export type ConfirmPassword = { password: string }

export type DeleteUser = { password: string }

export type ForgotPassword = { email: string }

export type Login = {
    email: string
    password: string
    remember?: boolean
}

export type Register = {
    email: string
    name: string
    password: string
    password_confirmation: string
}

export type ResetPassword = {
    email: string
    password: string
    password_confirmation: string
}

export type UpdatePassword = {
    current_password: string
    password: string
    password_confirmation: string
}

export type UpdateProfileInformation = {
    email: string
    name: string
}

export const useAuth = (
    { middleware, redirectIfAuthenticated } = {} as {
        middleware: string
        redirectIfAuthenticated?: string
    },
) => {
    const params = useParams()
    const router = useRouter()
    const {
        data: user,
        error,
        mutate,
    } = useSWR<
        {
            created_at: string
            email: string
            email_verified_at: null | string
            id: number
            mustVerifyEmail: boolean
            name: string
            updated_at: string
        },
        Error
    >('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
            }),
    )
    const confirmPassword = async ({
        onFinish,
        setErrors,
        ...props
    }: ConfirmPassword & {
        onFinish: () => void
        setErrors: Dispatch<SetStateAction<ConfirmPassword | string[]>>
    }) => {
        await csrf()
        setErrors([])
        axios
            .post('/confirm-password', props)
            .then()
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
            .finally(onFinish)
    }
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    const deleteUser = async ({
        onError,
        onFinish,
        onSuccess,
        setErrors,
        ...props
    }: DeleteUser & {
        onError: () => void
        onFinish: () => void
        onSuccess: () => void
        setErrors: Dispatch<SetStateAction<DeleteUser | string[]>>
    }) => {
        await csrf()
        setErrors([])
        if (!error) {
            axios
                .delete('/profile', { data: props })
                .then(() => {
                    onSuccess()
                    window.location.pathname = '/login'
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error
                    onError()
                    setErrors(error.response.data.errors)
                })
                .finally(onFinish)
        }
    }
    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: ForgotPassword & {
        setErrors: Dispatch<SetStateAction<ForgotPassword | string[]>>
        setStatus: (status: string | null) => void
    }) => {
        await csrf()
        setErrors([])
        setStatus(null)
        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }
    const login = async ({
        setErrors,
        setStatus,
        ...props
    }: Login & {
        setErrors: Dispatch<SetStateAction<Login | string[]>>
        setStatus: (status: string | null) => void
    }) => {
        await csrf()
        setErrors([])
        setStatus(null)
        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }
    const logout = useCallback(async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }
        window.location.pathname = '/login'
    }, [error, mutate])
    const register = async ({
        setErrors,
        ...props
    }: Register & {
        setErrors: Dispatch<SetStateAction<Register | string[]>>
    }) => {
        await csrf()
        setErrors([])
        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }
    const resendEmailVerification = ({
        setStatus,
    }: {
        setStatus: (status: string | null) => void
    }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }
    const resetPassword = async ({
        setErrors,
        setStatus,
        ...props
    }: ResetPassword & {
        setErrors: Dispatch<SetStateAction<ResetPassword | string[]>>
        setStatus: (status: string | null) => void
    }) => {
        await csrf()
        setErrors([])
        setStatus(null)
        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }
    const updatePassword = async ({
        onError,
        onSuccess,
        setErrors,
        ...props
    }: UpdatePassword & {
        onError: () => void
        onSuccess: () => void
        setErrors: Dispatch<SetStateAction<UpdatePassword | string[]>>
    }) => {
        await csrf()
        setErrors([])
        axios
            .put('/password', props)
            .then(() => {
                mutate()
                onSuccess()
            })
            .catch(error => {
                onError()
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }
    const updateProfileInformation = async ({
        onSuccess,
        setErrors,
        ...props
    }: UpdateProfileInformation & {
        onSuccess: () => void
        setErrors: Dispatch<SetStateAction<UpdateProfileInformation | string[]>>
    }) => {
        await csrf()
        setErrors([])
        axios
            .patch('/profile', props)
            .then(() => {
                onSuccess()
                mutate()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }
    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.replace(redirectIfAuthenticated)
        }
        if (
            redirectIfAuthenticated &&
            user &&
            user.email_verified_at &&
            window.location.pathname === '/verify-email'
        ) {
            router.replace(redirectIfAuthenticated)
        }
        if (middleware === 'auth' && error) {
            logout()
        }
    }, [error, logout, middleware, redirectIfAuthenticated, router, user])
    return {
        confirmPassword,
        deleteUser,
        forgotPassword,
        login,
        logout,
        register,
        resendEmailVerification,
        resetPassword,
        updatePassword,
        updateProfileInformation,
        user,
    }
}
