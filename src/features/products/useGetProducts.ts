import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/services/apiProducts";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";

export function useProducts() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // filter
  const filterValue = searchParams.get("filter") || "all";

  const filterRange = searchParams.get("range") || "no-range";

  const deals = searchParams.get("deals") || "";

  const sortBy = searchParams.get("sortBy") || "no-sort";
  // pagination

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: products, count } = {},
    error,
  } = useQuery({
    queryKey: ["products", filterValue, filterRange, sortBy, deals, page],

    queryFn: () =>
      getProducts({ filterValue, filterRange, sortBy, deals, page }),
  });

  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 0;

  //prefetching the products in the next page.

  // if the page/the page we are currently on is smaller than the pageCount, that means there are more products to be shown therefore we prefetch it.
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["products", filterValue, filterRange, sortBy, deals, page + 1],

      queryFn: () =>
        getProducts({
          filterValue,
          filterRange,
          sortBy,
          deals,
          page: page + 1,
        }),
    });

  /// prefetching the products in the previous page, just in case the user refreshes the app on pages more then 1.
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["products", filterValue, filterRange, sortBy, deals, page - 1],
      queryFn: () =>
        getProducts({
          filterValue,
          filterRange,
          sortBy,
          deals,
          page: page - 1,
        }),
    });

  return { isLoading, products, error, count };
}
