import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-scroll'
import { SCROLL_DURATION } from '@/utils/constants'

const CarouselCat = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleSetFilter(value: string) {
    searchParams.set('filter', value)
    setSearchParams(searchParams)
  }

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )
  return (
    <div className="container my-20 flex flex-col items-center justify-center  px-0">
      {' '}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full "
      >
        <CarouselContent className="-ml-1  select-none pl-2 pr-3 sm:pr-8 md:pr-0">
          <CarouselItem className="pl-1 sm:basis-1/2    lg:basis-1/3   xl:basis-1/4">
            <Link to="c" smooth={true} duration={SCROLL_DURATION}>
              <div
                onClick={() => handleSetFilter('electronics')}
                className="w-full  cursor-pointer p-1"
              >
                <Card className="h-[550px] w-full sm:h-[680px] ">
                  <CardContent className=" relative aspect-square h-full w-full items-center justify-center p-0">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/cat-electronics.jpg"
                      alt="category-img"
                      className="h-full w-full rounded-lg object-cover"
                    />

                    <span className=" absolute bottom-0 left-0 flex w-full items-center  justify-center rounded-bl-lg rounded-br-lg bg-gray-50/50  text-2xl font-semibold backdrop-blur-xl  ">
                      Electronics
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>

          <CarouselItem className="pl-1 sm:basis-1/2    lg:basis-1/3   xl:basis-1/4">
            <Link to="c" smooth={true} duration={SCROLL_DURATION}>
              <div
                onClick={() => handleSetFilter('clothing')}
                className="w-full  cursor-pointer p-1"
              >
                <Card className="h-[550px] w-full sm:h-[680px] ">
                  <CardContent className=" relative aspect-square h-full w-full items-center justify-center p-0">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/cat-clothing.jpg"
                      alt="category-img"
                      className="h-full w-full rounded-lg object-cover"
                    />

                    <span className=" absolute bottom-0 left-0 flex w-full items-center  justify-center rounded-bl-lg rounded-br-lg bg-gray-50/50  text-2xl font-semibold backdrop-blur-xl">
                      Fashion
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>

          <CarouselItem className="pl-1 sm:basis-1/2    lg:basis-1/3   xl:basis-1/4">
            <Link to="c" smooth={true} duration={SCROLL_DURATION}>
              <div
                onClick={() => handleSetFilter('books')}
                className="w-full  cursor-pointer p-1"
              >
                <Card className="h-[550px] w-full sm:h-[680px] ">
                  <CardContent className=" relative aspect-square h-full w-full items-center justify-center p-0">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/cat-books.jpg"
                      alt="category-img"
                      className="h-full w-full rounded-lg object-cover"
                    />

                    <span className=" absolute bottom-0 left-0 flex w-full items-center  justify-center rounded-bl-lg rounded-br-lg bg-gray-50/50  text-2xl font-semibold backdrop-blur-xl">
                      Books
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>

          <CarouselItem className="pl-1 sm:basis-1/2    lg:basis-1/3   xl:basis-1/4">
            <Link to="c" smooth={true} duration={SCROLL_DURATION}>
              <div
                onClick={() => handleSetFilter('utensils')}
                className="w-full  cursor-pointer p-1"
              >
                <Card className="h-[550px] w-full sm:h-[680px] ">
                  <CardContent className=" relative aspect-square h-full w-full items-center justify-center p-0">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/cat-utensils.webp"
                      alt="category-img"
                      className="h-full w-full rounded-lg object-cover"
                    />

                    <span className=" absolute bottom-0 left-0 flex w-full items-center  justify-center rounded-bl-lg rounded-br-lg bg-gray-50/50  text-2xl font-semibold backdrop-blur-xl">
                      Utensils
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>

          <CarouselItem className="pl-1 sm:basis-1/2    lg:basis-1/3   xl:basis-1/4">
            <Link to="c" smooth={true} duration={SCROLL_DURATION}>
              <div
                onClick={() => handleSetFilter('furniture')}
                className="w-full  cursor-pointer p-1"
              >
                <Card className="h-[550px] w-full sm:h-[680px] ">
                  <CardContent className=" relative aspect-square h-full w-full items-center justify-center p-0">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/cat-furniture.jpg"
                      alt="category-img"
                      className="h-full w-full rounded-lg object-cover"
                    />

                    <span className=" absolute bottom-0 left-0 flex w-full items-center  justify-center rounded-bl-lg rounded-br-lg bg-gray-50/50  text-2xl font-semibold backdrop-blur-xl">
                      Furniture
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>

          <CarouselItem className="pl-1 sm:basis-1/2    lg:basis-1/3   xl:basis-1/4">
            <Link to="c" smooth={true} duration={SCROLL_DURATION}>
              <div
                onClick={() => handleSetFilter('groceries')}
                className="w-full  cursor-pointer p-1"
              >
                <Card className="h-[550px] w-full sm:h-[680px] ">
                  <CardContent className=" relative aspect-square h-full w-full items-center justify-center p-0">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/cat-groceries.jpg"
                      alt="category-img"
                      className="h-full w-full rounded-lg object-cover"
                    />

                    <span className=" absolute bottom-0 left-0 flex w-full items-center  justify-center rounded-bl-lg rounded-br-lg bg-gray-50/50  text-2xl font-semibold backdrop-blur-xl">
                      Groceries
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>

          <CarouselItem className="pl-1 sm:basis-1/2    lg:basis-1/3   xl:basis-1/4">
            <Link to="c" smooth={true} duration={SCROLL_DURATION}>
              <div
                onClick={() => handleSetFilter('medicine')}
                className="w-full  cursor-pointer p-1"
              >
                <Card className="h-[550px] w-full sm:h-[680px] ">
                  <CardContent className=" relative aspect-square h-full w-full items-center justify-center p-0">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/cat-medicine.jpg"
                      alt="category-img"
                      className="h-full w-full rounded-lg object-cover"
                    />

                    <span className=" absolute bottom-0 left-0 flex w-full items-center  justify-center rounded-bl-lg rounded-br-lg bg-gray-50/50  text-2xl font-semibold backdrop-blur-xl">
                      Medicine
                    </span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CarouselCat
