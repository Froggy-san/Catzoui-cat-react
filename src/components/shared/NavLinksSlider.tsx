import { CiBoxList } from "react-icons/ci";
import { GiHollowCat } from "react-icons/gi";

import { CiDiscount1 } from "react-icons/ci";
import { CiDeliveryTruck, CiLogin } from "react-icons/ci";

import NavLinkSubMenuItem from "./NavLinkSubMenuItem";
import NavItem from "./NavItem";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

import { Link, useSearchParams } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { forwardRef, useMemo } from "react";
import { useUser } from "@/features/authentication/useUser";
import useLogout from "@/features/authentication/useLogout";
import useCategories from "@/features/products/useGetAllCategories";

const Slider = forwardRef(function NavLinkSlider(
  {
    isOpen,
    close,
  }: {
    isOpen: boolean;
    close: () => void;
  },
  // Accept a ref as the second argument after props
  ref: React.Ref<HTMLDivElement>
) {
  const { user } = useUser();
  const { allCategories } = useCategories();

  const { isLogingOut, logoutUser } = useLogout();
  const [searchParams, setSearchParams] = useSearchParams();
  const allCat = useMemo(() => {
    return [...new Set(allCategories?.map((pro) => pro.category))];
  }, [allCategories]);

  console.log(allCat, "asdaA:A:A:A:AAAA:A:s");
  function handleFilterByCategory(value: string) {
    searchParams.set("filter", value);
    setSearchParams(searchParams);
  }
  // console.log(user?.user_metadata, "user here !!");
  return (
    // Add the ref attribute to the div element that wraps the NavLinksSlider component
    <div
      ref={ref}
      className={`w-[170px] h-[85dvh] top-1/2 translate-y-[-50%]  bg-slate-200 rounded-r-2xl fixed bottom-0  NavOpen z-[60] shadow-2xl flex flex-col justify-between py-3 transition-all duration-400 lg:left-[-170px] ${
        isOpen ? "left-0" : "left-[-170px]"
      }`}
    >
      <ul className="flex flex-col  py-2  ">
        <NavItem render={() => <CiBoxList size={20} />} categoryName="CATEGORY">
          {allCat?.length &&
            allCat?.map((cat) => (
              <NavLinkSubMenuItem
                onClick={() => {
                  handleFilterByCategory(cat);
                  close();
                }}
                text={cat}
                key={cat}
              />
            ))}

          {/* <NavLinkSubMenuItem text="ELECTRONICS" />

          <NavLinkSubMenuItem text="CLOTHING" />

          <NavLinkSubMenuItem text="MIDICINE" />

          <NavLinkSubMenuItem text="BUTEY PRODUCTS" />

          <NavLinkSubMenuItem text="SOMETHING ELSE" /> */}
        </NavItem>

        <NavItem render={() => <GiHollowCat size={20} />} categoryName="BRANDS">
          <NavLinkSubMenuItem text="NIKE" />

          <NavLinkSubMenuItem text="BOSCH" />

          <NavLinkSubMenuItem text="LENOVO" />

          <NavLinkSubMenuItem text="HP" />

          <NavLinkSubMenuItem text="SOMETHING ELSE" />
        </NavItem>

        <NavItem render={() => <CiDiscount1 size={20} />} categoryName="DEALS">
          <NavLinkSubMenuItem text="LAPTOPS 4" />
          <NavLinkSubMenuItem text="CLOTHING 76" />
          <NavLinkSubMenuItem text="MAKEUP 23" />
          <NavLinkSubMenuItem text="WHATEVER 11" />
          <NavLinkSubMenuItem text="LAPTOPS 4" />
        </NavItem>

        <NavItem
          render={() => <CiDeliveryTruck size={20} />}
          categoryName="DELIVERY"
        />
      </ul>
      <div
        className="flex justify-between py-3 px-2 rounded-lg mx-1 bg-slate-100 border border-slate-800
        "
      >
        <Link
          to="/account"
          className="flex
          "
          onClick={() => close()}
        >
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarImage
              src={user?.user_metadata.avater}
              className="rounded-full w-full h-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <p className="text-sm w-[70px] truncate">{user?.email}</p>
        </Link>
        <Button
          disabled={isLogingOut}
          onClick={() => logoutUser()}
          className="h-6 w-6 mt-auto bg-slate-900 hover:bg-slate-800"
          size="icon"
        >
          <CiLogin size={15} />
        </Button>
      </div>
    </div>
  );
});

export default Slider;

// const NavLinksSlider = ({
//   isOpen,
//   ref,
// }: {
//   isOpen: boolean;
//   ref?: React.Ref<HTMLDivElement>;
// }) => {
//   return (
//     <div
//       ref={ref}
//       className={`w-[170px] h-[85dvh] top-1/2 translate-y-[-50%]  bg-slate-200 rounded-r-2xl fixed bottom-0  NavOpen z-[60] shadow-2xl flex flex-col justify-between py-3 transition-all duration-400 lg:left-[-170px] ${
//         isOpen ? "left-0" : "left-[-170px]"
//       }`}
//     >
//       <ul className="flex flex-col  py-2  ">
//         <NavItem render={() => <CiBoxList size={20} />} categoryName="CATEGORY">
//           <NavLinkSubMenuItem text="ELECTRONICS" />

//           <NavLinkSubMenuItem text="CLOTHING" />

//           <NavLinkSubMenuItem text="MIDICINE" />

//           <NavLinkSubMenuItem text="BUTEY PRODUCTS" />

//           <NavLinkSubMenuItem text="SOMETHING ELSE" />
//         </NavItem>

//         <NavItem render={() => <GiHollowCat size={20} />} categoryName="BRANDS">
//           <NavLinkSubMenuItem text="NIKE" />

//           <NavLinkSubMenuItem text="BOSCH" />

//           <NavLinkSubMenuItem text="LENOVO" />

//           <NavLinkSubMenuItem text="HP" />

//           <NavLinkSubMenuItem text="SOMETHING ELSE" />
//         </NavItem>

//         <NavItem render={() => <CiDiscount1 size={20} />} categoryName="DEALS">
//           <NavLinkSubMenuItem text="LAPTOPS 4" />
//           <NavLinkSubMenuItem text="CLOTHING 76" />
//           <NavLinkSubMenuItem text="MAKEUP 23" />
//           <NavLinkSubMenuItem text="WHATEVER 11" />
//           <NavLinkSubMenuItem text="LAPTOPS 4" />
//         </NavItem>

//         <NavItem
//           render={() => <CiDeliveryTruck size={20} />}
//           categoryName="DELIVERY"
//         />
//       </ul>
//       <div
//         className="flex justify-between py-3 px-2 rounded-lg mx-1 bg-slate-100 border border-slate-800
//       "
//       >
//         <Link
//           to="/account"
//           className="flex
//         "
//         >
//           <Avatar className="w-10 h-10 rounded-full">
//             <AvatarImage
//               src="https://github.com/shadcn.png"
//               className="rounded-full"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>

//           <p className="text-sm w-[70px] truncate">catzoui@gmail.com</p>
//         </Link>
//         <Button
//           className="h-6 w-6 mt-auto bg-slate-900 hover:bg-slate-800"
//           size="icon"
//         >
//           <CiLogin size={15} />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default NavLinksSlider;
