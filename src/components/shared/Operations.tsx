import FitlerOperations from "./FitlerOperations";
import { CiDiscount1 } from "react-icons/ci";

const Operations = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-y-20 md:gap-y-12 px-7 py-5 rounded-3xl">
      <div className="flex  items-center flex-wrap  gap-x-1 gap-y-3 flex-1">
        <FitlerOperations
          className=" flex gap-1 flex-wrap"
          filterFiled="filter"
          options={[
            { value: "all", label: "All" },
            // { value: "no-discount", label: "NO DISCOUNT" },
            // { value: "with-discount", label: "WITH DISCOUNT" },
            { value: "clothing", label: "FASHION" },
            { value: "electronics", label: "ELECTRONICS" },
          ]}
        />

        <FitlerOperations
          className=" flex gap-1 flex-wrap"
          filterFiled="range"
          options={[
            { value: "0,50", label: "$0-$50" },
            { value: "50,200", label: "$50-$200" },
            { value: "200,600", label: "$200-$600" },
            { value: "600,999999", label: "$600-above" },
          ]}
        />
        <FitlerOperations
          className=" flex gap-1 flex-wrap"
          filterFiled="deals"
          options={[
            { value: "with-discount", label: <CiDiscount1 size={20} /> },
          ]}
        />
      </div>
      {/*  justify-end */}
      <div className="">
        <FitlerOperations
          className="flex gap-1 flex-row-reverse flex-wrap"
          filterFiled="sortBy"
          options={[
            {
              value: "name-asc",
              label: "BRANDS (A-Z)",
            },

            { value: "price_per_unit-asc", label: "Price (low first)" },

            { value: "average_rating-asc", label: "RATING" },
          ]}
        />

        {/* <div className="flex whitespace-nowrap items-center px-2 py-[.4rem]  tracking-wide  gap-1 font-normal rounded-lg bg-secondary-foreground text-slate-100 ml-3 relative after:absolute after:left-[-7px] after:h-[85%] after:top-1/2 after:translate-y-[-50%] after:w-[1.5px] after:bg-black  ">
          SORT BY{" "}
          <span className="flex justify-center  h-full rotate-45">
            <RxCross1 size={10} />
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Operations;
