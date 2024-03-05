import { getWishList } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export default function useGetWished(list: number[] | []) {
  console.log(list, "list form useReact Query");
  const {
    isLoading,
    data: wishedItems,
    error,
  } = useQuery({
    queryFn: () => getWishList(list),
    queryKey: ["wishList", list],

    enabled: !!list,
  });

  return { wishedItems, isLoading, error };
}
