import { useQuery } from '@tanstack/react-query'
import { fetchDashboardData } from '../services/dashboard.services'

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}