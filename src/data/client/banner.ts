import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'
import { BannerResponse } from '@/types/banner'

export const bannerClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<BannerResponse>(API_ENDPOINTS.BANNER, {
      ...params,
      search: search,
    })
  },


}
