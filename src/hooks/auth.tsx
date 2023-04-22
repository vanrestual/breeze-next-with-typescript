import { Dispatch, SetStateAction, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from '@/lib/axios'

export const useAuth = (
    { middleware, redirectIfAuthenticated } = {} as {
        middleware: string
        redirectIfAuthenticated?: string
    },
) => {
    const router = useRouter()

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({
        setErrors,
        ...props
    }: {
        name: string
        email: string
        password: string
        password_confirmation: string
        setErrors: Dispatch<
            SetStateAction<{
                email: Array<string>
                name: Array<string>
                password: Array<string>
                password_confirmation: Array<string>
            }>
        >
    }) => {
        await csrf()

        setErrors(
            {} as {
                email: Array<string>
                name: Array<string>
                password: Array<string>
                password_confirmation: Array<string>
            },
        )

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const login = async ({
        setErrors,
        setStatus,
        ...props
    }: {
        email: string
        password: string
        remember: boolean
        setErrors: Dispatch<
            SetStateAction<{
                email: Array<string>
                password: Array<string>
            }>
        >
        setStatus: (status: string | null) => void
    }) => {
        await csrf()

        setErrors(
            {} as {
                email: Array<string>
                password: Array<string>
            },
        )
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => {
                mutate()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: {
        email: string
        setErrors: Dispatch<SetStateAction<{ email: Array<string> }>>
        setStatus: (status: string | null) => void
    }) => {
        await csrf()

        setErrors({} as { email: Array<string> })
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({
        setErrors,
        setStatus,
        ...props
    }: {
        email: string
        password: string
        password_confirmation: string
        setErrors: Dispatch<
            SetStateAction<{
                email: Array<string>
                password: Array<string>
                password_confirmation: Array<string>
            }>
        >
        setStatus: (status: string | null) => void
    }) => {
        await csrf()

        setErrors(
            {} as {
                email: Array<string>
                password: Array<string>
                password_confirmation: Array<string>
            },
        )
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push(
                    '/login?reset=' + window.btoa(response.data.status),
                ),
            )
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

    const logout = useCallback(async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }
        window.location.pathname = '/login'
    }, [error, mutate])

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated as string)
        if (middleware === 'auth' && error) logout()
    }, [user, error, router, middleware, redirectIfAuthenticated, logout])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
