import React from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'

const NavItem = ({
  categoryName,
  render,
  children,
}: {
  categoryName?: string
  render?: () => JSX.Element
  children?: React.ReactNode
}) => {
  return (
    <li className="group relative z-10 flex w-[93%] cursor-pointer items-center  justify-between py-1 pl-6 transition-transform duration-300 hover:translate-y-[-2px]  hover:underline">
      <span className="flex items-center gap-1 ">
        {' '}
        {render?.()}
        {categoryName}
      </span>

      {children && (
        <span className="transition-transform  duration-300 group-hover:rotate-180 ">
          <RiArrowDropDownLine className="" size={19} />
        </span>
      )}

      {children && (
        <ul className="invisible  absolute left-[155px] top-[15px] z-[100] flex  w-[150px] flex-col justify-center gap-1 rounded-r-3xl rounded-bl-3xl rounded-tl-sm bg-slate-100  p-5 opacity-0  shadow-2xl transition-all duration-500 group-hover:visible group-hover:opacity-100">
          {children}
        </ul>
      )}
    </li>
  )
}

export default NavItem
