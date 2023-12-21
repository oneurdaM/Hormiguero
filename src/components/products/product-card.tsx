import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ProductCard({
  title,
  href,
  image,
  content,
  price,
  stock,
}: {
  title: string
  href: string
  image: string
  content: string
  price: string | number
  stock?: string | number
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
        <div className="absolute bottom-0 lg:top-0 lg:left-0 lg:right-0 lg:h-full w-full lg:dark:bg-slate-800 lg:bg-light lg:flex lg:flex-col lg:justify-center lg:items-center lg:opacity-0 lg:hover:opacity-80 lg:transition-opacity lg:duration-500 lg:ease-in lg:dark:text-white lg:text-dark bg-black opacity-50 text-white p-4">
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
