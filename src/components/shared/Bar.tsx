import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import UilityButton from "./UilityButton";
import Slider from "./NavLinksSlider";
import { HiBars3 } from "react-icons/hi2";
interface BarContextValue {
  handleToggle: (e?: MouseEvent) => void;
  close: () => void;
  isNavOpen: boolean;
}

const BarContext = createContext<BarContextValue>({
  handleToggle: () => {},
  close: () => {},
  isNavOpen: false,
});

const Bar = ({ children }: { children: React.ReactNode }) => {
  const [isNavOpen, setIsNavIsOpen] = useState(false);

  const handleToggle = (e?: MouseEvent) => {
    e?.stopPropagation();
    setIsNavIsOpen((is) => !is);
  };

  const close = () => {
    setIsNavIsOpen(false);
  };

  return (
    <BarContext.Provider value={{ isNavOpen, handleToggle, close }}>
      {children}
    </BarContext.Provider>
  );
};

const BarButton = () => {
  const { handleToggle } = useContext(BarContext);

  return (
    <UilityButton onClick={handleToggle} visible="screen-lg">
      <HiBars3 size={20} />
    </UilityButton>
  );
};

const NavSlider = () => {
  const { isNavOpen, close } = useContext(BarContext);

  const ref = useOutsideClick(close, false);
  return createPortal(
    <Slider ref={ref} close={close} isOpen={isNavOpen} />,

    document.body
  );
};

Bar.BarButton = BarButton;
Bar.NavSlider = NavSlider;
export default Bar;
