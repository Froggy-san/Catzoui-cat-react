import { useUser } from "../authentication/useUser";
import { Link } from "react-router-dom";
import NavMenuItem from "@/components/shared/NavMenuItem";
import UilityButton from "@/components/shared/UilityButton";

import { CiHeart } from "react-icons/ci";
import { PiDotsThreeVertical } from "react-icons/pi";

import { IoAdd } from "react-icons/io5";

const ProductMenuBar = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-end relative">
      <NavMenuItem>
        <NavMenuItem.UtilButtonComp>
          <UilityButton render={() => <PiDotsThreeVertical />} />
        </NavMenuItem.UtilButtonComp>

        <NavMenuItem.MenuComp className="absolute right-1 top-8 bg-slate-200 p-1  rounded-md flex flex-col text-sm">
          {" "}
          {user?.user_metadata.privileges ? (
            <Link
              to="/add-product"
              className="flex items-center gap-1 py-1  px-2 hover:bg-slate-100 rounded-md cursor-pointer"
            >
              <IoAdd size={17} /> <span>Add Product</span>
            </Link>
          ) : null}
          <Link
            to="/wishlist"
            className="flex items-center py-1  px-2 gap-1 hover:bg-slate-100 rounded-md cursor-pointer"
          >
            <CiHeart size={17} /> <span>Wish list</span>
          </Link>
        </NavMenuItem.MenuComp>
      </NavMenuItem>
    </div>
  );
};

export default ProductMenuBar;
