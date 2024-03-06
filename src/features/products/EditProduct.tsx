import { useGetProductById } from './useGetProductById'
import { useParams } from 'react-router-dom'
import ProductForm from './ProductForm'

const EditProduct = () => {
  const { productId } = useParams()

  const { product, isLoading } = useGetProductById(productId || '')

  

  if (!productId) return <p>Loading...</p>

  return (
    <div>
      {' '}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ProductForm id={productId} product={product?.at(0)} />
      )}
    </div>
  )
}

export default EditProduct
