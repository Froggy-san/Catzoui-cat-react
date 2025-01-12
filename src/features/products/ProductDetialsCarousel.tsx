import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface image {
  id: number
  image_url: string | null
  product_id: number | null
}

const ProductDetialsCarousel = React.forwardRef(function ProductDetialsCarousel(
  {
    imagesUrl,
  }: {
    imagesUrl: image[] | undefined
  },
  ref?: React.Ref<HTMLDivElement>
) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  console.log(current)
  React.useEffect(() => {
    if (!api) return

    api.scrollTo(0, false)
  }, [api, imagesUrl])

  React.useEffect(() => {
    if (!api) {
      return
    }
    // api.reInit();

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="flex  justify-center gap-2">
      <div className="  max-h-full  min-w-[55px]  space-y-2 overflow-y-auto  px-1 py-3    sm:min-w-[70px]">
        {imagesUrl?.map((image, index) => (
          <Card
            onMouseOver={() => api?.scrollTo(index)}
            className={cn(' h-14 w-full  cursor-pointer sm:h-16', {
              ' ring-2 ring-primary ring-offset-2': current - 1 === index,
            })}
            key={image.id}
          >
            <CardContent className="flex  h-full w-full  items-center justify-center p-0 ">
              <img
                src={image.image_url || ''}
                alt="image not found"
                className=" h-full w-full rounded-lg object-contain"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <div ref={ref} className="relative flex   flex-col items-center">
        <Carousel setApi={setApi} className="w-full max-w-3xl xl:max-w-2xl">
          <CarouselContent className="">
            {imagesUrl?.map((image) => (
              <CarouselItem className="" key={image.id}>
                <Card className="">
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <img
                      src={image.image_url || ''}
                      alt="image not found"
                      className=" h-full w-full rounded-lg object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {imagesUrl?.length}
        </div>
      </div>
    </div>
  )
})

export default ProductDetialsCarousel
