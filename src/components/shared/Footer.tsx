import React from "react";
import { Link } from "react-router-dom";
import { scrollToTheTop } from "@/utils/helper";

const Footer = () => {
  return (
    <footer className=" relative h-[70dvh] bg-[#161616] mt-80 border-t-2 border-slate-700 rounded-tr-2xl rounded-tl-2xl">
      <Link
        onClick={scrollToTheTop}
        to="/"
        className=" absolute left-1/2 translate-x-[-50%] top-[-150px] xs:top-[-220px] w-[250px] xs:w-[350px]"
      >
        {" "}
        <img src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/logo-2.png" />
      </Link>

      <div className="flex flex-col space-y-10 pl-10 xs:pl-0 xs:flex-row  xs:space-y-0 xs:space-x-10 text-slate-200 mt-36 justify-center flex-wrap">
        <div className="flex flex-col gap-3">
          <h1 className=" text-orange-400">About us</h1>
          <Link
            onClick={scrollToTheTop}
            className=" hover:text-orange-200 transition-colors"
            to="/order"
          >
            About Catzoui-cat
          </Link>
        </div>

        <div className="flex flex-col gap-1 ">
          <h1 className=" text-orange-400 ">Shop with us</h1>
          <Link
            onClick={scrollToTheTop}
            className=" hover:text-orange-200 transition-colors"
            to="/cart"
          >
            Your cart
          </Link>
          <Link
            onClick={scrollToTheTop}
            className=" hover:text-orange-200 transition-colors"
            to="/order"
          >
            Your Orders
          </Link>
          <Link
            onClick={scrollToTheTop}
            className=" hover:text-orange-200 transition-colors"
            to="/account"
          >
            Your Account
          </Link>
          <Link
            onClick={scrollToTheTop}
            className=" hover:text-orange-200 transition-colors"
            to="/wishlist"
          >
            Your Wish list
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
