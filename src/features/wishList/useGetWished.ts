import { getWishList } from '@/services/apiProducts'
import { useQuery } from '@tanstack/react-query'

export default function useGetWished(list: number[] | []) {

  const {
    isLoading,
    data: wishedItems,
    error,
  } = useQuery({
    queryFn: () => getWishList(list),
    queryKey: ['wishList', list],

    enabled: !!list,
  })

  return { wishedItems, isLoading, error }
}
