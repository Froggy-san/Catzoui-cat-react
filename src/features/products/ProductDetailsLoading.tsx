import { Skeleton } from '@/components/ui/skeleton'
import ProductLoading from './ProductLoading'

function ProductDetailsLoading({ className }: { className?: string }) {
  return (
    <Skeleton
      className={`flex h-full w-full flex-col 
        gap-5 gap-y-24 bg-transparent lg:flex-row ${className}`}
    >
      <ProductLoading className=" w-full xs:px-6 sm:px-20 lg:w-[550px] lg:px-0" />

      <div className="flex flex-1 flex-col gap-5 ">
        <div className=" h-4 rounded-2xl bg-oldCatBg"></div>
        <div className="flex h-4 items-center gap-4 rounded-2xl ">
          <span className=" h-4 w-[60px] rounded-2xl bg-oldCatBg"></span>
          <span className=" h-4 w-[60px] rounded-2xl bg-oldCatBg"></span>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="h-4  w-[80%] rounded-xl bg-oldCatBg"></div>
          <div className="h-4  w-[15%] rounded-xl bg-oldCatBg"></div>
          <div className="h-4  w-[65%] rounded-xl bg-oldCatBg"></div>
          <div className="h-4  w-[20%] rounded-xl bg-oldCatBg"></div>
          <div className="h-4  w-[10%] rounded-xl bg-oldCatBg"></div>
          <div className="h-4  w-[80%] rounded-xl bg-oldCatBg"></div>
        </div>

        <div className="mt-7 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="h-4 w-[150px] rounded-xl bg-oldCatBg"></div>
            <div className="h-3 w-[150px] rounded-xl bg-oldCatBg"></div>
          </div>

          <div className="mt-7 flex flex-col gap-4">
            <div className="h-4 w-[50px] rounded-xl bg-oldCatBg"></div>

            <div className="flex gap-5">
              <span className="h-[35px] w-[40px] rounded-md bg-oldCatBg"></span>
              <span className="h-[35px] w-[40px] rounded-md bg-oldCatBg"></span>
              <span className="h-[35px] w-[45px] rounded-md bg-oldCatBg"></span>
              <span className="h-[35px] w-[45px] rounded-md bg-oldCatBg"></span>
              <span className="h-[35px] w-[45px] rounded-md bg-oldCatBg"></span>
            </div>
          </div>

          <div className="flex gap-1">
            <span className="h-10 w-[87%] rounded-md bg-oldCatBg"></span>
            <span className="h-10 flex-1 rounded-md bg-oldCatBg"></span>
          </div>
        </div>
      </div>
    </Skeleton>
  )
}

export default ProductDetailsLoading
