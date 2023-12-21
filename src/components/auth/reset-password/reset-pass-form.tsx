'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { LockOutlined } from '@ant-design/icons'
import { Form, Input, notification } from 'antd'
import Button from '../../ui/button'
import { resetPassword } from '@/data/authServices'
import { ResetPasswordResponse } from '@/types/auth'
import Loader from '@/components/ui/loader/loader'

const ResetPassForm = () => {
    const router = useRouter()
    const { query } = router
    console.log('query:', query)
    const [form] = Form.useForm()
    const [fetchingResetPass, setFetchingResetPass] = useState(false)

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
        fetchData(values)
    }

    const fetchData = async (formulario: any) => {
        try {
            const data: any = {
                token: query.token,
                newPassword: formulario.password,
            }
            setFetchingResetPass(true)
            const response = await resetPassword(data)
            console.log('response en index', response)

            setFetchingResetPass(false)
            notification.success({
                message: 'Cambio de contraseña exitoso',
                description:
                    'La contraseña se cambió de forma correcta, redirigiendo a la ventana de login',
            })
            router.push('/login')
        } catch (error: any) {
            console.log('error', error)
            notification.error({
                message: 'Hubo un error, favor de intentar mas tarde',
                description: error.message,
            })
            setFetchingResetPass(false)
        }
    }

    if (fetchingResetPass) {
        return <Loader text="Cargando..." />
    }
    return (
        <Form
            form={form}
            name="resetPassword"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Favor de ingresar la contraseña',
                    },
                ]}
                hasFeedback
            >
                <Input.Password
                    size="large"
                    placeholder="Contraseña"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Favor de confirmar la contraseña!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error(
                                    'La nueva contraseña que has ingresado no coincide'
                                )
                            )
                        },
                    }),
                ]}
            >
                <Input.Password
                    size="large"
                    placeholder="Confirmar contraseña"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <Button
                className="w-full bg-dark text-light hover:bg-gray-700"
                loading={false}
                disabled={false}
            >
                Recuperar
            </Button>
        </Form>
    )
}

export default ResetPassForm
