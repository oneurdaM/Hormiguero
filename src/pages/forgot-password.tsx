import ForgotPassword from '@/components/auth/forget-password/forget-password'
import AuthPageLayout from '@/components/layout/auth-layout'

export default function ForgotPasswordPage() {
  return (
    <AuthPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-body">
        Reestablecer contraseña
      </h3>
      <ForgotPassword />
    </AuthPageLayout>
  )
}
