import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  clearCart,
  getCart,
  getTotalAfterDiscount,
  getTotalBeforeDiscount,
  getTotalItemQuantity,
} from "@/features/cart/cartSlice";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  //   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/helper";
const CartSummary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector(getCart);
  const totalAmountBeforeDiscount = useSelector(getTotalBeforeDiscount);

  const totalAmountAfterDiscount = useSelector(getTotalAfterDiscount);

  const totalQuantity = useSelector(getTotalItemQuantity);

  const dispatch = useDispatch();
  function handleCloseDialog() {
    setIsOpen(false);
  }

  function handleOpenDialog() {
    if (!cart.length)
      toast(
        <span className="flex items-center gap-3  font-semibold">
          {" "}
          There are no items to delete <MdOutlineRemoveShoppingCart size={20} />
        </span>
      );
    else setIsOpen(true);
  }

  function handleDeletingAllItems() {
    dispatch(clearCart());
  }

  return (
    <>
      <div className="px-3 py-5 rounded-lg mx-3 my-10 border-2">
        <div className="flex flex-col gap-3  sm:flex-row justify-between">
          <div>
            <h2 className="text-xl font-semibold">Summary order</h2>
            <div>
              Total:{" "}
              <span className="text-lg font-semibold text-slate-300">
                {formatCurrency(totalAmountBeforeDiscount)}
              </span>
            </div>

            <div>
              Total after discount:{" "}
              <span className="text-lg font-semibold text-red-600  ">
                {formatCurrency(totalAmountAfterDiscount)}
              </span>
            </div>

            <div>
              Total discount:{" "}
              <span className="text-lg font-semibold text-green-500">
                {formatCurrency(
                  totalAmountBeforeDiscount - totalAmountAfterDiscount
                )}
              </span>
            </div>
          </div>

          <div className="flex items-end justify-end gap-2  ">
            <Button
              onClick={handleOpenDialog}
              className=" bg-[#d6293e] text-red-100  border hover:bg-[#d6293e]/40 hover:text-red-500  tracking-wide"
            >
              Delete ({totalQuantity})
            </Button>
            <Button>Proceed ({totalQuantity})</Button>
          </div>
        </div>
      </div>

      <AlertDialog open={isOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete all ({totalQuantity}) items from
              cart?{" "}
            </AlertDialogTitle>

            <AlertDialogDescription>
              You can always add them back when ever you feel like it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeletingAllItems();
                handleCloseDialog();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CartSummary;
