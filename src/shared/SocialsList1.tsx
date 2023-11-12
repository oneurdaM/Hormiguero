import React, { FC } from 'react'

import { SocialType } from '@/shared/SocialsShare'
import { useSettingsQuery } from '@/data/settings'

export interface SocialsList1Props {
  className?: string
}

const SocialsList1: FC<SocialsList1Props> = ({ className = 'space-y-2.5' }) => {
  const { settings } = useSettingsQuery()

  const socials: SocialType[] = [
    {
      name: 'Facebook',
      icon: 'lab la-facebook-square',
      href:
        settings?.facebookUrl ??
        'https://www.facebook.com/CentroCulturalElHormiguero/',
    },
    {
      name: 'Twitter',
      icon: 'lab la-twitter',
      href: settings?.twitterUrl ?? 'https://twitter.com/ElHormigueroMx/',
    },
    {
      name: 'Youtube',
      icon: 'lab la-youtube',
      href: settings?.youtubeUrl ?? 'https://www.youtube.com/',
    },
    {
      name: 'Instagram',
      icon: 'lab la-instagram',
      href:
        settings?.instagramUrl ??
        'https://www.instagram.com/centro_cultural_el_hormiguero/?hl=es-la',
    },
  ]

  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
      >
        <i className={item.icon}></i>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </a>
    )
  }

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  )
}

export default SocialsList1
