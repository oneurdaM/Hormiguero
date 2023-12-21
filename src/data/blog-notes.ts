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
      keepPreviousData: false,
    }
  )

  const pagination = {
    total: data?.total ? parseInt(data.total.toString()) : 0,
    currentPage: data?.currentPage ? parseInt(data.currentPage.toString()) : 1,
    totalPages: data?.totalPages ? parseInt(data.totalPages.toString()) : 0,
    perPage: data?.perPage ? parseInt(data.perPage.toString()) : 0,
  }

  return {
    notes: data?.notes as Note[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(pagination as any),
    error,
  }
}

export const useNoteQuery = ({ slug }: { slug: string }) => {
  return useQuery<Note, Error>([API_ENDPOINTS.BLOG, slug], () =>
    blogNotesClient.bySlug({ slug })
  )
}
