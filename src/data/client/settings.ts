import { QueryOptionsType } from '@/interfaces'
import { Settings } from '@/types/settings'

import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const settingsClient = {
  get: ({ ...params }: Partial<QueryOptionsType>) => {
    return HttpClient.get<Settings>(`${API_ENDPOINTS.SETTINGS}`, {
      ...params,
    })
  },
}
