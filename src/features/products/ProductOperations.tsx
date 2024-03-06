import { useCallback, useEffect, useMemo, useState } from 'react'
import WishButton from './WishButton'
import { RiShoppingBag3Line } from 'react-icons/ri'
import { Button } from '@/components/ui/button'
import {
  addItemToWishList,
  deleteFromWishList,
} from '@/features/wishList/wishListSlice'
import { toast } from 'sonner'
import { HeartCrack } from 'lucide-react'
import useSetItemFromStorage from '@/hooks/useSetItemFromStorage'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, cartItem } from '@/Types/type'
import { PiHeartStraightFill } from 'react-icons/pi'
import { LuShoppingBasket } from 'react-icons/lu'

import { CiDeliveryTruck } from 'react-icons/ci'

import { TiArrowSortedUp } from 'react-icons/ti'
import { TiArrowSortedDown } from 'react-icons/ti'
// import { CiTrash } from "react-icons/ci";
import { TiShoppingCart } from 'react-icons/ti'

import { addItem } from '@/features/cart/cartSlice'
import { Link } from 'react-router-dom'
import { formatCurrency } from '@/utils/helper'
import Size from './Size'
import { FaRegWindowClose } from 'react-icons/fa'

interface images {
  id: number
  image_url: string | null
  product_id: number | null
}

