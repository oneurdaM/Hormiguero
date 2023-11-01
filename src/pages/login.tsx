import { useRouter } from 'next/router'
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'

import AuthPageLayout from '@/components/layout/auth-layout'
import LoginForm from '@/components/auth/login-form'

export default function LoginPage() {
  const router = useRouter()
  const { token, permissions } = getAuthCredentials()
  if (isAuthenticated({ token, permissions })) {
    router.replace('/') //redirect to '/'
  }

  return (
    <AuthPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-body">
        Iniciar sesión
      </h3>
      <LoginForm />
    </AuthPageLayout>
  )
}
