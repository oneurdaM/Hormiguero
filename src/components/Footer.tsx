'use client'
import React, { useEffect, useState } from 'react'

import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'

const Footer = () => {
  const [visits, setVisits] = useState<null | number>(null)

  useEffect(() => {
    const visits = window?.localStorage?.getItem('visits') ?? 0
    setVisits(parseInt(visits.toString()))
  }, [])

  return (
    <div className="nc-Footer relative py-4 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5">
        <div className="grid grid-cols-4 gap-5 col-span-2">
          <div className="col-span-2">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center justify-between">
            <SocialsList1 className="flex items-center space-x-3 " />
            <span className="hidden md:block text-sm">
              Visitado {visits} veces
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
