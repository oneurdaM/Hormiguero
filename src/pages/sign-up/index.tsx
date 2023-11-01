'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import SignUpForm from '@/components/auth/sign-up-form'
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'
import logo from '../../assets/placeholders/logo-bw.png'

function SignUp() {
  const router = useRouter()
  const { token, permissions } = getAuthCredentials()
  if (isAuthenticated({ token, permissions })) {
    router.replace('/') //redirect to '/'
  }

  return (
    <div className="flex h-auto flex-row" dir="ltr">
      <div className="hidden flex-1 items-center justify-center bg-dark text-white md:flex  ">
        <div className=" w-auto max-w-[700px]">
          <Image src={logo} alt="logo-bw" loading="eager" />
        </div>
      </div>

      <div className="lg:flex lg:py-3 lg:items-center lg:justify-center flex-1 bg-gray-400 md:bg-gray-100 dark:bg-gray-700 ">
        <div className="m-auto w-full max-w-[420px] rounded p-5 sm:p-8 md:shadow md:bg-light">
          <div className="flex my-5 items-center justify-center md:text-dark">
            Regístrate
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}

export default SignUp
