import { getSearchResults } from '@/services/apiProducts'
import { useQuery } from '@tanstack/react-query'

export default function useSearchTerm(name: string) {
  const { isLoading, data: seachResults } = useQuery({
    queryFn: () => getSearchResults(name),
    queryKey: ['searchResults', name],

    enabled: !!name,
  })

  return { isLoading, seachResults }
}
