import { NavItemType } from '@/shared/Navigation/NavigationItem'
import ncNanoId from '@/utils/ncNanoId'
import { getAuthCredentials } from '@/utils/auth-utils'
const { token } = getAuthCredentials();
console.log('token :>> ', token);
const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/',
    name: 'Todos nuestros eventos',
  },
  {
    id: ncNanoId(),
    href: '/',
    name: 'Mis Tickets',
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: '/',
    name: 'Mis eventos',
    isNew: true,
  },
]

export const NAVIGATION: NavItemType[] = token ? [
  {
    id: ncNanoId(),
    href: '/community',
    name: 'Impacto social',
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: '/billboard',
    name: 'Cartelera',
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: '/products',
    name: 'Productos',
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: '/spaces',
    name: 'Renta de espacios',
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: '/blog',
    name: 'Blog',
    isNew: true,
  },
   {
    id: ncNanoId(),
    href: '/orders',
    name: 'Ordenes',
    isNew: true,
  } ,
] : [{
  id: ncNanoId(),
  href: '/community',
  name: 'Impacto social',
  isNew: true,
},
{
  id: ncNanoId(),
  href: '/billboard',
  name: 'Cartelera',
  isNew: true,
},
{
  id: ncNanoId(),
  href: '/products',
  name: 'Productos',
  isNew: true,
},
{
  id: ncNanoId(),
  href: '/spaces',
  name: 'Renta de espacios',
  isNew: true,
},
{
  id: ncNanoId(),
  href: '/blog',
  name: 'Blog',
  isNew: true,

} ]
