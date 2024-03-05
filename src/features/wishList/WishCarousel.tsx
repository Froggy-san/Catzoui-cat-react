import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./WishCarouselDots";

import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  images: (string | null)[] | undefined;
};

const WishCarousel: React.FC<PropType> = (props) => {
  const { options, images } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="embla_wish relative flex-1">
      <div className="embla__viewport_wish" ref={emblaRef}>
        <div className="embla__container_wish h-[450px] md:h-[500px]">
          {images &&
            images.map((image, index) => (
              <div className="embla__slide_wish" key={index}>
                <img
                  src={image || ""}
                  alt="asdsa"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="embla__controls_wish">
        <div className="embla__dots px-2 py-1 rounded-lg  gap-3 absolute bottom-0 bg-secondary/60 backdrop-blur-3xl">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishCarousel;
