import { memo, useEffect } from 'react'
import { useProducts } from './useGetProducts'
import ProductItem from './ProductItem'
import ProductLoading from './ProductLoading'
import ProductMenuBar from './ProductMenuBar'
import Empty from '@/components/shared/Empty'
import { CgSearchLoading } from 'react-icons/cg'
import { ImSad2 } from 'react-icons/im'
import { useInView } from 'react-intersection-observer'

const ProductsList = () => {
  const { ref, inView } = useInView()

  const {
    isFetchingNextPage,
    data,
    fetchNextPage,
    error,
    status,
    hasNextPage,
  } = useProducts()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])

  const products = data?.pages.flatMap((data) => data.products)
  const isLoading = status === 'pending'

  return (
    <div id="c" className="container my-20 px-4 xs:px-8">
      <div className="">
        <ProductMenuBar />
      </div>

      {!products?.length && !isLoading && (
        <Empty
          icon={() => <CgSearchLoading size={25} />}
          message="No products can be found"
        />
      )}
      {!isLoading && error && (
        <Empty
          icon={() => <ImSad2 size={25} />}
          message="Somthing went wrong..."
        />
      )}

      {status === 'error' && (
        <p>
          {error?.message ||
            ` !something went wrong while loading the products, please refresh the
            page.💥💥`}
        </p>
      )}
      <ul className={`product-list grid gap-4 px-0 xs:px-7  sm:px-0`}>
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
        {(isFetchingNextPage || status === 'pending') && <LoadingProduct />}
      </ul>
      <div ref={ref} className=" mt-10">
        {!isFetchingNextPage && !hasNextPage && (
          <p className=" text-center">You have reach the end.</p>
        )}
      </div>
      {/* <Pagination count={count} /> */}
    </div>
  )
}

export default ProductsList

const LoadingProduct = memo(function LoadingProduct() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductLoading key={index} />
      ))}
    </>
  )
})
