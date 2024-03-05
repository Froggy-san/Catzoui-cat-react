import { useOutsideClick } from "@/hooks/useOutsideClick";
import React, {
  cloneElement,
  createContext,
  useState,
  useContext,
} from "react";

//* the idea of this composed component is to have a button which when clicked it opens a menu under it, but you should know that the menu won't be positioned in regards of the button but rather the container of the MenuComp it self that is why you have the className arrgument in it.

interface NavMenuContextValue {
  handleToggle: (e?: MouseEvent) => void;
  handleMoreToggle: (e?: MouseEvent) => void;
  close: () => void;
  isOpen: boolean;
}

const NavMenuContext = createContext<NavMenuContextValue>({
  handleToggle: () => {},
  handleMoreToggle: () => {},
  close: () => {},
  isOpen: false,
});

const NavMenuItem = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle(e?: MouseEvent) {
    e?.stopPropagation();

    setIsOpen((is) => !is);
  }
  function handleMoreToggle() {}

  function close() {
    setIsOpen(false);
  }

  return (
    <NavMenuContext.Provider
      value={{
        close,
        handleToggle,
        handleMoreToggle,
        isOpen,
      }}
    >
      {children}
    </NavMenuContext.Provider>
  );
};

/// Notice how we used React.ReactElement instead of React.ReactNode, and that is becsasue the cloneElement function doesn't accept ReactNodes.

// * here we used cloneElement and the element here is the children, and the second arrgument is the props we want to pass into the cloned element in that case we passed the handleToggle.
const UtilButtonComp = ({ children }: { children: React.ReactElement }) => {
  const { handleToggle } = useContext(NavMenuContext);

  return (
    <>
      {cloneElement(children, {
        onClick: handleToggle,
      })}
    </>
  );
};

const MenuComp = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isOpen, close } = useContext(NavMenuContext);
  const ref = useOutsideClick(close, false);

  if (!isOpen || !children) return null;
  return (
    <div onClick={close} className={className} ref={ref}>
      {isOpen && children}
    </div>
  );
};

NavMenuItem.UtilButtonComp = UtilButtonComp;
NavMenuItem.MenuComp = MenuComp;

export function useMenuItemContext() {
  const context = useContext(NavMenuContext);
  if (context === undefined)
    throw new Error(`you have used the SearchContext wrong`);
  return context;
}

export default NavMenuItem;
