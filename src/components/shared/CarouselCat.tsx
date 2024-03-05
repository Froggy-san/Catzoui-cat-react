import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-scroll";
import { SCROLL_DURATION } from "@/utils/constants";

const CarouselCat = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSetFilter(value: string) {
    searchParams.set("filter", value);
    setSearchParams(searchParams);
  }

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  return (
    <div className="flex container flex-col my-20 justify-center items-center  px-0">
      {" "}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full "
      >
        <CarouselContent className="-ml-1  pl-2 pr-3 sm:pr-8 md:pr-0">
          <CarouselItem className="pl-1 sm:basis-1/2    lg:basis-1/3   xl:basis-1/4">
            <Link to="c" smooth={true} duration={SCROLL_DURATION}>
              <div
                onClick={() => handleSetFilter("electronics")}
                className="p-1  w-full cursor-pointer"
              >
                <Card className="w-full h-[550px] sm:h-[680px] ">
                  <CardContent className=" relative h-full w-full aspect-square items-center justify-center p-0">
                    <img
                      src="./public/assets/img/cat-electronics.jpg"
                      alt="category-img"
                      className="w-full h-full object-cover rounded-lg"
                    />

                    <span className=" flex items-center justify-center text-2xl bg-gray-50/50 w-full  absolute bottom-0 left-0 font-semibold text-teal-600 backdrop-blur-xl rounded-br-lg rounded-bl-lg">
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
                onClick={() => handleSetFilter("clothing")}
                className="p-1  w-full cursor-pointer"
              >
                <Card className="w-full h-[550px] sm:h-[680px] ">
                  <CardContent className=" relative h-full w-full aspect-square items-center justify-center p-0">
                    <img
                      src="./public/assets/img/cat-clothing.jpg"
                      alt="category-img"
                      className="w-full h-full object-cover rounded-lg"
                    />

                    <span className=" flex items-center justify-center text-2xl bg-gray-50/50 w-full  absolute bottom-0 left-0 font-semibold text-teal-600 backdrop-blur-xl rounded-br-lg rounded-bl-lg">
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
                onClick={() => handleSetFilter("books")}
                className="p-1  w-full cursor-pointer"
              >
                <Card className="w-full h-[550px] sm:h-[680px] ">
                  <CardContent className=" relative h-full w-full aspect-square items-center justify-center p-0">
                    <img
                      src="./public/assets/img/cat-books.jpg"
                      alt="category-img"
                      className="w-full h-full object-cover rounded-lg"
                    />

                    <span className=" flex items-center justify-center text-2xl bg-gray-50/50 w-full  absolute bottom-0 left-0 font-semibold text-teal-600 backdrop-blur-xl rounded-br-lg rounded-bl-lg">
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
                onClick={() => handleSetFilter("utensils")}
                className="p-1  w-full cursor-pointer"
              >
                <Card className="w-full h-[550px] sm:h-[680px] ">
                  <CardContent className=" relative h-full w-full aspect-square items-center justify-center p-0">
                    <img
                      src="./public/assets/img/cat-utensils.webp"
                      alt="category-img"
                      className="w-full h-full object-cover rounded-lg"
                    />

                    <span className=" flex items-center justify-center text-2xl bg-gray-50/50 w-full  absolute bottom-0 left-0 font-semibold text-teal-600 backdrop-blur-xl rounded-br-lg rounded-bl-lg">
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
                onClick={() => handleSetFilter("furniture")}
                className="p-1  w-full cursor-pointer"
              >
                <Card className="w-full h-[550px] sm:h-[680px] ">
                  <CardContent className=" relative h-full w-full aspect-square items-center justify-center p-0">
                    <img
                      src="./public/assets/img/cat-furniture.jpg"
                      alt="category-img"
                      className="w-full h-full object-cover rounded-lg"
                    />

                    <span className=" flex items-center justify-center text-2xl bg-gray-50/50 w-full  absolute bottom-0 left-0 font-semibold text-teal-600 backdrop-blur-xl rounded-br-lg rounded-bl-lg">
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
                onClick={() => handleSetFilter("groceries")}
                className="p-1  w-full cursor-pointer"
              >
                <Card className="w-full h-[550px] sm:h-[680px] ">
                  <CardContent className=" relative h-full w-full aspect-square items-center justify-center p-0">
                    <img
                      src="./public/assets/img/cat-groceries.jpg"
                      alt="category-img"
                      className="w-full h-full object-cover rounded-lg"
                    />

                    <span className=" flex items-center justify-center text-2xl bg-gray-50/50 w-full  absolute bottom-0 left-0 font-semibold text-teal-600 backdrop-blur-xl rounded-br-lg rounded-bl-lg">
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
                onClick={() => handleSetFilter("medicine")}
                className="p-1  w-full cursor-pointer"
              >
                <Card className="w-full h-[550px] sm:h-[680px] ">
                  <CardContent className=" relative h-full w-full aspect-square items-center justify-center p-0">
                    <img
                      src="./public/assets/img/cat-medicine.jpg"
                      alt="category-img"
                      className="w-full h-full object-cover rounded-lg"
                    />

                    <span className=" flex items-center justify-center text-2xl bg-gray-50/50 w-full  absolute bottom-0 left-0 font-semibold text-teal-600 backdrop-blur-xl rounded-br-lg rounded-bl-lg">
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
  );
};

export default CarouselCat;
