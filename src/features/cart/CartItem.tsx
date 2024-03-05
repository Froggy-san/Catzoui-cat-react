import { cartItem } from "@/Types/type";
import UilityButton from "@/components/shared/UilityButton";
import { Button } from "@/components/ui/button";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
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
import { FaRegWindowClose } from "react-icons/fa";

import { formatCurrency } from "@/utils/helper";
import { useCallback, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CartItem = ({
  item,
  cart,
}: {
  item: cartItem;
  key: string;
  cart: cartItem[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const allSimilarProductQuantity = cart
    .filter((el) => el.id === item.id)
    .reduce((sum, currEl) => sum + currEl.quantity, 0);

  // console.log(allSimilarProduct, "alllasdasdasdladlasdlasldal");
  const dispatch = useDispatch();

  function handleCloseDialog() {
    setIsOpen(false);
  }

  function handleInc() {
    // if (count === product?.stock) return;
    // setCount((count) => count + 1);
    if (allSimilarProductQuantity >= item.stock)
      return toast("Amount acceeded", {
        description: (
          <div className="flex items-center space-x-2">
            <span>
              <FaRegWindowClose size={15} />
            </span>
            <span>You have exceeded the available amount</span>
          </div>
        ),

        closeButton: true,
      });
    if (item) dispatch(increaseQuantity(item.itemId));
  }

  function handleDec() {
    // if (count === 0) return;
    // setCount((count) => count - 1);
    if (item.quantity === 1) {
      setIsOpen(true);
    } else if (item) dispatch(decreaseQuantity(item.itemId));
  }

  // const moveToProduct = useGetProductById();

  function handleDeleteItem() {
    dispatch(deleteItem(item.itemId));
    deleteToast();
  }

  const deleteToast = useCallback(() => {
    toast("Item has been delete from the cart", {
      description: (
        <div className="flex items-center space-x-2">
          <span>
            <CiTrash size={15} />
          </span>
          <span>Item deleted</span>
        </div>
      ),
      // action: {
      //   label: "Undo",
      //   onClick: () => dispatch(addItemToWishList(+productId)),
      // },
      closeButton: true,
    });
  }, []);

  return (
    <div className="flex flex-col gap-10 py-10 relative" key={item.id}>
      <UilityButton
        onClick={() => {
          setIsOpen(true);
          //   handleDeleteItem(item.id);
        }}
        render={() => <CiTrash size={20} />}
        className=" absolute  right-0 bottom-32  xs:top-10 z-10 text-red-700"
      />
      <Link
        to={`/?product=${item.id}`}
        className="flex flex-col md:flex-row space-x-2"
      >
        <div className=" w-full mx-auto md:mx-0 xs:w-[350px] h-[300px] rounded-xl overflow-hidden">
          <img
            src={(item.ProductImages && item?.ProductImages[0].image_url) || ""}
            alt={item.name || ""}
            className="w-full h-full"
          />
        </div>

        <div className=" overflow-y-auto h-[250px]    md:flex-1 md:px-12  md:h-[350px] ">
          <h3>{item.name}</h3>
          {item.description.length > 0 ? (
            <p className="mt-4">
              <strong>Description: </strong> {item.description}
            </p>
          ) : null}

          {item.color ? (
            <div className="flex items-center gap-2 font-semibold mt-3">
              Color:{" "}
              <div
                style={{ backgroundColor: item.color }}
                className="w-4 h-4 rounded-full opacity-65"
              ></div>
            </div>
          ) : null}

          {item.size && (
            <div>
              <span>Size: </span>
              <span>{item.size}</span>
            </div>
          )}
        </div>
      </Link>

      <div className=" flex flex-col xs:flex-row items-center gap-10 xs:pl-12 ">
        <div className="flex items-center   space-x-3">
          <Button
            size="icon"
            onClick={() => {
              handleDec();
            }}
          >
            <AiOutlineMinus size={20} />
          </Button>
          <span>{item.quantity}</span>
          <Button
            size="icon"
            onClick={() => {
              handleInc();
            }}
          >
            <AiOutlinePlus size={20} />
          </Button>
        </div>

        <div className="font-semibold space-x-2">
          <div>
            <span className=" text-green-600">
              Total Price after discount:{"   "}
            </span>
            <span>{formatCurrency(item.totalPriceAfterDiscount)}</span>
          </div>
          <div className="">
            <span className="text-red-600">Total Price: </span>
            <span className="line-through text-slate-300">
              {formatCurrency(item.totalPriceWithoutDiscount)}
            </span>
          </div>
        </div>
      </div>

      <AlertDialog open={isOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this item?{" "}
            </AlertDialogTitle>

            <AlertDialogDescription>
              You can always add it back when ever you feel like it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteItem();
                handleCloseDialog();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CartItem;
