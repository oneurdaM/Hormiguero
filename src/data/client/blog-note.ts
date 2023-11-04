import { QueryOptionsType } from '@/interfaces'
import { BlogResponse } from '@/types/blog'

import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const blogNotesClient = {
  paginated: ({ ...params }: Partial<QueryOptionsType>) => {
    return HttpClient.get<BlogResponse>(`${API_ENDPOINTS.BLOG}`, {
      ...params,
    })
  },
  bySlug: ({ slug }: { slug: string }) => {
    return HttpClient.get<BlogResponse>(`${API_ENDPOINTS.BLOG}/${slug}`)
  },
}
