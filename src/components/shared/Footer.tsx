import { Link } from 'react-router-dom'
import { scrollToTheTop } from '@/utils/helper'
import { RiJavascriptFill } from 'react-icons/ri'
import { LiaGithub } from 'react-icons/lia'

const Footer = () => {
  return (
    <footer className=" relative mt-80 h-fit rounded-tl-2xl rounded-tr-2xl border-t-2 border-slate-700 bg-[#161616] pb-5 sm:h-[70dvh]">
      <Link
        onClick={scrollToTheTop}
        to="/"
        className=" absolute left-1/2 top-[-150px] w-[250px] translate-x-[-50%] xs:top-[-220px] xs:w-[350px]"
      >
        {' '}
        <img src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/logo-2.png" />
      </Link>

      <div className="mt-36 flex flex-col flex-wrap justify-center gap-x-9   space-y-10 pl-10 text-slate-200 xs:flex-row xs:space-x-10 xs:space-y-0 xs:pl-0">
        <div className="flex flex-col gap-3">
          <h1 className=" text-orange-400">About us</h1>
          <Link
            onClick={scrollToTheTop}
            className=" transition-colors hover:text-orange-200"
            to="/order"
          >
            About Catzoui-cat
          </Link>
        </div>

        <div className="flex flex-col gap-1 ">
          <h1 className=" text-orange-400 ">Shop with us</h1>
          <Link
            onClick={scrollToTheTop}
            className=" transition-colors hover:text-orange-200"
            to="/cart"
          >
            Your cart
          </Link>
          <Link
            onClick={scrollToTheTop}
            className=" transition-colors hover:text-orange-200"
            to="/order"
          >
            Your Orders
          </Link>
          <Link
            onClick={scrollToTheTop}
            className=" transition-colors hover:text-orange-200"
            to="/account"
          >
            Your Account
          </Link>
          <Link
            onClick={scrollToTheTop}
            className=" transition-colors hover:text-orange-200"
            to="/wishlist"
          >
            Your Wish list
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="  flex   gap-2 text-slate-200">
            <RiJavascriptFill
              className="text-orange-400 transition-colors"
              size={20}
            />{' '}
            <a
              className="hover:text-orange-200"
              href=" https://froggy-san.github.io/Catzoui-cats/build/index.html#"
              target="_blank"
            >
              A JavaScript clone/clonish of the same website.
            </a>
          </div>
          <div className="  flex   gap-2  text-slate-200">
            <LiaGithub
              className="text-orange-400 transition-colors"
              size={20}
            />{' '}
            <a
              className="hover:text-orange-200"
              href="https://github.com/Froggy-san/Catzoui-cat-react"
              target="_blank"
            >
              Github repo
            </a>
          </div>
        </div>
      </div>
      {/* <div className=" mx-auto mt-12 flex w-[97%] flex-col gap-3 md:w-[500px]">
        <div className="  flex   gap-2 px-3 text-slate-200">
          <RiJavascriptFill
            className="text-orange-400 transition-colors"
            size={20}
          />{' '}
          <a
            className="hover:text-orange-200"
            href=" https://froggy-san.github.io/Catzoui-cats/build/index.html#"
            target="_blank"
          >
            A JavaScript clone/clonish of the same website.
          </a>
        </div>
        <div className="  flex   gap-2 px-3 text-slate-200">
          <LiaGithub className="text-orange-400 transition-colors" size={20} />{' '}
          <a
            className="hover:text-orange-200"
            href="https://github.com/Froggy-san/Catzoui-cat-react"
            target="_blank"
          >
            Github repo
          </a>
        </div>
      </div> */}
    </footer>
  )
}

export default Footer
