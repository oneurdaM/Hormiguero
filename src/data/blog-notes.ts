import { BlogResponse, Note } from '@/types/blog'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { blogNotesClient } from './client/blog-note'

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type QueryOptionsType = {
  page?: number
  search?: string
  limit?: number
  orderBy?: string
  sortedBy?: SortOrder
}

export const useNotesQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<BlogResponse, Error>(
    [API_ENDPOINTS.BLOG, options],
    () => blogNotesClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    notes: data?.notes as Note[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useNoteQuery = ({ slug }: { slug: string }) => {
  return useQuery<Note, Error>([API_ENDPOINTS.BLOG, slug], () =>
    blogNotesClient.bySlug({ slug })
  )
}
