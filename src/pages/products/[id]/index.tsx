//@ts-nocheck
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Carousel, Form, InputNumber, notification } from 'antd'
import * as yup from 'yup'

import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'
import Input from '@/components/ui/input'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import { useProductQuery } from '@/data/product'
import Layout from '@/components/layout/layout'
import logo from '@/assets/placeholders/logo.png'
import { IosArrowLeft } from '@/components/icons/ios-arrow-left'
import Button from '@/components/ui/button'
import { CartContext } from '@/context/CarContext'

const addToCartFormSchema = yup.object().shape({
    quantity: yup.number().required('Este campo es obligatorio'),
})

export default function ProductPage() {
    const [cart, setCart] = useContext(CartContext)

    const { token, permissions } = getAuthCredentials()
    const router = useRouter()
    const {
        query: { id },
    } = router
    const isAuth = isAuthenticated({ token, permissions })
    const [quantity, setQuantity] = useState(1)

    const { product, loading, error } = useProductQuery({ id: Number(id) })

    console.log(product)

    if (loading && !product) {
        return <Loader text="Cargando producto..." />
    }

    if (error) {
        return <ErrorMessage message={error.message} />
    }

    function onSubmit({ quantity }: { quantity: number }) {
        // if (!isAuth) {
        //   router.push('/login')
        // }
    }

    const addToCart = () => {
        const newCartItem = {
            id: product.id,
            quantity: parseInt(quantity),
            price: product.price,
            image: product.thumbnailUrl,
            name: product.title,
        }

        // Obtener el carrito actual del localStorage (si existe)
        const existingCart = JSON.parse(localStorage.getItem('cart')) || []

        // Verificar si ya existe un elemento con el mismo ID en el carrito
        const existingItemIndex = existingCart.findIndex((item) => item.id === newCartItem.id)

        if (existingItemIndex !== -1) {
            // Si existe, sumar la cantidad en lugar de agregar un nuevo elemento
            existingCart[existingItemIndex].quantity += newCartItem.quantity
        } else {
            // Si no existe, agregar el nuevo artículo al carrito
            existingCart.push(newCartItem)
        }

        // Actualizar el carrito en el localStorage
        localStorage.setItem('cart', JSON.stringify(existingCart))

        // También puedes actualizar el estado local del carrito si es necesario
        setCart(existingCart)

        notification.info({
            message: 'Producto agregado correctamente',
            duration: 3,
            placement: 'bottomRight',
        })
    }

    const handleQuantity = (value: any) => {
        setQuantity(value)
    }

    return (
        <Layout>
            <Head>
                <title>{product.title}</title>
                <meta name="description" content={'Centro Cultural El Hormiguero'} />
                <meta property="og:image" content={product?.thumbnail ?? logo} />

                <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
                <meta name="twitter:description" content={'Centro Cultural El Hormgiuero'} />
                <meta name="twitter:image" content={product?.thumbnail ?? logo} />
                <meta name="twitter:card" content={product?.thumbnail ?? logo} />
            </Head>
            <div className="  bg-[#014154] dark:bg-black dark:bg-opacity-20  py-10 lg:py-0">
                <div className="container h-auto min-h-screen  ">
                    <div className="lg:flex justify-center items-center">
                        <div className="lg:w-3/5 lg:pr-20 mt-10 ">
                            <Link href={'/products'}>
                                <small className="text-muted flex gap-2 items-center mb-2">
                                    <IosArrowLeft className="h-3" />
                                    Volver al catálogo de productos
                                </small>
                            </Link>

                            <div className="flex justify-center bg-white p-20 rounded-md dark:bg-bluer-100">
                                <Image src={product?.thumbnailUrl ?? logo} alt={product.title} className="rounded lg:object-contain mb-2 " priority={true} width={500} height={500} />
                            </div>
                            {/* <Carousel dotPosition="left" autoplay>
                        <div>
                            <Image src={product?.thumbnailUrl ?? logo} alt={product.title} className="rounded lg:object-contain mb-2 " priority={true} width={300} height={300} />
                        </div>
                        <div>
                            <Image src={product?.thumbnailUrl ?? logo} alt={product.title} className="rounded lg:object-contain mb-2 " priority={true} width={300} height={300} />
                        </div>
                    </Carousel> */}
                        </div>

                        <div className="lg:w-1/3 flex flex-col gap-4 border-2 rounded-md p-10 lg:mt-0 mt-10 ">
                            <h1 className="text-4xl text-[#5bf1fa] ">{product.title}</h1>
                            <p className="text-lg text-gray-200 ">
                                <span className="absolute">$ </span>
                                <span className="text-4xl ml-3">{product.price} </span>MXN
                            </p>
                            <p className="text-sm text-gray-300 text-justify">{product.description}</p>

                            <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Form.Item name="quantity" label={<span className="text-xl text-[#5bf1fa]">Cantidad</span>}>
                                    <InputNumber defaultValue={1} max={product.stock} className="w-full" onChange={handleQuantity} />
                                </Form.Item>
                                {/* <Input
                                            label={<span className='text-xl text-[#5bf1fa]'>Cantidad</span>}
                                            placeholder="Cantidad"
                                            defaultValue={1}
                                            min={1}
                                            max={product.stock}
                                            {...register('quantity')}
                                            type="number"
                                            variant="outline"
                                            className="mb-4"
                                            onChange={(e) => {
                                                setQuantity(e.target.value)
                                            }}
                                            error={errors?.quantity?.message?.toString()}
                                        /> */}

                                <Button
                                    className="w-full bg-dark dark:bg-bluer-100 dark:hover:bg-[#006a7e] text-light hover:bg-gray-700"
                                    onClick={() => {
                                        addToCart()
                                    }}
                                >
                                    Agregar al Carrito
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
