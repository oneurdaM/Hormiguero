import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { VisitsResponse } from '@/types/visits'

export const visitClient = {
  register: () => {
    return HttpClient.post<VisitsResponse>(API_ENDPOINTS.VISITS, {})
  },
}
