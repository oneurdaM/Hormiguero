import Image from 'next/image'
import logo from '@/assets/placeholders/logo-bw.png'
import ForgotPassword from '@/components/auth/forget-password/forget-password'

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-screen flex-row" dir="ltr">
      <div className="hidden flex-1 items-center justify-center bg-dark text-white md:flex  ">
        <div className=" w-auto max-w-[700px]">
          <Image src={logo} alt="logo-bw" loading="eager" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-gray-400 md:bg-gray-100 dark:bg-gray-700 ">
        <div className="m-auto w-full max-w-[420px] rounded p-5 sm:p-8 md:shadow md:bg-light">
          <div className="flex h-[100px] items-center justify-center md:text-dark">
            Recuperar contraseña
          </div>
          <ForgotPassword />
        </div>
      </div>
    </div>
  )
}
