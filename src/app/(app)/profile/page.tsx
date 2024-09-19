import Header from '@/app/(app)/Header'
import DeleteUserForm from '@/app/(app)/profile/_partials/DeleteUserForm'
import UpdatePasswordForm from '@/app/(app)/profile/_partials/UpdatePasswordForm'
import UpdateProfileInformationForm from '@/app/(app)/profile/_partials/UpdateProfileInformationForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile',
}

export default function Profile() {
    return (
        <>
            <Header title="Profile" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdateProfileInformationForm className="max-w-xl" />
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    )
}
