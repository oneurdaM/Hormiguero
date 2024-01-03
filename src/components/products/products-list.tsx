import React from 'react'

import { Product } from '@/types/products'
import { MappedPaginatorInfo } from '@/utils/data-mappers'

import ProductCard from './product-card'
import Pagination from '../ui/pagination'
import ErrorMessage from '../ui/error-message'
import Loader from '../ui/loader/loader'

type ProductsListProps = {
  products: Product[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | any
  onPagination: (page: number) => void
  loading: boolean
}

function ProductsList({
  products,
  paginatorInfo,
  onPagination,
  loading,
}: ProductsListProps) {
  if (paginatorInfo?.total === 0 && !loading) {
    return (
      <ErrorMessage message="Aún no hay ninguna nota o artículo para mostrar" />
    )
  }

  if (loading) {
    return <Loader text="Cargando..." />
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((item) => (
          <ProductCard
            key={item.slug}
            title={item.title}
            href={`/products/${item.id}`}
            image={item.thumbnailUrl}
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
