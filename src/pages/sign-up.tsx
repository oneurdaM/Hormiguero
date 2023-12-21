'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

import SignUpForm from '@/components/auth/sign-up-form'
import AuthPageLayout from '@/components/layout/auth-layout'
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'

function SignUp() {
  const router = useRouter()
  const { token, permissions } = getAuthCredentials()
  if (isAuthenticated({ token, permissions })) {
    router.replace('/') //redirect to '/'
  }

  return (
    <AuthPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-body">
        Regístrate
      </h3>
      <SignUpForm />
    </AuthPageLayout>
  )
}

export default SignUp
