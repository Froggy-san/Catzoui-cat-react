import { useEffect } from "react";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import { getCart } from "@/features/cart/cartSlice";

const CartList = () => {
  const cart = useSelector(getCart);

  console.log(cart, "cart from cart <<");
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log(cart);
  return (
    <div className="w-[97%] mx-auto p-5 rounded-xl border border-slate-300 space-y-6 divide-y-2">
      {!cart.length && <EmptyCart />}

      {cart.length
        ? cart.map((item) => (
            <CartItem item={item} key={item.itemId} cart={cart} />
          ))
        : null}
    </div>
  );
};

export default CartList;
