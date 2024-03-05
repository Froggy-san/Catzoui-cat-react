import { memo } from 'react'
import { useProducts } from './useGetProducts'
import ProductItem from './ProductItem'
import ProductLoading from './ProductLoading'
import ProductMenuBar from './ProductMenuBar'
import Pagination from '@/components/shared/Pagination'
import Empty from '@/components/shared/Empty'

import { CgSearchLoading } from 'react-icons/cg'
import { ImSad2 } from 'react-icons/im'

const ProductsList = () => {
  const { isLoading, products, error, count } = useProducts()

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
      <ul className={`product-list grid gap-4 px-0 xs:px-7  sm:px-0`}>
        {isLoading && <LoadingProduct />}
        {!isLoading && error && (
          <p>
            !something went wrong while loading the products, please refresh the
            page.💥💥
          </p>
        )}

        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
      <Pagination count={count} />
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
