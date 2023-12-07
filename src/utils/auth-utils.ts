import Cookie from 'js-cookie'
import SSRCookie from 'cookie'
import { AUTH_CRED, PERMISSIONS, TOKEN } from './constants'
import { Role } from '@/types/users'

export const allowedRoles = [
  Role.Director,
  Role.Cafeteria,
  Role.Communication,
  Role.Coordination,
  Role.Technicalarea,
  Role.User
]

export function setAuthCredentials(token: string, permissions: string, userId: string): void {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions, userId }), {'SameSite': 'None'})
}

export function getAuthCredentials(context?: any): {
  token: string | null
  permissions: string | null
  userId: string | null
} {
  let authCred
  authCred = Cookie.get(AUTH_CRED)
  if (authCred) {
    return JSON.parse(authCred)
  }
  return { token: null, permissions: null, userId: null }
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? '')
}

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string | undefined | null
) {
  if (_userPermissions) {
    return Boolean(_allowedRoles?.includes(_userPermissions))
  }
  return false
}

export function isAuthenticated(_cookies: any) {
  return !!_cookies[TOKEN] && !!_cookies[PERMISSIONS].length
}
