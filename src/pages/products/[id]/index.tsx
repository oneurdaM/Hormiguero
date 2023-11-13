import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Carousel } from 'antd'

import Input from '@/components/ui/input'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import { useProductQuery } from '@/data/product'
import Layout from '@/components/layout/layout'
import logo from '@/assets/placeholders/logo.png'
import { IosArrowLeft } from '@/components/icons/ios-arrow-left'
import Button from '@/components/ui/button'

export default function ProductPage() {
  const router = useRouter()
  const {
    query: { id },
  } = router

  const { product, loading, error } = useProductQuery({ id: Number(id) })

  if (loading && !product) {
    return <Loader text="Cargando producto..." />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <Layout>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={'Centro Cultural El Hormiguero'} />
        <meta property="og:image" content={product?.thumbnail ?? logo} />

        <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
        <meta
          name="twitter:description"
          content={'Centro Cultural El Hormgiuero'}
        />
        <meta name="twitter:image" content={product?.thumbnail ?? logo} />
        <meta name="twitter:card" content={product?.thumbnail ?? logo} />
      </Head>
      <div className="container h-auto min-h-screen py-5 lg:flex lg:flex-row justify-between">
        <div className="lg:w-3/5 lg:pr-20">
          <Link href={'/products'}>
            <small className="text-muted flex gap-2 items-center mb-2">
              <IosArrowLeft className="h-3" />
              Volver al catálogo de productos
            </small>
          </Link>
          <Carousel dotPosition="left" autoplay>
            <div>
              <Image
                src={product?.thumbnail ?? logo}
                alt={product.title}
                className="rounded lg:object-contain mb-2 w-full h-auto"
                priority={true}
                width={1024}
                height={1024}
              />
            </div>
            <div>
              <Image
                src={product?.thumbnail ?? logo}
                alt={product.title}
                className="rounded lg:object-contain mb-2 w-full h-auto"
                priority={true}
                width={1024}
                height={1024}
              />
            </div>
          </Carousel>
        </div>
        <div className="lg:w-1/3 flex flex-col gap-4">
          <h1 className="text-4xl">{product.title}</h1>
          <p className="text-lg ">${product.price} MXN</p>
          <p className="text-sm ">{product.description}</p>
          <Input
            label="Cantidad"
            placeholder="Cantidad"
            name="quantiti"
            min={1}
            max={product.stock}
            // {...register('identifier')}
            type="number"
            variant="outline"
            className="mb-4"
            // error={errors?.identifier?.message}
          />
          <Button className="w-full bg-dark text-light hover:bg-gray-700">
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </Layout>
  )
}
