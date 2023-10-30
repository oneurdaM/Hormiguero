'use client'
import React, { useState } from 'react'
// import Router from 'next/router'

import * as yup from 'yup'

import Input from '@/components/ui/input'
import Form from '@/components/ui/forms/form'
import { Routes } from '@/config/routes'
import { useLogin } from '@/data/user'
import Alert from '@/components/ui/alert'
import { allowedRoles, hasAccess, setAuthCredentials } from '@/utils/auth-utils'
import PasswordInput from '../ui/password-input'
import Button from '../ui/button'
import { useRouter } from 'next/navigation'

const loginFormSchema = yup.object().shape({
  identifier: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  password: yup.string().required('form:error-password-required'),
})

const LoginForm = () => {
  const Router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { mutate: login, isLoading, error } = useLogin()

  function onSubmit({ identifier, password }: {identifier: string, password: string}) {
    login(
      {
        identifier,
        password,
      },
      {
        onSuccess: (data: any) => {
          if (data?.jwt) {
            const role = data?.role
            if (hasAccess(allowedRoles, role)) {
              setAuthCredentials(data.jwt, data.role)
              Router.push('/') //redirect to '/'
              return
            }
          } 
        },
        onError: () => {
          const messages = error as any
          if (messages?.response?.data?.message) {
            setErrorMessage(
              messages?.response?.data?.message !== 'Unauthorized'
                ? messages?.response?.data?.message
                : 'El usuario no se encuentra registrado.'
            )
          } else {
            setErrorMessage('El correo y/o la contraseña están equivocados.')
          }
        },
      }
    )
  }

  return (
    <>
      <Form validationSchema={loginFormSchema} onSubmit={onSubmit}>
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label='Correo electrónico'
              placeholder='Correo electrónico'
              {...register('identifier')}
              type="email"
              variant="outline"
              className="mb-4"
              error={errors?.identifier?.message}
            />
            <PasswordInput
              label='Contraseña'
              placeholder='Contraseña'
              forgotPassHelpText='¿Olvidaste tu contraseña?'
              {...register('password')}
              error={errors?.password?.message}
              variant="outline"
              className="mb-4"
              forgotPageLink={Routes.forgotPassword}
            />
            <Button
              className="w-full bg-dark"
              loading={isLoading}
              disabled={isLoading}
            >
              Ingresar
            </Button>
          </>
        )}
      </Form>
      {errorMessage ? (
        <Alert
          message={errorMessage}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
    </>
  )
}

export default LoginForm
