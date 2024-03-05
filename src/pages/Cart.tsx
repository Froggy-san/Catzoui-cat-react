import CartSummary from "@/features/cart/CartSummary";
import CartHeader from "@/features/cart/CartHeader";
import CartList from "@/features/cart/CartList";

const Cart = () => {
  return (
    <div className="my-20">
      <CartHeader />
      <CartList />
      <CartSummary />
    </div>
  );
};

export default Cart;