interface Product {
  ProductImages: images[] | undefined | null
  average_rating: number
  brand: string
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

interface ProductOperationProps {
  productId: string | null | undefined
  className?: string
  product: Product | undefined
  cartItems?: cartItem[] | null | undefined
  isDeleting?: boolean
}

const ProductOperations = ({
  isDeleting,
  productId,
  className,
  product,
  cartItems,
}: ProductOperationProps) => {
  const initalSize =
    (product && product?.size?.replace(/ /g, '').split(',').at(0)) || ''
  const initalColor =
    (product && product?.color?.replace(/ /g, '').split(',').at(0)) || ''

  const [chosenSize, setChosenSize] = useState(initalSize)
  const [chosenColor, setChosenColor] = useState(initalColor)
  const [count, setCount] = useState(1)
  const { wishList } = useSelector((state: RootState) => state.wishList)
  const dispatch = useDispatch()

  let isWished: boolean = false

  // get the total quantity of the same product bought in cart.
  const quantityInCart = useMemo(() => {
    if (cartItems)
      return cartItems.reduce((sum, currEl) => sum + currEl.quantity, 0)
  }, [cartItems])

  // check if it === the amount of stock available of the same product.
  const allBought =
    quantityInCart && product ? quantityInCart >= product?.stock : false

  // check if the item is in the wish list.
  if (productId) {
    isWished = wishList.includes(+productId)
  }

  useSetItemFromStorage('wishList', wishList)

  useEffect(() => {
    setChosenColor(initalColor)
    setChosenSize(initalSize)
  }, [productId])

  function handleInc() {
    if (count === product?.stock) return
    if (quantityInCart && product && quantityInCart + count >= product?.stock)
      return toast('Amount acceeded', {
        description: (
          <div className="flex items-center space-x-2">
            <span>
              <FaRegWindowClose size={15} />
            </span>
            <span>You have exceeded the available amount</span>
          </div>
        ),

        closeButton: true,
      })

    setCount((count) => count + 1)

    // if (productId) dispatch(increaseQuantity(+productId));
  }

  function handleDec() {
    if (count === 1) return
    setCount((count) => count - 1)
    // if (productId) dispatch(decreaseQuantity(+productId));
    /// you are probably wondering why do we check if the quanitiy is 1 , that is becasue the handleDec function will dec the quantity and right away check for the value, not update the state right away, so when ever the fucnton finishs executing  the state updates, so the quantity  here  inside the function is a stale state so we check if the quantitiy is bigger than actual state amount, if what am saying doesn't make sense , console.log(cartItem.quantity) once inside the dec function and once out side of the fucntion .
    // if (cartItem?.quantity === 1) {
    //   deleteToast();
    //   // setChosenSize("");
    //   // setChosenColor("");
    // }
  }

  const handleWishList = () => {
    if (isWished && productId) {
      dispatch(deleteFromWishList(+productId))
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
          onClick: () => dispatch(addItemToWishList(+productId)),
        },
        closeButton: true,
      })
    }

    if (!isWished && productId) {
      dispatch(addItemToWishList(+productId))
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
          onClick: () => dispatch(deleteFromWishList(+productId)),
        },
        closeButton: true,
      })
    }
  }

  function handleAddToCart() {
    dispatch(
      addItem({
        ...product,
        color: chosenColor || initalColor,
        size: chosenSize || initalSize,
        quantity: count,
        itemId: crypto.randomUUID(),
        totalPriceAfterDiscount:
          1 *
          ((product?.price_per_unit || 0) - (product?.discount_amount || 0)),
        totalPriceWithoutDiscount: 1 * (product?.price_per_unit || 0),
      })
    )

    setCount(1)
    // setChosenColor(initalColor);
    // setChosenSize(initalSize);
    toast('Item has been added to your shopping cart', {
      description: (
        <div className="flex items-center space-x-2">
          <span>
            <LuShoppingBasket size={15} />
          </span>
          <span>Item Added</span>
        </div>
      ),

      closeButton: true,
    })
  }

  const handleChangeSize = useCallback(function (size: string) {
    setChosenSize(size)
  }, [])
  const handleChangeColor = useCallback(function (color: string) {
    setChosenColor(color)
  }, [])
  return (
    <>
      <Size
        className="mt-12"
        chosenColor={chosenColor}
        handleChangeColor={handleChangeColor}
        chosenSize={chosenSize}
        handleChange={handleChangeSize}
        prodcutSizes={product?.size || null}
        productColors={product?.color || null}
      />

      <div className={`flex items-center space-x-2 ${className}`}>
        {cartItems?.length ? (
          <div className="flex flex-1 flex-col gap-3 xs:mr-6  sm:flex-row">
            <Button
              disabled={isDeleting || allBought}
              className="flex-1 gap-3"
              onClick={handleAddToCart}
            >
              <RiShoppingBag3Line size={20} />{' '}
              {allBought ? 'Out of stock' : 'Add to cart'}
            </Button>

            <Button
              variant="secondary"
              disabled={isDeleting}
              className="w-full p-0  sm:w-[130px]"
            >
              <Link
                to="cart"
                className="flex  h-full w-full items-center justify-center gap-3 px-4 py-2 tracking-wide"
              >
                <TiShoppingCart size={20} /> Go to cart
              </Link>
            </Button>
          </div>
        ) : (
          <Button
            disabled={isDeleting}
            className=" flex-1 gap-3 md:mr-8  xl:mr-1"
            onClick={handleAddToCart}
          >
            <RiShoppingBag3Line size={20} /> Add to cart
          </Button>
        )}

        <div className="flex flex-col items-center ">
          <Button
            variant="ghost"
            size="icon"
            className="h-[30px]"
            onClick={handleInc}
            disabled={isDeleting || allBought}
          >
            <TiArrowSortedUp size={19} />
          </Button>
          <span className={`${allBought && 'opacity-80'}`}>{count}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-[30px]"
            onClick={handleDec}
            disabled={isDeleting || allBought}
          >
            <TiArrowSortedDown size={19} />
          </Button>
        </div>

        <WishButton
          className="p-[.5rem]"
          iconSize={23}
          handleWishList={handleWishList}
          isWished={isWished}
        />
      </div>

      <div className="mt-3 flex items-center justify-between  text-xs   font-semibold   sm:text-base">
        <div className="flex items-center space-x-3 ">
          {' '}
          <CiDeliveryTruck size={20} />
          <p>Free delivery on orders over {formatCurrency(300)}</p>
        </div>
        <span className="text-xs">
          <span className=" text-red-600">Stock:</span> {product?.stock}
        </span>
      </div>
    </>
  )
}

export default ProductOperations
