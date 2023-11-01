'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

import LoginForm from '@/components/auth/login-form'
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'

function Login() {
    const router = useRouter()
    const { token, permissions } = getAuthCredentials()
    if (isAuthenticated({ token, permissions })) {
        router.replace('/') //redirect to '/'
    }

    return (
        <div className="flex h-screen flex-row" dir="ltr">
            <div className="hidden flex-1 items-center justify-center bg-dark text-white md:flex  ">
                <div className=" w-auto max-w-[700px]">logo</div>
            </div>

            <div className="flex flex-1 items-center justify-center bg-gray-300 md:bg-light dark:bg-gray-700 ">
                <div className="m-auto w-full max-w-[420px] rounded p-5 sm:p-8 md:shadow md:bg-light">
                    <div className="flex h-[100px] items-center justify-center text-dark">
                        logo mini
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login
