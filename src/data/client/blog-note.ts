import { QueryOptionsType } from '@/interfaces'
import { BlogResponse, Note } from '@/types/blog'

import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const blogNotesClient = {
  paginated: ({ ...params }: Partial<QueryOptionsType>) => {
    return HttpClient.get<BlogResponse>(`${API_ENDPOINTS.BLOG}`, {
      ...params,
    })
  },
  bySlug: ({ slug }: { slug: string }) => {
    return HttpClient.get<Note>(`${API_ENDPOINTS.BLOG}/${slug}`)
  },
}
