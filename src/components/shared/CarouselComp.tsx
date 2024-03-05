import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '../ui/button'
import { Link } from 'react-scroll'
import { SCROLL_DURATION } from '@/utils/constants'
import Slogan from './Slogan'

const CarouselComp = React.forwardRef(function (
  _,
  ref?: React.Ref<HTMLDivElement>
) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <div ref={ref} className="container mt-5 px-0  transition-all duration-300">
      <Carousel
        opts={{
          align: 'start',
          // loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="h-[65dvh] p-1 md:h-[75dvh]">
              <Card className=" h-full ">
                <CardContent className="relative flex aspect-square h-full w-full items-center justify-center p-0  ">
                  <div className="h-full w-full">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/cat-55.jpg"
                      className="h-full w-full  rounded-lg object-cover"
                      alt="img"
                    />
                    <Slogan />
                    <Link to="c" smooth={true} duration={SCROLL_DURATION}>
                      <Button className="absolute bottom-5 left-5 hover:bg-slate-800 sm:left-16">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="">
            <div className="h-[65dvh] p-1 md:h-[75dvh]">
              <Card className=" h-full ">
                <CardContent className="relative flex aspect-square h-full w-full items-center justify-center p-0  ">
                  <div className="h-full w-full">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/carousel-2.jpg"
                      className="h-full w-full  rounded-lg object-cover"
                      alt="img"
                    />
                    <Slogan />
                    <Link to="c" smooth={true} duration={SCROLL_DURATION}>
                      <Button className="absolute bottom-5 left-5 hover:bg-slate-800 sm:left-16">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="">
            <div className="h-[65dvh] p-1 md:h-[75dvh]">
              <Card className=" h-full ">
                <CardContent className="relative flex aspect-square h-full w-full items-center justify-center p-0  ">
                  <div className="h-full w-full">
                    <img
                      src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/carousel-3.png"
                      className="h-full w-full  rounded-lg object-cover"
                      alt="img"
                    />
                    <Slogan />
                    <Link to="c" smooth={true} duration={SCROLL_DURATION}>
                      <Button className="absolute bottom-5 left-5 hover:bg-slate-800 sm:left-16">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
})

export default CarouselComp
