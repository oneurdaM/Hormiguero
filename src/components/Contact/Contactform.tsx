import { Form, Input, Button, notification } from 'antd'
import React from 'react'
import { UserOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'

type Props = {}

const Contactform = (props: Props) => {
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = (data: any) => {
        // Aquí puedes manejar la lógica de envío del formulario.
        console.log(data)

        // Ejemplo: Mostrar una notificación de éxito.
        notification.success({
            message: 'Formulario Enviado',
            description: 'Gracias por ponerte en contacto con nosotros.',
        })

        // Limpiar el formulario después del envío.
        reset()
    }
    return (
        <div className="h-auto dark:bg-black dark:bg-opacity-20 bg-[#014154]" id="contacto">
            <div className="nc-PageHome container h-auto py-10">
                <h1 className="text-4xl font-bold mt-2 text-center text-[#5bf1fa] dark:text-white ">Contacto</h1>
                <div className="w-full dark:border-white border-[#5bf1fa] border-solid border-[1px] my-5" />

                <div className="lg:flex">
                    <div className="lg:w-1/2 lg:mx-5 border p-5 rounded-md">
                        <Form onFinish={onSubmit}>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: <span className="text-slate-200"> Por favor, ingresa tu nombre </span> },
                                    { pattern: /^[a-zA-Z\s]*$/, message: <span className="text-slate-200"> El nombre solo puede contener letras y espacios</span> },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Nombre" />
                            </Form.Item>

                            <Form.Item
                                name="asunto"
                                rules={[
                                    { required: true, message: <span className="text-slate-200">Por favor, ingresa un asunto</span> },
                                    { pattern: /^[a-zA-Z\s]*$/, message: <span className="text-slate-200"> El asunto solo puede contener letras y espacios </span> },
                                ]}
                            >
                                <Input prefix={<MessageOutlined />} placeholder="Asunto" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: <span className="text-slate-200">Por favor, ingresa tu correo electrónico </span> },
                                    { type: 'email', message: <span className="text-slate-200">Por favor, ingresa un correo electrónico válido</span> },
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Correo Electrónico" />
                            </Form.Item>

                            <Form.Item
                                name="message"
                                rules={[
                                    { required: true, message: <span className="text-slate-200">Por favor, ingresa tu mensaje</span> },
                                    { max: 500, message: <span className="text-slate-200">El mensaje no puede tener más de 500 caracteres</span> },
                                ]}
                            >
                                <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} placeholder="Mensaje" />
                            </Form.Item>

                            <Form.Item>
                                <div className="flex justify-end">
                                    <Button style={{ width: '50%' }} className="btnPrimaryLeft  mt-5 border-0 h-[3em] hover:bg-[#34688f] text-base rounded-md dark:bg-[#283c41]" htmlType="submit">
                                        Enviar Mensaje
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className="lg:w-1/2  lg:mx-5 my-5 lg:my-0">
                        <h2 className="text-3xl text-center text-[#5bf1fa] dark:text-[#b8b7b7] mb-2">Preguntas</h2>

                        <p className="text-lg text-[#f4eadb]">Para todo tipo de preguntas, comentarios e inquietudes; por favor llámanos: 55-5131-5753 o completa el formulario a continuación</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contactform
