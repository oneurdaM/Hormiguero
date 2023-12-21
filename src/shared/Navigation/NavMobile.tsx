'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import ButtonClose from '@/shared/ButtonClose'
import Logo from '@/shared/Logo'
import { Disclosure } from '@headlessui/react'
import { NAVIGATION } from '@/data/navigation'
import { NavItemType } from './NavigationItem'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import SocialsList from '../SocialsList'

export interface NavMobileProps {
  data?: NavItemType[]
  onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION,
  onClickClose,
}) => {
  const [visits, setVisits] = useState<null | number>(null)

  useEffect(() => {
    const visits = window?.localStorage?.getItem('visits') ?? 0
    setVisits(parseInt(visits.toString()))
  }, [])

  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              href={{
                pathname: i.href || undefined,
              }}
              className="flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5"
            >
              <span
                className={`py-2.5 pr-3 ${!i.children ? 'block w-full' : ''}`}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex-1 flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="py-2.5 flex justify-end flex-1"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    )
  }

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <Link
          className="flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={`py-2.5 pr-3 ${!item.children ? 'block w-full' : ''}`}
          >
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button
                as="span"
                className="py-2.5 flex items-center justify-end flex-1 "
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    )
  }

  return (
    <div className="overflow-y-auto w-full h-screen py-1 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="px-5">
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
        <Logo />
      </div>

      <ul className="flex flex-col py-2 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul>

      <div className="p-5  mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
        <p>
          <small>
            <b>Nuestra misión </b> En Centro Cultural El Hormiguero,
            enriquecemos vidas a través del teatro, inspirando y conectando a
            nuestra comunidad.
          </small>
        </p>
        <br />
        <p>
          <small>
            <b>Nuestra visión es </b>
            ser un referente destacado en el mundo del teatro, combinando
            excelencia artística con inclusión e innovación.
          </small>
        </p>
        <br />
        <p>
          <small>
            Somos amantes del teatro dedicados a producir obras que despiertan
            emociones y promueven la reflexión en un espacio de expresión para
            todos. ¡Únete a nuestra travesía teatral en Centro Cultural El
            Hormiguero!
          </small>
        </p>

        <div className="lg:absolute lg:bottom-4 lg:w-full lg:pr-8 flex justify-between items-center mt-4">
          <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
          <p>Visitas: {visits}</p>
        </div>
      </div>
    </div>
  )
}

export default NavMobile
