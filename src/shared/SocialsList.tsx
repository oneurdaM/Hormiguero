import React, { FC } from 'react'
import { SocialType } from '@/shared/SocialsShare'
import { useSettingsQuery } from '@/data/settings'

export interface SocialsListProps {
  className?: string
  itemClass?: string
  socials?: SocialType[]
}

const SocialsList: FC<SocialsListProps> = ({
  className = '',
  itemClass = 'block',
}) => {
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

  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <i className={item.icon}></i>
        </a>
      ))}
    </nav>
  )
}

export default SocialsList
