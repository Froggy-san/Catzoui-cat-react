import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Link } from "react-scroll";
import { SCROLL_DURATION } from "@/utils/constants";
import Slogan from "./Slogan";

const CarouselComp = React.forwardRef(function (
  _,
  ref?: React.Ref<HTMLDivElement>
) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <div ref={ref} className="container mt-5 px-0  transition-all duration-300">
      <Carousel
        opts={{
          align: "start",
          // loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="p-1 h-[65dvh] md:h-[75dvh]">
              <Card className=" h-full ">
                <CardContent className="flex relative p-0 w-full h-full aspect-square items-center justify-center  ">
                  <div className="w-full h-full">
                    <img
                      src=".././public/assets/img/cat-55.jpg"
                      className="w-full h-full  rounded-lg object-cover"
                      alt="img"
                    />
                    <Slogan />
                    <Link to="c" smooth={true} duration={SCROLL_DURATION}>
                      <Button className="absolute left-5 sm:left-16 bottom-5 hover:bg-slate-800">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="">
            <div className="p-1 h-[65dvh] md:h-[75dvh]">
              <Card className=" h-full ">
                <CardContent className="flex relative p-0 w-full h-full aspect-square items-center justify-center  ">
                  <div className="w-full h-full">
                    <img
                      src=".././public/assets/img/carousel-2.jpg"
                      className="w-full h-full  rounded-lg object-cover"
                      alt="img"
                    />
                    <Slogan />
                    <Link to="c" smooth={true} duration={SCROLL_DURATION}>
                      <Button className="absolute left-5 sm:left-16 bottom-5 hover:bg-slate-800">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="">
            <div className="p-1 h-[65dvh] md:h-[75dvh]">
              <Card className=" h-full ">
                <CardContent className="flex relative p-0 w-full h-full aspect-square items-center justify-center  ">
                  <div className="w-full h-full">
                    <img
                      src=".././public/assets/img/carousel-3.png"
                      className="w-full h-full  rounded-lg object-cover"
                      alt="img"
                    />
                    <Slogan />
                    <Link to="c" smooth={true} duration={SCROLL_DURATION}>
                      <Button className="absolute left-5 sm:left-16 bottom-5 hover:bg-slate-800">
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
  );
});

export default CarouselComp;
