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
import ImageMagnifier from '@/components/shared/ImageMagnifier'
import { SlMagnifierAdd } from 'react-icons/sl'

import { Button } from '@/components/ui/button'
import { RiZoomInFill } from 'react-icons/ri'
import { ImZoomIn } from 'react-icons/im'
import { CgZoomIn } from 'react-icons/cg'

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
  const [zoomToggle, setZoomToggle] = React.useState(false)
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const handleKeyPress = React.useCallback(
    (e: KeyboardEvent) => {
      const pressedKey = e.key
      if (pressedKey === 'Escape') setZoomToggle(false)
    },
    [setZoomToggle]
  )
  React.useEffect(() => {
    const body = document.querySelector('body')
    if (body) {
      body.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      if (body) {
        body.removeEventListener('keydown', handleKeyPress)
      }
    }
  }, [handleKeyPress])

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
      <div className=" flex  h-fit  max-h-[200px] min-w-[65px]  max-w-[100px] flex-col  gap-1 xs:max-h-[500px] xs:min-w-[70px] ">
        <div className="    gallary-scroll-bar flex-1 space-y-2 overflow-y-auto  px-2 py-3    ">
          {imagesUrl?.map((image, index) => (
            <Card
              onMouseOver={() => api?.scrollTo(index)}
              className={cn(
                ' transition-ring h-14  w-full cursor-pointer ring-2 ring-transparent  ring-offset-2 duration-500 sm:h-16',
                {
                  ' ring-primary': current - 1 === index,
                }
              )}
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
        <button
          className={cn(
            ' transtion-ring  ring-spacing-10 transtion-ring  mx-auto hidden h-8    w-full items-center justify-center  rounded-md bg-gray-200   font-semibold outline-none ring-[2px] ring-transparent duration-300 hover:bg-gray-300  sm:flex  ',
            { ' bg-gray-300  ring-slate-800': zoomToggle }
          )}
          onClick={() => setZoomToggle((isOn) => !isOn)}
        >
          <CgZoomIn size={25} />
        </button>
      </div>

      <div ref={ref} className="relative flex   flex-col items-center">
        <Carousel setApi={setApi} className="w-full max-w-3xl xl:max-w-2xl">
          <CarouselContent className="">
            {imagesUrl?.map((image, index) => (
              <CarouselItem className="" key={image.id}>
                <Card className="">
                  <CardContent className=" relative flex aspect-square items-center justify-center p-0">
                    <ImageMagnifier
                      allowZoom={zoomToggle}
                      src={image.image_url || ''}
                      className=" h-full w-full rounded-lg object-cover"
                    />
                    {/* {currentImage && current - 1 === index ? (
                      <ImageMagnifier
                        src={currentImage}
                        className=" h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <img
                        src={image.image_url || ''}
                        alt="image not found"
                        className=" h-full w-full rounded-lg object-cover"
                      />
                    )} */}
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
