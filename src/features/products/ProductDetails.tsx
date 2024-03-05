import React, { useCallback, useEffect, useMemo } from 'react'

import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useSetItemFromStorage from '@/hooks/useSetItemFromStorage'

import useDeleteProduct from './useDeleteProduct'
import { useGetProductById } from './useGetProductById'
import { useGetProductByCategory } from './useGetProductByCategory'

import { hasClothKeywords, isItElectronic, randomYear } from '@/utils/helper'

import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '@/features/cart/cartSlice'
import { useUser } from '../authentication/useUser'
import { addRating } from '@/features/wishList/wishListSlice'
import { RootState } from '@/Types/type'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import ProductDetailsLoading from './ProductDetailsLoading'
import ProductDetialsCarousel from './ProductDetialsCarousel'
import Empty from '@/components/shared/Empty'
import CloseButton from '@/components/shared/CloseButton'
import ProductOperations from './ProductOperations'
import StarRating from '@/components/shared/StarRating'
import AccordionItemContent from '@/components/shared/AccordionItemContent'
import EmblaCarousel from './RelatedProductCarousel'
import { DEFAULT_RATING } from '@/utils/constants'
import AdminControl from './AdminControl'
import ProductDescription from '../../components/shared/ProductDescription'
import ProductPrices from './ProductPrices'
import ProductTitle from './ProductTitle'

