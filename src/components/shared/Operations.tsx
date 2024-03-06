import FitlerOperations from './FitlerOperations'
import { CiDiscount1 } from 'react-icons/ci'

const Operations = () => {
  return (
    <div className="flex flex-col gap-y-20 rounded-3xl md:gap-y-12  xl:flex-row">
      <div className="flex  flex-1 flex-wrap  items-center gap-x-1 gap-y-3">
        <FitlerOperations
          className=" flex flex-wrap gap-1"
          filterFiled="filter"
          options={[
            { value: 'all', label: 'All' },
            // { value: "no-discount", label: "NO DISCOUNT" },
            // { value: "with-discount", label: "WITH DISCOUNT" },
            { value: 'clothing', label: 'FASHION' },
            { value: 'electronics', label: 'ELECTRONICS' },
          ]}
        />

        <FitlerOperations
          className=" flex flex-wrap gap-1"
          filterFiled="range"
          options={[
            { value: '0,50', label: 'EGP0 - EGP50' },
            { value: '50,200', label: 'EGP50 - EGP200' },
            { value: '200,600', label: 'EGP200 - EGP600' },
            { value: '600,999999', label: 'EGP600-above' },
          ]}
        />
        <FitlerOperations
          className=" flex flex-wrap gap-1"
          filterFiled="deals"
          options={[
            { value: 'with-discount', label: <CiDiscount1 size={20} /> },
          ]}
        />
      </div>
      {/*  justify-end */}
      <div className="">
        <FitlerOperations
          className="flex flex-row-reverse flex-wrap gap-1"
          filterFiled="sortBy"
          options={[
            {
              value: 'name-asc',
              label: 'BRANDS (A-Z)',
            },

            { value: 'price_per_unit-asc', label: 'Price (low first)' },

            { value: 'average_rating-asc', label: 'RATING' },
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
  )
}

export default Operations
