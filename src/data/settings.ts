import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { settingsClient } from './client/settings'

export const useSettingsQuery = () => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.SETTINGS],
    () => settingsClient.get({}),
    {
      onError: (error) => {
        console.log(error)
      },
    }
  )

  return {
    settings: data?.data ?? {},
    error,
    loading: isLoading,
  }
}
