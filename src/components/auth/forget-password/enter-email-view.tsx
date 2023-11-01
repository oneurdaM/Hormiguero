import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface Props {
  onSubmit: (values: { email: string }) => void
  loading: boolean
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Este campo es obligatorio')
    .required('El correo electrónico no es válido'),
})

const EnterEmailView = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{ email: string }>({ resolver: yupResolver(schema) })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Correo electrónico"
        {...register('email')}
        type="email"
        variant="outline"
        className="mb-5"
        placeholder="jhondoe@gmail.com"
        error={errors?.email?.message}
        link='/login'
        linkText='Iniciar sesión'
      />
      <Button
        className="h-11 w-full bg-dark"
        loading={loading}
        disabled={loading}
      >
        Enviar
      </Button>
    </form>
  )
}

export default EnterEmailView
