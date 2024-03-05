import { Button } from "@/components/ui/button";
import { LENGHT_OF_STRING } from "@/utils/constants";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
{
  /* ${
          !isOpen && isBigEnough && "text-ellipsis overflow-clip h-[170px]"
        }  */
}
const ProductDescription = ({
  handleScrollUp,
  description,
  arrowPositionX,
}: {
  description: string | undefined;
  handleScrollUp?: () => void;
  arrowPositionX?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isBigEnough = description && description.length >= LENGHT_OF_STRING;

  const desc =
    isBigEnough && !isOpen
      ? description?.slice(0, LENGHT_OF_STRING) + "..."
      : description;
  console.log(description?.slice(0, LENGHT_OF_STRING));
  return (
    <div className=" relative">
      <p className={`mt-5 text-gray-400 break-words`}>{desc}</p>
      {isBigEnough ? (
        <Button
          onClick={() => {
            setIsOpen((is) => !is);
            // if (isOpen) handleScrollUp();
          }}
          size="icon"
          variant="ghost"
          className={`absolute ${arrowPositionX}-0 bottom-[-45px]`}
        >
          {!isOpen ? <IoIosArrowDown size={20} /> : <IoIosArrowUp size={20} />}
        </Button>
      ) : null}
    </div>
  );
};

export default ProductDescription;
