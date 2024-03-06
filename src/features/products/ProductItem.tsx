import { useState } from 'react'

import { PiHeartStraightFill } from 'react-icons/pi'
import { HeartCrack } from 'lucide-react'
import { toast } from 'sonner'

import { formatCurrency } from '@/utils/helper'
import { useSearchParams } from 'react-router-dom'
import useSetItemFromStorage from '@/hooks/useSetItemFromStorage'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItemToWishList,
  deleteFromWishList,
} from '../wishList/wishListSlice'
import WishButton from './WishButton'
import { RootState } from '@/Types/type'
import StarRating from '@/components/shared/StarRating'
interface ProdcutImage {
  id: number
  image_url: string | null
  product_id?: number | null // change this to number
}
interface Product {
  ProductImages: ProdcutImage[]
  average_rating?: number
  brand: string // add a question mark to make it optional
  category: string
  color: string
  created_at: string
  description: string
  discount_amount: number
  id: number
  name: string
  price_per_unit: number
  size: string
  stock: number
}

const ProductItem = ({ product }: { product: Product }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishList } = useSelector((state: RootState) => state.wishList)
  const [viewedPhoto, setViewedPhoto] = useState(0)

  const dispatch = useDispatch()

  const isWished = wishList.includes(product.id)

  useSetItemFromStorage('wishList', wishList)

  const handleWishList = () => {
    if (isWished) {
      dispatch(deleteFromWishList(product.id))
      toast('You have deleted an item from the wish list', {
        description: (
          <div className="flex items-center space-x-2">
            <span>
              <HeartCrack size={15} />
            </span>
            <span>Item deleted</span>
          </div>
        ),
        action: {
          label: 'Undo',
          onClick: () => dispatch(addItemToWishList(product.id)),
        },
        closeButton: true,
      })
    } else {
      dispatch(addItemToWishList(product.id))
      toast('You have added an item to the wish list', {
        description: (
          <div className="flex items-center space-x-2">
            <span>
              <PiHeartStraightFill size={15} />
            </span>
            <span>Item Added</span>
          </div>
        ),
        action: {
          label: 'Undo',
          onClick: () => dispatch(deleteFromWishList(product.id)),
        },
        closeButton: true,
      })
    }
  }

  function handleShowProduct() {
    searchParams.set('product', `${product.id}`)
    setSearchParams(searchParams)
  }

  return (
    <li className="flex flex-col justify-between  ">
      <div onClick={handleShowProduct} className="cursor-pointer">
        <div
          className="h-[300px] cursor-pointer rounded-xl "
          onMouseEnter={() => setViewedPhoto((curr) => curr + 1)}
          onMouseOut={() => setViewedPhoto((curr) => curr - 1)}
        >
          {product?.ProductImages && product?.ProductImages.length > 1 && (
            <img
              src={product?.ProductImages.at(viewedPhoto)?.image_url || ''}
              alt={product?.name + 'image'}
              className="h-full w-full rounded-xl object-cover"
            />
          )}

          {product?.ProductImages && product?.ProductImages.length === 1 && (
            <img
              src={product?.ProductImages.at(0)?.image_url || ''}
              alt={product?.name + 'image'}
              className="h-full w-full rounded-xl object-cover"
            />
          )}
        </div>
        <p className=" truncate overflow-ellipsis">{product?.name}</p>

        {product.average_rating === 0 && (
          <StarRating
            className="mt-3"
            size={20}
            defaultRating={product?.average_rating}
            readOnly={true}
          />
        )}

        {product?.average_rating && product.average_rating > 0 ? (
          <StarRating
            className="mt-3"
            size={20}
            defaultRating={product?.average_rating}
            readOnly={true}
          />
        ) : null}
      </div>

      <div className="flex items-center justify-between font-semibold">
        {product?.discount_amount === 0 && (
          <span>
            {product?.price_per_unit && formatCurrency(product?.price_per_unit)}
          </span>
        )}

        {product.discount_amount > 0 && (
          <div className="flex gap-1 font-semibold">
            <span className="text-slate-200 line-through">
              {formatCurrency(product?.price_per_unit || 1)}
            </span>
            <span className="bg-red text-red-600">
              {formatCurrency(
                product?.price_per_unit - product?.discount_amount
              )}
            </span>
          </div>
        )}

        <WishButton isWished={isWished} handleWishList={handleWishList} />

        {/* <span
          onClick={handleWishList}
          className="rounded-lg p-[.3rem] bg-oldCatBg cursor-pointer"
          // onMouseEnter={() => setHover(true)}
          // onMouseOut={() => setHover(false)}
          ref={ref as React.LegacyRef<HTMLSpanElement>}
        >
          {hover && isWished && <PiHeartBreakLight size={20} />}
          {hover && !isWished && <PiHeartFill size={20} />}
          {!hover && isWished && <IoMdHeart size={20} />}
          {!hover && !isWished && <CiHeart size={20} />}
        </span> */}
      </div>
    </li>
  )
}

export default ProductItem

