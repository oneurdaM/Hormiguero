import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'
import { SpacePagination } from '@/types/spaces'
import { SpaceByIdResponse } from '../spaces'

export const spaceClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<SpacePagination>(API_ENDPOINTS.SPACES, {
      ...params,
      search: search,
    })
  },
  byID: ({ id }: { id: number }) => {
    return HttpClient.get<SpaceByIdResponse>(`${API_ENDPOINTS.SPACES}/${id}`)
  },
}
