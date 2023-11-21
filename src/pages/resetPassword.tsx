import { useRouter } from 'next/router'
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'

import AuthPageLayout from '@/components/layout/auth-layout'
import ResetPassForm from '@/components/auth/reset-password/reset-pass-form'

export default function LoginPage() {
    const router = useRouter()
    const { token, permissions } = getAuthCredentials()
    if (isAuthenticated({ token, permissions })) {
        router.replace('/') //redirect to '/'
    }

    return (
        <AuthPageLayout>
            <h3 className="mb-6 mt-4 text-center text-base italic text-body">
                Recuperar Contraseña
            </h3>
            <ResetPassForm />
        </AuthPageLayout>
    )
}
