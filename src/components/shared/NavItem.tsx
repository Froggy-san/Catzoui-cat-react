import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const NavItem = ({
  categoryName,
  render,
  children,
}: {
  categoryName?: string;
  render?: () => JSX.Element;
  children?: React.ReactNode;
}) => {
  return (
    <li className="flex w-[93%] pl-6 relative cursor-pointer items-center justify-between  group transition-transform duration-300 hover:translate-y-[-2px] hover:underline py-1  z-10">
      <span className="flex gap-1 items-center ">
        {" "}
        {render?.()}
        {categoryName}
      </span>

      {children && (
        <span className="group-hover:rotate-180  transition-transform duration-300 ">
          <RiArrowDropDownLine className="" size={19} />
        </span>
      )}

      {children && (
        <ul className="absolute  top-[15px] left-[155px] w-[150px] justify-center p-5  gap-1 opacity-0 invisible bg-slate-100 flex flex-col group-hover:opacity-100 group-hover:visible  transition-all duration-500  rounded-r-3xl rounded-bl-3xl rounded-tl-sm shadow-2xl z-[100]">
          {children}
        </ul>
      )}
    </li>
  );
};

export default NavItem;
