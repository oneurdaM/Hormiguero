'use client'
import React from 'react'
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
  const visits = localStorage.getItem('visits')
  
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

      <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul>

      <div className="p-5  mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
        <p>
          Nuestra <b>mision</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quas repellat voluptatem sit aliquid provident assumenda aliquam, nostrum soluta ipsum fugiat consequuntur ut rerum asperiores esse. Delectus optio similique quos?
        </p>
        <br />
        <p>
          La <b>visión</b> del Hormiguero es que Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi adipisci optio ipsam excepturi, laudantium labore itaque nulla ratione voluptatibus eum dicta odit! Ab, ipsa pariatur aliquid quibusdam consectetur debitis nobis?
        </p>

        <div className="flex justify-between items-center mt-4">
          <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
          <p>Visitas: {visits}</p>
        </div>
      </div>
    </div>
  )
}

export default NavMobile
