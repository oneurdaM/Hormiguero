import { useQuery } from '@tanstack/react-query'

import { visitClient } from './client/visit'
import { API_ENDPOINTS } from './client/api-endpoints'
import { VisitsResponse } from '@/types/visits'

export const useVisit = () => {
  const { data, isLoading, error } = useQuery<VisitsResponse, Error>(
    [API_ENDPOINTS.VISITS],
    () => visitClient.register()
  )

  return {
    visitCounter: data ?? [],
    isLoading,
    error,
  }
}
