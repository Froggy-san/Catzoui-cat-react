import { useQuery } from '@tanstack/react-query'

import { useSearchParams } from 'react-router-dom'
import { getProductByCategory } from '@/services/apiProducts'

export function useGetProductByCategory(category: string) {
  const [searchParams] = useSearchParams()

  const productId = searchParams.get('product') || ''

  const {
    isLoading,
    data: relatedProducts,
    error: relatedError,
  } = useQuery({
    queryFn: () => getProductByCategory(category, productId),
    queryKey: ['prodcutByCategory', productId],
    // react query retry to fetch the data when ever it fails to do so the first time by defualt, here we are stopping it from doing so.
    retry: false,
    // if there is no category don't run this hook.
    enabled: !!category,
  })

  return { isLoading, relatedProducts, relatedError }
}
