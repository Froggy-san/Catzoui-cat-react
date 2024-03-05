import React from "react";
import { PiHeartBreakLight, PiHeartFill } from "react-icons/pi";

import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import useHover from "@/hooks/useHover";
function WishButton({
  isWished,
  handleWishList,
  className,
  iconSize = 20,
}: {
  isWished: boolean;
  handleWishList: () => void;
  className?: string;
  iconSize?: number;
}) {
  const [ref, hover] = useHover();

  return (
    <span
      onClick={handleWishList}
      className={`rounded-lg p-[.3rem] bg-oldCatBg cursor-pointer ${className}`}
      // onMouseEnter={() => setHover(true)}
      // onMouseOut={() => setHover(false)}
      ref={ref as React.LegacyRef<HTMLSpanElement>}
    >
      {hover && isWished && <PiHeartBreakLight size={iconSize} />}
      {hover && !isWished && <PiHeartFill size={iconSize} />}
      {!hover && isWished && <IoMdHeart size={iconSize} />}
      {!hover && !isWished && <CiHeart size={iconSize} />}
    </span>
  );
}

export default WishButton;
