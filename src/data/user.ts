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

export const useSignUpMutation = () => {
  return useMutation(userClient.register, {
    onSuccess() {
      toast.success('Usuario registrado. Inicia sesión')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

export const useResetPasswordMutation = () => {
  return useMutation(userClient.resetPassword)
}

export const useVerifyForgetPasswordTokenMutation = () => {
  return useMutation(userClient.verifyForgetPasswordToken)
}

export const useForgetPasswordMutation = () => {
  return useMutation(userClient.forgetPassword, {
    onSuccess() {
      toast.success('Se envió el enlace a su e-mail')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo enviar')
    },
  })
}

export const useMeQuery = () => {
  return useQuery<UsersResponse, Error>([API_ENDPOINTS.ME], userClient.me)
}

export const useLogoutMutation = () => {
  Cookies.remove(AUTH_CRED)
  toast.success('Se cerró sesión.')
  return{
    isSuccess: true,
  }
}
