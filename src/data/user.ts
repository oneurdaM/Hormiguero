import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import { API_ENDPOINTS } from './client/api-endpoints'
import { userClient } from './client/user'
import { AUTH_CRED } from '@/utils/constants'
import { UsersResponse } from '@/types/users'

export function useLogin() {
  return useMutation(userClient.login)
}

export const useMeQuery = () => {
  return useQuery<UsersResponse, Error>([API_ENDPOINTS.ME], userClient.me)
}

export const useLogoutMutation = () => {
  Cookies.remove(AUTH_CRED)
  toast.success('Se cerró sesión.')
  return {
    isSuccess: true,
  }
}
