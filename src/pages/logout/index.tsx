'use client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useLogoutMutation } from '@/data/user'
import Loader from '@/components/ui/loader/loader'

function Logout() {
    const router = useRouter()

    useEffect(() => {}, [])

    return <Loader text="Cerrando sesión" />
}

export default Logout
