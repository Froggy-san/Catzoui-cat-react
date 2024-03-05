import { useCallback } from "react";
import useDeleteFromStorage from "./useDeleteStorage";
import { useNavigate } from "react-router-dom";
import useDeleteProduct from "./useDeleteProduct";
import { useDispatch } from "react-redux";
import { deleteAllRelatedItems } from "../cart/cartSlice";
import { deleteFromWishList } from "../wishList/wishListSlice";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";

interface AdminControlProps {
  images: (string | undefined)[] | undefined;
  productId: string | null;
}

const AdminControl = ({ productId, images }: AdminControlProps) => {
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const { deleteStorage } = useDeleteFromStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteProduct = useCallback(
    function () {
      if (productId)
        deleteProduct(productId, {
          onSuccess: () => {
            toast(`Product with the id of ${productId}`);
            dispatch(deleteAllRelatedItems(+productId));
            dispatch(deleteFromWishList(+productId));

            navigate("/");
          },
        });
      if (images) deleteStorage(images);
    },
    [productId, deleteProduct, navigate, dispatch, images, deleteStorage]
  );
  return (
    <div className="px-4 py-6 rounded-xl flex gap-3 items-center mt-16 tracking-wider">
      <h1 className="text-xl font-semibold">Edit/Delete prodcut</h1>
      <div className="my-4 space-x-3">
        <Button
          onClick={() => navigate(`edit-product/${productId}`)}
          disabled={isDeleting}
          variant="outline"
          className="gap-1 rounded-lg w-24 bg-[#148364]  text-green-100 hover:text-green-700 hover:bg-[#148364]/40 tracking-wide"
        >
          {" "}
          <CiEdit size={20} /> Edit{" "}
        </Button>
        {/*[#148364] [#203433]*/}
        <Button
          disabled={isDeleting}
          onClick={handleDeleteProduct}
          className="gap-1 rounded-lg  w-24
      
      bg-[#d6293e] text-red-100  border hover:bg-[#d6293e]/40 hover:text-red-500  tracking-wide"
        >
          <IoMdTrash size={20} /> Delete
        </Button>
      </div>
    </div>
  );
};

export default AdminControl;
