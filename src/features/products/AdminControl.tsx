import { useCallback } from 'react'
import useDeleteFromStorage from './useDeleteStorage'
import { useNavigate } from 'react-router-dom'
import useDeleteProduct from './useDeleteProduct'
import { useDispatch } from 'react-redux'
import { deleteAllRelatedItems } from '../cart/cartSlice'
import { deleteFromWishList } from '../wishList/wishListSlice'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { CiEdit } from 'react-icons/ci'
import { IoMdTrash } from 'react-icons/io'

interface AdminControlProps {
  images: (string | undefined)[] | undefined
  productId: string | null
}

const AdminControl = ({ productId, images }: AdminControlProps) => {
  const { deleteProduct, isDeleting } = useDeleteProduct()
  const { deleteStorage } = useDeleteFromStorage()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDeleteProduct = useCallback(
    function () {
      navigate(-1)
      if (productId)
        deleteProduct(productId, {
          onSuccess: () => {
            toast(`Product with the id of ${productId}`)
            dispatch(deleteAllRelatedItems(+productId))
            dispatch(deleteFromWishList(+productId))
          },
        })
      if (images) deleteStorage(images)
    },
    [productId, deleteProduct, navigate, dispatch, images, deleteStorage]
  )
  return (
    <div className="mt-16 flex flex-col items-center gap-3 rounded-xl px-4 py-6 tracking-wider sm:flex-row">
      <h1 className="text-xl font-semibold">Edit/Delete prodcut:</h1>
      <div className="my-4 space-x-3">
        <Button
          onClick={() => navigate(`edit-product/${productId}`)}
          disabled={isDeleting}
          variant="outline"
          className="w-24 gap-1 rounded-lg bg-[#148364]  tracking-wide text-green-100 hover:bg-[#148364]/40 hover:text-green-700"
        >
          {' '}
          <CiEdit size={20} /> Edit{' '}
        </Button>
        {/*[#148364] [#203433]*/}
        <Button
          disabled={isDeleting}
          onClick={handleDeleteProduct}
          className="w-24 gap-1  rounded-lg
      
      border bg-[#d6293e]  tracking-wide text-red-100 hover:bg-[#d6293e]/40  hover:text-red-500"
        >
          <IoMdTrash size={20} /> Delete
        </Button>
      </div>
    </div>
  )
}

export default AdminControl
