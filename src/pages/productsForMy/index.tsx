//@ts-nocheck
import React, { FC, useState, useEffect, useContext } from 'react'

import Image, { StaticImageData } from 'next/image'
import ButtonPrimary from '@/components/ui/primary-button'
import { Row, Col, Button, Tooltip, notification, Tag, Spin, Table, Input, InputNumber, Modal } from 'antd'
import type { CalendarProps } from 'antd'
import { useSpacesQuery } from '@/data/spaces'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { buyProducts } from '@/data/ProductService'

import { getAuthCredentials } from '@/utils/auth-utils'
import { SpacesResponse, Rent } from '@/types/spaces'
import { getRents } from '@/data/rentServices'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import moment from 'moment'
import type { Dayjs } from 'dayjs'
import Layout from '@/components/layout/layout'
import { CartContext } from '@/context/CarContext'
import { useRouter } from 'next/router'

type Props = {}

const Index = (props: Props) => {
    const { spaces, loading: loadingSpaces } = useSpacesQuery({
        limit: 10,
        page: 1,
        search: '',
    })
    const { token } = getAuthCredentials()
    const [show, setShow] = useState(false)
    //@ts-ignore
    const [cart, setCart] = useContext(CartContext)

    const [showModalRentSpace, setShowModalRentSpace] = useState(false)
    const [showModalMobile, setShowModalMobile] = useState(false)
    const [boolButton, setBoolButton] = useState(true)
    const [spaceSelected, setSpaceSelected] = useState<SpacesResponse>()
    const [api, contextHolder] = notification.useNotification()
    const [productosRecuperados, setProductosRecuperados] = useState([])
    const [fetchingPayment, setFetchingPayment] = useState(false)
    const [canti, setCanti] = useState(0)
    const [idProd, setProductId] = useState(0)
    const [image, setImage] = useState('')
    const [paypalModal, setModalPaypal] = useState(false)
    const router = useRouter()

    // const carritoGuardado = localStorage.getItem('cart')

    const [carritoGuardado, setCarritoGuardado] = useState<string | null>(null)

    // Convertir el JSON recuperado a un array
    let total: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.PromiseLikeOfReactNode | null | undefined
    let totaProductos: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.PromiseLikeOfReactNode | null | undefined

    if (carritoGuardado) {
        total = productosRecuperados.reduce((total, element) => total + element.price * element.quantity, 0)
        totaProductos = productosRecuperados.reduce((total, element) => total + element.quantity, 0)
    }

    useEffect(() => {
        // Tu código que utiliza localStorage aquí
        const carritoGuardado = localStorage.getItem('cart')
        setCarritoGuardado(carritoGuardado)

        setProductosRecuperados(JSON.parse(carritoGuardado))
    }, [])

    const onShowRent = (mobile: boolean) => {
        setShowModalMobile(mobile)
        if (token) {
            pagar()
        } else {
            api.warning({
                message: 'Es necesario iniciar sesión',
                description: (
                    <Row justify="center">
                        <Col span={24}>
                            <p>Para continuar con la compra de productos es necesario iniciar sesión</p>
                        </Col>
                        <Col span={20}>
                            <br />
                            <ButtonPrimary className="mr-4 width100" href="/login">
                                Iniciar sesión
                            </ButtonPrimary>
                        </Col>
                    </Row>
                ),
            })
        }
    }

    const pagar = () => {
        setModalPaypal(true)
    }
    const handeCancelModal = () => {
        setModalPaypal(false)
    }

    const handleClean = () => {
        setShow(false)
        setCanti(0)
        setProductId(0)
        setImage('')
    }

    const handeCancel = () => {
        setShow(false)
    }
    const showModal = (id: any, cantidad: any, image: any) => {
        setShow(true)
        setCanti(cantidad)
        setProductId(id)
        setImage(image)
    }

    const columns = [
        {
            title: 'Producto',
            dataIndex: 'image',
            key: 'image',
            render: (value: any, record: any) => {
                return (
                    <div className="flex justify-center ">
                        <Image src={value} width={100} height={100} alt={'Producto'} />
                    </div>
                )
            },
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (value: any, record: any) => {
                return (
                    <div className="flex justify-center">
                        <span>{value}</span>
                    </div>
                )
            },
        },

        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
            render: (value: any, record: any) => {
                return (
                    <div className="flex justify-center">
                        <span>${value}</span>
                    </div>
                )
            },
        },

        {
            title: 'Acciones',
            render: (value: any, record: any) => {
                return (
                    <div className="flex justify-center">
                        <Button
                            onClick={() => {
                                showModal(record.id, record.quantity, record.image)
                            }}
                        >
                            Eliminar
                        </Button>
                    </div>
                )
            },
        },
    ]
    const removeFromCart = (productId) => {
        // Obtener el carrito actual del carritoGuardado (si existe)
        const existingCart = JSON.parse(carritoGuardado) || []

        // Encontrar el índice del elemento con el mismo ID en el carrito
        const existingItemIndex = existingCart.findIndex((item: any) => item.id === productId)

        if (existingItemIndex !== -1) {
            // Si existe, eliminar el elemento del carrito
            existingCart.splice(existingItemIndex, 1)

            // Actualizar el carrito en el carritoGuardado
            localStorage.setItem('cart', JSON.stringify(existingCart))

            // También puedes actualizar el estado local del carrito (si es necesario)
            setCart(existingCart)

            // Actualizar el estado local de productosRecuperados
            const carritoGuardado = localStorage.getItem('cart')
            setCarritoGuardado(carritoGuardado)

            setProductosRecuperados(existingCart)
            handleClean()
        }
    }

    const [canridad, setCantidad] = useState(0)
    const handleQuantityChange = (value: any) => {
        setCantidad(value)
    }

    const deleteCantidadProducto = (productId: any) => {
        console.log(canridad)
        const existingCart = JSON.parse(localStorage.getItem('cart')) || []
        const existingItemIndex = existingCart.findIndex((item: any) => item.id === productId)

        console.log(idProd)

        if (existingItemIndex !== -1) {
            existingCart[existingItemIndex].quantity = canridad
            localStorage.setItem('cart', JSON.stringify(existingCart))

            const carritoGuardado = localStorage.getItem('cart')
            setCarritoGuardado(carritoGuardado)

            setProductosRecuperados(existingCart)
            handleClean()
            setCart(existingCart)
        }
    }

    const fetchData = async (productos: any) => {
        try {
            setFetchingPayment(true)
            let response: any = {}
            response = await buyProducts(productos, total, totaProductos)
            console.log('response', response)
            setFetchingPayment(false)

            if (response.error !== '') {
                api.error({
                    message: response.error,
                })
            } else {
                localStorage.removeItem('cart')
                setProductosRecuperados([])
                setCarritoGuardado(null)
                setCart(null)
                router.push('/orders')

                api.success({
                    message: 'Pago realizado',
                    description: 'Ya puedes visualizar la orden.',
                })
            }
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error,
            })
        }
    }

    const paymentApproved = () => {
        fetchData(productosRecuperados)
    }
    const paymentCanceled = () => {
        api.warning({
            message: 'Pago cancelado',
            description: 'El pago no se pudo efectuar, favor de reintentar',
        })
    }

    const login = () => {
        router.push('login')
    }

    return (
        <Layout>
            <div className=" h-screen bg-bluer-100 px-10">
                <div className="py-10 px-10 ">
                    <div className="flex">
                        <div className="w-1/2 mr-4">
                            <h2 className="text-2xl text-center my-3 text-white ">Carrito de compras</h2>
                            <Table
                                rowClassName=""
                                columns={columns}
                                dataSource={productosRecuperados}
                                pagination={{
                                    pageSize: 2, // Establece el tamaño de la paginación a 2
                                }}
                            />
                        </div>
                        <div className="w-1/2  my-12 ml-4 items-center flex justify-center border rounded-md z-0">
                            <>
                                {productosRecuperados ? (
                                    <>
                                        {productosRecuperados.length > 0 ? (
                                            <>
                                                {token ? (
                                                    <div className="w-full px-5 py-5 ">
                                                        <div className="text-xl text-center mb-5">
                                                            <span className="text-4xl text-white">Total: ${total}</span>
                                                        </div>

                                                        <PayPalScriptProvider options={{ components: 'buttons', clientId: 'AfPMP9UGMMHatFve1JsJ2VWoSK13mDnXa8EFrPOlFGLSANnFYfJ8u2mWZ5KRHVF-SgF29HgR68IZ-BGS', currency: 'MXN' }}>
                                                            <PayPalButtons
                                                                style={{ color: 'blue', layout: 'vertical', shape: 'pill', tagline: false }}
                                                                createOrder={async () => {
                                                                    const res = await fetch('/api/paypalProducts', {
                                                                        method: 'POST',
                                                                        body: JSON.stringify({
                                                                            details: productosRecuperados,
                                                                            total: total,
                                                                            quantity: totaProductos,
                                                                        }),
                                                                    })
                                                                    const order = await res.json()
                                                                    return order.id
                                                                }}
                                                                onApprove={async (data, actions) => {
                                                                    console.log(data)
                                                                    await actions.order?.capture()
                                                                    paymentApproved()
                                                                }}
                                                                onCancel={() => {
                                                                    paymentCanceled()
                                                                }}
                                                            />
                                                        </PayPalScriptProvider>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center my-10 text-4xl text-white">
                                                        <span>
                                                            Para continuar tu compra,{' '}
                                                            <span onClick={login} className="text-red-600 underline cursor-pointer hover:text-red-400">
                                                                Inicia sesion
                                                            </span>
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex justify-center my-10 text-4xl text-white">
                                                <span>No hay productos que mostrar</span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex justify-center my-10 text-4xl text-white">
                                        <span>No hay productos que mostrar</span>
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                </div>
            </div>
            <Modal visible={show} onCancel={handeCancel} title={'Eliminar productos'} footer={false}>
                <div className="flex">
                    <div className="w-1/2">
                        <Image src={image} alt={''} width={200} height={200}></Image>
                    </div>
                    <div className="w-1/2 my-auto">
                        <Button
                            className="bg-red-800 w-full text-white my-5"
                            onClick={() => {
                                removeFromCart(idProd)
                            }}
                        >
                            Eliminar todo
                        </Button>

                        {canti > 1 ? (
                            <>
                                <InputNumber className="w-1/2" min={1} defaultValue={canti-1} max={canti-1} onChange={handleQuantityChange}></InputNumber>
                                <Button
                                    onClick={() => {
                                        deleteCantidadProducto(idProd)
                                    }}
                                    className="bg-red-800 w-1/2 text-white "
                                >
                                    Eliminar
                                </Button>
                            </>
                        ) : null}
                    </div>
                </div>
            </Modal>
            {contextHolder}
        </Layout>
    )
}

export default Index
