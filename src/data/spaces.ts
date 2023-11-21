import { Space, SpacesResponse } from '@/types/spaces'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery } from '@tanstack/react-query'
import { QueryOptionsType } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { spaceClient } from './client/space'

export type SpaceByIdResponse = {
  space: Space
  message: string
}

export const useSpacesQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<any, Error>(
    [API_ENDPOINTS.SPACES, params],
    () => spaceClient.paginated(params),
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
    spaces: data?.data as SpacesResponse[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(pagination as any),
    error,
  }
}

export const useSpaceQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<SpaceByIdResponse, Error>(
    [API_ENDPOINTS.SPACES, id],
    () => spaceClient.byID({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    space: data,
    loading: isLoading,
    error,
  }
}
