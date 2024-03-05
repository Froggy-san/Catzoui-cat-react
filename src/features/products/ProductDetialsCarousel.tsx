import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface image {
  id: number;
  image_url: string | null;
  product_id: number | null;
}

const ProductDetialsCarousel = React.forwardRef(function ProductDetialsCarousel(
  {
    imagesUrl,
  }: {
    imagesUrl: image[] | undefined;
  },
  ref?: React.Ref<HTMLDivElement>
) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    api.scrollTo(0, false);
  }, [api, imagesUrl]);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    // api.reInit();

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <Carousel setApi={setApi} className="w-full max-w-3xl xl:max-w-2xl">
        <CarouselContent className="">
          {imagesUrl?.map((image) => (
            <CarouselItem className="" key={image.id}>
              <Card className="">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <img
                    src={image.image_url || ""}
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
  );
});

export default ProductDetialsCarousel;
