import { getTotalItemQuantity } from '@/features/cart/cartSlice'
import React from 'react'

import { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

interface UtilButtonType {
  children?: React.ReactNode
  visible?: string
  onClick?: () => void
  name?: string
  ref?: React.Ref<HTMLButtonElement>
  isOpen?: boolean
  render?: () => JSX.Element
  close?: () => void
  type?: string
  to?: string
  className?: string
}

const UilityButton = forwardRef(function UilButton(
  {
    children,
    visible,
    name,
    onClick,
    render,
    type,
    to = '',
    className = '',
  }: UtilButtonType,
  // Accept a ref as the second argument after props
  ref?: React.Ref<HTMLButtonElement>
) {
  const style = `cursor-pointer w-8 h-8 flex justify-center items-center rounded-full hover:bg-selected transition-colors duration-300   ease-linear focus:ring-2 ring-slate-200 border-none outline-none ${
    className ? className : 'relative'
  } ${
    visible === 'mobile'
      ? 'md:hidden'
      : visible === 'screen'
        ? 'hidden md:flex'
        : visible === 'screen-lg'
          ? 'lg:hidden'
          : ''
  } `

  const totalQuantity = useSelector(getTotalItemQuantity)

  // const ref = useOutsideClick(close, false);

  if (type === 'link')
    return (
      <Link className={style} to={to}>
        {render?.()}
        {children}

        {name === 'cart' && (
          <span className="absolute right-[-4px] top-[-4px] flex h-4 w-4  items-center  justify-center rounded-full border border-slate-600 bg-slate-900 pl-[1px] text-xs font-semibold text-slate-100">
            {totalQuantity}
          </span>
        )}
      </Link>
    )
  else
    return (
      // Add the ref attribute to the button element
      <button ref={ref} onClick={onClick} className={style}>
        {render?.()}
        {children}

        {name === 'cart' && (
          <span className="absolute right-[-4px] top-[-4px] flex h-4 w-4  items-center  justify-center rounded-full border border-slate-600 bg-slate-900 pl-[1px] text-xs font-semibold text-slate-100">
            {totalQuantity}
          </span>
        )}
      </button>
    )
})

export default UilityButton
