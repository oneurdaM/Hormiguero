import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Card from '../common/card'

function ProductCard({
  title,
  href,
  image,
  content,
  price,
  stock,
}: //   createdAt,
//   author,
//   category,
{
  title: string
  href: string
  image: string
  content: string
  price: string | number
  stock?: string | number
  //   createdAt: string | Date
  //   author: string | number
  //   category: string | number
}) {
  return (
    <div className="my-2">
      <Link href={href} className="relative">
        <Image
          src={image}
          alt={title}
          className="rounded aspect-1 object-cover block"
          width={500}
          height={300}
        />
        <div className="absolute bottom-0 top-0 left-0 right-0 h-full w-full dark:bg-slate-800 bg-light flex flex-col justify-center items-center opacity-0 hover:opacity-80 transition-opacity duration-500 ease-in dark:text-white text-dark">
          <h5>{title}</h5>
          <div>
            <small>{stock} aún disponibles</small>
          </div>
          <div>
            <small>${price} por pieza</small>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
