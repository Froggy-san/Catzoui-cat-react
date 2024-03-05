import { CiShoppingCart } from "react-icons/ci";
import { useUser } from "../authentication/useUser";

const CartHeader = () => {
  const { user } = useUser();

  return (
    <h1 className=" text-xl sm:text-3xl font-semibold tracking-wider flex gap-3 items-center justify-center my-7">
      {user?.user_metadata.username + "'s"} Cart{" "}
      <span>
        <CiShoppingCart size={30} />
      </span>
    </h1>
  );
};

export default CartHeader;
