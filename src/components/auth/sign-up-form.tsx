'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import * as yup from 'yup'

import Form from '@/components/ui/forms/form'
import Input from '@/components/ui/input'
import PasswordInput from '../ui/password-input'
import Alert from '@/components/ui/alert'
import Button from '../ui/button'
import { UserRegistration } from '@/types/users'
import { Routes } from '@/config/routes'
import { useSignUpMutation } from '@/data/user'
import FacebookButton from './login/FacebookButton'

const signUpFormSchema = yup.object().shape({
  firstName: yup.string().required('Esta campo es obligatorio'),
  middleName: yup.string().nullable(),
  lastName: yup.string().required('Este campo es obligatorio'),
  birthDate: yup.string().required('Este campo es obligatorio'),
  email: yup
    .string()
    .email('Correo electrónico no válido')
    .required('Este campo es obligatorio'),
  password: yup.string().required('Este campo es obligatorio'),
  passwordConfirmation: yup
    .string()
    .required('Este campo es obligatorio')
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben de coincidir'),
})

const SignUpForm = () => {
  const Router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { mutate: signUp, isLoading, error } = useSignUpMutation()

  let currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear() - 18)
  const minAge = currentDate.toISOString().split('T')[0]

  function onSubmit({
    email,
    password,
    firstName,
    lastName,
  }: UserRegistration) {
    signUp(
      {
        email,
        username: email,
        password,
        firstName,
        lastName,
        role: 'USER',
        // birthDate: `${birthDate}T00:00:00.000Z`,
        middleName: '',
      },
      {
        onSuccess: () => {
          Router.push('/login')
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
      <Form validationSchema={signUpFormSchema} onSubmit={onSubmit}>
        {({ register, formState: { errors } }) => (
          <>
            <Input
              link={Routes.login}
              linkText="¿Ya estás registrado? Inicia sesión"
              label="Correo electrónico"
              placeholder="Correo electrónico"
              {...register('email')}
              type="email"
              variant="outline"
              className="mb-4"
              error={errors?.email?.message}
            />
            <Input
              label="Nombre"
              placeholder="Nombre"
              {...register('firstName')}
              type="email"
              variant="outline"
              className="mb-4"
              error={errors?.firstName?.message}
            />
            {/* <Input
              label="Segundo nombre (opcional)"
              placeholder="Nombre"
              {...register('middleName')}
              type="email"
              variant="outline"
              className="mb-4"
              error={errors?.middleName?.message}
            /> */}
            <Input
              label="Apellido(s)"
              placeholder="Apellido(s)"
              {...register('lastName')}
              type="email"
              variant="outline"
              className="mb-4"
              error={errors?.lastName?.message}
            />
            {/* <Input
              type="date"
              label="Fecha de nacimiento"
              {...register('birthDate')}
              variant="outline"
              className="mb-5"
              max={minAge}
              error={errors.birthDate?.message?.toString()}
            /> */}
            <PasswordInput
              label="Contraseña"
              placeholder="Contraseña"
              {...register('password')}
              error={errors?.password?.message}
              variant="outline"
              className="mb-4"
            />
            <PasswordInput
              label="Confirmar contraseña"
              placeholder="Contraseña"
              {...register('passwordConfirmation')}
              error={errors?.passwordConfirmation?.message}
              variant="outline"
              className="mb-4"
            />
            <Button
              className="w-full bg-dark text-light hover:bg-gray-700"
              loading={isLoading}
              disabled={isLoading}
            >
              Registrarme
            </Button>
            <hr className="my-4" />
            <FacebookButton action={onSubmit} actionType="sign-up" />
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

export default SignUpForm
