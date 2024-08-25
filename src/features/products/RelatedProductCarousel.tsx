import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { flushSync } from 'react-dom'

import { formatCurrency } from '@/utils/helper'
import { useSearchParams } from 'react-router-dom'
import { useGetProductByCategory } from './useGetProductByCategory'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const TWEEN_FACTOR = 1.2

interface RelatedProdcutsProps {
  ProductImages: { image_url: string | null }[]

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

type PropType = {
  slides: number[]
  handleScrollUp: () => void
  options?: EmblaOptionsType
  category?: string
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, category, handleScrollUp } = props
  const { relatedProducts, isLoading } = useGetProductByCategory(category || '')
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [tweenValues, setTweenValues] = useState<number[]>([])

  const [searchParams, setSearchParams] = useSearchParams()

  function handleShowProduct(value: number) {
    searchParams.set('product', `${value}`)
    setSearchParams(searchParams)
    // navigate(`/?product=${value}`);
  }

  const onScroll = useCallback(() => {
    if (!emblaApi) return

    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      return diffToTarget * (-1 / TWEEN_FACTOR) * 100
    })
    setTweenValues(styles)
  }, [emblaApi, setTweenValues])

  useEffect(() => {
    if (!emblaApi) return
    onScroll()
    emblaApi.on('scroll', () => {
      flushSync(() => onScroll())
    })
    emblaApi.on('reInit', onScroll)
  }, [emblaApi, onScroll])

  if (isLoading)
    return (
      <div className=" flex items-center justify-center">
        <div className="flex h-[100px] w-[100px]  flex-col items-center justify-center rounded-xl bg-oldCatBg  px-3 py-5 ">
          <AiOutlineLoading3Quarters className=" animate-spin" size={50} />
          <h1>Loading...</h1>
        </div>
      </div>
    )

  if (!relatedProducts?.length)
    return <h1 className="mt-7 text-xl  ">No related products...</h1>
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {relatedProducts &&
            relatedProducts.map((product, index) => (
              <div className="embla__slide cursor-pointer" key={index}>
                <div className="embla__slide__number"></div>
                <div className="embla__parallax rounded-lg">
                  <div
                    className="embla__parallax__layer"
                    style={{
                      ...(tweenValues.length && {
                        transform: `translateX(${tweenValues[index]}%)`,
                      }),
                    }}
                  >
                    <div
                      onClick={() => {
                        handleScrollUp()
                        handleShowProduct(product.id)
                      }}
                    >
                      <img
                        className="embla__slide__img embla__parallax__img rounded-lg"
                        src={product?.ProductImages[0]?.image_url || ''}
                        alt={product?.name || ''}
                      />
                      {/* <p className="absolute top-0 left-0 w-[150px] h-12 bg-oldCatBg/50 font-semibold backdrop-blur-xl flex items-center  rounded-xl px-4 break-keep truncate overflow-ellipsis">
                        { product.name} 
                      </p> */}

                      <div className="absolute bottom-3 right-3  flex gap-3 rounded-full bg-oldCatBg px-3 py-5 font-semibold">
                        <span
                          className={`${
                            product.discount_amount > 0 &&
                            'text-slate-300 line-through'
                          } `}
                        >
                          {formatCurrency(product.price_per_unit)}
                        </span>{' '}
                        <span className="text-red-600">
                          {product.discount_amount === 0
                            ? ''
                            : formatCurrency(product.discount_amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
