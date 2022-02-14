import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

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
        setErrors: (error: string[]) => void
    }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(
                    Object.values(
                        error.response.data.errors,
                    ).flat() as string[],
                )
            })
    }

    const login = async ({
        setErrors,
        setStatus,
        ...props
    }: {
        email: string
        password: string
        setErrors: (error: string[]) => void
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

                setErrors(
                    Object.values(
                        error.response.data.errors,
                    ).flat() as string[],
                )
            })
    }

    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: {
        email: string
        setErrors: (error: string[]) => void
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

                setErrors(
                    Object.values(
                        error.response.data.errors,
                    ).flat() as string[],
                )
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
        setErrors: (error: string[]) => void
        setStatus: (status: string | null) => void
    }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push(
                    '/login?reset=' +
                        (window as any).btoa(response.data.status),
                ),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(
                    Object.values(
                        error.response.data.errors,
                    ).flat() as string[],
                )
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
            await axios.post('/logout')
            mutate()
        }
        window.location.pathname = '/login'
    }, [error, mutate])

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
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
