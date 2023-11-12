import React from 'react'

import { Product } from '@/types/products'
import { MappedPaginatorInfo } from '@/utils/data-mappers'

import ProductCard from './product-card'
import Pagination from '../ui/pagination'
import ErrorMessage from '../ui/error-message'

type ProductsListProps = {
  products: Product[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | any
  onPagination: (page: number) => void
}

function ProductsList({
  products,
  paginatorInfo,
  onPagination,
}: ProductsListProps) {
  if (paginatorInfo?.total === 0) {
    return (
      <ErrorMessage message="Aún no hay ninguna nota o artículo para mostrar" />
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((item) => (
          <ProductCard
            key={item.slug}
            title={item.title}
            href={`/product/${item.slug}/${item.id}`}
            image={item.thumbnail}
            content={item.description}
            price={item.price}
            stock={item.stock}
          />
        ))}
      </div>

      <div className="flex items-center justify-end my-4">
        {!!paginatorInfo?.total && (
          <Pagination
            total={parseInt(paginatorInfo.total.toString())}
            current={parseInt(paginatorInfo.currentPage.toString())}
            pageSize={parseInt(paginatorInfo.perPage.toString())}
            onChange={onPagination}
            className="text-light"
          />
        )}
      </div>
    </>
  )
}

export default ProductsList
