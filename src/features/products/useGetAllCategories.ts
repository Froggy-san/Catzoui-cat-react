import { getAllCategories } from '@/services/apiProducts'
import { useQuery } from '@tanstack/react-query'

export default function useCategories() {
  const { isLoading, data: allCategories } = useQuery({
    queryFn: getAllCategories,
    queryKey: ['categories'],
  })

  return { isLoading, allCategories }
}
