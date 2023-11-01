'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

import SwitchDarkMode from '@/shared/SwitchDarkMode'
import MenuBar from '@/shared/MenuBar'
import isInViewport from '@/utils/isInViewport'
import { PathName } from '@/routers/types'
import { usePathname } from 'next/navigation'
import { UserCircleIcon, HomeIcon } from '@heroicons/react/24/outline'
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'

let WIN_PREV_POSITION = 0
if (typeof window !== 'undefined') {
  WIN_PREV_POSITION = window.pageYOffset
}

interface NavItem {
  name: string
  link?: PathName
  icon: any
}

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { token, permissions } = getAuthCredentials()
  const isAuth = isAuthenticated({ token, permissions })

  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEvent = () => {
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(showHideHeaderMenu)
    }
  }

  const showHideHeaderMenu = () => {
    let currentScrollPos = window.pageYOffset
    if (!containerRef.current) return

    // SHOW _ HIDE MAIN MENU
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return
      }

      containerRef.current.classList.add('FooterNav--hide')
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return
      }
      containerRef.current.classList.remove('FooterNav--hide')
    }

    WIN_PREV_POSITION = currentScrollPos
  }

  const NAV: NavItem[] = [
    {
      name: 'Inicio',
      link: '/',
      icon: HomeIcon,
    },
    {
      name: isAuth ? 'Cerrar sesión' : 'Iniciar sesión',
      link: isAuth ? '/logout' : '/login',
      icon: UserCircleIcon,
    },
    {
      name: 'Menu',
      icon: MenuBar,
    },
  ]

  const renderItem = (item: NavItem, index: number) => {
    const isActive = pathname === item.link

    return item.link ? (
      <Link
        key={index}
        href={item.link}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
        }`}
      >
        <item.icon className={`w-6 h-6 ${isActive ? 'text-red-600' : ''}`} />
        <span
          className={`text-[11px] leading-none mt-1 ${
            isActive ? 'text-red-600' : ''
          }`}
        >
          {item.name}
        </span>
      </Link>
    ) : (
      <div
        key={index}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
        }`}
      >
        <item.icon iconClassName="w-6 h-6" className={``} />
        <span className="text-[11px] leading-none mt-1">{item.name}</span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="FooterNav block md:!hidden p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
      transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {/* MENU */}
        <SwitchDarkMode />
        {NAV.map(renderItem)}
      </div>
    </div>
  )
}

export default FooterNav
