import { Product, ProductResponse } from '@/types/products'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery } from '@tanstack/react-query'
import { QueryOptionsType } from '../types'
import { productClient } from './client/product'
import { API_ENDPOINTS } from './client/api-endpoints'

export type ProductByIdResponse = {
  product: Product
  message: string
}

export const useProductsQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<ProductResponse, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    () => productClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    products: data?.data as Product[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useProductQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<ProductByIdResponse, Error>(
    [API_ENDPOINTS.PRODUCTS, id],
    () => productClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    product: data,
    loading: isLoading,
    error,
  }
}
