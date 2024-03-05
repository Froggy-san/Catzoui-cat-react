import { useMemo } from "react";
import useCategories from "@/features/products/useGetAllCategories";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-scroll";
import { SCROLL_DURATION } from "@/utils/constants";

import { RiArrowDropDownLine } from "react-icons/ri";

const NavLinks = () => {
  const { allCategories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const allCat = useMemo(() => {
    return [...new Set(allCategories?.map((pro) => pro.category))];
  }, [allCategories]);

  console.log(allCat, "asdalsdaldallas");
  function handleFilterByCategory(field: string, value: string) {
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }

  return (
    <ul className="hidden lg:flex items-center gap-3   h-full md:text-md font-light  z-50">
      <li className="flex relative cursor-pointer items-center h-full group transition-transform duration-300 hover:translate-y-[-2px]">
        CATEGORY{" "}
        <span className="group-hover:rotate-180  transition-transform duration-300">
          <RiArrowDropDownLine size={19} />
        </span>
        <ul
          style={{}}
          className="absolute top-[44px] left-5 w-[450px] p-3 rounded-md gap-3 opacity-0 invisible bg-slate-100 flex flex-wrap group-hover:opacity-100 group-hover:visible max-h-[150px] overflow-y-auto overscroll-contain "
        >
          {allCat.length ? (
            <>
              {allCat.map((category) => (
                <Link
                  to="c"
                  smooth={true}
                  duration={300}
                  spy={true}
                  // offset={100}
                  key={category}
                  onClick={() => handleFilterByCategory("filter", category)}
                  className="hover:underline"
                >
                  {category}
                </Link>
              ))}
            </>
          ) : null}
        </ul>
      </li>

      <li className="flex relative cursor-pointer items-center h-full group transition-transform duration-300 hover:translate-y-[-2px]">
        BRANDS{" "}
        <span className="group-hover:rotate-180  transition-transform duration-300">
          <RiArrowDropDownLine size={19} />
        </span>
        <ul className="absolute top-[44px] left-2 w-[450px] p-3 rounded-md gap-3 opacity-0 invisible bg-slate-100 flex flex-wrap group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
          <li className="hover:underline">brand</li>
        </ul>
      </li>

      <Link
        onClick={() => handleFilterByCategory("deals", "with-discount")}
        to="c"
        smooth={true}
        duration={SCROLL_DURATION}
      >
        <li className="flex cursor-pointer items-center h-full group transition-transform duration-300 hover:translate-y-[-2px]">
          DEALS{" "}
        </li>
      </Link>
      <li className="flex cursor-pointer items-center h-full group transition-transform duration-300 hover:translate-y-[-2px]">
        DELIVERY
      </li>
    </ul>
  );
};

export default NavLinks;