const ProductDetails = () => {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('product')

  const { product, isLoading, error } = useGetProductById(productId || '')
  const { relatedProducts } = useGetProductByCategory(
    product?.at(0)?.category || ''
  )
  const { isDeleting } = useDeleteProduct()
  const { user } = useUser()

  const cart = useSelector(getCart)
  const { rating } = useSelector((state: RootState) => state.wishList)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ref = React.useRef<HTMLDivElement>(null)

  const productRating = productId
    ? rating.find((el) => el.id === +productId)
    : { rating: 3 }

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  useSetItemFromStorage('rating', rating)

  const random = useMemo(() => {
    return randomYear(2001, 2024)
  }, [productId])

  const sameItemsInCart = useMemo(() => {
    return cart.filter((item) => {
      if (productId) return item.id === +productId
    })
  }, [cart, productId])

  const isItCloth = useMemo(() => {
    if (typeof product !== 'string')
      return hasClothKeywords(
        `${product?.at(0)?.category} ${product?.at(0)?.name} ${
          product?.at(0)?.description
        }`
      )
  }, [product])

  const electronicProduct = useMemo(() => {
    if (typeof product !== 'string')
      return isItElectronic(
        `${product?.at(0)?.category} ${product?.at(0)?.name} ${
          product?.at(0)?.description
        }`
      )
  }, [product])

  const images = product
    ?.at(0)
    ?.ProductImages.map((image) => image.image_url?.split('catzoui/')[1])

  function handleRating(value: number) {
    if (productId) dispatch(addRating({ id: +productId, rating: value }))
  }

  const closeDrawer = useCallback(() => {
    // Create a new URLSearchParams object without the product parameter
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('product')

    // Navigate to the same pathname with the new search string
    navigate({ search: newParams.toString() })
  }, [searchParams, navigate])

  const handleScrollUp = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [ref])

  return (
    <Drawer open={!!productId} onClose={closeDrawer}>
      {/*Please notice how we used the ClickAwayListner which allows us to close the element inside it if we click out side obviously. please note we have a function that does that already it's called useOutsideClick and it works exactly like the ClickAwayListner i commented the hook up there and deleted the ref on the DrawerContant component. */}

      <ClickAwayListener onClickAway={closeDrawer}>
        <DrawerContent className="h-[94dvh] rounded-t-3xl  pb-4 focus:outline-none  ">
          <CloseButton
            className="absolute right-5 top-5 z-50 hidden cursor-pointer md:block"
            onClick={closeDrawer}
          />

          {isLoading && (
            <ProductDetailsLoading className="mb-12 overflow-y-auto px-4 pt-9 md:px-24" />
          )}

          {(!product?.length || error) && !isLoading && (
            <Empty message="Product couldn't be found!!" />
          )}

          {product && product.length && (
            <div
              ref={ref}
              className=" flex h-full  w-full flex-col overflow-y-auto px-4 pt-3 md:px-12   2xl:px-20 "
            >
              <div className="flex flex-col xl:flex-row">
                <ProductDetialsCarousel
                  imagesUrl={product?.at(0)?.ProductImages}
                />

                <div className="flex-1  md:px-3 lg:px-24 xl:pl-14 xl:pr-0 2xl:pl-32">
                  <ProductTitle title={product.at(0)?.name} />

                  <div className="mt-3 flex items-center  justify-between space-x-3 text-sm font-semibold xs:text-base">
                    <ProductPrices
                      price={product?.at(0)?.price_per_unit}
                      discount={product?.at(0)?.discount_amount}
                    />

                    <StarRating
                      defaultRating={productRating?.rating || DEFAULT_RATING}
                      size={20}
                      onSetRating={handleRating}
                    />
                  </div>

                  <ProductDescription
                    handleScrollUp={handleScrollUp}
                    description={product?.at(0)?.description}
                    arrowPositionX="left"
                  />

                  <ProductOperations
                    cartItems={sameItemsInCart || null}
                    isDeleting={isDeleting}
                    product={product.at(0)}
                    className="mt-40"
                    productId={productId}
                  />
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>CHARACTERISTICS</AccordionTrigger>
                      <AccordionContent className="flex flex-col space-y-3 font-semibold">
                        <AccordionItemContent
                          title="Brand"
                          value={product?.at(0)?.brand || '-'}
                        />
                        <AccordionItemContent
                          title="Collection"
                          value={random}
                        />
                        <AccordionItemContent
                          title="Item no."
                          value={product?.at(0)?.id}
                        />
                        {isItCloth ? (
                          <>
                            <AccordionItemContent
                              title="Material"
                              value="Cotton 100%"
                            />
                            <AccordionItemContent
                              title="Care recommendation"
                              value="Machine wash"
                            />
                          </>
                        ) : null}

                        {electronicProduct ? (
                          <>
                            <AccordionItemContent
                              title="Material"
                              value="Matel"
                            />
                            <AccordionItemContent
                              title="Care recommendation"
                              value="refer to warranty"
                            />
                          </>
                        ) : null}

                        <AccordionItemContent
                          title="color"
                          value={product?.at(0)?.color || '-'}
                        />

                        <AccordionItemContent
                          title="Size"
                          value={product?.at(0)?.size || '-'}
                        />
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>PAYMENT & DELIVERY</AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <p>
                          <strong> Payment</strong>: There is only one method of
                          paying and that is{' '}
                          <strong> paying on delivery</strong>. On delivery the
                          customer must sign that they received{' '}
                          <strong>all</strong> ordered product and must make
                          sure that they received the product unbroken nor wrong
                          sized or color.
                        </p>

                        <p>
                          <strong> Delivery</strong>: The ordered product will
                          arrive to your door step in no more than 20 days, if
                          there will be a delay we will make sure that we
                          contact you before hand, if the 20 days has passed and
                          customer service didn't contact you, please contact
                          us.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              <div className=" mt-28 md:px-3 lg:px-24 xl:pl-14 xl:pr-0 2xl:pl-32">
                <h1
                  onClick={() => handleScrollUp()}
                  className="text-xl font-semibold tracking-wider"
                >
                  Related Products
                </h1>
                <EmblaCarousel
                  handleScrollUp={handleScrollUp}
                  slides={[1, 2, 3, 4, 5]}
                  relatedProducts={relatedProducts}
                />
                {!relatedProducts?.length && (
                  <h1 className="text-xl">No related products...</h1>
                )}
              </div>
              {user?.user_metadata.privileges === 'admin' ? (
                <AdminControl images={images} productId={productId} />
              ) : null}
            </div>
          )}
        </DrawerContent>
      </ClickAwayListener>
    </Drawer>
  )
}

export default ProductDetails
