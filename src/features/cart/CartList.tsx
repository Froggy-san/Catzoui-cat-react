import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import EmptyCart from './EmptyCart'
import CartItem from './CartItem'
import { getCart } from '@/features/cart/cartSlice'

const CartList = () => {
  const cart = useSelector(getCart)

  console.log(cart, 'cart items')
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <div className="mx-auto w-[97%] space-y-6 divide-y-2 rounded-xl border border-slate-300 p-5">
      {!cart.length && <EmptyCart />}

      {cart.length
        ? cart.map((item) => (
            <CartItem item={item} key={item.itemId} cart={cart} />
          ))
        : null}
    </div>
  )
}

export default CartList
