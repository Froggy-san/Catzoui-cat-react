import { useState } from 'react'

import { PiHeartStraightFill } from 'react-icons/pi'
import { HeartCrack } from 'lucide-react'
import { toast } from 'sonner'

import { formatCurrency } from '@/utils/helper'
import { useSearchParams } from 'react-router-dom'
import useSetItemFromStorage from '@/hooks/useSetItemFromStorage'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItemToWishList,
  deleteFromWishList,
} from '../wishList/wishListSlice'
import WishButton from './WishButton'
import { RootState } from '@/Types/type'
import StarRating from '@/components/shared/StarRating'
interface ProdcutImage {
  id: number
  image_url: string | null
  product_id?: number | null // change this to number
}
interface Product {
  ProductImages: ProdcutImage[]
  average_rating?: number
  brand: string // add a question mark to make it optional
  category: string
  color: string
  created_at: string
  description: string
  discount_amount: number
  id: number
  name: string
  price_per_unit: number
  size: string
  stock: number
}

const ProductItem = ({ product }: { product: Product }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishList } = useSelector((state: RootState) => state.wishList)
  const [viewedPhoto, setViewedPhoto] = useState(0)

  const dispatch = useDispatch()

  const isWished = wishList.includes(product.id)

  useSetItemFromStorage('wishList', wishList)

  const handleWishList = () => {
    if (isWished) {
      dispatch(deleteFromWishList(product.id))
      toast('You have deleted an item from the wish list', {
        description: (
          <div className="flex items-center space-x-2">
            <span>
              <HeartCrack size={15} />
            </span>
            <span>Item deleted</span>
          </div>
        ),
        action: {
          label: 'Undo',
          onClick: () => dispatch(addItemToWishList(product.id)),
        },
        closeButton: true,
      })
    } else {
      dispatch(addItemToWishList(product.id))
      toast('You have added an item to the wish list', {
        description: (
          <div className="flex items-center space-x-2">
            <span>
              <PiHeartStraightFill size={15} />
            </span>
            <span>Item Added</span>
          </div>
        ),
        action: {
          label: 'Undo',
          onClick: () => dispatch(deleteFromWishList(product.id)),
        },
        closeButton: true,
      })
    }
  }

  function handleShowProduct() {
    searchParams.set('product', `${product.id}`)
    setSearchParams(searchParams)
  }

  return (
    <li className="flex flex-col justify-between  ">
      <div onClick={handleShowProduct} className="cursor-pointer">
        <div
          className="h-[300px] cursor-pointer rounded-xl "
          onMouseEnter={() => setViewedPhoto((curr) => curr + 1)}
          onMouseOut={() => setViewedPhoto((curr) => curr - 1)}
        >
          {product?.ProductImages && product?.ProductImages.length > 1 && (
            <img
              src={product?.ProductImages.at(viewedPhoto)?.image_url || ''}
              alt={product?.name + 'image'}
              className="h-full w-full rounded-xl object-cover"
            />
          )}

          {product?.ProductImages && product?.ProductImages.length === 1 && (
            <img
              src={product?.ProductImages.at(0)?.image_url || ''}
              alt={product?.name + 'image'}
              className="h-full w-full rounded-xl object-cover"
            />
          )}
        </div>
        <p className=" truncate overflow-ellipsis">{product?.name}</p>

        {product.average_rating === 0 && (
          <StarRating
            className="mt-3"
            size={20}
            defaultRating={product?.average_rating}
            readOnly={true}
          />
        )}

        {product?.average_rating && product.average_rating > 0 ? (
          <StarRating
            className="mt-3"
            size={20}
            defaultRating={product?.average_rating}
            readOnly={true}
          />
        ) : null}
      </div>

      <div className="flex items-center justify-between font-semibold">
        {product?.discount_amount === 0 && (
          <span>
            {product?.price_per_unit && formatCurrency(product?.price_per_unit)}
          </span>
        )}

        {product.discount_amount > 0 && (
          <div className="flex gap-1 font-semibold">
            <span className="text-slate-200 line-through">
              {formatCurrency(product?.price_per_unit || 1)}
            </span>
            <span className="bg-red text-red-600">
              {formatCurrency(
                product?.price_per_unit - product?.discount_amount
              )}
            </span>
          </div>
        )}

        <WishButton isWished={isWished} handleWishList={handleWishList} />

        {/* <span
          onClick={handleWishList}
          className="rounded-lg p-[.3rem] bg-oldCatBg cursor-pointer"
          // onMouseEnter={() => setHover(true)}
          // onMouseOut={() => setHover(false)}
          ref={ref as React.LegacyRef<HTMLSpanElement>}
        >
          {hover && isWished && <PiHeartBreakLight size={20} />}
          {hover && !isWished && <PiHeartFill size={20} />}
          {!hover && isWished && <IoMdHeart size={20} />}
          {!hover && !isWished && <CiHeart size={20} />}
        </span> */}
      </div>
    </li>
  )
}

export default ProductItem

//////////////

