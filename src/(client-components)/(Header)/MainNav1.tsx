import React, { FC } from 'react'
import moment from 'moment'
import { notification } from 'antd'
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'
import Logo from '@/components/ui/logo'
import ButtonPrimary from '@/components/ui/primary-button'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import MenuBar from '@/shared/MenuBar'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { AUTH_CRED } from '@/utils/constants'
import { useRouter } from 'next/router'

export interface MainNav1Props {
    className?: string
}

const MainNav1: FC<MainNav1Props> = ({ className = '' }) => {
    const router = useRouter()
    const { token, permissions } = getAuthCredentials()
    const onLogOut = () => {
        notification.success({
            message: 'Se cerró la sesión',
            duration: 5,
        })
        Cookies.remove(AUTH_CRED)
        toast.success('Se cerró sesión.')
        router.push('/')
    }
    function parseJwt(token: any) {
        if (!token) {
            return
        }
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(window.atob(base64))
    }
    const tokenDecode = parseJwt(token)

    if (tokenDecode) {
        let hoy = new Date(tokenDecode.exp * 1000)
        console.log('hoy', hoy)
        let minutos = moment(hoy).diff(moment(), 'minutes')
        console.log('minutos', minutos)
        // Falten 2 minutos cierra sesión
        if (minutos <= 2) {
            notification.warning({
                message: 'El token expiró',
                description: 'La sesión se cerró automáticamente, favor de iniciar sesión',
                duration: 5,
            })
            onLogOut()
        }

        if (minutos <= 15) {
            notification.warning({
                message: 'El token está a 15 minutos de expirar',
                description: 'Pasados 13 minutos la sesión se cerrará automaticamente',
                duration: 5,
            })
        }
    }

    const RenderItem = () => {
        const isAuth = isAuthenticated({ token, permissions })
        return isAuth ? (
            <ButtonPrimary className="self-center mr-4" onClick={onLogOut}>
                Cerrar sesión
            </ButtonPrimary>
        ) : (
            <ButtonPrimary className="self-center mr-4" href="/login">
                Iniciar sesión
            </ButtonPrimary>
        )
    }

    return (
        <div className={`nc-MainNav1 relative z-10 ${className}`}>
            <div className="px-4 lg:container h-20 relative flex justify-between">
                <div className="hidden md:flex justify-start flex-1 space-x-4 sm:space-x-10">
                    <Logo className="w-24 self-center" />
                </div>

                <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
                    <RenderItem />
                    <SwitchDarkMode />
                    <MenuBar />
                </div>
            </div>
        </div>
    )
}

export default MainNav1
