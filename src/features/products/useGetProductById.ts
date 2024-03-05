import { getProductById } from '@/services/apiProducts'
import { useQuery } from '@tanstack/react-query'

export function useGetProductById(id: string) {
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ['product', id],
    // if there is no id don't run the hook.
    enabled: !!id,
  })

  return { isLoading, product, error }
}