/*
const ProductItem = ({ product }: { product: Product }) => {
  const [wished, setWished] = useState<number[]>(
    JSON.parse(localStorage.getItem("wishList") || "[]")
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [viewedPhoto, setViewedPhoto] = useState(0);
  // const [hover, setHover] = useState(false);
  // useEffect(() => {
  //   localStorage.setItem("wishList", JSON.stringify(wished));
  // }, [wished]);

  const wishedFor = wished.some((id) => id === product.id);

  useSetItemFromStorage("wishList", wished);

  const [ref, hover] = useHover();

  function handleAddingToWishList() {
    setWished((curr) => curr.filter((id) => id !== product.id));
  }

  function handleRemovingFromWishList() {
    setWished((curr) => [...curr, product.id]);
  }

  function handleWishList() {
    if (wished.some((el) => el === product.id)) {
      handleAddingToWishList();

      toast("You have deleted an item from the wish list", {
        description: (
          <div className="flex items-center space-x-2">
            <span>
              <HeartCrack size={15} />
            </span>
            <span>Item deleted</span>
          </div>
        ),
        action: {
          label: "Undo",
          onClick: handleRemovingFromWishList,
        },
        closeButton: true,
      });
    }
    if (!wished.includes(product.id)) {
      handleRemovingFromWishList();

      toast("You have added an item to the wish list", {
        description: (
          <div className="flex items-center space-x-2">
            <span>
              <PiHeartStraightFill size={15} />
            </span>
            <span>Item Added</span>
          </div>
        ),
        action: {
          label: "Undo",
          onClick: handleAddingToWishList,
        },
        closeButton: true,
      });
    }
  }

  function handleShowProduct() {
    searchParams.set("product", `${product.id}`);
    setSearchParams(searchParams);
  }

  return (
    <li className="flex flex-col justify-between  ">
      <div onClick={handleShowProduct} className="cursor-pointer">
        <div
          className="h-[300px] cursor-pointer rounded-xl "
          onMouseEnter={() => setViewedPhoto((curr) => curr + 1)}
          onMouseOut={() => setViewedPhoto((curr) => curr - 1)}
        >
          {product?.ProductImages && product?.ProductImages.length > 1 && (
            <img
              src={product?.ProductImages.at(viewedPhoto)?.image_url || ""}
              alt={product?.name + "image"}
              className="w-full h-full object-cover rounded-xl"
            />
          )}

          {product?.ProductImages && product?.ProductImages.length === 1 && (
            <img
              src={product?.ProductImages.at(0)?.image_url || ""}
              alt={product?.name + "image"}
              className="w-full h-full object-cover rounded-xl"
            />
          )}
        </div>
        <p>{product?.name}</p>

        {product?.average_rating && <div>{product?.average_rating + "/5"}</div>}
      </div>

      <div className="flex items-center justify-between font-semibold">
        {product?.discount_amount === 0 && (
          <span>
            {product?.price_per_unit && formatCurrency(product?.price_per_unit)}
          </span>
        )}

        {product.discount_amount > 0 && (
          <div className="flex gap-1 font-semibold">
            <span className="line-through text-slate-200">
              {formatCurrency(product?.price_per_unit || 1)}
            </span>
            <span className="bg-red text-red-600">
              {formatCurrency(
                product?.price_per_unit - product?.discount_amount
              )}
            </span>
          </div>
        )}
        <span
          onClick={handleWishList}
          className="rounded-lg p-[.3rem] bg-oldCatBg cursor-pointer"
          // onMouseEnter={() => setHover(true)}
          // onMouseOut={() => setHover(false)}
          ref={ref as React.LegacyRef<HTMLSpanElement>}
        >
          {hover && wishedFor && <PiHeartBreakLight size={20} />}
          {hover && !wishedFor && <PiHeartFill size={20} />}
          {!hover && wishedFor && <IoMdHeart size={20} />}
          {!hover && !wishedFor && <CiHeart size={20} />}
        </span>
      </div>
    </li>
  );
};

export default ProductItem;
 */
//////////////

// interface ProdcutImage {
//   id: number;
//   image_url: string;
//   product_id: string;
// }

// interface Product {
//   ProductImages: ProdcutImage[];
//   average_rating: number;
//   brand: string;
//   category: string;
//   color: string;
//   created_at: string;
//   description: string;
//   discount_amount: number;
//   id: number;
//   name: string;
//   price_per_unit: number;
//   size: string;
//   stock: number;
// }

{
  /*

import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";

interface ProdcutImage {
  id?: number | null;
  image_url?: string | null;
  product_id?: string | null;
}

interface Product {
  ProductImages: ProdcutImage[] | null;
  average_rating: number | null;
  brand: number | null;
  category: string | null;
  color: string | null;
  created_at: string | null;
  description: string | null;
  discount_amount: number | null;
  id: number | null;
  name: string | null;
  price_per_unit: number | null;
  size: string | null;
  stock: number | null;
}

const ProductItem = (product: Product) => {
  const [wished, setWished] = useState(false);
  const [viewedPhoto, setViewedPhoto] = useState(0);
  return (
    <li
      className="flex flex-col"
      onMouseEnter={() => setViewedPhoto((curr) => curr + 1)}
      onMouseOut={() => setViewedPhoto((curr) => curr - 1)}
    >
      <div className="h-[300px]">
        {product?.ProductImages && product?.ProductImages.length > 1 && (
          <img
            src={product?.ProductImages.at(viewedPhoto)?.image_url || ""}
            alt={product?.name + "image"}
            className="w-full h-full"
          />
        )}

        {product?.ProductImages && product?.ProductImages.length === 1 && (
          <img
            src={product?.ProductImages.at(0)?.image_url || ""}
            alt={product?.name + "image"}
            className="w-full h-full"
          />
        )}
      </div>
      <p>{product?.name}</p>

      {product?.average_rating && <div>{product?.average_rating}</div>}

      <div className="flex items-center justify-between">
        {!product?.discount_amount && <span>{product?.price_per_unit}</span>}

        {product?.discount_amount && (
          <div className="flex gap-1">
            <span className="line-through">{product?.price_per_unit}</span>
            <span className="bg-red text-red-600">
              {product?.discount_amount ?? product?.discount_amount}
            </span>
          </div>
        )}
        <span className="rounded-lg p-[.3rem] bg-oldCatBg">
          <CiHeart />
        </span>
      </div>
    </li>
  );
};

export default ProductItem;

*/
}
