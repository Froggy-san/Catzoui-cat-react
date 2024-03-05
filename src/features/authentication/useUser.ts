import { getCurrentUser } from '@/services/apiAuth'
import { useQuery } from '@tanstack/react-query'

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['user'],
  })

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' }
}
