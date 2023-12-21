import React from 'react'

import { LoginSocialFacebook } from 'reactjs-social-login'
import Button from '@/components/ui/button'

function FacebookButton({
  action,
  actionType,
}: {
  action: any
  actionType: string
}) {
  const onHandleOnResolve = (response: any) => {
    if (response.data) {
      let values = {}

      if (actionType === 'login') {
        values = {
          identifier: response.data.email,
          password: response.data.userID,
        }
      } else if (actionType === 'sign-up') {
        values = {
          email: response.data.email,
          password: response.data.userID,
          firstName: `${response.data.short_name} ${response.data.middle_name}`,
          lastName: response.data.last_name,
        }
      }
      action(values)
    }
  }

  return (
    <LoginSocialFacebook
      appId=""
      onResolve={(res) => onHandleOnResolve(res)}
      onReject={(err) => {
        console.log('Something went wrong: ', err)
      }}
    >
      <Button className="w-full bg-[#3c5997] text-light hover:bg-gray-700 mb-20 md:mb-0">
        {actionType === 'login'
          ? 'Iniciar sesión con Facebook'
          : 'Registrarme con Facebook'}
      </Button>
    </LoginSocialFacebook>
  )
}

export default FacebookButton
