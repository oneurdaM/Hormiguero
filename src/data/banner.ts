import { Banner, BannerResponse } from '@/types/banner'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery } from '@tanstack/react-query'
import { QueryOptionsType } from '../types'
import {  bannerClient} from './client/banner'
import { API_ENDPOINTS } from './client/api-endpoints'


export const UsebannerQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<BannerResponse, Error>(
    [API_ENDPOINTS.BANNER, options],
    () => bannerClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  const pagination = {
    total: data?.total ? parseInt(data.total.toString()) : 0,
    currentPage: data?.currentPage ? parseInt(data.currentPage.toString()) : 1,
    totalPages: data?.totalPages ? parseInt(data.totalPages.toString()) : 0,
    perPage: data?.perPage ? parseInt(data.perPage.toString()) : 0,
  }

  return {
    banner: data?.data as Banner[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(pagination as any),
    error,
  }
}
