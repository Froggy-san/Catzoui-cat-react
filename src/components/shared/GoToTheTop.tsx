import React from "react";
import { Button } from "../ui/button";
import { IoIosArrowRoundUp } from "react-icons/io";
import { createPortal } from "react-dom";
import { scrollToTheTop } from "@/utils/helper";

const GoToTheTop = ({ hidden }: { hidden: boolean }) => {
  return createPortal(
    <Button
      size="icon"
      onClick={scrollToTheTop}
      className={`fixed bottom-16 transition-all duration-300 opacity-100 right-5 ${
        hidden && "invisible opacity-0"
      }`}
    >
      <IoIosArrowRoundUp size={25} />
    </Button>,
    document.body
  );
};

export default GoToTheTop;
